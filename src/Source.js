import React from "react";
import "./styles.css";
function openTab() {
  window.open("https://github.com/TheLordSaurabh/tic-tac-toe-game");
}
export default function Source() {
  openTab();
  window.location.href = "/";
  return null;
}
