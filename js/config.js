import { fetchTextFile } from "./utils";

export const terminalCursorChar = "_";
export const terminalCursorSpeed = 600; // ms
export const charTypeSpeed = 50; // ms
export const delayBetweenCommands = 1500; // ms
export const primaryPromptStr = "[visitor@gustavclausen.com ~]$";
export const commands = [
  {
    command: "aws s3 sync s3://gustavclausen.com .",
    output: {
      delay: 50, // ms
      fun: async () => await fetchTextFile("/files/s3-sync-output.txt"),
    },
  },
  {
    command: "clear",
    output: {
      delay: 500, // ms
      fun: null,
    },
    clear: true,
  },
  {
    command: 'echo "👋" && cat welcome-message.txt',
    output: {
      delay: 200, // ms
      fun: async () => `👋
      
      ${await fetchTextFile("/files/welcome-message.txt")}
      `,
    },
  },
  {
    command: "cat portfolio.txt",
    output: {
      delay: 200, // ms
      fun: async () => await fetchTextFile("/files/portfolio.txt"),
    },
  },
  {
    command: "cat contact-info.txt",
    output: {
      delay: 200, // ms
      fun: async () => await fetchTextFile("/files/contact-info.txt"),
    },
  },
];
