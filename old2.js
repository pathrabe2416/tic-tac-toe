 // Audio Context for retro sound effects
    let audioEnabled = true;
    const soundToggle = document.getElementById('soundToggle');
    
    soundToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      soundToggle.textContent = audioEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF';
      soundToggle.classList.toggle('muted');
      if (audioEnabled) playSound(800, 0.1, 'square');
    });

    // Retro sound generator
    function playSound(frequency, duration, type = 'square') {
      if (!audioEnabled) return;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }

    // Victory fanfare
    function playVictorySound() {
      if (!audioEnabled) return;
      const notes = [523, 659, 784, 1047];
      notes.forEach((note, i) => {
        setTimeout(() => playSound(note, 0.2, 'square'), i * 150);
      });
    }

    // Draw sound
    function playDrawSound() {
      if (!audioEnabled) return;
      playSound(200, 0.3, 'sawtooth');
      setTimeout(() => playSound(180, 0.3, 'sawtooth'), 150);
    }

    // Game variables
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector(".reset");
    let newGameBtn = document.querySelector(".new");
    let modal = document.getElementById('gameModal');
    let modalMessage = document.getElementById('modalMessage');
    let modalBtn = document.getElementById('modalBtn');
    let scoreO = document.getElementById('scoreO');
    let scoreX = document.getElementById('scoreX');
    let pvpBtn = document.getElementById('pvpBtn');
    let pvcBtn = document.getElementById('pvcBtn');
    let player1Label = document.getElementById('player1Label');
    let player2Label = document.getElementById('player2Label');

    let playero = true;
    let gameActive = true;
    let scores = { O: 0, X: 0 };
    let vsComputer = false;
    let computerThinking = false;

    const patterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    // Mode selection
    pvpBtn.addEventListener('click', () => {
      vsComputer = false;
      pvpBtn.classList.add('active');
      pvcBtn.classList.remove('active');
      player1Label.textContent = 'PLAYER O';
      player2Label.textContent = 'PLAYER X';
      playSound(500, 0.1, 'square');
      clearBoard();
      playero = true;
      scores = { O: 0, X: 0 };
      updateScores();
    });

    pvcBtn.addEventListener('click', () => {
      vsComputer = true;
      pvcBtn.classList.add('active');
      pvpBtn.classList.remove('active');
      player1Label.textContent = 'PLAYER O';
      player2Label.textContent = 'COMPUTER';
      playSound(500, 0.1, 'square');
      clearBoard();
      playero = true;
      scores = { O: 0, X: 0 };
      updateScores();
    });

    // AI Logic - Smart computer opponent
    const getComputerMove = () => {
      // Check if computer can win
      for (let pattern of patterns) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        
        if (vals.filter(v => v === 'X').length === 2 && vals.includes('')) {
          return [a, b, c].find(i => boxes[i].innerText === '');
        }
      }

      // Block player from winning
      for (let pattern of patterns) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        
        if (vals.filter(v => v === 'O').length === 2 && vals.includes('')) {
          return [a, b, c].find(i => boxes[i].innerText === '');
        }
      }

      // Take center if available
      if (boxes[4].innerText === '') return 4;

      // Take a corner
      const corners = [0, 2, 6, 8];
      const availableCorners = corners.filter(i => boxes[i].innerText === '');
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }

      // Take any available space
      const available = [...boxes].map((box, i) => box.innerText === '' ? i : null).filter(i => i !== null);
      return available[Math.floor(Math.random() * available.length)];
    };

    const makeComputerMove = () => {
      if (!gameActive || computerThinking) return;
      
      computerThinking = true;
      
      // Add thinking delay for realism
      setTimeout(() => {
        const moveIndex = getComputerMove();
        if (moveIndex !== undefined) {
          const box = boxes[moveIndex];
          box.innerText = 'X';
          box.classList.add("clicked", "player-x");
          playSound(400, 0.1, 'square');
          playero = true;
          computerThinking = false;
          checker();
        }
      }, 500 + Math.random() * 500); // Random delay between 500-1000ms
    };

    // Box click handler
    boxes.forEach((box, index) => {
      box.addEventListener("click", () => {
        if (box.innerText !== "" || !gameActive || computerThinking) return;

        // In computer mode, only allow O (human player)
        if (vsComputer && !playero) return;

        const player = playero ? "O" : "X";
        box.innerText = player;
        box.classList.add("clicked", `player-${player.toLowerCase()}`);
        
        // Play click sound with different pitch for each player
        playSound(playero ? 600 : 400, 0.1, 'square');
        
        playero = !playero;
        checker();

        // Trigger computer move if in computer mode and game still active
        if (vsComputer && !playero && gameActive) {
          makeComputerMove();
        }
      });
    });

    // Check for winner
    const checker = () => {
      for (let pattern of patterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
          gameActive = false;
          
          // Highlight winning boxes
          [a, b, c].forEach(i => {
            boxes[i].style.background = 'linear-gradient(145deg, #ffff00, #ff9900)';
            boxes[i].style.transform = 'scale(1.1)';
          });
          
          playVictorySound();
          scores[val1]++;
          updateScores();
          
          setTimeout(() => {
            modalMessage.textContent = `🏆 PLAYER ${val1} WINS! 🏆`;
            modal.style.display = 'flex';
          }, 1000);
          
          return;
        }
      }

      // Check for draw
      if ([...boxes].every(box => box.innerText !== "")) {
        gameActive = false;
        playDrawSound();
        
        setTimeout(() => {
          modalMessage.textContent = "⚠️ IT'S A DRAW! ⚠️";
          modal.style.display = 'flex';
        }, 500);
      }
    };

    // Update score display
    const updateScores = () => {
      scoreO.textContent = scores.O;
      scoreX.textContent = scores.X;
    };

    // Clear the board
    const clearBoard = () => {
      boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("clicked", "player-o", "player-x");
        box.style.background = 'linear-gradient(145deg, #1a1a2e, #0f0f1e)';
        box.style.transform = 'scale(1)';
      });
      gameActive = true;
      computerThinking = false;
      modal.style.display = 'none';
      playSound(300, 0.1, 'sine');
    };

    // Reset button
    resetBtn.addEventListener("click", () => {
      clearBoard();
    });

    // New Game button
    newGameBtn.addEventListener("click", () => {
      clearBoard();
      playero = true;
      scores = { O: 0, X: 0 };
      updateScores();
    });

    // Modal button
    modalBtn.addEventListener("click", () => {
      clearBoard();
      playero = true;
    });
