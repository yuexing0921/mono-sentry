import * as _Sentry from '@sentry/browser';

import { BrowserOptions } from '@sentry/browser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildInfo =
  require('../../../../node_modules/.cache/.release.json') || {};

/**
 * Init sentry
 *
 * @param {object} opts The sentry initialization options
 */
let isLoadSentry = false;
export const Sentry = {
  init: (projectName: string, opts: BrowserOptions = {}) => {
    if (isLoadSentry) {
      return;
    }

    if (!buildInfo[projectName]) {
      console.error(
        `[Sentry] The name of projectName was transmitted incorrectly, and ${projectName} was not found`
      );
    }

    _Sentry.onLoad(() => {
      console.log(`Sentry release`, buildInfo[projectName].release);
      console.log('Sentry load succeeded');
      isLoadSentry = true;
    });
    _Sentry.setTag('project', projectName);
    _Sentry.init({
      beforeSend(event) {
        console.log(event);
        const { exception = {} } = event;
        if (Array.isArray(exception.values) && exception.values[0]) {
          const { value = '' } = exception.values[0];
          if (value.indexOf('NetworkError') > -1) return null;
          if (value.indexOf('Failed to fetch') > -1) return null;
        }
        return event;
      },
      dsn: 'https://1c9f0a8bbd484e44aff738ffe078fb1e@o1101484.ingest.sentry.io/6128707',
      // 如果并发量很大，这个数据可以设置的小一点
      tracesSampleRate: 1.0,
      release: buildInfo[projectName].release,
      ...opts,
    });
  },
};
