import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";

function App() {
    return (
        <div>
            <Board />
            <div className="toggle-wrapper">
            <Toggle mod={"corner"} />
            </div>
        </div>
    )
}

export default App;