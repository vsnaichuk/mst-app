import { useEffect, useState } from "react";

import "./styles.css";

const ROSTER_URL =
  "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/2020-21.NBA.Roster.json";

const fetchRosters = async () => {
  const response = await fetch(ROSTER_URL);
  return response.json();
};

export default function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchRosters().then((newRosters) => {
      const newPlayers = newRosters.players.map((player) => ({
        name: player.name,
        imgURL: player.imgURL
      }));
      setPlayers(newPlayers);
    });
  }, []);

  const changePlayerName = (clickedPlayer) => {
    setPlayers((existingPlayers) => {
      return existingPlayers.map((p) => {
        if (p.name === clickedPlayer.name) {
          return {
            name: "Jamon Holmgren"
          };
        } else {
          return p;
        }
      });
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        {players.map((p) => (
          <li key={p.name}>
            <a href="#" onClick={() => changePlayerName(p)}>
              <img src={p.imgURL} width={30} height={30} />
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
