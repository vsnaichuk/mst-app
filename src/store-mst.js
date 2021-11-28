import { types } from "mobx-state-tree";

const ROSTER_URL =
  "https://raw.githubusercontent.com/alexnoob/BasketBall-GM-Rosters/master/2020-21.NBA.Roster.json";

const fetchRosters = async () => {
  const response = await fetch(ROSTER_URL);
  return response.json();
};

export const PlayerModel = types
  .model("PlayerModel", {
    name: types.optional(types.string, "NO NAME"),
    imgURL: types.optional(types.string, "")
  })
  .actions((player) => ({
    setName(newName) {
      player.name = newName;
    }
  }));

export const PlayerStore = types
  .model("PlayerStore", {
    players: types.array(PlayerModel)
  })
  .actions((store) => ({
    setPlayers(newPlayers) {
      store.players = newPlayers;
    },
    async fetchPlayers() {
      const data = await fetchRosters();
      const newPlayers = data.players.map((p) => ({
        name: p.name,
        imgURL: p.imgURL
      }));
      store.setPlayers(newPlayers);
    }
  }));

let _playerStore;
export const usePlayers = () => {
  if (!_playerStore) {
    _playerStore = PlayerStore.create({
      players: []
    });
  }

  return _playerStore;
};
