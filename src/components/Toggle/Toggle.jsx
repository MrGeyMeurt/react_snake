import { useEffect, useState } from "react";
import s from "./Toggle.module.scss";
import useStore from "../../utils/store";

const Toggle = ({ mod }) => {
    const { mod: storeMod, addMod, removeMod } = useStore();
    
    //console.log(mod);
    
    const handleClick = () => {
        if (storeMod.includes(mod)) {
            removeMod(mod);
        } else {
            addMod(mod);
        }
    };
    
    useEffect(() => {
        //console.log(storeMod);
    }, [storeMod]);
    
    return (
        <div className={s.wrapper}>
            <div className={`${s.toggle} ${storeMod.includes(mod) ? s.toggle_active : ""}`} onClick={() => handleClick()}>
                <div className={`${s.switch} ${storeMod.includes(mod) ? s.switch_active : ""}`}></div>
            </div>
        <span className={s.mod}>{mod}</span>
        </div>
    );
};

export default Toggle