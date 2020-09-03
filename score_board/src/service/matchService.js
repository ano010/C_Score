import http from "./httpService";

const apiEndpoint = "/api/matches";

export function getMatches() {
  return http.get(apiEndpoint);
}

export function getMatch(matchId) {
  return http.get(`${apiEndpoint}/${matchId}`);
}

export function saveMatch(match) {
  const body = { ...match };
  body.name = body.team1 + " vs " + body.team2;
  delete body._id;
  if (match._id && match._id != "new") {
    console.log("put", match._id);

    return http.put(`${apiEndpoint}/${match._id}`, body);
  }
  console.log("post");
  return http.post(apiEndpoint, body);
}

export function deleteMatch(matchId) {
  return http.delete(`${apiEndpoint}/${matchId}`);
}
