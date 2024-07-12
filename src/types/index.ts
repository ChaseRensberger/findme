interface Position {
  latitude: number;
  longitude: number;
}

interface Circle {
  Latitude: number;
  Longitude: number;
  Meters: number;
  zoom: number;
}

enum GameState {
  WAITING = "WAITING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export { GameState };
export type { Position, Circle };
