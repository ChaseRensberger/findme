import mapboxgl from "mapbox-gl";
import { Position } from "../types";

function metersToPixels(meters: number, latitude: number) {
  return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

function drawCircle(map: mapboxgl.Map, center: Position, radius: number) {
  if (map.getSource("circleCenter")) {
    map.getSource("circleCenter").setData({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    });
    map.removeLayer("circleLayer");
  } else {
    console.log("Adding source...");
    map.addSource("circleCenter", {
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
  map.addLayer({
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
  if (map.getSource("playerCenter")) {
    map.getSource("playerCenter").setData({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [center.longitude, center.latitude],
      },
    });
    map.removeLayer("playerLayer");
  } else {
    console.log("Adding source...");
    map.addSource("playerCenter", {
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
  map.addLayer({
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

function drawAllPlayers(map: mapboxgl.Map, playerLocations: Position[]) {
  if (map.getSource("playerLocations")) {
    map.getSource("playerLocations").setData({
      type: "FeatureCollection",
      features: playerLocations.map(
        (playerLocation: Position, index: number) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [playerLocation.latitude, playerLocation.longitude],
            },
            properties: {
              id: index.toString(),
            },
          };
        }
      ),
    });
  } else {
    map.addSource("playerLocations", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: playerLocations.map(
          (playerLocation: Position, index: number) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [
                  playerLocation.latitude,
                  playerLocation.longitude,
                ],
              },
              properties: {
                id: index.toString(),
              },
            };
          }
        ),
      },
    });
  }
  map.addLayer({
    id: "playerLocationsLayer",
    type: "circle",
    source: "playerLocations",
    paint: {
      "circle-radius": 3,
      "circle-color": "#0303fc",
    },
  });

  // map.addLayer({
  //   id: "playerLayer",
  //   type: "circle",
  //   source: "playerCenter",
  //   paint: {
  //     "circle-radius": {
  //       stops: [
  //         [0, 0],
  //         [20, metersToPixels(radius * 2, center.latitude)],
  //       ],
  //       base: 2,
  //     },
  //     "circle-color": "#0303fc",
  //     "circle-opacity": 1,
  //   },
  // });
}

export { metersToPixels, drawCircle, drawPlayer, drawAllPlayers };
