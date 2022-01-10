const path = require('path');
const { execSync } = require('child_process');

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

exports.execSync = async function (command) {
  try {
    const spawn = await execSync(command, { stdio: 'inherit' });
    if (spawn && spawn.stderr && spawn.status !== 0) {
      console.log(spawn.stderr);
      process.exitCode = 1;
    }
  } catch (e) {
    console.error(`Error when executing ${command} `);
    console.log(e);
    process.exitCode = 1;
  }
};
