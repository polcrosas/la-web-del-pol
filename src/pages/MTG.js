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
  const [activeTab, setActiveTab] = useState('life');
  const [showCenterMenu, setShowCenterMenu] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [victoryMessage, setVictoryMessage] = useState(null);
  const [showStarterIcon, setShowStarterIcon] = useState(true);
  const [showPolLifeLost, setShowPolLifeLost] = useState(false);
  const [showDomeLifeLost, setShowDomeLifeLost] = useState(false);
  const [polLifeChange, setPolLifeChange] = useState(0);
  const [domeLifeChange, setDomeLifeChange] = useState(0);

  const holdIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const showingVictoryDialogRef = useRef(false);
  const previousPolLifeRef = useRef(20);
  const previousDomeLifeRef = useRef(20);
  const hasChangedLifeRef = useRef(false);
  const polLifeLostTimeoutRef = useRef(null);
  const domeLifeLostTimeoutRef = useRef(null);
  const polLifeSnapshotRef = useRef(20);
  const domeLifeSnapshotRef = useRef(20);

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
    // Mark that user has visited MTG page (for home screen preference)
    localStorage.setItem('preferredStartPage', '/mtg');
    
    // Update document title
    document.title = 'MTG Tracker';
    
    // Update manifest for PWA installation
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const originalManifest = manifestLink ? manifestLink.href : null;
    if (manifestLink) {
      manifestLink.href = '/manifest-mtg.json';
    }
    
    // Update apple-mobile-web-app-title for iOS
    let appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    const originalAppleTitle = appleTitleMeta ? appleTitleMeta.content : null;
    if (appleTitleMeta) {
      appleTitleMeta.content = 'MTG Tracker';
    }
    
    const unsubscribe = onValue(mtgRef, (snapshot) => {
      try {
        let data = snapshot.val();
        
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

    return () => {
      unsubscribe();
      document.title = 'pol crosas';
      
      // Restore original manifest
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink && originalManifest) {
        manifestLink.href = originalManifest;
      }
      
      // Restore original apple title
      let appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      if (appleTitleMeta && originalAppleTitle) {
        appleTitleMeta.content = originalAppleTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Hide starter icon when any life changes from initial 20
    if ((polLife !== 20 || domeLife !== 20) && showStarterIcon) {
      setShowStarterIcon(false);
    }

    if (showingVictoryDialogRef.current) {
      return;
    }

    // Show life change indicators when life changes
    if (polLife !== previousPolLifeRef.current) {
      // If indicator is not showing, take a new snapshot
      if (!showPolLifeLost) {
        polLifeSnapshotRef.current = previousPolLifeRef.current;
      }
      
      const change = polLife - polLifeSnapshotRef.current;
      setPolLifeChange(change);
      setShowPolLifeLost(true);
      
      if (polLifeLostTimeoutRef.current) {
        clearTimeout(polLifeLostTimeoutRef.current);
      }
      polLifeLostTimeoutRef.current = setTimeout(() => {
        setShowPolLifeLost(false);
        polLifeSnapshotRef.current = polLife;
      }, 1500);
    }

    if (domeLife !== previousDomeLifeRef.current) {
      // If indicator is not showing, take a new snapshot
      if (!showDomeLifeLost) {
        domeLifeSnapshotRef.current = previousDomeLifeRef.current;
      }
      
      const change = domeLife - domeLifeSnapshotRef.current;
      setDomeLifeChange(change);
      setShowDomeLifeLost(true);
      
      if (domeLifeLostTimeoutRef.current) {
        clearTimeout(domeLifeLostTimeoutRef.current);
      }
      domeLifeLostTimeoutRef.current = setTimeout(() => {
        setShowDomeLifeLost(false);
        domeLifeSnapshotRef.current = domeLife;
      }, 1500);
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
        if (window.confirm(`${loser.toLowerCase()} reached 0 life. record victory for ${winner.toLowerCase()}?`)) {
          recordVictory(winner);
        } else {
          setPolLife(20);
          setDomeLife(20);
          setShowStarterIcon(true); // Reset starter icon when resetting life
        }
        showingVictoryDialogRef.current = false;
      }, 200);
    }

    previousPolLifeRef.current = polLife;
    previousDomeLifeRef.current = domeLife;
  }, [polLife, domeLife]);

  const recordVictory = async (winner) => {
    try {
      setPolLife(20);
      setDomeLife(20);
      setShowStarterIcon(true); // Reset starter icon when recording victory
      
      const snapshot = await get(mtgRef);
      let data = snapshot.val() || {
        polTotal: 0,
        domeTotal: 0,
        lastGame: null,
        todayGames: [],
        lastDate: new Date().toDateString()
      };

      if (winner === 'Pol') {
        data.polTotal = (data.polTotal || 0) + 1;
      } else {
        data.domeTotal = (data.domeTotal || 0) + 1;
      }

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
    // Prevent duplicate triggers
    if (hasChangedLifeRef.current) {
      return;
    }
    
    hasChangedLifeRef.current = true;
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
    }, 500);
    
    holdTimeoutRef.current = timeout;
  };
  
  const handleMouseUp = () => {
    // Reset the flag when releasing
    hasChangedLifeRef.current = false;
    
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
    if (window.confirm(`${player} concedes. record victory for ${winner.toLowerCase()}?`)) {
      recordVictory(winner);
      setShowCenterMenu(false);
    }
  };

  const clearAll = async () => {
    if (window.confirm('clear all data? this will reset everything including total victories. this cannot be undone!')) {
      if (window.confirm('are you absolutely sure? this will delete all victory records permanently.')) {
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

  const sessionInfo = useMemo(() => {
    if (todayGames.length === 0) {
      const firstGameMessages = [
        'time to shuffle up! (•̀ᴗ•́)و',
        'first game of the day! ᕙ(⇀‸↼‶)ᕗ',
        'let the games begin! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
        'ready to battle? ᕦ(ò_óˇ)ᕤ',
        'may the best mage win! (@_@)',
        'draw your opening hand! (•̀ᴗ•́)و',
        'time to tap some lands! ᕙ(⇀‸↼‶)ᕗ'
      ];
      return {
        lastWinner: 'no games played yet today',
        nextStarter: '',
        todayLeader: '',
        specialMessage: firstGameMessages[Math.floor(Math.random() * firstGameMessages.length)]
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

    // Check if a streak was just broken
    let brokenStreak = 0;
    let brokenStreakPlayer = null;
    if (todayGames.length >= 2) {
      const previousWinner = todayGames[todayGames.length - 2].winner;
      if (previousWinner !== lastGame.winner) {
        let streakCount = 1;
        for (let i = todayGames.length - 3; i >= 0; i--) {
          if (todayGames[i].winner === previousWinner) {
            streakCount++;
          } else {
            break;
          }
        }
        if (streakCount >= 2) {
          brokenStreak = streakCount;
          brokenStreakPlayer = previousWinner;
        }
      }
    }

    // Generate context-aware messages with MORE variety and ASCII emojis!
    let specialMessage = null;
    
    // Streak break messages (highest priority)
    if (brokenStreak >= 5) {
      const messages = [
        `WOAH! ${lastGame.winner.toLowerCase()} breaks ${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} game streak! \\(o_o)/`,
        `STREAK BREAKER! ${lastGame.winner.toLowerCase()} ends ${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} win domination! (x_x)`,
        `${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} game streak is OVER! comeback time! ᕙ(⇀‸↼‶)ᕗ`,
        `${lastGame.winner.toLowerCase()} finally breaks through after ${brokenStreak} losses! ᕦ(ò_óˇ)ᕤ`,
        `THE STREAK IS BROKEN! ${lastGame.winner.toLowerCase()} ends ${brokenStreak} straight losses! (@_@)`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    } else if (brokenStreak >= 3) {
      const messages = [
        `${lastGame.winner.toLowerCase()} breaks ${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} game streak! \\(o_o)/`,
        `streak breaker! ${lastGame.winner.toLowerCase()} ends the ${brokenStreak} win run! (•̀ᴗ•́)و`,
        `${brokenStreakPlayer.toLowerCase()}'s ${brokenStreak} streak is over! ${lastGame.winner.toLowerCase()} strikes back! ᕙ(⇀‸↼‶)ᕗ`,
        `${lastGame.winner.toLowerCase()} stops the bleeding! ${brokenStreak} game streak ended! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    } else if (brokenStreak === 2) {
      const messages = [
        `${lastGame.winner.toLowerCase()} stops the streak! back and forth! (•̀ᴗ•́)و`,
        `no easy wins here! ${lastGame.winner.toLowerCase()} fights back! ᕙ(⇀‸↼‶)ᕗ`,
        `${lastGame.winner.toLowerCase()} evens things up! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${lastGame.winner.toLowerCase()} bounces back! ᕦ(ò_óˇ)ᕤ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Active long streak messages
    else if (currentStreak >= 7) {
      const messages = [
        `${streakPlayer.toLowerCase()} is UNSTOPPABLE! ${currentStreak} wins in a row! ᕙ(⇀‸↼‶)ᕗ`,
        `${currentStreak} STRAIGHT WINS for ${streakPlayer.toLowerCase()}! absolute domination! ᕦ(ò_óˇ)ᕤ`,
        `${streakPlayer.toLowerCase()} on a ${currentStreak} game rampage! can anyone stop them?! (@_@)`,
        `${currentStreak} in a row! ${streakPlayer.toLowerCase()} is in the ZONE! (•̀ᴗ•́)و`,
        `${streakPlayer.toLowerCase()} with ${currentStreak} straight! legendary run! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    else if (currentStreak >= 4) {
      const messages = [
        `${streakPlayer.toLowerCase()} is on fire! ${currentStreak} wins in a row! ᕙ(⇀‸↼‶)ᕗ`,
        `${currentStreak} game streak for ${streakPlayer.toLowerCase()}! unstoppable! (•̀ᴗ•́)و`,
        `${streakPlayer.toLowerCase()} dominating with ${currentStreak} straight wins! ᕦ(ò_óˇ)ᕤ`,
        `${currentStreak} in a row! ${streakPlayer.toLowerCase()} can't be stopped! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${streakPlayer.toLowerCase()} rolling with ${currentStreak} straight! (@_@)`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    else if (currentStreak === 3) {
      const messages = [
        `${streakPlayer.toLowerCase()} with 3 in a row! hat trick! ᕙ(⇀‸↼‶)ᕗ`,
        `triple win streak for ${streakPlayer.toLowerCase()}! (•̀ᴗ•́)و`,
        `${streakPlayer.toLowerCase()} heating up! 3 straight! ᕦ(ò_óˇ)ᕤ`,
        `3 in a row for ${streakPlayer.toLowerCase()}! on a roll! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    else if (currentStreak === 2) {
      const messages = [
        `${streakPlayer.toLowerCase()} wins again! 2 in a row! (•̀ᴗ•́)و`,
        `back to back for ${streakPlayer.toLowerCase()}! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${streakPlayer.toLowerCase()} building momentum! ᕙ(⇀‸↼‶)ᕗ`,
        `double trouble! ${streakPlayer.toLowerCase()} with 2! ᕦ(ò_óˇ)ᕤ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Perfect tie messages
    else if (polWins === domeWins && todayGames.length >= 4) {
      const messages = [
        `perfectly balanced! ${polWins}-${domeWins} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `dead even at ${polWins}-${domeWins}! who will break the tie? (o_O)`,
        `tied ${polWins}-${domeWins}! the tension is real! (@_@)`,
        `${polWins}-${domeWins}! couldn't be closer! (•̀ᴗ•́)و`,
        `neck and neck at ${polWins}-${domeWins}! ᕙ(⇀‸↼‶)ᕗ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // One-sided matches
    else if (todayGames.length >= 3 && (polWins === 0 || domeWins === 0)) {
      const losingPlayer = polWins > 0 ? 'dome' : 'pol';
      const winningPlayer = polWins > 0 ? 'pol' : 'dome';
      const messages = [
        `${losingPlayer} still looking for their first win today... (╥_╥)`,
        `${winningPlayer} undefeated today! ${losingPlayer} needs a win! (@_@)`,
        `${losingPlayer} winless so far... time for a comeback! (•̀ᴗ•́)و`,
        `${winningPlayer} perfect today! can ${losingPlayer} break through? (o_O)`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Close games (within 1)
    else if (Math.abs(polWins - domeWins) === 1 && todayGames.length >= 3) {
      const leader = polWins > domeWins ? 'pol' : 'dome';
      const messages = [
        `${leader} up by one! super close! (•̀ᴗ•́)و`,
        `tight match! ${leader} barely ahead! (@_@)`,
        `${leader} leads by a hair! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `anyone's game! ${leader} up by 1! ᕙ(⇀‸↼‶)ᕗ`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    // Default encouraging messages
    else {
      const messages = [
        `good luck ${nextStarter}! (•̀ᴗ•́)و`,
        `your turn ${nextStarter}! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`,
        `${nextStarter} starts! ᕙ(⇀‸↼‶)ᕗ`,
        `let's go ${nextStarter}! ᕦ(ò_óˇ)ᕤ`,
        `${nextStarter}'s game to start! (@_@)`,
        `ready ${nextStarter}? shuffle up! (•̀ᴗ•́)و`,
        `${nextStarter} begins! good luck! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`
      ];
      specialMessage = messages[Math.floor(Math.random() * messages.length)];
    }

    return {
      lastWinner: `${lastGame.winner.toLowerCase()} won`,
      nextStarter: nextStarter,
      todayLeader: todayLeader,
      specialMessage: specialMessage
    };
  }, [todayGames]);

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
            position: relative !important;
          }

          .life-lost-indicator {
            position: absolute !important;
            right: -80px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 40px !important;
            color: #999 !important;
            font-weight: bold !important;
            user-select: none !important;
          }

          .mobile-player-name {
            position: absolute !important;
            left: 20px !important;
            top: 20px !important;
            font-size: 16px !important;
            font-weight: bold !important;
            text-transform: lowercase !important;
            color: #000 !important;
            user-select: none !important;
            opacity: 0.4 !important;
            letter-spacing: 2px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
          }

          .starter-icon {
            font-size: 20px !important;
            user-select: none !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 20px !important;
            min-width: 20px !important;
            flex-shrink: 0 !important;
            transition: opacity 0.3s ease !important;
          }

          .starter-icon.visible {
            animation: starterPulse 2s ease-in-out infinite !important;
            opacity: 1 !important;
          }

          .starter-icon.hidden {
            opacity: 0 !important;
            animation: none !important;
          }

          @keyframes starterPulse {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
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
            border-radius: 0 !important;
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
            border-radius: 0 !important;
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
            border-radius: 0 !important;
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
            border-radius: 0 !important;
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
            font-size: 40px !important;
            font-weight: bold !important;
            width: 70px !important;
            height: 70px !important;
            border-radius: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 200 !important;
            animation: diceAppear 0.2s ease !important;
            border: 2px solid #000 !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
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
            border-radius: 0 !important;
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
                  <div className="mobile-player-name">
                    dome
                    <span className={`starter-icon ${showStarterIcon && sessionInfo.nextStarter === 'dome' ? 'visible' : 'hidden'}`}>⚑</span>
                  </div>
                  <div className="mobile-life-display">
                    {domeLife}
                    {showDomeLifeLost && (
                      <span className="life-lost-indicator">
                        {domeLifeChange > 0 ? '+' : ''}{domeLifeChange}
                      </span>
                    )}
                  </div>
                  <div className="mobile-button-row">
                    <button
                      onMouseDown={() => handleMouseDown('dome', 'down')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseDown('dome', 'down');
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
                      onTouchCancel={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
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
                        e.stopPropagation();
                        handleMouseDown('dome', 'up');
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
                      onTouchCancel={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
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
                  <>
                    {/* Backdrop overlay */}
                    <div
                      onClick={() => setShowCenterMenu(false)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                        background: 'transparent'
                      }}
                    />
                    <div className="mobile-center-menu">
                    <button
                      onClick={() => {
                        setPolLife(20);
                        setDomeLife(20);
                        setShowStarterIcon(true); // Reset starter icon when resetting life
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
                  </>
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
                  <div className="mobile-player-name">
                    pol
                    <span className={`starter-icon ${showStarterIcon && sessionInfo.nextStarter === 'pol' ? 'visible' : 'hidden'}`}>⚑</span>
                  </div>
                  <div className="mobile-life-display">
                    {polLife}
                    {showPolLifeLost && (
                      <span className="life-lost-indicator">
                        {polLifeChange > 0 ? '+' : ''}{polLifeChange}
                      </span>
                    )}
                  </div>
                  <div className="mobile-button-row">
                    <button
                      onMouseDown={() => handleMouseDown('pol', 'down')}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseDown('pol', 'down');
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
                      onTouchCancel={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
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
                        e.stopPropagation();
                        handleMouseDown('pol', 'up');
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
                      onTouchCancel={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMouseUp();
                      }}
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
