import { debug, getInput, setFailed } from "@actions/core";

const getPrTitle = (): string | null => {
  try {
    const title = getInput("pr-title");
    debug(`Title: ${title}`);

    if (typeof title !== "string") {
      setFailed("PR title is not a string");
      return null;
    }

    if (title === "") {
      setFailed("PR title is empty");
      return null;
    }

    return title;
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed("Error while reading PR title");
    }

    return null;
  }
};

export default getPrTitle;
