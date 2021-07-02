import "./css/styles.css";
import $ from "jquery";
import { delayBetweenCommands, commands } from "./js/config";
import { executeCommand, newLine } from "./js/terminal";

$(document).ready(async function () {
  const linesEl = document.getElementById("lines");
  newLine(linesEl);

  for (const command of commands) {
    await executeCommand(linesEl, command);
    await new Promise((res) => res()).delay(delayBetweenCommands);
  }
});
