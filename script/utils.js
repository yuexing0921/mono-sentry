const path = require('path');

exports.resolve = function (p) {
  return path.resolve(__dirname, p);
};

/**
 *  node script/genBuildRelease.js -e test -p project-a
 *  return {e:test, p: project-a}
 * @returns
 */
exports.parseArgs = function () {
  const args = process.argv.splice(2);
  const config = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.padStart('-') && arg.match(/-(\w+)/)) {
      config[arg.match(/-(\w+)/)[1]] = args[i + 1];
      i++;
    }
  }
  return config;
};
