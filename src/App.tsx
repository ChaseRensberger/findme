import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

const lat = 38.8898163351636;
const lng = -77.010104237199;
const zoom = 12;

function metersToPixelsAtMaxZoom(meters: number, latitude: number) {
  return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

// function getPointInsideCircle(center: number[], radius: number) {
//   const randomAngle = Math.random() * Math.PI * 2;
//   const randomRadius = Math.random() * radius;

//   return [
//     center[0] + randomRadius * Math.cos(randomAngle),
//     center[1] + randomRadius * Math.sin(randomAngle),
//   ];
// }

function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // const [circleWidth, setCircleWidth] = useState(2000);
  // const [circleCenter, setCircleCenter] = useState([lng, lat]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/chasehudson01/clxy1c84x002z01qo8ff251xj",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("circleCenter", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      });

      map.current.addLayer({
        id: "circleLayer",
        type: "circle",
        source: "circleCenter",
        paint: {
          "circle-radius": {
            stops: [
              [0, 0],
              [20, metersToPixelsAtMaxZoom(500, lat)], // 500 meters radius
            ],
            base: 2,
          },
          "circle-color": "#f2cc50",
          "circle-opacity": 0.3,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const handleClick = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      console.log("Latitude:", e.lngLat.lat);
      console.log("Longitude:", e.lngLat.lng);
    };

    map.current.on("click", handleClick);

    return () => {
      map.current.off("click", handleClick);
    };
  }, []);

  return (
    <main className="w-screen h-screen">
      <div ref={mapContainer} className="w-full h-full mapboxgl-canvas" />
      <button className="p-4 bg-black text-white fixed top-2 left-2 z-20">
        UPDATE CIRCLE
      </button>
    </main>
  );
}

export default App;
