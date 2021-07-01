const terminalCursorChar = "_";
const terminalCursorSpeed = 600; // ms
const charTypeSpeed = 50; // ms
const delayBetweenCommands = 1500; // ms
const primaryPromptStr = "[visitor@gustavclausen.com ~]$";
const commands = [
    {
        command: "aws s3 sync s3://gustavclausen.com .",
        output: {
            delay: 500, // ms
            fun: async () => {
                return await fetchTextFile("/files/s3-sync-output.txt")
            }
        },
        clear: false,
    },
    {
        command: "clear",
        output: {
            delay: 50, // ms
            fun: null,
        },
        clear: true
    },
    {
        command: "echo \"👋\" && cat welcome-message.txt",
        output: {
            delay: 50, // ms
            fun: async () => {
                return `👋
                
                ${await fetchTextFile("/files/welcome-message.txt")}
                `;
            }
        },
        clear: false
    },
    {
        command: "cat contact-info.txt",
        output: {
            delay: 100, // ms
            fun: async () => {
                return await fetchTextFile("/files/contact-info.txt");
            }
        },
        clear: false
    }
]