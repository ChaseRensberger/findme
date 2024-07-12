import { Circle } from "../types";
import { GameState } from "../types";

async function fetchCurrentCircle(): Promise<Circle> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + "/current_circle"
  );
  const circleJson = await response.json();
  const circle: Circle = {
    Latitude: Number(circleJson.latitude),
    Longitude: Number(circleJson.longitude),
    Meters: circleJson.width,
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

export { fetchCurrentCircle, fetchGameState };
