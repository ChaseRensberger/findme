import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    function getLocation(): Promise<{ lat: number; lon: number }> {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ lat: latitude, lon: longitude });
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
