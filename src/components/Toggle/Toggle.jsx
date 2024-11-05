import { useEffect, useState } from "react";
import s from "./Toggle.module.scss";
import useStore from "../../utils/store";

const Toggle = ({ mod }) => {
    const { mod: storeMod, addMod, removeMod } = useStore();
    const [toggle, setToggle] = useState(false);
    
    //console.log(mod);
    
    useEffect(() => {
        if (toggle) {
            addMod(mod);
        } else {
            removeMod(mod);
        }
    }, [toggle]);
    
    useEffect(() => {
        console.log(storeMod);
    }, [storeMod]);
    
    return (
        <div className={s.wrapper} onClick={() => setToggle(!toggle)}>
        <div className={s.toggle}>
        <div className={`${s.switch} ${toggle ? s.switch_active : ""}`}></div>
        </div>
        <span className={s.mod}>{mod}</span>
        </div>
    );
};

export default Toggle