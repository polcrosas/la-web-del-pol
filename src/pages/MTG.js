import React, { useState, useEffect } from 'react';

const MTG = () => {
  const [polTotal, setPolTotal] = useState(0);
  const [domeTotal, setDomeTotal] = useState(0);
  const [todayGames, setTodayGames] = useState([]);

  const STORAGE_KEYS = {
    POL_TOTAL: 'mtg_pol_total',
    DOME_TOTAL: 'mtg_dome_total',
    TODAY_GAMES: 'mtg_today_games',
    LAST_DATE: 'mtg_last_date',
    LAST_GAME: 'mtg_last_game'
  };

  // Check if it's a new day and reset session if needed
  const checkNewDay = () => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);
    
    if (lastDate !== today) {
      localStorage.setItem(STORAGE_KEYS.TODAY_GAMES, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.LAST_DATE, today);
      // Don't clear LAST_GAME - it persists across days
    }
  };

  // Load data from localStorage
  const loadData = () => {
    checkNewDay();
    setPolTotal(parseInt(localStorage.getItem(STORAGE_KEYS.POL_TOTAL) || '0'));
    setDomeTotal(parseInt(localStorage.getItem(STORAGE_KEYS.DOME_TOTAL) || '0'));
    setTodayGames(JSON.parse(localStorage.getItem(STORAGE_KEYS.TODAY_GAMES) || '[]'));
  };

  // Initialize on mount
  useEffect(() => {
    loadData();
  }, []);

  // Record a victory
  const recordVictory = (winner) => {
    // Update total
    if (winner === 'Pol') {
      const newTotal = polTotal + 1;
      setPolTotal(newTotal);
      localStorage.setItem(STORAGE_KEYS.POL_TOTAL, newTotal);
    } else {
      const newTotal = domeTotal + 1;
      setDomeTotal(newTotal);
      localStorage.setItem(STORAGE_KEYS.DOME_TOTAL, newTotal);
    }

    // Add to today's games
    const game = {
      winner: winner,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    const newGames = [...todayGames, game];
    setTodayGames(newGames);
    localStorage.setItem(STORAGE_KEYS.TODAY_GAMES, JSON.stringify(newGames));
    
    // Store last game separately so it persists across days
    localStorage.setItem(STORAGE_KEYS.LAST_GAME, JSON.stringify(game));
  };

  // Reset today's session
  const resetSession = () => {
    if (window.confirm('Reset today\'s session? This will clear today\'s games but keep total victories.')) {
      setTodayGames([]);
      localStorage.setItem(STORAGE_KEYS.TODAY_GAMES, JSON.stringify([]));
      // Don't clear LAST_GAME - it persists
    }
  };

  // Clear all data
  const clearAll = () => {
    if (window.confirm('Clear ALL data? This will reset everything including total victories. This cannot be undone!')) {
      if (window.confirm('Are you absolutely sure? This will delete all victory records permanently.')) {
        setPolTotal(0);
        setDomeTotal(0);
        setTodayGames([]);
        localStorage.removeItem(STORAGE_KEYS.POL_TOTAL);
        localStorage.removeItem(STORAGE_KEYS.DOME_TOTAL);
        localStorage.removeItem(STORAGE_KEYS.TODAY_GAMES);
        localStorage.removeItem(STORAGE_KEYS.LAST_DATE);
        localStorage.removeItem(STORAGE_KEYS.LAST_GAME);
      }
    }
  };

  // Calculate session info
  const getSessionInfo = () => {
    // Check if there's a last game stored (even from previous days)
    const storedLastGame = localStorage.getItem(STORAGE_KEYS.LAST_GAME);
    
    if (todayGames.length === 0) {
      if (storedLastGame) {
        const lastGame = JSON.parse(storedLastGame);
        const nextStarter = lastGame.winner === 'Pol' ? 'dome' : 'pol';
        return {
          lastWinner: `${lastGame.winner.toLowerCase()} won (last session)`,
          nextStarter: nextStarter,
          todayLeader: '',
          specialMessage: `good luck ${nextStarter}! (•̀ᴗ•́)و`
        };
      }
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
          <div style={{
            border: '1px solid #000',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '10px' }}>pol</h2>
            <div style={{ fontSize: '36px', fontWeight: 'normal', margin: '10px 0' }}>
              {polTotal}
            </div>
            <p style={{ fontSize: '14px' }}>total victories</p>
          </div>
          <div style={{
            border: '1px solid #000',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'normal', marginBottom: '10px' }}>dome</h2>
            <div style={{ fontSize: '36px', fontWeight: 'normal', margin: '10px 0' }}>
              {domeTotal}
            </div>
            <p style={{ fontSize: '14px' }}>total victories</p>
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

        {/* Record Victory Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => recordVictory('Pol')}
            style={{
              padding: '15px 20px',
              border: '1px solid #000',
              background: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f0f0f0';
              e.target.style.color = '#000';
            }}
          >
            pol wins
          </button>
          <button
            onClick={() => recordVictory('Dome')}
            style={{
              padding: '15px 20px',
              border: '1px solid #000',
              background: '#f0f0f0',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f0f0f0';
              e.target.style.color = '#000';
            }}
          >
            dome wins
          </button>
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
              onClick={resetSession}
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
              reset today's session
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
