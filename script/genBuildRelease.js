const fe = require('fs-extra');
const day = require('dayjs');
const { resolve, parseArgs } = require('./utils');
const configPath = resolve('../node_modules/.cache/.release.json');

// 初始化releaseInfo信息
function initReleaseInfo(projectList) {
  let config = {};
  if (fe.existsSync(configPath)) {
    config = require(configPath);
  }
  const len = projectList.length;

  for (let i = 0; i < len; i++) {
    if (!config[projectList[i]]) {
      config[projectList[i]] = '';
    }
  }
  return config;
}

// node script/genBuildRelease.js -p xxx
async function main() {
  const list = await fe.readdir(resolve('../apps'));

  const { p: project } = parseArgs();
  // check
  if (!project) {
    console.error('Please enter node script/genBuildRelease.js  -p xxx');
    process.exitCode = 1;
    return;
  }
  if (!list.find((k) => k === project)) {
    console.error('No project named ' + project + ' was found');
    process.exitCode = 1;
    return;
  }

  const releaseInfo = initReleaseInfo(list);

  releaseInfo[project] = {
    // 用于生成每次release的版本号
    release: project + ':' + day().format('YYYY-MM-DD HH:mm'),
  };

  const jsonData = `${JSON.stringify(releaseInfo, undefined, 2)}`;
  fe.writeFileSync(configPath, jsonData, { encoding: 'utf8' });

  console.log(
    `${releaseInfo[project].release} write ${configPath} successfully \n`
  );
}

main();
