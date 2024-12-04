import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import {useDropzone} from 'react-dropzone';
import useStore from "./utils/store";
import { useState } from "react";
import { useEffect } from "react";

function App() {
    const { skin, setSkin } = useStore();
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/svg": [],
            "image/webp": [],
            "image/gif": [],
        },
        maxFiles: 1,
        noClick: true,
        onDrop: (file) => onDrop(file),
    });
    
    const onDrop = (file) => {
        const src = URL.createObjectURL(file[0]);
        setSkin(src);
    };
    
    const [ isMobile, setIsMobile ] = useState(false);
    
    useEffect(() => {
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 500);
        };
        
        checkMobile();
        window.addEventListener("resize", checkMobile);
        
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    
    if (isMobile) {
        return (
            <div className="mobile">
            <h1>Sorry, this game is not available on mobile</h1>
            </div>
        );
    } else {
        return (
            <div>
            <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {skin && <img src={skin} alt="" />}
            </div>
            
            <div className="flashbang"></div>
            <Board />
            <div className="toggle-wrapper">
            <Toggle mod={"corner"} />
            <Toggle mod={"impossible"} />
            <Toggle mod={"reversed"} />
            </div>
            </div>
        );
    };
}

export default App;