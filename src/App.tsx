import { useState, useEffect, useRef } from "react";
import { drawCircle, drawPlayer } from "./utils/mapLogic";
import { useLocation } from "./hooks/useLocation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

const lat = 38.8898163351636;
const lng = -77.010104237199;
const zoom = 5;

function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [location, error] = useLocation();

  const [circleWidth, setCircleWidth] = useState(1000000);
  const [circleCenter, setCircleCenter] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: lat,
    longitude: lng,
  });
  const listenerExists = useRef(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    console.log("Creating map...");
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chasehudson01/clxy1c84x002z01qo8ff251xj",
      center: [circleCenter.longitude, circleCenter.latitude],
      zoom: zoom,
    });

    // const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    //   console.log("Latitude:", e.lngLat.lat);
    //   console.log("Longitude:", e.lngLat.lng);
    // };

    // map.current.on("click", handleClick);

    // return () => {
    //   map.current.off("click", handleClick);
    //   map.current?.remove();
    // };
  }, [circleCenter]);

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

  return (
    <main className="w-screen h-screen">
      <div ref={mapContainer} className="w-full h-full mapboxgl-canvas" />
      <button
        className="p-4 bg-black text-white fixed top-2 left-2 z-20"
        onClick={() => {
          setCircleWidth(circleWidth * 0.5);
          setCircleCenter({ latitude: lat, longitude: lng });
          console.log(location);
          console.log(error);
        }}
      >
        UPDATE CIRCLE
      </button>
    </main>
  );
}

export default App;
