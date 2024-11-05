import uniqid from "uniqid";

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