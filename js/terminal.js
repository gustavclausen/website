import "./utils";
import {
  terminalCursorChar,
  primaryPromptStr,
  charTypeSpeed,
  terminalCursorSpeed,
} from "./config";
import $ from "jquery";

function addCursor(lineEl) {
  const cursorHtml = `<span id="cursor">${terminalCursorChar}</span>`;

  $(lineEl).append(cursorHtml);
  setInterval(() => {
    $("#cursor")
      .animate(
        {
          opacity: 0,
        },
        "fast",
        "swing"
      )
      .animate(
        {
          opacity: 1,
        },
        "fast",
        "swing"
      );
  }, terminalCursorSpeed);
}

function removeCursor() {
  $("#cursor").remove();
}

export function newLine(linesEl) {
  removeCursor();

  const emptyCommandLine = `<p><span>${primaryPromptStr} </span><span class="commandLine"></span></p>`;
  $(linesEl).append(emptyCommandLine);
  const commandLine = $(linesEl).children().last();
  addCursor(commandLine);
}

// Converts text to HTML paragraph which includes adding linebreaks and anchor tags for hyperlinks.
function convertTextToHtmlParagraph(text) {
  const textHtml = text
    // Add anchor-tag for 'http', 'https' and 'mailto' URI schemes
    .replace(
      /\[([^\s]+)\]\(((https|http|mailto):[^\s]+)\)/g,
      "<a href='$2' target='_blank'>$1</a>"
    )
    // Add linebreaks
    .split("\n")
    .join("<br/>");

  return `<p>${textHtml}</p>`;
}

export async function executeCommand(linesEl, commandObj) {
  const emptyCommandLine = $(linesEl).children().last().find(".commandLine");
  const command = commandObj.command;
  const commandOutput = commandObj.output.fun
    ? await commandObj.output.fun()
    : null;
  const clearLines = commandObj.clear;
  const exit = commandObj.exit;

  const typeCommandCharacters = function (chars) {
    return chars.reduce((prom, _, i) => {
      return prom
        .then(() => emptyCommandLine.html(command.substr(0, i + 1)))
        .delay(charTypeSpeed);
    }, Promise.resolve()); // initial
  };
  await typeCommandCharacters(command.split(""));

  if (commandOutput) {
    await new Promise((res) => res())
      .then(() => removeCursor())
      .delay(commandObj.output.delay)
      .then(() => $(linesEl).append(convertTextToHtmlParagraph(commandOutput)));
  }

  if (clearLines) {
    await new Promise((res) => res())
      .delay(commandObj.output.delay)
      .then(() => $(linesEl).empty());
  }

  if (!exit) {
    newLine(linesEl);
  }
}
