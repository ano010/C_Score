import React from "react";
import ReactDOM from "react-dom";
import deviceService from "./deviceService";

async function getGenres() {
  const res = await deviceService.getGenres();
  const devices = res.data;
  const device = devices[0].name;

  console.log(devices);
  const device1 = "device1";

  const element = <h1>device: {device}</h1>;
  ReactDOM.render(element, document.getElementById("root"));
}

getGenres();
console.