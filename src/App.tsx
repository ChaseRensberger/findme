import { useState, useEffect, useRef } from "react";
import { drawCircle, drawPlayer } from "./utils/mapService";
import { useLocation } from "./hooks/useLocation";
import { Position } from "./types";
import { job } from "./utils/jobService";
import { useTimer } from "./hooks/useTimer";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { jobEmitter } from "./utils/jobService";
import { fetchCurrentCircle, fetchGameState } from "./utils/dataService";
import { Circle, GameState } from "./types";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const location = useLocation();
  const [minutes, seconds] = useTimer(job);
  const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
  const [circleWidth, setCircleWidth] = useState(0);
  const [circleCenter, setCircleCenter] = useState<Position>({
    latitude: 38.892602493310704,
    longitude: -77.03771563587073,
  });
  const [mapZoom, setMapZoom] = useState(11);
  const listenerExists = useRef(false);

  useEffect(() => {
    job.start();
    fetchGameState().then((gameState: GameState) => {
      setGameState(gameState);
    });
    fetchCurrentCircle().then((circle: Circle) => {
      setCircleWidth(circle.meters);
      setCircleCenter({
        latitude: circle.latitude,
        longitude: circle.longitude,
      });
      setMapZoom(circle.zoom);
    });
    return () => {
      job.stop();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [circleCenter.longitude, circleCenter.latitude],
      zoom: mapZoom,
      essential: true,
    });
  }, [circleCenter, circleWidth, mapZoom]);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current || !location) return;

    console.log("Creating map...");
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chasehudson01/clxy1c84x002z01qo8ff251xj",
      center: [circleCenter.longitude, circleCenter.latitude],
      zoom: mapZoom,
    });
    jobEmitter.on("circleChange", (circle: Circle) => {
      console.log("Circle change detected...");
      setCircleWidth(circle.meters);
      setCircleCenter({
        latitude: circle.latitude,
        longitude: circle.longitude,
      });
      setMapZoom(circle.zoom);
    });
  }, [circleCenter, circleWidth, location, mapZoom]);

  useEffect(() => {
    console.log("Circle center:", circleCenter, "Circle width:", circleWidth);
    if (!mapRef.current) return;
    console.log("Map exists...");

    if (
      location &&
      mapRef.current &&
      mapRef.current.getSource("circleCenter")
    ) {
      drawCircle(mapRef.current, circleCenter, circleWidth / 2);
      drawPlayer(mapRef.current, location, 5);
      return;
    }
    if (listenerExists.current) {
      console.log("Load listener exists...");
      console.log("Exiting...");
      return;
    }
    console.log("Adding load listener...");
    listenerExists.current = true;
    mapRef.current.on("load", () => {
      console.log("Load listener activated...");
      if (mapRef.current && location) {
        drawCircle(mapRef.current, circleCenter, circleWidth / 2);
        drawPlayer(mapRef.current, location, 5);
      }
    });
  }, [circleWidth, circleCenter, listenerExists, location]);

  // TODO: Fix CSS on small screens
  return (
    <main className="h-screen w-screen bg-black">
      {location ? (
        <>
          {gameState === GameState.FINISHED && (
            <>
              <div className="flex flex-col items-center justify-center w-full h-full text-white gap-4 text-center">
                <h1 className="text-5xl">Find Me has ended.</h1>
                <h2 className="text-2xl">Thanks for playing! -LukeJ</h2>
              </div>
            </>
          )}
          {gameState === GameState.WAITING && (
            <>
              <div className="flex flex-col items-center justify-center w-full h-full text-white gap-4 text-center">
                <h1 className="text-5xl">Find Me starts at 12:00 EST</h1>
                <h2 className="text-2xl">
                  Make sure to refresh this page at the start time. Thanks for
                  playing! -LukeJ
                </h2>
              </div>
            </>
          )}
          {gameState === GameState.ACTIVE && (
            <>
              <div
                ref={mapContainer}
                className="w-full h-full mapboxgl-canvas"
              />
              <div className="fixed top-4 left-4 flex z-20 gap-4 items-center text-white text-2xl font-semibold">
                {(minutes > 0 || seconds > 0) && (
                  <span>
                    Time until next circle: {minutes}:
                    {seconds.toString().padStart(2, "0")}
                  </span>
                )}
              </div>
            </>
          )}
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
              (If this takes a while, make sure location services and
              hardware/graphics acceleration are enabled in your browser)
            </h2>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
