const { debug, getInput, setOutput, setFailed } = require("@actions/core");
const { create: createGlob } = require("@actions/glob");

async function run() {
  try {
    const app = getInput("app");

    const globber = createGlob(`.github/actions/apps/${app}/action.yml`);

    const files = await globber.glob();

    if (files.length === 0) {
      debug(`No files found for pattern ${app}`);

      setOutput("exists", false);
      return;
    }

    setOutput("exists", true);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed("Error when checking if job for app exists");
    }
  }
}

run();
