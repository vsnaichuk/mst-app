import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { usePlayers } from "./store";

import "./styles.css";

export default observer(function App() {
  const playerStore = usePlayers();

  useEffect(() => {
    playerStore.fetchPlayers();
  }, [playerStore]);

  return (
    <div className="App">
      <h1>NBA Players</h1>
      <ul>
        {playerStore.allStars.map((player) => (
          <Player player={player} />
        ))}
      </ul>
    </div>
  );
});

const Player = observer(({ player }) => {
  return (
    <li key={player.name}>
      <button onClick={() => player.setName("Jamon")}>
        <img src={player.imgURL} width={30} height={30} />
        {player.name}
      </button>
    </li>
  );
});
