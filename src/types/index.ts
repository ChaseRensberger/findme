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

export type { Position, Circle };
