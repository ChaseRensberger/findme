import { useEffect, useState } from "react";
import { Position } from "../types";
import { sendPlayerLocation } from "../utils/dataService";

export function useLocation(): Position | null {
  const [location, setLocation] = useState<Position | null>(null);

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

    getLocation()
      .then((location: Position) => {
        console.log("Setting location");
        sendPlayerLocation(location.latitude, location.longitude);
        setLocation(location);
      })
      .catch((error: Error) => {
        console.log(error);
      });

    const intervalId = setInterval(() => {
      getLocation()
        .then((location: Position) => {
          console.log("Setting location");
          sendPlayerLocation(location.latitude, location.longitude);
          setLocation(location);
        })
        .catch((error: Error) => {
          console.log(error);
        });
      // 3 minutes
    }, 1000 * 60 * 3);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return location;
}
