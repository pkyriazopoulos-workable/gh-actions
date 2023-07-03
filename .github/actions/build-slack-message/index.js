const github = require("@actions/github");
const { setOutput, getInput } = require("@actions/core");

function run() {
  const commitMessage = getInput("commit-message");
  const commitUrl = getInput("commit-url");
  const build = `*Build:* https://github.com/placeholder/gh-actions/actions/runs/${github.context.runId}`;
  const author = `*Author:* ${github.context.actor}`;
  const commit = `*Commit:* <${commitUrl}|${commitMessage}>`;

  const description = `${build}\n${author}\n${commit}`;

  const payload = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "@here",
        },
      },
    ],
    attachments: [
      {
        color: "#FF0000",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":exclamation:",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":warning:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: description,
            },
          },
        ],
      },
    ],
  };

  setOutput("payload", payload);
}

run();
