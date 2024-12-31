import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import { useDropzone } from 'react-dropzone';
import useStore from "./utils/store";
import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard/Scoreboard";

function App() {
    const { skin, setSkin } = useStore();
    const { getRootProps, getInputProps } = useDropzone({
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
                <div className="flashbang"></div>

                <div className="game">
                    <div className="flex flex-container">
                        <h1>Snake game</h1>
                        <div className="flex">
                            <div className="flex flex-container">
                                <div className="flex flex-container">
                                    <h2>Rules</h2>
                                    <p>Eat and grow, you can hover on the controls for help.</p>
                                </div>
                                
                                <div className="flex flex-container">
                                    <h2>Custom skin</h2>
                                    <div className="drag-drop-your-file-wrapper">
                                        <p className="drag-drop-your-file">Drag & drop your file here</p>                                        
                                    </div>
                                    <div className="flex flex-container-preview" style={{ alignItems: "center" }}>
                                    <span className="preview">Preview</span>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        {skin && <img src={skin} alt="skin" />}
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-container">
                                    <h2>Source code</h2>
                                        <div className="flex flex-container" style={{ gap: "10px", flexDirection: "row" }}>
                                            <img src="./media/github.svg" alt="Github logo" height={25}/>
                                            <a href="https://github.com/MrGeyMeurt/react_snake" target="_blank" rel="noreferrer">Github repository</a>
                                        </div>                                
                                </div>
                            </div>

                            <div className="flex flex-container" style={{ alignSelf: "start"}}>
                                <div className="flex flex-container">
                                    <h2>Game modes</h2>
                                        <div className="flex" style={{ flexDirection: "column", gap: "10px" }}>
                                            <Toggle mod={"Corner"} />
                                            <Toggle mod={"Impossible"} />
                                            <Toggle mod={"Reversed"} />
                                        </div>
                                </div>

                                <div className="flex flex-container">
                                    <Scoreboard />
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className="flex" style={{ alignSelf: "unset", alignItems: "center" }}>
                        <Board />
                        <div className="container-controls">
                            <div className="flex" style={{flexDirection: "row", gap: "8px"}}>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>Z</span>
                                    </div>
                                    <span class="tooltiptext">Up</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>Q</span>
                                    </div>
                                    <span class="tooltiptext">Left</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>S</span>
                                    </div>
                                    <span class="tooltiptext">Down</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>D</span>
                                    </div>
                                    <span class="tooltiptext">Right</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>▴</span>
                                    </div>
                                    <span class="tooltiptext">Up</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>▾</span>
                                    </div>
                                    <span class="tooltiptext">Down</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>◂</span>
                                    </div>
                                    <span class="tooltiptext">Left</span>
                                </div>
                                <div className="tooltip">
                                    <div className="key">
                                        <span>▸</span>
                                    </div>
                                    <span class="tooltiptext">Right</span>
                                </div>

                                <div className="tooltip">
                                    <div className="key">
                                        <span>P</span>
                                    </div>
                                    <span class="tooltiptext">Pause</span>
                                </div>

                                <div className="tooltip">
                                    <div className="key">
                                        <span>R</span>
                                    </div>
                                    <span class="tooltiptext">Restart</span>
                                </div>
                            </div>  
                        </div>
                    </aside>
                </div>
            </div>
        );
    };
}

export default App;