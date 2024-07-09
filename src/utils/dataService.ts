import { Circle } from "../types";

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

export { fetchCurrentCircle };
