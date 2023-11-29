'use strict';

const os = require('os');
const pkg = require('../../package.json');

async function versionConsole(args) {
    const { versions, platform } = process;
    // console.log(process);
    // let keys = Object.keys(versions);
    let keys = ["node", "v8",];

    if (this.version) {
        console.log('bilidl:', this.version);
    }

    console.log('bilidl:', pkg.version);

    let osInfo = '';
    if (platform === 'darwin') osInfo = await spawn('sw_vers', '-productVersion');
    else if (platform === 'linux') {
        const v = await spawn('cat', '/etc/os-release');
        const distro = (v || '').match(/NAME="(.+)"/);
        const versionInfo = (v || '').match(/VERSION="(.+)"/) || ['', ''];
        const versionStr = versionInfo !== null ? versionInfo[1] : '';
        osInfo = `${distro[1]} ${versionStr}`.trim() || '';
    }

    osInfo = `${os.platform()} ${os.release()} ${osInfo}`;
    // console.log('os:', osInfo);

    for (let i = 0, len = keys.length; i < len; i++) {
        if (!keys[i]) continue
        const key = keys[i];
        console.log('%s: %s', key, versions[key]);
    }

    await Promise.resolve();
}

module.exports = versionConsole;
