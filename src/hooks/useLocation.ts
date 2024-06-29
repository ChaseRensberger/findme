import { useEffect, useState } from "react";
import { Position } from "../types";

export function useLocation() {
  const [location, setLocation] = useState<Position | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // TODO: rewrite to not use .then
  useEffect(() => {
    function getLocation(): Promise<Position> {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude: latitude, longitude: longitude });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    }

    getLocation().then(setLocation).catch(setError);
  }, []);

  return [location, error];
}
