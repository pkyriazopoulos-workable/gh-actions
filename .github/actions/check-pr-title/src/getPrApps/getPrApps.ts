import { debug, setFailed } from "@actions/core";

type GetPrAppsArgs = {
  title: string;
  apps: string[];
};

const getPrApps = ({ title, apps }: GetPrAppsArgs): string[] | null => {
  if (title.indexOf(":") === -1) {
    setFailed('PR title does not contain ":"');
    return null;
  }

  let prefixApps: string[] = [];
  try {
    prefixApps = title
      .split(":")[0]
      .split(",")
      .map((app) => app.trim());

    debug(`Prefix apps: ${prefixApps}`);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed("Error while apps from prefix");
    }

    return null;
  }

  if (prefixApps.length === 0) {
    setFailed("PR title does not contain valid apps");
    return null;
  }

  if (prefixApps.includes("shared")) {
    debug(`PR apps: ${apps}`);
    return apps;
  }

  if (prefixApps.includes("misc")) {
    debug(`PR apps: None`);
    return [];
  }

  const prApps = prefixApps.filter((app) => apps.includes(app));

  if (prApps.length === 0) {
    setFailed("PR title does not contain valid apps");
    return null;
  }

  return prApps;
};

export default getPrApps;
