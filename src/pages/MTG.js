import React, { useState, useEffect, useRef, useMemo } from 'react';
import { database } from '../firebase';
import { ref, onValue, set, get } from 'firebase/database';

const MTG = () => {
  const [polTotal, setPolTotal] = useState(0);
  const [domeTotal, setDomeTotal] = useState(0);
  const [polBo3, setPolBo3] = useState(0);
  const [domeBo3, setDomeBo3] = useState(0);
  const [polBo5, setPolBo5] = useState(0);
  const [domeBo5, setDomeBo5] = useState(0);
  const [seriesMode, setSeriesMode] = useState('casual');
  const [currentSeriesScore, setCurrentSeriesScore] = useState({ pol: 0, dome: 0 });
  const [todayGames, setTodayGames] = useState([]);
  const [polLife, setPolLife] = useState(20);
  const [domeLife, setDomeLife] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('life');
  const [showCenterMenu, setShowCenterMenu] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [victoryMessage, setVictoryMessage] = useState(null);

  const holdIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const showingVictoryDialogRef = useRef(false);
  const previousPolLifeRef = useRef(20);
  const previousDomeLifeRef = useRef(20);

  const mtgRef = ref(database, 'mtg');

  const checkNewDay = (data) => {
    const today = new Date().toDateString();
    const lastDate = data?.lastDate;
    
    if (lastDate !== today) {
      return {
        ...data,
        todayGames: [],
        lastDate: today
      };
    }
    return data;
  };

  useEffect(() => {
    const unsubscribe = onValue(mtgRef, (snapshot) => {
      try {
        let data = snapshot.val();
        
        if (!data) {
          data = {
            polTotal: 0,
            domeTotal: 0,
            polBo3: 0,
            domeBo3: 0,
            polBo5: 0,
            domeBo5: 0,
            seriesMode: 'casual',
            currentSeriesScore: { pol: 0, dome: 0 },
            lastGame: null,
            todayGames: [],
            lastDate: new Date().toDateString()
          };
          set(mtgRef, data);
        } else {
          data = checkNewDay(data);
          if (data.lastDate !== snapshot.val()?.lastDate) {
            set(mtgRef, data);
          }
        }

        setPolTotal(data.polTotal || 0);
        setDomeTotal(data.domeTotal || 0);
        setPolBo3(data.polBo3 || 0);
        setDomeBo3(data.domeBo3 || 0);
        setPolBo5(data.polBo5 || 0);
        setDomeBo5(data.domeBo5 || 0);
        setSeriesMode(data.seriesMode || 'casual');
        setCurrentSeriesScore(data.currentSeriesScore || { pol: 0, dome: 0 });
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

  useEffect(() => {
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
      
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
        holdTimeoutRef.current = null;
      }
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }

      setTimeout(() => {
        if (window.confirm(`${loser} reached 0 life. Record victory for ${winner}?`)) {
          recordVictory(winner);
        } else {
          setPolLife(20);
          setDomeLife(20);
        }
        showingVictoryDialogRef.current = false;
      }, 200);
    }

    previousPolLifeRef.current = polLife;
    previousDomeLifeRef.current = domeLife;
  }, [polLife, domeLife]);

  const startSeries = async (mode) => {
    try {
      const snapshot = await get(mtgRef);
      let data = snapshot.val() || {};
      
      data.seriesMode = mode;
      data.currentSeriesScore = { pol: 0, dome: 0 };
      
      await set(mtgRef, data);
      setSeriesMode(mode);
      setCurrentSeriesScore({ pol: 0, dome: 0 });
    } catch (err) {
      setError('Failed to start series');
      console.error(err);
    }
  };

  const recordVictory = async (winner) => {
    try {
      setPolLife(20);
      setDomeLife(20);
      
      const snapshot = await get(mtgRef);
      let data = snapshot.val() || {
        polTotal: 0,
        domeTotal: 0,
        polBo3: 0,
        domeBo3: 0,
        polBo5: 0,
        domeBo5: 0,
        seriesMode: 'casual',
        currentSeriesScore: { pol: 0, dome: 0 },
        lastGame: null,
        todayGames: [],
        lastDate: new Date().toDateString()
      };

      if (winner === 'Pol') {
        data.polTotal = (data.polTotal || 0) + 1;
      } else {
        data.domeTotal = (data.domeTotal || 0) + 1;
      }

      const currentMode = data.seriesMode || 'casual';
      const currentScore = data.currentSeriesScore || { pol: 0, dome: 0 };
      
      if (currentMode !== 'casual') {
        if (winner === 'Pol') {
          currentScore.pol += 1;
        } else {
          currentScore.dome += 1;
        }
        data.currentSeriesScore = currentScore;
        
        let seriesComplete = false;
        let seriesWinner = null;
        
        if (currentMode === 'bo3' && (currentScore.pol === 2 || currentScore.dome === 2)) {
          seriesComplete = true;
          seriesWinner = currentScore.pol === 2 ? 'Pol' : 'Dome';
          if (seriesWinner === 'Pol') {
            data.polBo3 = (data.polBo3 || 0) + 1;
          } else {
            data.domeBo3 = (data.domeBo3 || 0) + 1;
          }
        } else if (currentMode === 'bo5' && (currentScore.pol === 3 || currentScore.dome === 3)) {
          seriesComplete = true;
          seriesWinner = currentScore.pol === 3 ? 'Pol' : 'Dome';
          if (seriesWinner === 'Pol') {
            data.polBo5 = (data.polBo5 || 0) + 1;
          } else {
            data.domeBo5 = (data.domeBo5 || 0) + 1;
          }
        }
        
        if (seriesComplete) {
          // Save data first
          await set(mtgRef, data);
          
          // For bo3, offer to extend to bo5
          if (currentMode === 'bo3') {
            setTimeout(() => {
              const extendToBo5 = window.confirm(
                `${seriesWinner} wins the BO3 series ${currentScore.pol}-${currentScore.dome}!\n\nExtend to Best of 5?`
              );
              
              if (extendToBo5) {
                // Continue the series as bo5
                get(mtgRef).then(snapshot => {
                  let updatedData = snapshot.val();
                  updatedData.seriesMode = 'bo5';
                  // Keep the current score
                  set(mtgRef, updatedData);
                });
              } else {
                // Reset to casual
                get(mtgRef).then(snapshot => {
                  let updatedData = snapshot.val();
                  updatedData.seriesMode = 'casual';
                  updatedData.currentSeriesScore = { pol: 0, dome: 0 };
                  set(mtgRef, updatedData);
                });
              }
            }, 100);
          } else {
            // For bo5, just reset to casual
            data.seriesMode = 'casual';
            data.currentSeriesScore = { pol: 0, dome: 0 };
            await set(mtgRef, data);
            
            setTimeout(() => {
              alert(`${seriesWinner} wins the BO5 series ${currentScore.pol}-${currentScore.dome}!`);
            }, 100);
          }
          return; // Exit early since we're handling the save
        }
      }

      const game = {
        winner: winner,
        seriesMode: currentMode,
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

  const undoLastGame = async () => {
    try {
      const snapshot = await get(mtgRef);
      let data = snapshot.val();
      
      if (!data || !data.todayGames || data.todayGames.length === 0) {
        alert('No games to undo!');
        return;
      }

      const lastGame = data.todayGames[data.todayGames.length - 1];
      const newTodayGames = data.todayGames.slice(0, -1);
      
      if (lastGame.winner === 'Pol') {
        data.polTotal = Math.max(0, (data.polTotal || 0) - 1);
      } else {
        data.domeTotal = Math.max(0, (data.domeTotal || 0) - 1);
      }
      
      const newLastGame = newTodayGames.length > 0
        ? newTodayGames[newTodayGames.length - 1]
        : data.lastGame;

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

  const handleMouseDown = (player, direction) => {
    let count = 0;
    let currentIncrement = 1;
    
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
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (showingVictoryDialogRef.current) {
          clearInterval(interval);
          return;
        }
        
        count++;
        
        if (count < 10) {
          currentIncrement = 1;
        } else if (count < 20) {
          currentIncrement = 3;
        } else if (count < 30) {
          currentIncrement = 5;
        } else {
          currentIncrement = 10;
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
      }, 100);
      
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

  const throwDice = () => {
    // Simulate rolling with random numbers
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const tempResult = Math.floor(Math.random() * 20) + 1;
      setDiceResult(tempResult);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        // Final result
        const finalResult = Math.floor(Math.random() * 20) + 1;
        setDiceResult(finalResult);
        setTimeout(() => setDiceResult(null), 3000);
      }
    }, 100);
  };

  const handleConcede = (player) => {
    const winner = player === 'pol' ? 'Dome' : 'Pol';
    if (window.confirm(`${player} concedes. Record victory for ${winner}?`)) {
      recordVictory(winner);
      setShowCenterMenu(false);
    }
  };

  const clearAll = async () => {
    if (window.confirm('Clear ALL data? This will reset everything including total victories. This cannot be undone!')) {
      if (window.confirm('Are you absolutely sure? This will delete all victory records permanently.')) {
        try {
          await set(mtgRef, {
            polTotal: 0,
            domeTotal: 0,
            polBo3: 0,
            domeBo3: 0,
            polBo5: 0,
            domeBo5: 0,
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

    // Calculate current streak
    let currentStreak = 1;
    let streakPlayer = lastGame.winner;
    for (let i = todayGames.length - 2; i >= 0; i--) {
      if (todayGames[i].winner === streakPlayer) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Check if a streak was just broken (previous game had a different winner)
    let brokenStreak = 0;
    let brokenStreakPlayer = null;
    if (todayGames.length >= 2) {
      const previousWinner = todayGames[todayGames.length - 2].winner;
      if (previousWinner !== lastGame.winner) {
        // Count how long the previous streak was
        let streakCount = 1;
        for (let i = todayGames.length - 3; i >= 0; i--) {
          if (todayGames[i].winner === previousWinner) {
            streakCount++;
          } else {
            break;
          }
        }
        if (streakCount >= 3) {
          brokenStreak = streakCount;
          brokenStreakPlayer = previousWinner;
        }
      }
    }

    // Generate context-aware message
    let specialMessage = null;
    
    // Check if in a series (bo3 or bo5)
    if (seriesMode === 'bo3' || seriesMode === 'bo5') {
      const seriesName = seriesMode === 'bo3' ? 'best of 3' : 'best of 5';
      const winTarget = seriesMode === 'bo3' ? 2 : 3;
      const seriesPolWins = currentSeriesScore.pol;
      const seriesDomeWins = currentSeriesScore.dome;
      
      if (seriesPolWins === winTarget - 1 && seriesDomeWins < winTarget - 1) {
        specialMessage = `pol is one win away from taking the ${seriesName}! >:)`;
      } else if (seriesDomeWins === winTarget - 1 && seriesPolWins < winTarget - 1) {
        specialMessage = `dome is one win away from taking the ${seriesName}! >:)`;
      } else if (seriesPolWins === seriesDomeWins) {
        specialMessage = `${seriesName} is tied ${seriesPolWins}-${seriesDomeWins}! next game matters! (╯°□°)╯`;
      } else {
        const leader = seriesPolWins > seriesDomeWins ? 'pol' : 'dome';
        specialMessage = `${leader} leads the ${seriesName} ${Math.max(seriesPolWins, seriesDomeWins)}-${Math.min(seriesPolWins, seriesDomeWins)}`;
      }
    }
    // Streak break messages (highest priority in casual mode)
    else if (brokenStreak > 0) {
      const messages = [
        `${lastGame.winner.toLowerCase()} breaks ${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} game streak! \\(o_o)/`,
        `streak breaker! ${lastGame.winner.toLowerCase()} ends ${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} win run! (x_x)`,
        `${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} game streak is over! ${lastGame.winner.toLowerCase()} strikes back! ᕙ(⇀‸↼‶)ᕗ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Active streak messages for casual games
    else if (currentStreak >= 3) {
      const messages = [
        `${streakPlayer.toLowerCase()} is on fire! ${currentStreak} wins in a row! ᕙ(⇀‸↼‶)ᕗ`,
        `${currentStreak} game streak for ${streakPlayer.toLowerCase()}! unstoppable! (•̀ᴗ•́)و`,
        `${streakPlayer.toLowerCase()} dominating with ${currentStreak} straight wins! ᕦ(ò_óˇ)ᕤ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Close score messages
    else if (Math.abs(polWins - domeWins) === 0 && todayGames.length >= 2) {
      const messages = [
        `perfectly balanced! ${polWins}-${domeWins} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `dead even at ${polWins}-${domeWins}! who will break the tie? (o_O)`,
        `tied ${polWins}-${domeWins}! the tension! (@_@)`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // One-sided matches
    else if (todayGames.length >= 3 && (polWins === 0 || domeWins === 0)) {
      const winningPlayer = polWins > 0 ? 'pol' : 'dome';
      const losingPlayer = polWins > 0 ? 'dome' : 'pol';
      specialMessage = `${losingPlayer} still looking for their first win today... (╥_╥)`;
    }
    // Default encouraging messages
    else {
      const messages = [
        `good luck ${nextStarter}! (•̀ᴗ•́)و`,
        `your turn ${nextStarter}! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${nextStarter} starts! ᕙ(⇀‸↼‶)ᕗ`,
        `let's go ${nextStarter}! ᕦ(ò_óˇ)ᕤ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }

    return {
      lastWinner: `${lastGame.winner.toLowerCase()} won`,
      nextStarter: nextStarter,
      todayLeader: todayLeader,
      specialMessage: specialMessage
    };
  }, [todayGames, seriesMode, currentSeriesScore]);

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
    <>
      <style>{`
        /* Prevent text selection on buttons */
        button {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        /* Desktop: Hide tabs and life counter, only show victory counter */
        .tab-navigation {
          display: none;
        }
        .desktop-layout {
          display: block;
        }
        .life-counter-section {
          display: none;
        }
        .victory-counter-section {
          display: block;
        }
        
        /* Mobile: Show tabs and switch between sections */
        @media (max-width: 768px) {
          .tab-navigation {
            display: flex !important;
          }
          .desktop-layout {
            display: block;
          }
          .life-counter-section {
            display: none;
          }
          .victory-counter-section {
            display: none;
          }
          .life-counter-section.active {
            display: flex !important;
          }
          .victory-counter-section.active {
            display: block !important;
          }
        }

        /* Mobile life counter - vertical split mirrored layout */
        @media (max-width: 768px) {
          .mobile-life-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            background: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
          }

          .mobile-player-section {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            position: relative !important;
            border: none !important;
            padding: 0 !important;
          }

          .mobile-player-top {
            transform: rotate(180deg) !important;
            border-bottom: 2px solid #000 !important;
          }

          .mobile-player-bottom {
            border-top: 2px solid #000 !important;
          }

          .mobile-life-display {
            font-size: 120px !important;
            font-weight: bold !important;
            line-height: 1 !important;
            margin: 20px 0 !important;
            user-select: none !important;
          }

          .mobile-player-name {
            position: absolute !important;
            left: 20px !important;
            top: 20px !important;
            font-size: 16px !important;
            font-weight: bold !important;
            text-transform: uppercase !important;
            color: #000 !important;
            user-select: none !important;
            opacity: 0.4 !important;
            letter-spacing: 2px !important;
          }

          .mobile-button-row {
            display: flex !important;
            gap: 20px !important;
            width: 100% !important;
            max-width: 400px !important;
            padding: 0 30px !important;
          }

          .mobile-life-button {
            flex: 1 !important;
            padding: 40px 20px !important;
            border: 3px solid #000 !important;
            background: #fff !important;
            font-size: 48px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            touch-action: manipulation !important;
            user-select: none !important;
            -webkit-tap-highlight-color: transparent !important;
            border-radius: 8px !important;
            transition: all 0.1s ease !important;
          }

          .mobile-life-button:active {
            background: #000 !important;
            color: #fff !important;
            transform: scale(0.95) !important;
          }

          .mobile-center-button {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 56px !important;
            height: 56px !important;
            border: 3px solid #000 !important;
            background: rgba(255, 255, 255, 0.98) !important;
            font-size: 22px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            border-radius: 50% !important;
            backdrop-filter: blur(10px) !important;
            z-index: 100 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            transition: all 0.2s ease !important;
          }

          .mobile-center-button:active {
            transform: translate(-50%, -50%) scale(0.95) !important;
            background: #000 !important;
            color: #fff !important;
          }

          .mobile-center-menu {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: rgba(255, 255, 255, 0.98) !important;
            border: 3px solid #000 !important;
            border-radius: 16px !important;
            padding: 20px !important;
            backdrop-filter: blur(10px) !important;
            z-index: 101 !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2) !important;
            min-width: 250px !important;
          }

          .mobile-menu-button {
            width: 100% !important;
            padding: 16px !important;
            margin-bottom: 10px !important;
            border: 2px solid #000 !important;
            background: #fff !important;
            font-size: 14px !important;
            font-weight: normal !important;
            cursor: pointer !important;
            border-radius: 8px !important;
            text-transform: lowercase !important;
            transition: all 0.2s ease !important;
          }

          .mobile-menu-button:last-child {
            margin-bottom: 0 !important;
          }

          .mobile-menu-button:active {
            background: #000 !important;
            color: #fff !important;
            transform: scale(0.98) !important;
          }

          .mobile-menu-button.danger {
            border-color: #dc2626 !important;
            color: #dc2626 !important;
          }

          .mobile-menu-button.danger:active {
            background: #dc2626 !important;
            color: #fff !important;
          }

          .dice-result-overlay {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: #fff !important;
            color: #000 !important;
            font-size: 80px !important;
            font-weight: bold !important;
            width: 140px !important;
            height: 140px !important;
            border-radius: 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 200 !important;
            animation: diceAppear 0.2s ease !important;
            border: 3px solid #000 !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
          }

          @keyframes diceAppear {
            0% {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 0;
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          .victory-message-banner {
            position: absolute !important;
            right: 15px !important;
            top: 50% !important;
            transform: translateY(-50%) rotate(90deg) !important;
            transform-origin: center !important;
            background: rgba(255, 255, 255, 0.95) !important;
            color: #000 !important;
            padding: 10px 20px !important;
            font-size: 11px !important;
            font-weight: normal !important;
            text-transform: lowercase !important;
            border-radius: 8px !important;
            z-index: 150 !important;
            animation: bannerSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            border: 2px solid #000 !important;
            white-space: nowrap !important;
            line-height: 1.4 !important;
            text-align: center !important;
            backdrop-filter: blur(10px) !important;
          }

          @keyframes bannerSlideIn {
            0% {
              transform: translateY(-50%) rotate(90deg) translateY(-20px);
              opacity: 0;
            }
            100% {
              transform: translateY(-50%) rotate(90deg) translateY(0);
              opacity: 1;
            }
          }
        }
      `}</style>
      
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

        {/* Tab Navigation - Only visible on mobile */}
        <div className="tab-navigation" style={{
            border: '1px solid #000',
            marginBottom: '10px',
            background: '#fff'
          }}>
            <button
              onClick={() => setActiveTab('life')}
              style={{
                flex: 1,
                padding: '15px',
                border: 'none',
                borderRight: '1px solid #000',
                background: activeTab === 'life' ? '#000' : '#fff',
                color: activeTab === 'life' ? '#fff' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeTab === 'life' ? 'bold' : 'normal',
                fontFamily: 'inherit',
                textTransform: 'lowercase',
                transition: 'all 0.2s ease'
              }}
            >
              life counter
            </button>
            <button
              onClick={() => setActiveTab('victory')}
              style={{
                flex: 1,
                padding: '15px',
                border: 'none',
                background: activeTab === 'victory' ? '#000' : '#fff',
                color: activeTab === 'victory' ? '#fff' : '#666',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeTab === 'victory' ? 'bold' : 'normal',
                fontFamily: 'inherit',
                textTransform: 'lowercase',
                transition: 'all 0.2s ease'
              }}
            >
              victory counter
            </button>
          </div>

          {/* Desktop Layout - Both sections side by side */}
          <div className="desktop-layout">
            {/* Life Counter Section - Mobile Optimized */}
            <div className={`life-counter-section ${activeTab === 'life' ? 'active' : ''}`}>
              {/* Mobile Full-Screen Vertical Split Layout */}
              <div className="mobile-life-container" style={{
                border: '1px solid #000',
                padding: '20px 15px',
                background: '#fff'
              }}>
                {/* Dome (Top - Rotated 180°) */}
                <div className="mobile-player-section mobile-player-top">
                  <div className="mobile-player-name">dome</div>
                  <div className="mobile-life-display">{domeLife}</div>
                  <div className="mobile-button-row">
                    <button
                      onMouseDown={() => handleMouseDown('dome', 'down')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleMouseDown('dome', 'down');
                      }}
                      onTouchEnd={handleMouseUp}
                      className="mobile-life-button"
                    >
                      -
                    </button>
                    <button
                      onMouseDown={() => handleMouseDown('dome', 'up')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleMouseDown('dome', 'up');
                      }}
                      onTouchEnd={handleMouseUp}
                      className="mobile-life-button"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Center Menu Button */}
                {!showCenterMenu && (
                  <button
                    onClick={() => setShowCenterMenu(true)}
                    className="mobile-center-button"
                  >
                    ···
                  </button>
                )}

                {/* Center Menu */}
                {showCenterMenu && (
                  <div className="mobile-center-menu">
                    <button
                      onClick={() => {
                        setPolLife(20);
                        setDomeLife(20);
                        setShowCenterMenu(false);
                      }}
                      className="mobile-menu-button"
                      style={{ fontSize: '16px' }}
                    >
                      <span style={{ fontSize: '20px' }}>↻</span> reset life
                    </button>
                    <button
                      onClick={() => {
                        throwDice();
                        setShowCenterMenu(false);
                      }}
                      className="mobile-menu-button"
                      style={{ fontSize: '16px' }}
                    >
                      <span style={{ fontSize: '20px' }}>⚅</span> throw d20
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('victory');
                        setShowCenterMenu(false);
                      }}
                      className="mobile-menu-button"
                    >
                      ★ victory counter
                    </button>
                    <button
                      onClick={() => handleConcede('pol')}
                      className="mobile-menu-button danger"
                    >
                      pol concedes
                    </button>
                    <button
                      onClick={() => handleConcede('dome')}
                      className="mobile-menu-button danger"
                    >
                      dome concedes
                    </button>
                    <button
                      onClick={() => setShowCenterMenu(false)}
                      className="mobile-menu-button"
                    >
                      × close
                    </button>
                  </div>
                )}

                {/* Dice Result Overlay */}
                {diceResult && (
                  <div className="dice-result-overlay">
                    {diceResult}
                  </div>
                )}

                {/* Victory Message Banner */}
                {victoryMessage && (
                  <div className="victory-message-banner">
                    {victoryMessage}
                  </div>
                )}

                {/* Pol (Bottom) */}
                <div className="mobile-player-section mobile-player-bottom">
                  <div className="mobile-player-name">pol</div>
                  <div className="mobile-life-display">{polLife}</div>
                  <div className="mobile-button-row">
                    <button
                      onMouseDown={() => handleMouseDown('pol', 'down')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleMouseDown('pol', 'down');
                      }}
                      onTouchEnd={handleMouseUp}
                      className="mobile-life-button"
                    >
                      -
                    </button>
                    <button
                      onMouseDown={() => handleMouseDown('pol', 'up')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handleMouseDown('pol', 'up');
                      }}
                      onTouchEnd={handleMouseUp}
                      className="mobile-life-button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Victory Counter Section */}
            <div className={`victory-counter-section ${activeTab === 'victory' ? 'active' : ''}`} style={{
              border: '1px solid #000',
              padding: '15px',
              background: '#fff'
            }}>
              {/* Series Mode Selector */}
              <div style={{
                border: '1px solid #000',
                padding: '12px 10px',
                marginBottom: '15px',
                background: seriesMode !== 'casual' ? 'rgba(0, 0, 0, 0.05)' : '#fff'
              }}>
                <h3 style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  marginBottom: '8px',
                  textTransform: 'lowercase'
                }}>
                  game mode
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px',
                  marginBottom: seriesMode !== 'casual' ? '10px' : '0'
                }}>
                  <button
                    onClick={() => startSeries('casual')}
                    disabled={seriesMode === 'casual'}
                    style={{
                      padding: '10px 8px',
                      border: seriesMode === 'casual' ? '2px solid #000' : '1px solid #999',
                      background: seriesMode === 'casual' ? '#000' : '#fff',
                      color: seriesMode === 'casual' ? '#fff' : '#666',
                      cursor: seriesMode === 'casual' ? 'default' : 'pointer',
                      fontSize: '11px',
                      fontWeight: seriesMode === 'casual' ? 'bold' : 'normal',
                      fontFamily: 'inherit',
                      textTransform: 'lowercase'
                    }}
                  >
                    casual
                  </button>
                  <button
                    onClick={() => startSeries('bo3')}
                    disabled={seriesMode === 'bo3'}
                    style={{
                      padding: '10px 8px',
                      border: seriesMode === 'bo3' ? '2px solid #000' : '1px solid #999',
                      background: seriesMode === 'bo3' ? '#000' : '#fff',
                      color: seriesMode === 'bo3' ? '#fff' : '#666',
                      cursor: seriesMode === 'bo3' ? 'default' : 'pointer',
                      fontSize: '11px',
                      fontWeight: seriesMode === 'bo3' ? 'bold' : 'normal',
                      fontFamily: 'inherit',
                      textTransform: 'lowercase'
                    }}
                  >
                    best of 3
                  </button>
                  <button
                    onClick={() => startSeries('bo5')}
                    disabled={seriesMode === 'bo5'}
                    style={{
                      padding: '10px 8px',
                      border: seriesMode === 'bo5' ? '2px solid #000' : '1px solid #999',
                      background: seriesMode === 'bo5' ? '#000' : '#fff',
                      color: seriesMode === 'bo5' ? '#fff' : '#666',
                      cursor: seriesMode === 'bo5' ? 'default' : 'pointer',
                      fontSize: '11px',
                      fontWeight: seriesMode === 'bo5' ? 'bold' : 'normal',
                      fontFamily: 'inherit',
                      textTransform: 'lowercase'
                    }}
                  >
                    best of 5
                  </button>
                </div>
                {seriesMode !== 'casual' && (
                  <div style={{
                    padding: '10px',
                    background: '#fff',
                    border: '1px solid #000',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '11px', marginBottom: '5px', color: '#666' }}>
                      current series: {seriesMode === 'bo3' ? 'best of 3' : 'best of 5'}
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: 'normal' }}>
                      pol {currentSeriesScore.pol} - {currentSeriesScore.dome} dome
                    </p>
                  </div>
                )}
              </div>

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
                    border: '2px solid #000',
                    padding: '15px 10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                >
                  <h2 style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '8px', textTransform: 'lowercase' }}>pol</h2>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '5px 0' }}>
                    {polTotal}
                  </div>
                  <p style={{ fontSize: '11px', color: '#666', marginBottom: '6px', textTransform: 'lowercase' }}>total games</p>
                  {(polBo3 > 0 || domeBo3 > 0 || polBo5 > 0 || domeBo5 > 0) && (
                    <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.4' }}>
                      {(polBo3 > 0 || domeBo3 > 0) && <div>bo3: {polBo3}</div>}
                      {(polBo5 > 0 || domeBo5 > 0) && <div>bo5: {polBo5}</div>}
                    </div>
                  )}
                </div>
                <div
                  onClick={() => recordVictory('Dome')}
                  style={{
                    border: '2px solid #000',
                    padding: '15px 10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#fff'
                  }}
                >
                  <h2 style={{ fontSize: '12px', fontWeight: 'normal', marginBottom: '8px', textTransform: 'lowercase' }}>dome</h2>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '5px 0' }}>
                    {domeTotal}
                  </div>
                  <p style={{ fontSize: '11px', color: '#666', marginBottom: '6px', textTransform: 'lowercase' }}>total games</p>
                  {(polBo3 > 0 || domeBo3 > 0 || polBo5 > 0 || domeBo5 > 0) && (
                    <div style={{ fontSize: '10px', color: '#999', lineHeight: '1.4' }}>
                      {(polBo3 > 0 || domeBo3 > 0) && <div>bo3: {domeBo3}</div>}
                      {(polBo5 > 0 || domeBo5 > 0) && <div>bo5: {domeBo5}</div>}
                    </div>
                  )}
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
                marginBottom: '15px',
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
                  >
                    clear all data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default MTG;
