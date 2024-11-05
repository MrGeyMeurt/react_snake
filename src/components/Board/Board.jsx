import { useEffect, useRef, useState } from "react";
import Snake from "../Snake/Snake";
import gsap from "gsap";
import s from "./Board.module.scss";
import Food from "../Food/Food";
import { defaultControls, generateRandomCoordinates, reversedControls } from "../../utils/utils";
import GameOver from "../GameOver/GameOver";
import useStore from "../../utils/store";

const Board = () => {
    const { mod, removeMod } = useStore();
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0],
    ]);
    
    const [foodArray, setFoodArray] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(0.2);
    const [score, setScore] = useState(0);
    
    const timer = useRef(0);
    const foodTimer = useRef(0);
    const direction = useRef('RIGHT');
    const canChangeDirection = useRef(true);
    
    const gameIsOver = () => {
        gsap.ticker.remove(gameLoop);
        
        setGameOver(true);
        
        //console.log("game over") // fin du jeu
    };
    
    const IsOutOfBorder = () => {
        let head = snakeData[snakeData.length - 1];
        //console.log(head);
        
        if (head[0] >= 500 || head[1] >= 500 || head[0] < 0 || head[1] < 0) {
            return true;
        }else{
            return false;
        }
    };
    
    const hasEatenFood = () => {
        //comparer les coordonnée de la  tête du snake avec LES food
        const head = snakeData[snakeData.length - 1];
        
        const food = foodArray.find(_food => _food.x === head[0] &&  _food.y === head[1]);
        
        if (food) {
            //si ya match en renvoie true
            
            //mettre à jour le tableau des food disponible
            const newFoodArray = foodArray.filter(_food => _food !== food);
            
            //console.log(newFoodArray);
            setFoodArray(newFoodArray);
            
            return true
        }else{
            //sinon en renvoir false
            return false
        };
    }
    
    const moveSnake = () => {
        let newSnakeData = [...snakeData];
        let head = newSnakeData[newSnakeData.length - 1];
        //console.log(head); //position de la tete avant changement
        
        switch (direction.current) {
            case 'UP':
            //console.log("UP");
            head = [head[0], head[1] - 10];
            break;
            case 'DOWN':
            //console.log("DOWN");
            head = [head[0], head[1] + 10];
            break;
            case 'LEFT':
            //console.log("LEFT");
            head = [head[0] - 10, head[1]];
            break;
            case 'RIGHT':
            //console.log("RIGHT");
            head = [head[0] + 10, head[1]];
            break;
            
            default:
            break;
        }
        
        newSnakeData.push(head);
        newSnakeData.shift();
        
        const snakeCollapsed = hasCollapsed();
        const outOfBorder = IsOutOfBorder();
        const snakeAteFood = hasEatenFood();
        //console.log(snakeAteFood); // vérif si le head est au mm coordoonée que du food
        
        
        if (outOfBorder || snakeCollapsed) {
            gameIsOver();
        } else {
            if (snakeAteFood === true) {
                //agrandir le snake
                newSnakeData.unshift([]);
                setScore(score + 10);
                if (speed > 0.05) {
                    console.log("speed =", speed);
                    
                    setSpeed(speed - 0.02);
                }   
            }
            setSnakeData(newSnakeData);
        }   
    };
    
    const hasCollapsed = () => {
        let snake = [...snakeData];
        let head = snake[snake.length - 1];
        
        //retire la dernière case du tableau
        snake.pop();
        
        //comparer les coordonnées de la tete avec les autres points du serpent
        for (let i = 0; i < snake.length; i++) {
            
            if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
                //si match renvoie true
                return true
            }
        }
        
        //sinon renvoie false
        return false;
    }
    
    const onKeyDown = (e) => {
        //console.log(e);
        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;
        
        mod.includes("reversed")
        ? reversedControls(e, direction)
        : defaultControls(e, direction);
    };
    
    const addFood = () => {
        //console.log("add food");
        //génération cooredonnées
        const coordinates = generateRandomCoordinates(mod);
        
        //maj du state
        setFoodArray((oldFoodArray) => [...oldFoodArray, coordinates]);
    };
    
    const gameLoop = (time, deltaTime, frame) => {
        //console.log(time, deltaTime, frame);
        timer.current += deltaTime * 0.001;
        foodTimer.current += deltaTime * 0.001;
        //console.log(foodTimer.current); voir le timer de la food
        
        if (foodTimer.current > 3 && foodArray.length < 10 ) {
            foodTimer.current = 0;
            //console.log("pop");
            addFood();
        }
        
        if (timer.current > (mod.includes("impossible") ? 0.02 : speed)) {
            //console.log("move snake");
            timer.current = 0;
            moveSnake();
            canChangeDirection.current = true;
        }
    };
    
    const replay = () => {
        //replay game
        removeMod("corner");
        removeMod("impossible");
        removeMod("reversed");
        
        //reset game
        setGameOver(false);
        //reset snake
        setSnakeData([
            [0, 0], 
            [10, 0],
        ]);
        //reset food
        setFoodArray([]);
        //reset direction
        direction.current = "RIGHT";
        //reset timer
        timer.current = 0;
        //reset food timer
        foodTimer.current = 0;
        setSpeed (0.2);
        setScore(0)
    }
    
    useEffect(() => {
        window.addEventListener("keydown",onKeyDown);
        gsap.ticker.add(gameLoop);
        
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            gsap.ticker.remove(gameLoop);
        };
    }, [snakeData]);
    
    return (
        <div className={s.board}>
        <Snake data={snakeData} />

        <span className={s.score}>Score: {score}</span>
        
        {gameOver && <GameOver replay={replay}/>}
        
        {foodArray.map((coordinates) => (
            <Food key={coordinates.id} coordinates={coordinates}/>
        ))}
        </div>
    );
};

export default Board;