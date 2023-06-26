import {debug, setFailed} from '@actions/core';
import {create as createGlob} from '@actions/glob';

const getApps = async (): Promise<string[] | null> => {
  try {
    let apps: string[] = [];

    const globber = await createGlob('./apps/**');
    apps = await globber.glob();
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
