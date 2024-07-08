interface Position {
  latitude: number;
  longitude: number;
}

interface Circle {
  latitude: number;
  longitude: number;
  width: number;
  zoom: number;
}

export type { Position, Circle };
