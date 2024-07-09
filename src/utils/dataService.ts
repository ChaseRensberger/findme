import { Circle } from "../types";

async function fetchCurrentCircle(): Promise<Circle> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + "/current_circle"
  );
  const circle = await response.json();
  return circle;
}

export { fetchCurrentCircle };
