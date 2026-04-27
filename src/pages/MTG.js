import React, { useState, useEffect } from 'react';
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
  const [holdInterval, setHoldInterval] = useState(null);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [holdCount, setHoldCount] = useState(0);

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
  }, []);

  // Record a victory
  const recordVictory = async (winner) => {
    try {
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
      setPolLife(prev => direction === 'up' ? prev + 1 : Math.max(0, prev - 1));
    } else {
      setDomeLife(prev => direction === 'up' ? prev + 1 : Math.max(0, prev - 1));
    }
    
    // Start holding after 300ms
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
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
          setPolLife(prev => direction === 'up' ? prev + currentIncrement : Math.max(0, prev - currentIncrement));
        } else {
          setDomeLife(prev => direction === 'up' ? prev + currentIncrement : Math.max(0, prev - currentIncrement));
        }
      }, 100); // Update every 100ms
      
      setHoldInterval(interval);
    }, 300);
    
    setHoldTimeout(timeout);
    setHoldCount(count);
  };
  
  const handleMouseUp = () => {
    if (holdTimeout) clearTimeout(holdTimeout);
    if (holdInterval) clearInterval(holdInterval);
    setHoldTimeout(null);
    setHoldInterval(null);
    setHoldCount(0);
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

  // Calculate session info
  const getSessionInfo = () => {
    // Try to get last game from Firebase data
    const checkLastGame = async () => {
      const snapshot = await get(mtgRef);
      return snapshot.val()?.lastGame;
    };

    if (todayGames.length === 0) {
      // Check if there's a stored last game
      checkLastGame().then(lastGame => {
        if (lastGame) {
          const nextStarter = lastGame.winner === 'Pol' ? 'dome' : 'pol';
          return {
            lastWinner: `${lastGame.winner.toLowerCase()} won (last session)`,
            nextStarter: nextStarter,
            todayLeader: '',
            specialMessage: `good luck ${nextStarter}! (•̀ᴗ•́)و`
          };
        }
      });
      
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

    // Check for win streak (3+ consecutive wins)
    let specialMessage = null;
    let streakCount = 0;
    
    // Count consecutive wins from the end
    for (let i = todayGames.length - 1; i >= 0; i--) {
      if (todayGames[i].winner === lastGame.winner) {
        streakCount++;
      } else {
        break;
      }
    }
    
    if (streakCount >= 3) {
      specialMessage = `${lastGame.winner.toLowerCase()} is on fire! ＼(＾O＾)／ ${streakCount} win streak!`;
    }

    // Check for match point in best of 5 (2-2 tied)
    if (polWins === 2 && domeWins === 2) {
      specialMessage = `match point! (╯°□°）╯ 2-2 - winner takes all!`;
    }

    // If no special message, give GL to the loser (who starts next)
    if (!specialMessage && todayGames.length > 0) {
      specialMessage = `good luck ${nextStarter}! (•̀ᴗ•́)و`;
    }

    return {
      lastWinner: `${lastGame.winner.toLowerCase()} won`,
      nextStarter: nextStarter,
      todayLeader: todayLeader,
      specialMessage: specialMessage
    };
  };

  const sessionInfo = getSessionInfo();

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
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
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
        <p style={{ fontSize: '14px', color: '#666' }}>pol vs dome</p>
      </div>

      <div style={{
        border: '1px solid #000',
        borderTop: 'none',
        padding: '30px',
        background: '#fff'
      }}>
        {/* Global Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div
            onClick={() => recordVictory('Pol')}
            style={{
              border: '1px solid #000',
              padding: '20px',
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
            <h2 style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '10px' }}>pol</h2>
            <div style={{ fontSize: '36px', fontWeight: 'normal', margin: '10px 0' }}>
              {polTotal}
            </div>
            <p style={{ fontSize: '14px' }}>total victories</p>
          </div>
          <div
            onClick={() => recordVictory('Dome')}
            style={{
              border: '1px solid #000',
              padding: '20px',
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
            <h2 style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '10px' }}>dome</h2>
            <div style={{ fontSize: '36px', fontWeight: 'normal', margin: '10px 0' }}>
              {domeTotal}
            </div>
            <p style={{ fontSize: '14px' }}>total victories</p>
          </div>
        </div>

        {/* Life Counter */}
        <div style={{
          border: '1px solid #000',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {/* Pol Life */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', marginBottom: '10px', color: '#666' }}>pol</p>
              <div style={{
                fontSize: '48px',
                fontWeight: 'normal',
                marginBottom: '10px'
              }}>
                {polLife}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onMouseDown={() => handleMouseDown('pol', 'down')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('pol', 'down')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
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
                    padding: '10px 20px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Dome Life */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', marginBottom: '10px', color: '#666' }}>dome</p>
              <div style={{
                fontSize: '48px',
                fontWeight: 'normal',
                marginBottom: '10px'
              }}>
                {domeLife}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onMouseDown={() => handleMouseDown('dome', 'down')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={() => handleMouseDown('dome', 'down')}
                  onTouchEnd={handleMouseUp}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
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
                    padding: '10px 20px',
                    border: '1px solid #000',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'normal',
                    fontFamily: 'inherit',
                    minWidth: '50px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* Reset Life Button */}
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
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
          padding: '20px',
          marginBottom: '20px',
          background: 'rgba(0, 0, 0, 0.02)'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'normal',
            marginBottom: '10px'
          }}>
            session status
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>
            last game: {sessionInfo.lastWinner}
          </p>
          {sessionInfo.nextStarter && (
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>
              next starter: {sessionInfo.nextStarter}
            </p>
          )}
          {sessionInfo.todayLeader && (
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>
              today's leader: {sessionInfo.todayLeader}
            </p>
          )}
          {sessionInfo.specialMessage && (
            <p style={{ 
              fontSize: '14px', 
              lineHeight: '1.6', 
              marginTop: '15px',
              padding: '10px',
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
          padding: '20px',
          maxHeight: '400px',
          overflowY: 'auto',
          background: '#fff'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'normal',
            marginBottom: '15px'
          }}>
            today's games
          </h3>
          {todayGames.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#666',
              fontStyle: 'italic',
              padding: '20px'
            }}>
              no games recorded today
            </div>
          ) : (
            <div>
              {[...todayGames].reverse().map((game, index) => (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    borderBottom: index === todayGames.length - 1 ? 'none' : '1px solid #eee',
                    fontSize: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>
                    {game.winner.toLowerCase()} won
                    {index === 0 ? ' (most recent)' : ''}
                  </span>
                  <span style={{ color: '#666', fontSize: '12px' }}>{game.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div style={{
          marginTop: '30px',
          paddingTop: '30px',
          borderTop: '1px solid #000'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'normal',
            marginBottom: '15px',
            color: '#666'
          }}>
            danger zone
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px'
          }}>
            <button
              onClick={undoLastGame}
              style={{
                padding: '15px 20px',
                border: '1px solid #999',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
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
              undo last game
            </button>
            <button
              onClick={clearAll}
              style={{
                padding: '15px 20px',
                border: '1px solid #999',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
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
              clear all data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MTG;
