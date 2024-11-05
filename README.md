# Snake Game in React

## Description

This is a solo student project to recreate the classic Snake game using React, with styling in Sass. The game allows the player to control a snake, eating the food (red dots) to grow in size. The game ends if the snake collides with the edges of the board. Future updates are planned to introduce different game modes.

## Project Status
- **Current status**: The game is currently under active development.
- **Future Updates**: New modes and enhancements will be added to improve the user experience.

## Features
- **Classic Snake Gameplay**: The snake moves continuously, and the player controls the direction.
- **Food Collection**: The snake grows longer each time it eats food, which appears randomly in the game area.
- **Game Over**: The game ends if the snake hits the border.
- **Responsive Design**: The game interface is styled with Sass for a responsive and clean look.

## Technologies Used
- **Frontend**:
  - React
  - JavaScript
  - Sass
- **Tools**:
  - npm
  - Node.js (for managing dependencies)

## Installation

1. Download or clone the repository.
1. Navigate to the project directory and install dependencies:
```
cd react-snake-game
npm install
```
1. Start the application with:
```
npm start
```

>[!WARNING]
>Make sure that you have [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed to run the game.

## How to Play

- **Control**: Use **arrow** keys or **ZQSD** keys to move the snake.
- **Objective**: Eat the food to grow the snake.
- **Game Over**: Avoid the borders, or the game will end.

## Modding
To activate a game mod, click on the corresponding toggle button:
- **Corner**: Food only appears in the four corners of the game area, adding a strategic element to reach these spots without colliding with the walls or the snake's own body.
- **Impossible**: The snake receives a significant speed boost, making it much harder to control and increasing the challenge.
- **Reversed**: All controls are inverted, requiring quick adaptation to direct the snake correctly.
>[!TIP]
>Multiple mods can be activated at the same time, but all mods are reset when the game is restarted.
