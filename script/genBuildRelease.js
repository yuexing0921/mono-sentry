const fe = require('fs-extra');
const day = require('dayjs');
const { resolve, parseArgs } = require('./utils');
const configPath = resolve('../node_modules/.cache/.release.json');

// 初始化releaseInfo信息
function initReleaseInfo(projectList) {
  if (fe.existsSync(configPath)) {
    return require(configPath);
  } else {
    const len = projectList.length;
    const config = {};
    for (let i = 0; i < len; i++) {
      config[projectList[i]] = '';
    }
    return config;
  }
}

// node script/genBuildRelease.js -p xxx
async function main() {
  const list = await fe.readdir(resolve('../apps'));

  const { p: project } = parseArgs();
  // check
  if (!project) {
    console.error('Please enter node script/genBuildRelease.js  -p xxx');
    return process.exit(0);
  }
  if (!list.find((k) => k === project)) {
    console.error('No project named ' + project + ' was found');
    return process.exit(0);
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
