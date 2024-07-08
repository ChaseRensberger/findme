import { Circle } from "../types";

function fetchCurrentCircle(): Promise<Circle> {
  return fetch("circle")
    .then((response) => response.json())
    .then((data) => data);
}

export { fetchCurrentCircle };
