import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { usePlayers } from "./store-mst";

import "./styles.css";

export default observer(function App() {
  const store = usePlayers();

  useEffect(() => {
    store.fetchPlayers();
  }, [store]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        {store.players.map((p) => (
          <Player player={p} />
        ))}
      </ul>
    </div>
  );
});

const Player = observer(({ player }) => {
  const p = player;
  return (
    <li key={p.name}>
      <a href="#" onClick={() => p.setName("Jamon")}>
        <img src={p.imgURL} width={30} height={30} />
        {p.name}
      </a>
    </li>
  );
});
