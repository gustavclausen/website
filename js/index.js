$(document).ready(async function () {
    const linesEl = document.getElementById("lines");
    newLine(linesEl);

    for (const command of commands) {
        await executeCommand(linesEl, command);
        await new Promise(res => res()).delay(delayBetweenCommands);
    }
});