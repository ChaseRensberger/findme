import { Circle } from "../types";
import { GameState } from "../types";

async function fetchCurrentCircle(): Promise<Circle> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + "/current_circle"
  );
  const circleJson = await response.json();
  const circle: Circle = {
    latitude: Number(circleJson.latitude),
    longitude: Number(circleJson.longitude),
    meters: circleJson.meters,
    zoom: circleJson.zoom,
  };
  return circle;
}

async function fetchGameState(): Promise<GameState> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL +
      "/game_state" +
      "?id=" +
      import.meta.env.VITE_GAME_ID
  );
  const gameState = await response.json();
  return gameState as GameState;
}

async function sendPlayerLocation(latitude: number, longitude: number) {
  const latitudeString = latitude.toString();
  const longitudeString = longitude.toString();
  await fetch(import.meta.env.VITE_SERVER_URL + "/player_location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude: latitudeString,
      longitude: longitudeString,
    }),
  });
}

export { fetchCurrentCircle, fetchGameState, sendPlayerLocation };
