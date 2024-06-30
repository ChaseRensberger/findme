import mapboxgl from "mapboxgl";
import { Position } from "../types";

function metersToPixels(meters: number, latitude: number) {
  return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

function drawCircle(map: mapboxgl.Map, center: Position, radius: number) {
  if (map.current.getSource("circleCenter")) {
    map.current.getSource("circleCenter").setData({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    });
    map.current.removeLayer("circleLayer");
  } else {
    console.log("Adding source...");
    map.current.addSource("circleCenter", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [center.longitude, center.latitude],
        },
      },
    });
  }
  console.log("Adding layer...");
  map.current.addLayer({
    id: "circleLayer",
    type: "circle",
    source: "circleCenter",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixels(radius * 2, center.latitude)],
        ],
        base: 2,
      },
      "circle-color": "#f2cc50",
      "circle-opacity": 0.3,
    },
  });
}

function drawPlayer(map: mapboxgl.Map, center: Position, radius: number) {
  if (map.current.getSource("playerCenter")) {
    map.current.getSource("playerCenter").setData({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    });
    map.current.removeLayer("playerLayer");
  } else {
    console.log("Adding source...");
    map.current.addSource("playerCenter", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [center.longitude, center.latitude],
        },
      },
    });
  }
  console.log("Adding layer...");
  map.current.addLayer({
    id: "playerLayer",
    type: "circle",
    source: "playerCenter",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixels(radius * 2, center.latitude)],
        ],
        base: 2,
      },
      "circle-color": "#0303fc",
      "circle-opacity": 1,
    },
  });
}

export { metersToPixels, drawCircle, drawPlayer };
