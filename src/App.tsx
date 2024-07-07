import { useState, useEffect, useRef } from "react";
import { drawCircle, drawPlayer } from "./utils/mapLogic";
import { useLocation } from "./hooks/useLocation";
import { Position } from "./types";
// import Spinner from "./components/spinner";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import circles from "./circles.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

const zoom = circles[0].zoom;

function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [currentCircleIdx, setCurrentCircleIdx] = useState(0);
  const location = useLocation();

  const [circleWidth, setCircleWidth] = useState(
    circles[currentCircleIdx].width
  );
  const [circleCenter, setCircleCenter] = useState<Position>({
    latitude: circles[currentCircleIdx].latitude,
    longitude: circles[currentCircleIdx].longitude,
  });
  const listenerExists = useRef(false);

  // TODO: combine these two useEffects
  useEffect(() => {
    if (!map.current) return;
    setCircleWidth(circles[currentCircleIdx].width);
    setCircleCenter({
      latitude: circles[currentCircleIdx].latitude,
      longitude: circles[currentCircleIdx].longitude,
    });
    map.current.flyTo({
      center: [
        circles[currentCircleIdx].longitude,
        circles[currentCircleIdx].latitude,
      ],
      zoom: circles[currentCircleIdx].zoom,
      essential: true,
    });
  }, [currentCircleIdx]);

  useEffect(() => {
    if (map.current || !mapContainer.current || !location) return;

    console.log("Creating map...");
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chasehudson01/clxy1c84x002z01qo8ff251xj",
      center: [
        circles[currentCircleIdx].longitude,
        circles[currentCircleIdx].latitude,
      ],
      zoom: zoom,
    });
  }, [currentCircleIdx, location]);

  useEffect(() => {
    if (!map.current) return;

    const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      console.log("Latitude:", e.lngLat.lat);
      console.log("Longitude:", e.lngLat.lng);
    };

    map.current.on("click", handleClick);

    return () => {
      if (!map.current) return;
      map.current.off("click", handleClick);
    };
  }, []);

  useEffect(() => {
    console.log("Circle center:", circleCenter, "Circle width:", circleWidth);
    if (!map.current) return;
    console.log("Map exists...");

    if (map.current.getSource("circleCenter")) {
      drawCircle(map, circleCenter, circleWidth / 2);
      if (location) {
        drawPlayer(map, location, 5);
      }
      return;
    }
    if (listenerExists.current) {
      console.log("Load listener exists...");
      console.log("Exiting...");
      return;
    }
    console.log("Adding load listener...");
    listenerExists.current = true;
    map.current.on("load", () => {
      console.log("Load listener activated...");
      drawCircle(map, circleCenter, circleWidth / 2);
      if (location) {
        drawPlayer(map, location, 5);
      }
    });
  }, [circleWidth, circleCenter, listenerExists, location]);

  // TODO: Fix CSS on small screens
  return (
    <main className="h-screen w-screen bg-black">
      {location ? (
        <>
          {" "}
          <div ref={mapContainer} className="w-full h-full mapboxgl-canvas" />
          <div className="fixed top-2 left-2 flex z-20 gap-4 items-center">
            <button
              className="p-4 bg-black text-white"
              onClick={() => {
                setCurrentCircleIdx(currentCircleIdx - 1);
              }}
            >
              PREV CIRCLE
            </button>
            <button
              className="p-4 bg-black text-white"
              onClick={() => {
                setCurrentCircleIdx(currentCircleIdx + 1);
              }}
            >
              NEXT CIRCLE
            </button>

            <p className="font-bold text-white text-3xl">
              Current Circle: {currentCircleIdx + 1}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full h-full text-white gap-4 text-center">
            {" "}
            <div className="flex gap-4 items-center">
              <h1 className="text-3xl md:text-4xl lg:text-6xl">
                Initializing Map
                <span className="animate-dot1">.</span>
                <span className="animate-dot2">.</span>
                <span className="animate-dot3">.</span>
              </h1>
            </div>
            <h2 className="text-md md:text-lg lg:text-xl px-4">
              (If this takes a while, make sure location servies and
              hardware/graphics acceleration are enabled in your browser)
            </h2>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
