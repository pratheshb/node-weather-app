const request = require("request");

const getGeoCoords = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJhdGhlc2giLCJhIjoiY2s4dmJ1bGNuMGVlbjNncGxvczZzdnZqZSJ9.IA888vSj30QIpjhtSTQ-GQ&limit=1`;
  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callBack("Unable to connect", undefined);
    } else if (!body.features.length) {
      callBack("Unable to find location", undefined);
    } else {
      const { center, place_name: location } = body.features[0];
      const data = {
        latitude: center[1],
        longtitude: center[0],
      };
      callBack(undefined, data);
    }
  });
};

module.exports = { getGeoCoords };
