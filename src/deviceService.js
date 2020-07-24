import http from "./httpService";

const apiEndpoint = "https://thawing-ridge-96965.herokuapp.com/api/devices";

function getGenres() {
  return http.get(apiEndpoint);
}

export default {
  getGenres
};
