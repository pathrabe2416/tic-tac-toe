# 🎮 TIC×TAC — Retro Cyber Game

A visually immersive retro-styled Tic Tac Toe web application built using pure HTML, CSS, and Vanilla JavaScript.

Designed with a modern dark–neon aesthetic, smooth animations, glow effects, dynamic sound design, and a responsive layout — delivering a polished arcade-style experience directly in the browser.

##🔗 Live Demo
https://pathrabe2416.github.io/tic-tac-toe/

🚀 Overview

TIC×TAC is a two-mode interactive game experience:

👥 Player vs Player (Hotseat)
🤖 Player vs AI (Strategic Computer Opponent)

The application emphasizes:

Clean UI architecture
Dynamic visual feedback
Responsive layout control
Smart AI logic with fallback minimax implementation
Procedurally generated 8-bit style sound effects (Web Audio API)

##🧠 Core Features

🎯 Game Modes

PvP Mode – Two players alternate turns locally
PvC Mode – Player competes against an AI opponent

##🤖 AI Behavior

The AI:

Detects immediate winning moves
Blocks opponent winning paths
Prioritizes center control
Selects corner strategy
Uses Minimax with Alpha-Beta pruning as fallback for optimal decisions

##🎨 UI & Visual System

Neon-glow grid and interactive cells
Dynamic turn indicators
Animated game-over overlay
Win-cell highlighting with pulse animation
Smooth fade and pop-in transitions
Responsive scaling using CSS variables
Glassmorphism + subtle noise texture background
Cursor glow effect (Landing screen)

##🔊 Sound Engine

Built with Web Audio API, no external sound files.

Includes:
Move placement tones (distinct for O and X)
Win chord sequence
Draw tone
Button click feedback

##🔊 Toggle button (real-time audio control)

All sounds are procedurally generated square / sine / sawtooth waveforms.

##📊 Score System

Real-time score tracking:

Player O
Player X / AI
Ties
Persistent during session
Reset Score & New Game controls

##🛠️ Tech Stack

HTML5 – Semantic structure & UI layout
CSS3 – Responsive design, animations, glow effects, visual depth

Vanilla JavaScript –

Game state management
Win detection logic
AI strategy engine (Minimax + heuristics)
Audio generation (Web Audio API)
DOM manipulation
No frameworks. No libraries. Pure front-end execution.


Each mode contains:

Independent UI layer
Game state management
Score tracking
Overlay system
Audio module

##🎮 How to Play

Open the live demo.
Select your mode:
👥 Player vs Player
🤖 Player vs AI
Player O always starts.
Click any empty cell to place your mark.
First to align three marks (horizontal, vertical, or diagonal) wins.
Full board without winner = Draw.

##🎛 Controls

New Game → Resets board only
Reset Score → Clears scores + board
🔊 Toggle Sound → Enable / disable audio
📱 Responsive Design

Fully optimized for:

Desktop
Tablet
Mobile devices
Uses clamp() and scalable CSS variables to maintain proportional board sizing.

##🏆 Highlights

✔ Procedural audio engine
✔ Smart AI with strategy escalation
✔ Clean UX separation between modes
✔ No external dependencies
✔ Production-level UI polish
✔ Scalable CSS variable-based board layout

##⭐ Support

If you appreciate the design or architecture:
⭐ Star the repository
🍴 Fork and experiment
🚀 Improve the AI / UI

Contributions are welcome.
