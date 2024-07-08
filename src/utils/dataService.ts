import { Circle } from "../types";

export function fetchCurrentCircle(): Promise<Circle> {
  return fetch("circle")
    .then((response) => response.json())
    .then((data) => data);
}
