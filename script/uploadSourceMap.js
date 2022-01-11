const SentryCli = require('@sentry/cli');

const { resolve, parseArgs } = require('./utils');
const configPath = resolve('../node_modules/.cache/.release.json');
const buildInfo = require(configPath);

async function main() {
  const { p: project, e: env } = parseArgs();
  const configFile = resolve('./sentry.properties');
  try {
    console.log('Upload source map...');
    const cli = new SentryCli(configFile, { silent: false });

    const release = buildInfo[project][env].release;

    await cli.releases.new(release, { ...cli.releases.options, configFile });

    await cli.releases.uploadSourceMaps(release, {
      configFile,
      release,
      finalize: true,
      rewrite: false,
      ext: ['js', 'map'],
      ignore: ['node_modules'],
      include: [`dist/apps/${project}`],
      urlPrefix: `~${project}/`,
    });

    console.log('Uploaded successfully');
    process.exitCode = 0;
  } catch (e) {
    console.error('Sourcemap upload failed');
    console.log(e);
    process.exitCode = 1;
  }
}

main();
