const axios = require("axios");

const API_URL = "https://api4.nozbe.com/v1/";
const API_VERSION = "99";

const instantiateAxios = (additionalHeaders) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      "API-Version": API_VERSION,
      ...additionalHeaders,
    },
  });

exports = module.exports = instantiateAxios;
