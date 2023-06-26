import {debug, setFailed} from '@actions/core';
import {create as createGlob} from '@actions/glob';

const getApps = async (): Promise<string[] | null> => {
  try {
    let apps: string[] = [];

    const globber = await createGlob("./apps/*", {
      implicitDescendants: false,
    });

    const appDirs = await globber.glob();
    apps = appDirs.map((appDir) => appDir.split("/").pop() as string);
    debug(`Apps: ${apps}`);

    return apps;
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed('Error while reading apps directory');
    }

    return null;
  }
};

export default getApps;
