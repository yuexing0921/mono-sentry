// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

// This plugin is needed until this PR is merged.
// https://github.com/vercel/next.js/pull/23185
const withLess = require('@nrwl/next/plugins/with-less');

const BASE_PATH = '/project-b';

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // Set this to true if you use CSS modules.
  // See: https://github.com/css-modules/css-modules
  cssModules: false,
  assetPrefix: `${BASE_PATH}`,

  webpack5: true,
  webpack: (config) => {
    config.devtool = 'source-map';
    return config;
  },
};

module.exports = withLess(withNx(nextConfig));
