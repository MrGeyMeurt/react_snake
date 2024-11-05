import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";

function App() {
    return (
        <div>
            <Board />
            <div className="toggle-wrapper">
            <Toggle mod={"corner"} />
            <Toggle mod={"impossible"} />
            <Toggle mod={"reversed"} />
            </div>
        </div>
    )
}

export default App;