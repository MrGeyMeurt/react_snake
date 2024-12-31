import useStore from "../../utils/store";
import s from "./Scoreboard.module.scss";

const Scoreboard = () => {
  const { results } = useStore();

  return (
    <div>
      <h2>Leaderboard</h2>
      <div className={s.results}>
        <div className={s.header}>
          <h3>Name</h3>
          <h3>Score</h3>
          <h3>Deaths</h3>
        </div>
        {results.map((result, i) => (
          <div className={s.result} key={result.name + i}>
            <p>{result.name}</p>
            <p>{result.score}</p>
            <p>{result.death}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;