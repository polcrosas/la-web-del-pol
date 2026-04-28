import React, { useState, useEffect, useRef, useMemo } from 'react';
import { database } from '../firebase';
import { ref, onValue, set, get } from 'firebase/database';

const MTG = () => {
  const [polTotal, setPolTotal] = useState(0);
  const [domeTotal, setDomeTotal] = useState(0);
  const [todayGames, setTodayGames] = useState([]);
  const [polLife, setPolLife] = useState(20);
  const [domeLife, setDomeLife] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For hold-to-increment functionality
  const holdIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const showingVictoryDialogRef = useRef(false);
  const previousPolLifeRef = useRef(20);
  const previousDomeLifeRef = useRef(20);

  const mtgRef = ref(database, 'mtg');

  // Check if it's a new day and reset session if needed
  const checkNewDay = (data) => {
    const today = new Date().toDateString();
    const lastDate = data?.lastDate;
    
    if (lastDate !== today) {
      // New day - reset today's games but keep totals and last game
      return {
        ...data,
        todayGames: [],
        lastDate: today
      };
    }
    return data;
  };

  // Load data from Firebase
  useEffect(() => {
    const unsubscribe = onValue(mtgRef, (snapshot) => {
      try {
        let data = snapshot.val();
        
        // Initialize if no data exists
        if (!data) {
          data = {
            polTotal: 0,
            domeTotal: 0,
            lastGame: null,
            todayGames: [],
            lastDate: new Date().toDateString()
          };
          set(mtgRef, data);
        } else {
          // Check for new day
          data = checkNewDay(data);
          if (data.lastDate !== snapshot.val()?.lastDate) {
            set(mtgRef, data);
          }
        }

        setPolTotal(data.polTotal || 0);
        setDomeTotal(data.domeTotal || 0);
        setTodayGames(data.todayGames || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error(err);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch for life reaching 0 and trigger victory dialog
  useEffect(() => {
    // Only trigger if life just changed to 0 (not already at 0)
    // and dialog is not already showing
    if (showingVictoryDialogRef.current) {
      return;
    }

    let winner = null;
    let loser = null;

    if (polLife === 0 && previousPolLifeRef.current > 0) {
      winner = 'Dome';
      loser = 'Pol';
    } else if (domeLife === 0 && previousDomeLifeRef.current > 0) {
      winner = 'Pol';
      loser = 'Dome';
    }

    if (winner) {
      showingVictoryDialogRef.current = true;
      
      // Stop any ongoing hold intervals
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }

      // Show dialog after a brief delay
      setTimeout(() => {
        if (window.confirm(`${loser} reached 0 life. Record victory for ${winner}?`)) {
          recordVictory(winner);
        } else {
          // If cancelled, reset life counters
          setPolLife(20);
          setDomeLife(20);
        }
        showingVictoryDialogRef.current = false;
      }, 200);
    }

    // Update previous life values
    previousPolLifeRef.current = polLife;
    previousDomeLifeRef.current = domeLife;
  }, [polLife, domeLife]);

  // Record a victory
  const recordVictory = async (winner) => {
    try {
      // Reset life counters immediately to prevent multiple triggers
      setPolLife(20);
      setDomeLife(20);
      
      const snapshot = await get(mtgRef);
      let data = snapshot.val() || {
        polTotal: 0,
        domeTotal: 0,
        lastGame: null,
        todayGames: [],
        lastDate: new Date().toDateString()
      };

      // Update total
      if (winner === 'Pol') {
        data.polTotal = (data.polTotal || 0) + 1;
      } else {
        data.domeTotal = (data.domeTotal || 0) + 1;
      }

      // Add to today's games
      const game = {
        winner: winner,
        timestamp: new Date().toISOString(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      data.todayGames = [...(data.todayGames || []), game];
      data.lastGame = game;
      data.lastDate = new Date().toDateString();

      await set(mtgRef, data);
    } catch (err) {
      setError('Failed to record victory');
      console.error(err);
    }
  };

  // Undo last game
  const undoLastGame = async () => {
    try {
      const snapshot = await get(mtgRef);
      let data = snapshot.val();
      
      if (!data || !data.todayGames || data.todayGames.length === 0) {
        alert('No games to undo!');
        return;
      }

      // Get the last game
      const lastGame = data.todayGames[data.todayGames.length - 1];
      
      // Remove last game from today's games
      const newTodayGames = data.todayGames.slice(0, -1);
      
      // Decrease the winner's total
      if (lastGame.winner === 'Pol') {
        data.polTotal = Math.max(0, (data.polTotal || 0) - 1);
      } else {
        data.domeTotal = Math.max(0, (data.domeTotal || 0) - 1);
      }
      
      // Update last game to the previous one (if exists)
      const newLastGame = newTodayGames.length > 0
        ? newTodayGames[newTodayGames.length - 1]
        : data.lastGame; // Keep the old lastGame if no games left today

      await set(mtgRef, {
        ...data,
        todayGames: newTodayGames,
        lastGame: newLastGame,
        polTotal: data.polTotal,
        domeTotal: data.domeTotal
      });
    } catch (err) {
      setError('Failed to undo');
      console.error(err);
    }
  };

  // Hold-to-increment functionality
  const handleMouseDown = (player, direction) => {
    let count = 0;
    let currentIncrement = 1;
    
    // Initial click
    if (player === 'pol') {
      setPolLife(prev => {
        const newLife = direction === 'up' ? prev + 1 : Math.max(0, prev - 1);
        return newLife;
      });
    } else {
      setDomeLife(prev => {
        const newLife = direction === 'up' ? prev + 1 : Math.max(0, prev - 1);
        return newLife;
      });
    }
    
    // Start holding after 300ms
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        // Stop if dialog is showing
        if (showingVictoryDialogRef.current) {
          clearInterval(interval);
          return;
        }
        
        count++;
        
        // Determine increment based on hold duration
        if (count < 10) {
          currentIncrement = 1; // First second: +1
        } else if (count < 20) {
          currentIncrement = 3; // Next second: +3
        } else if (count < 30) {
          currentIncrement = 5; // Next second: +5
        } else {
          currentIncrement = 10; // After that: +10
        }
        
        if (player === 'pol') {
          setPolLife(prev => {
            if (prev === 0 || showingVictoryDialogRef.current) return prev;
            const newLife = direction === 'up' ? prev + currentIncrement : Math.max(0, prev - currentIncrement);
            return newLife;
          });
        } else {
          setDomeLife(prev => {
            if (prev === 0 || showingVictoryDialogRef.current) return prev;
            const newLife = direction === 'up' ? prev + currentIncrement : Math.max(0, prev - currentIncrement);
            return newLife;
          });
        }
      }, 100); // Update every 100ms
      
      holdIntervalRef.current = interval;
    }, 300);
    
    holdTimeoutRef.current = timeout;
  };
  
  const handleMouseUp = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  // Clear all data
  const clearAll = async () => {
    if (window.confirm('Clear ALL data? This will reset everything including total victories. This cannot be undone!')) {
      if (window.confirm('Are you absolutely sure? This will delete all victory records permanently.')) {
        try {
          await set(mtgRef, {
            polTotal: 0,
            domeTotal: 0,
            lastGame: null,
            todayGames: [],
            lastDate: new Date().toDateString()
          });
        } catch (err) {
          setError('Failed to clear data');
          console.error(err);
        }
      }
    }
  };

  // Calculate session info - memoized to only recalculate when todayGames changes
  const sessionInfo = useMemo(() => {
    if (todayGames.length === 0) {
      return {
        lastWinner: 'no games played yet today',
        nextStarter: '',
        todayLeader: '',
        specialMessage: null
      };
    }

    const lastGame = todayGames[todayGames.length - 1];
    const nextStarter = lastGame.winner === 'Pol' ? 'dome' : 'pol';
    
    const polWins = todayGames.filter(g => g.winner === 'Pol').length;
    const domeWins = todayGames.filter(g => g.winner === 'Dome').length;
    
    let todayLeader;
    if (polWins > domeWins) {
      todayLeader = `pol (${polWins}-${domeWins})`;
    } else if (domeWins > polWins) {
      todayLeader = `dome (${domeWins}-${polWins})`;
    } else {
      todayLeader = `tied (${polWins}-${domeWins})`;
    }

    // Check for various game situations
    let specialMessage = null;
    let streakCount = 0;
    let previousWinner = null;
    
    // Count consecutive wins from the end
    for (let i = todayGames.length - 1; i >= 0; i--) {
      if (todayGames[i].winner === lastGame.winner) {
        streakCount++;
      } else {
        previousWinner = todayGames[i].winner;
        break;
      }
    }
    
    const winDiff = Math.abs(polWins - domeWins);
    const totalGames = todayGames.length;
    const loser = lastGame.winner === 'Pol' ? 'dome' : 'pol';
    
    // Check if someone just broke a streak (previous player had 3+ wins)
    let previousStreakCount = 0;
    if (previousWinner && totalGames >= 4) {
      for (let i = todayGames.length - 2; i >= 0; i--) {
        if (todayGames[i].winner === previousWinner) {
          previousStreakCount++;
        } else {
          break;
        }
      }
    }
    
    // Priority 1: Streak breaker (broke a 3+ streak)
    if (previousStreakCount >= 3 && streakCount === 1) {
      const messages = [
        `${lastGame.winner.toLowerCase()} breaks the streak! (ง'̀-'́)ง ended ${previousStreakCount} wins!`,
        `streak broken! ᕙ(⇀‸↼‶)ᕗ ${lastGame.winner.toLowerCase()} stops ${previousWinner.toLowerCase()}!`,
        `${previousWinner.toLowerCase()}'s ${previousStreakCount} streak ended! (╯°□°)╯ ${lastGame.winner.toLowerCase()} fights back!`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 2: Best of 5 winner (3-2)
    else if ((polWins === 3 && domeWins === 2) || (domeWins === 3 && polWins === 2)) {
      const winner = polWins === 3 ? 'pol' : 'dome';
      const messages = [
        `${winner} takes it! ᕙ(⇀‸↼‶)ᕗ best of 5 complete (3-2)`,
        `${winner} wins the series! (ง'̀-'́)ง 3-2 victory!`,
        `close one! ${winner} prevails ᕕ( ᐛ )ᕗ 3-2`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 3: Best of 3 winner (2-1)
    else if ((polWins === 2 && domeWins === 1) || (domeWins === 2 && polWins === 1)) {
      const winner = polWins === 2 ? 'pol' : 'dome';
      const messages = [
        `${winner} wins! (•̀ᴗ•́)و best of 3 complete (2-1)`,
        `${winner} takes the series! ᕙ(⇀‸↼‶)ᕗ 2-1`,
        `${winner} clinches it! (ง'̀-'́)ง 2-1 victory`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 4: Match point (2-2)
    else if (polWins === 2 && domeWins === 2) {
      specialMessage = `match point! (╯°□°)╯ 2-2 - winner takes all!`;
    }
    // Priority 5: Best of 3 match point (1-1)
    else if (polWins === 1 && domeWins === 1 && totalGames === 2) {
      specialMessage = `rubber match! (ง'̀-'́)ง 1-1 - next wins best of 3!`;
    }
    // Priority 6: Long win streaks (5+)
    else if (streakCount >= 5) {
      const messages = [
        `${lastGame.winner.toLowerCase()} is unstoppable! ᕙ(⇀‸↼‶)ᕗ ${streakCount} wins!`,
        `${lastGame.winner.toLowerCase()} dominating! ୧(＾ 〰 ＾)୨ ${streakCount} streak!`,
        `${loser} can't catch a break... (╥﹏╥) ${streakCount} losses`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 7: Medium win streaks (3-4)
    else if (streakCount >= 3) {
      const messages = [
        `${lastGame.winner.toLowerCase()} is on fire! ＼(＾O＾)／ ${streakCount} wins!`,
        `${lastGame.winner.toLowerCase()} heating up! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ${streakCount} streak!`,
        `${loser} needs a comeback! (｡•́︿•̀｡) ${streakCount} down`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 8: Big lead (3+ games ahead)
    else if (winDiff >= 3 && totalGames >= 4) {
      const leader = polWins > domeWins ? 'pol' : 'dome';
      const messages = [
        `${leader} crushing it! (ง'̀-'́)ง ${polWins > domeWins ? polWins : domeWins}-${polWins > domeWins ? domeWins : polWins}`,
        `${loser} in trouble... (⊙_⊙;) down by ${winDiff}`,
        `${leader} running away! ᕕ( ᐛ )ᕗ ${polWins > domeWins ? polWins : domeWins}-${polWins > domeWins ? domeWins : polWins}`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 9: Close game (tied or 1 game difference)
    else if (winDiff <= 1 && totalGames >= 3) {
      const messages = [
        `neck and neck! (ง •̀_•́)ง ${polWins}-${domeWins}`,
        `so close! ᕙ(⇀‸↼‶)ᕗ ${polWins}-${domeWins}`,
        `anyone's game! (•̀ᴗ•́)و ${polWins}-${domeWins}`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 10: First game of the day
    else if (totalGames === 1) {
      const messages = [
        `first blood! (•̀ᴗ•́)و ${lastGame.winner.toLowerCase()} takes game 1`,
        `${lastGame.winner.toLowerCase()} strikes first! (ง'̀-'́)ง 1-0`,
        `game on! (ง •̀_•́)ง ${lastGame.winner.toLowerCase()} leads`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Priority 11: Comeback win (was losing, now tied or ahead)
    else if (totalGames >= 2) {
      const previousPolWins = todayGames.slice(0, -1).filter(g => g.winner === 'Pol').length;
      const previousDomeWins = todayGames.slice(0, -1).filter(g => g.winner === 'Dome').length;
      
      if (lastGame.winner === 'Pol' && previousPolWins < previousDomeWins && polWins >= domeWins) {
        specialMessage = `pol fights back! ᕦ(ò_óˇ)ᕤ comeback complete!`;
      } else if (lastGame.winner === 'Dome' && previousDomeWins < previousPolWins && domeWins >= polWins) {
        specialMessage = `dome fights back! ᕦ(ò_óˇ)ᕤ comeback complete!`;
      }
    }
    
    // Default: Good luck message
    if (!specialMessage) {
      const messages = [
        `good luck ${nextStarter}! (•̀ᴗ•́)و`,
        `your turn ${nextStarter}! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${nextStarter} starts! ᕙ(⇀‸↼‶)ᕗ`,
        `let's go ${nextStarter}! (ง'̀-'́)ง`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }

    return {
      lastWinner: `${lastGame.winner.toLowerCase()} won`,
      nextStarter: nextStarter,
      todayLeader: todayLeader,
      specialMessage: specialMessage
    };
  }, [todayGames]); // Only recalculate when todayGames changes

  if (loading) {
    return (
      <div style={{ 
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          padding: '20px',
          border: '1px solid #000',
          marginBottom: '0',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '5px' }}>
            mtg victory tracker
          </h1>
          <p style={{ fontSize: '14px', color: '#666' }}>loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          padding: '20px',
          border: '1px solid #000',
          marginBottom: '0',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '16px', fontWeight: 'normal', marginBottom: '5px' }}>
            mtg victory tracker
          </h1>
          <p style={{ fontSize: '14px', color: '#666' }}>error: {error}</p>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            check firebase configuration in src/firebase.js
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '10px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        border: '1px solid #000',
        padding: '10px',
        marginBottom: '10px',
        textAlign: 'center',
        background: '#fff'
      }}>
        <h1 style={{
          fontSize: '14px',
          fontWeight: 'normal',
          margin: '0 0 3px 0',
          textTransform: 'lowercase'
        }}>
          mtg victory tracker
        </h1>
        <p style={{
          fontSize: '11px',
          color: '#666',
          margin: 0,
          textTransform: 'lowercase'
        }}>
          pol vs dome
        </p>
      </div>

      <div style={{
        border: '1px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        {/* Global Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <div
            onClick={() => recordVictory('Pol')}
            style={{
              border: '1px solid #000',
              padding: '15px 10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
          >
            <h2 style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '8px' }}>pol</h2>
            <div style={{ fontSize: '32px', fontWeight: 'normal', margin: '5px 0' }}>
              {polTotal}
            </div>
            <p style={{ fontSize: '11px', color: '#666' }}>victories</p>
          </div>
          <div
            onClick={() => recordVictory('Dome')}
            style={{
              border: '1px solid #000',
              padding: '15px 10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
          >
            <h2 style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '8px' }}>dome</h2>
            <div style={{ fontSize: '32px', fontWeight: 'normal', margin: '5px 0' }}>
              {domeTotal}
            </div>
            <p style={{ fontSize: '11px', color: '#666' }}>victories</p>
          </div>
        </div>

        {/* Life Counter */}
        <div style={{
          border: '1px solid #000',
          padding: '15px 10px',
          marginBottom: '15px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
          }}>
            {/* Pol Life */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', marginBottom: '5px', color: '#666' }}>pol</p>
              <div style={{
                fontSize: '36px',
                fontWeight: 'normal',
                marginBottom: '8px',
                color: '#000'
              }}>
                {polLife}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  onMouseDown={() => handleMouseDown('pol', 'down')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('pol', 'down')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '45px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                >
                  -
                </button>
                <button
                  onMouseDown={() => handleMouseDown('pol', 'up')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('pol', 'up')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '45px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Dome Life */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', marginBottom: '5px', color: '#666' }}>dome</p>
              <div style={{
                fontSize: '36px',
                fontWeight: 'normal',
                marginBottom: '8px',
                color: '#000'
              }}>
                {domeLife}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button
                  onMouseDown={() => handleMouseDown('dome', 'down')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('dome', 'down')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '45px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                >
                  -
                </button>
                <button
                  onMouseDown={() => handleMouseDown('dome', 'up')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('dome', 'up')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '45px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#000';
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* Reset Life Button */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              onClick={() => {
                setPolLife(20);
                setDomeLife(20);
              }}
              style={{
                padding: '8px 16px',
                border: '1px solid #999',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'normal',
                color: '#666',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#666';
                e.target.style.borderColor = '#666';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#999';
                e.target.style.color = '#666';
              }}
            >
              reset life
            </button>
          </div>
        </div>

        {/* Session Info */}
        <div style={{
          border: '1px solid #000',
          padding: '12px 10px',
          marginBottom: '15px',
          background: 'rgba(0, 0, 0, 0.02)'
        }}>
          <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '5px' }}>
            {sessionInfo.lastWinner}
          </p>
          {sessionInfo.nextStarter && (
            <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '5px' }}>
              next: {sessionInfo.nextStarter}
            </p>
          )}
          {sessionInfo.todayLeader && (
            <p style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '5px' }}>
              leader: {sessionInfo.todayLeader}
            </p>
          )}
          {sessionInfo.specialMessage && (
            <p style={{
              fontSize: '12px',
              lineHeight: '1.5',
              marginTop: '8px',
              padding: '8px',
              background: '#fff',
              border: '1px solid #000',
              textAlign: 'center'
            }}>
              {sessionInfo.specialMessage}
            </p>
          )}
        </div>


        {/* Today's Game Log */}
        <div style={{
          border: '1px solid #000',
          padding: '12px 10px',
          marginTop: '10px',
          maxHeight: '300px',
          overflowY: 'auto',
          background: '#fff'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 'normal',
            marginBottom: '8px',
            textTransform: 'lowercase'
          }}>
            today's games
          </h3>
          {todayGames.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#666',
              padding: '10px',
              fontSize: '11px',
              textTransform: 'lowercase'
            }}>
              no games today
            </div>
          ) : (
            <div>
              {[...todayGames].reverse().map((game, index) => (
                <div
                  key={index}
                  style={{
                    padding: '6px 8px',
                    borderBottom: index === todayGames.length - 1 ? 'none' : '1px solid #eee',
                    fontSize: '11px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ textTransform: 'lowercase' }}>
                    {game.winner.toLowerCase()} won
                    {index === 0 ? ' (recent)' : ''}
                  </span>
                  <span style={{ color: '#666', fontSize: '10px' }}>{game.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div style={{
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid #000'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 'normal',
            marginBottom: '8px',
            color: '#666',
            textTransform: 'lowercase'
          }}>
            danger zone
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            <button
              onClick={undoLastGame}
              style={{
                padding: '10px 12px',
                border: '1px solid #999',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#666',
                fontFamily: 'inherit',
                textTransform: 'lowercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#666';
                e.target.style.borderColor = '#666';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#999';
                e.target.style.color = '#666';
              }}
            >
              undo last game
            </button>
            <button
              onClick={clearAll}
              style={{
                padding: '10px 12px',
                border: '1px solid #999',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'normal',
                color: '#666',
                fontFamily: 'inherit',
                textTransform: 'lowercase'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#666';
                e.target.style.borderColor = '#666';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#999';
                e.target.style.color = '#666';
              }}
            >
              clear all data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MTG;
