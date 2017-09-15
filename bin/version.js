const i = require('inquirer');
const packageJSON = require('../package.json');
const semver = require('semver');
const { spawnSync } = require('child_process');

console.log(`Current version: ${packageJSON.version}`)

const versionList = [
  semver.inc(packageJSON.version, 'patch'),
  semver.inc(packageJSON.version, 'minor'),
  semver.inc(packageJSON.version, 'major'),
  'Other'
]

i.prompt({ name: 'version', message: 'Choose a version:', type: 'list', choices: versionList }).then(answer => {
  const { version } = answer;
  if (version === 'Other') return getVersionInput();
  writeVersion(version);
});

function getVersionInput() {
  i.prompt([{ name: 'version', message: 'New version:' }]).then(answer => {
    const { version } = answer;
    if (!semver.valid(version)) {
      console.error(`Supplied version "${version}" is not valid semver`);
      return getVersionInput();
    }
    if (!semver.gt(version, packageJSON.version)) {
      console.error(`Version "${version}" must be greater than the current version "${packageJSON.version}"`);
      return getVersionInput();
    }
    writeVersion(version);
  });
}

function writeVersion(version) {
  spawnSync('node_modules/.bin/json', ['-I', '-f', 'package.json', '-e', `this.version="${version}"`]);
  spawnSync('node_modules/.bin/json', ['-I', '-f', 'package-lock.json', '-e', `this.version="${version}"`]);
  spawnSync('node_modules/.bin/json', ['-I', '-f', 'package.dist.json', '-e', `this.version="${version}"`]);
  spawnSync('git', ['add', 'package.json', 'package-lock.json', 'package.dist.json']);
  spawnSync('git', ['commit', '-m', `chore: release v${version}`]);
  spawnSync('git', ['tag', `v${version}`]);
  console.log(`Commited and tagged release v${version}`);
}
