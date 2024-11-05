# Snake Game in React

## Description

A student project to recreate the classic Snake game using React, with styling in Sass. The game allows the player to control a snake, eating the food (red dots) to grow in size. The game ends if the snake collides with the edges of the board or himself. Future updates are planned to introduce different game modes.

## Project Status
- **Current State**: The game is currently under active development.
- **Planned Updates**: New mods and enhancements will be added to improve the user experience.

## Features
- **Classic Snake Gameplay**: The snake moves continuously, and the player controls the direction.
- **Food Collection**: The snake grows longer each time it eats food, which appears randomly in the game area.
- **Game Over**: The game ends if the snake hits the border or himself.
- **Responsive Design**: The game interface is styled with Sass for a responsive and clean look.

## Technologies Used
- **Frontend**: React, JavaScript, Sass
- **Tools**: Node.js, npm

## Installation

1. Download or clone the repository.
2. Navigate to the project directory and install dependencies:
```
cd react-snake-game
npm install
```
3. Start the application with:
```
npm start
```

>[!WARNING]
>Make sure that you have **Node.js** and **npm** installed to run the game.

## How to Play

- **Control**: Use ``arrow keys`` or ``ZQSD`` keys to move the snake.
- **Objective**: Eat the food to grow the snake.
- **Game Over**: Avoid the borders, or the game will end.

## Modding
To activate a game mod, click on the corresponding toggle button:
- **Corner**: Food only appears in the four corners of the game area.
- **Impossible**: The snake receives a significant speed boost.
- **Reversed**: All controls are inverted.
>[!TIP]
>Multiple mods can be activated at the same time, but all mods are reset when the game is restarted.
