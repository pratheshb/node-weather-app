const axios = require("axios");

const getWether = (latitude, longtitude, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=2fe65568d09940393af47be2ab8463ed&query=${latitude},${longtitude}&units=m`;

  // request({ url, json: true }, (err, res, body) => {
  //   if (err) {
  //     callBack("Unable to connect", undefined);
  //   } else if (body.error) {
  //     callBack("Unable to forecast weather", undefined);
  //   } else {
  //       const {temperature, feelslike, precip} = body.current
  //       const result = `It is currently ${temperature} degrees C out but feels like ${feelslike} degrees C . There is ${precip}% chance of rain`;
  //     callBack(undefined, result)
  //   }
  // });
  axios
    .get(url)
    .then((res) => {
      const body = res.data;
      if (body.error) {
        callBack("Unable to forecast weather", undefined);
      } else {
        const { temperature, feelslike, precip } = body.current;
        const result = `It is currently ${temperature} degrees C out but feels like ${feelslike} degrees C . There is ${precip}% chance of rain`;
        callBack(undefined, result);
      }
    })
    .catch((error) => {
        callBack("Unable to connect", undefined);
    });
};

module.exports = { getWether };
