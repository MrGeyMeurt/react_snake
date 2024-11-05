import uniqid from "uniqid";

export const reversedControls = (e, direction) => {
    switch (e.keyCode) {
        case 90:
        //console.log("going up");
        if(direction.current !== "UP") {
            direction.current = "DOWN";
        }
        //Going up
        break;
        case 83:
        if(direction.current !== "DOWN") {
            direction.current = "UP";
        }
        //Going down
        break;
        case 81:
        if(direction.current !== "LEFT") {
            direction.current = "RIGHT";
        }
        //Going left
        break;
        case 68:
        if(direction.current !== "RIGHT") {
            direction.current = "LEFT";
        }
        //Going right
        break;
        
        case 38:
        if(direction.current !== "UP") {
            direction.current = "DOWN";
        }
        //Going up
        break;
        case 40:
        if(direction.current !== "DOWN") {
            direction.current = "UP";
        }
        //Going down
        break;
        case 37:
        if(direction.current !== "LEFT") {
            direction.current = "RIGHT";
        }
        //Going left
        break;
        case 39:
        if(direction.current !== "RIGHT") {
            direction.current = "LEFT";
        }
        //Going right
        break;
        
        default:
        break;
    }
}

export const defaultControls = (e, direction) => {
    switch (e.keyCode) {
        case 90:
        //console.log("going up");
        if(direction.current !== "DOWN") {
            direction.current = "UP";
        }
        //Going up
        break;
        case 83:
        if(direction.current !== "UP") {
            direction.current = "DOWN";
        }
        //Going down
        break;
        case 81:
        if(direction.current !== "RIGHT") {
            direction.current = "LEFT";
        }
        //Going left
        break;
        case 68:
        if(direction.current !== "LEFT") {
            direction.current = "RIGHT";
        }
        //Going right
        break;
        
        case 38:
        if(direction.current !== "DOWN") {
            direction.current = "UP";
        }
        //Going up
        break;
        case 40:
        if(direction.current !== "UP") {
            direction.current = "DOWN";
        }
        //Going down
        break;
        case 37:
        if(direction.current !== "RIGHT") {
            direction.current = "LEFT";
        }
        //Going left
        break;
        case 39:
        if(direction.current !== "LEFT") {
            direction.current = "RIGHT";
        }
        //Going right
        break;
        
        default:
        break;
    }
}

export const generateRandomCoordinates = (mod) => {
    //console.log("generate random");
    //console.log(mod);
    
    const id = uniqid();
    
    let min = 0
    let max = 49
    
    let x, y;
    
    if (mod.includes('corner')) {
        //logique pour générer les coordonnées du mod
        const side = Math.random();
        if (side <= 0.25) {
            //générer à gauche
            x = min;
            y= Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            y *=10;
        } else if (side > 0.25 && side <= 0.5) {
            //générer à droite
            x = max*10;
            y= Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            y *=10;
        } else if (side > 0.5 && side <= 0.75) {
            //générer en bas
            y = max*10;
            x= Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            x *=10;
        } else if (side > 0.75) {
            //générer en haut
            y = min;
            x= Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
            x *=10;
        }
        
    } else {
        //logique classique
        x= Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        
        x *=10;
        
        y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        
        y *=10;
    }
    
    //console.log(x, y);
    
    return { x, y, id };
}