# ZERO DAY — Program Requirements Document

## 1. Project Overview

ZERO DAY is a cybersecurity-themed, web-based 2D platform game. The game follows Byte, a circular digital security agent tasked with stopping a rogue artificial intelligence named NULL from destroying a city's computer network.

The player must navigate three compromised digital environments, avoid hazards, collect data fragments, recover security keys, and reach the final shutdown terminal.

## 2. Project Objectives

- Create an original, playable platform game using Python and web technologies.
- Use Cursor and AI-assisted development to build, test, and improve the game.
- Implement keyboard controls, gravity, jumping, collision detection, and level progression.
- Develop three unique levels with increasing difficulty.
- Make the finished game accessible through GitHub Pages.

## 3. Target Audience

Students, casual gamers, and individuals interested in cybersecurity-themed arcade games.

## 4. Technology Stack

- Python: Game logic, player state, movement, collision detection, and level management.
- HTML: Web page structure.
- CSS: Visual design and neon cybersecurity theme.
- JavaScript: Browser interaction and communication with Python as needed.
- Pyodide: Run Python in the browser.
- Cursor: AI-assisted code development and debugging.
- GitHub Pages: Host the completed web-based game.

## 5. Functional Requirements

### Player Character

The player controls Byte, an original circular arcade-style character with a glowing body and an animated open mouth.

### Controls

- A or Left Arrow: Move left.
- D or Right Arrow: Move right.
- Spacebar: Jump.
- E: Activate security terminals.
- R: Restart the game.

### Level Design

**Level 1 — Firewall Breach**

A green neon security network introducing movement, jumping, basic platforms, and firewall obstacles. The player collects the first security key and reaches the exit portal.

**Level 2 — The Dark Web**

A purple corrupted network featuring gaps, elevated platforms, and moving malware bots. The player recovers the second security key and reaches the next portal.

**Level 3 — The Zero Day**

A red mainframe environment containing security lasers, multiple malware bots, and challenging platform arrangements. The player recovers the final security key and activates the shutdown terminal to defeat NULL.

### Game Mechanics

- Horizontal player movement.
- Gravity, jumping, and landing.
- Platform collision detection.
- Hazards and moving enemies.
- Collectible data fragments.
- Three security keys, one per level.
- Automatic progression between levels.
- System integrity representing player health.
- Restart functionality.

### Scoring and Progress

- Each data fragment increases the player's score by 10 points.
- Each security key increases the score by 100 points.
- The player starts with 100% system integrity.
- Each collision with a hazard or fall into a gap removes 25% system integrity and resets the player to the current level's starting position.
- The dashboard displays the current level, score, collected keys, and remaining integrity.

### Winning and Losing

The player wins by completing all three levels, collecting all three security keys, and activating the final shutdown terminal.

Victory message: "NULL TERMINATED — SYSTEM RESTORED."

The player loses when system integrity reaches zero.

Game-over message: "SYSTEM COMPROMISED — PRESS R TO REBOOT."

## 6. Game State

The program will track:

- Player position and velocity.
- Whether the player is grounded or jumping.
- Current level.
- Score.
- System integrity.
- Collected data fragments and security keys.
- Hazard positions.
- Whether the player has won or lost.

## 7. Visual Design

The game will feature a dark cyberpunk background, neon circuit platforms, glowing characters, and digital glitch effects. Each level will have its own color scheme: green, purple, and red.

All graphics and level layouts will be original or appropriately licensed.

## 8. Non-Functional Requirements

- The game must run in a modern web browser.
- Controls should be responsive and easy to understand.
- The game should run without major errors.
- The code should be organized, readable, and documented.
- Python must play a meaningful role in the game.
- The project must include installation and execution instructions.

## 9. Development Milestones

1. Create the project architecture.
2. Build a basic game screen and player character.
3. Implement movement, jumping, and gravity.
4. Implement platforms and collision detection.
5. Build the three levels.
6. Add hazards, collectibles, security keys, and scoring.
7. Implement system integrity, winning, losing, and restarting.
8. Test and debug the game.
9. Complete documentation and the development journal.
10. Publish the finished game to GitHub Pages.

## 10. Success Criteria

The project is complete when a player can open the game in a browser, control Byte using the keyboard, navigate all three levels, avoid hazards, collect security keys, defeat NULL, and restart the game. The developer must also be able to explain the major components of the Python code and document the AI-assisted development process.
