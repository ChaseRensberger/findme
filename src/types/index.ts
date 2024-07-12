interface Position {
  latitude: number;
  longitude: number;
}

interface Circle {
  latitude: number;
  longitude: number;
  meters: number;
  zoom: number;
}

enum GameState {
  WAITING = "WAITING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export { GameState };
export type { Position, Circle };
