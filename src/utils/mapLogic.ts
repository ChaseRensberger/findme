import mapboxgl from "mapboxgl";

function metersToPixels(meters: number, latitude: number) {
  return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

function addCircle(
  map: mapboxgl.Map,
  center: [lat: number, lng: number],
  radius: number
) {
  console.log("Adding source...");
  map.current.addSource("circleCenter", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [...center].reverse(),
      },
    },
  });
  console.log("Adding layer...");
  map.current.addLayer({
    id: "circleLayer",
    type: "circle",
    source: "circleCenter",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixels(radius * 2, center[0])],
        ],
        base: 2,
      },
      "circle-color": "#f2cc50",
      "circle-opacity": 0.3,
    },
  });
}

function updateCircle(
  map: mapboxgl.Map,
  center: [lat: number, lng: number],
  radius: number
) {
  console.log("Updating source...");
  map.current.getSource("circleCenter").setData({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [...center].reverse(),
    },
  });
  console.log("Updating layer...");
  // May be a better way to do this
  map.current.removeLayer("circleLayer");
  map.current.addLayer({
    id: "circleLayer",
    type: "circle",
    source: "circleCenter",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixels(radius * 2, center[0])],
        ],
        base: 2,
      },
      "circle-color": "#f2cc50",
      "circle-opacity": 0.3,
    },
  });
}

export { metersToPixels, addCircle, updateCircle };
