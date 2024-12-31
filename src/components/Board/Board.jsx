import { useEffect, useRef, useState } from "react";
import Snake from "../Snake/Snake";
import gsap from "gsap";
import s from "./Board.module.scss";
import Item from "../Item/Item";
import {
    defaultControls,
    flashUser,
    triggerMode,
    generateRandomCoordinates,
    reversedControls
} from "../../utils/utils";
import GameOver from "../GameOver/GameOver";
import useStore from "../../utils/store";
import Submit from "../Submit/Submit";

const Board = () => {
    const { mod, removeMod } = useStore();
    const [snakeData, setSnakeData] = useState([
        [0, 0],
        [10, 0],
    ]);
    
    const [trapArray, setTrapArray] = useState([]);
    const [foodArray, setFoodArray] = useState([]);
    
    const [hasEnteredResults, setHasEnteredResults] = useState(false);
    
    const [gameOver, setGameOver] = useState(false);
    const [gamePause, setGamePause] = useState(false);
    const [speed, setSpeed] = useState(0.2);
    const [score, setScore] = useState(0);
    const [death, setDeath] = useState(0);
    
    const timer = useRef(0);
    const foodTimer = useRef(0);
    const trapTimer = useRef(0);
    const direction = useRef('RIGHT');
    const canChangeDirection = useRef(true);
    
    const gameIsOver = () => {
        gsap.ticker.remove(gameLoop);
        
        setDeath(death + 1);
        
        setGameOver(true);
        
        //console.log("game over") // fin du jeu
    };
    
    const IsOutOfBorder = (head) => {
        //let head = snakeData[snakeData.length - 1];
        //console.log(head);
        
        if (head[0] >= 500 || head[1] >= 500 || head[0] < 0 || head[1] < 0) {
            return true;
        }else{
            return false;
        }
    };
    
    const hasEatenItem = ({ getter, setter }) => {
        //comparer les coordonnée de la  tête du snake avec LES food
        const head = snakeData[snakeData.length - 1];
        
        const item = getter.find((_item) => _item.x === head[0] &&  _item.y === head[1]);
        
        if (item) {
            //si ya match en renvoie true
            
            //mettre à jour le tableau des food disponible
            const newItemArray = getter.filter((_item) => _item !== item);
            
            //console.log(newFoodArray);
            setter(newItemArray);
            
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
        
        const snakeCollapsed = hasCollapsed(head);
        const outOfBorder = IsOutOfBorder(head);
        const snakeAteFood = hasEatenItem({
            getter: foodArray,
            setter: setFoodArray,
        });
        const snakeAteTrap = hasEatenItem({
            getter: trapArray,
            setter: setTrapArray,
        });
        //console.log(snakeAteFood); // vérif si le head est au mm coordoonée que du food
        
        if (outOfBorder || snakeCollapsed) {
            gameIsOver();
        } else {
            if (snakeAteTrap === true) {
                const effects = [flashUser, triggerMode];
                
                const selectedEffect =
                effects[Math.floor(Math.random() * effects.length)];
                
                selectedEffect();
                
                // console.log(selectedEffect);
                // flashUser();
            }
            if (snakeAteFood === true) {
                //agrandir le snake
                newSnakeData.unshift([]);
                setScore(score + 1);
                if (speed > 0.08) {

                    setSpeed(speed - 0.03);
                    console.log("speed =", speed);
                }
            }
            setSnakeData(newSnakeData);
        }   
    };
    
    const hasCollapsed = (head) => {
        let snake = [...snakeData];
        //let head = snake[snake.length - 1];
        
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

        if (e.code === "KeyP") {
            // console.log("p pressed");
            gameIsPause()
        }

        if (e.code === "KeyR") {
            replay()
        }

        if (canChangeDirection.current === false) return;
        canChangeDirection.current = false;
        
        mod.includes("Reversed")
        ? reversedControls(e, direction)
        : defaultControls(e, direction);
    };
    
    const addItem = ({ getter, setter }) => {
        // génération de coordonnées
        const coordinates = generateRandomCoordinates(mod);
        
        //fusion des deux tableaux
        const array = [...foodArray, ...trapArray];
        
        //test pour savoir si un item est déjà existant à cet endroit
        const itemAlreadyExistsHere = array.some(
            (item) => item.x === coordinates.x && coordinates.y === item.y
        );
        
        // si ça existe déjà, rappeler la fonction
        if (itemAlreadyExistsHere) {
            addItem({ getter, setter });
            return;
        }
        
        setter((oldArray) => [...oldArray, coordinates]);
    };
    
    const gameLoop = (time, deltaTime, frame) => {
        //console.log(time, deltaTime, frame);
        timer.current += deltaTime * 0.001;
        foodTimer.current += deltaTime * 0.001;
        trapTimer.current += deltaTime * 0.001;
        //console.log(foodTimer.current); voir le timer de la food
        
        // gestion de l'apparition de la nourriture
        if (foodTimer.current > 3 && foodArray.length < 10 ) {
            foodTimer.current = 0;
            //console.log("pop");
            addItem({
                getter: foodArray,
                setter: setFoodArray,
            });
        }
        
        // pour les pièges
        if (trapTimer.current > 3 && trapArray.length < 15 ) {
            trapTimer.current = 0;
            //console.log("pop");
            addItem({
                getter: trapArray,
                setter: setTrapArray,
            });
        }
        
        if (timer.current > (mod.includes("Impossible") ? 0.02 : speed)) {
            //console.log("move snake");
            timer.current = 0;
            moveSnake();
            canChangeDirection.current = true;
        }
    };
    
    const replay = () => {
        //replay game
        removeMod("Corner");
        removeMod("Impossible");
        removeMod("Reversed");
        
        //reset game
        setGameOver(false);
        //reset snake
        setSnakeData([
            [0, 0], 
            [10, 0],
        ]);
        //reset food
        setFoodArray([]);
        setTrapArray([]);
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

    const gameIsPause = () => {
        setGamePause((prevPaused) => {
          if (prevPaused) {
            gsap.ticker.add(gameLoop);
          } else {
            gsap.ticker.remove(gameLoop);
            timer.current = 0;
            foodTimer.current = 0;
            trapTimer.current = 0;
          }
          return !prevPaused;
        });
      };
    
    return (
        <>
        {gameOver && !hasEnteredResults && (
            <Submit
            score={score}
            death={death}
            setHasEnteredResults={setHasEnteredResults}
            />
        )}
        
        <div id="board" className={s.board}>
        
        {gameOver && <GameOver replay={replay} />}

        {gamePause && (
            <div className={s.pause}>
            <h1>Pause</h1>
            </div>
        )}
        <Snake data={snakeData} />
        
        <h3 className={s.score}>Score: {score}</h3>
        <h3 className={s.death}>Death: {death}</h3>
        
        {foodArray.map((coordinates) => (
            <Item key={coordinates.id} coordinates={coordinates} type="food"/>
        ))}
        
        {trapArray.map((coordinates) => (
            <Item key={coordinates.id} coordinates={coordinates} type="trap"/>
        ))}
        </div>
        </>
    );
};

export default Board;