import {setOutput} from '@actions/core';

import getPrTitle from './getPrTitle';
import getApps from './getApps';
import getPrApps from './getPrApps';

const checkPrTitle = async (): Promise<void> => {
  const title = getPrTitle();
  const apps = await getApps();

  /**
   * If title or apps is null, it means that there was an error.
   */
  if (title === null || apps === null) {
    return;
  }

  const prApps = getPrApps({
    title,
    apps
  });

  /**
   * If prApps is null, it means that there was an error.
   */
  if (prApps === null) {
    return;
  }

  setOutput('apps', prApps);
};

export default checkPrTitle;
