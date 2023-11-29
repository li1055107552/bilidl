const { resolve, join, dirname } = require('path');
const fs = require('fs')

function findPkg(cwd, args = {}) {
    if (args.cwd) {
        cwd = resolve(cwd, args.cwd);
    }

    return checkPkg(cwd);
}

function checkPkg(path) {
    const pkgPath = join(path, 'package.json');

    return fs.existsSync(pkgPath) ? Promise.resolve(path) : Promise.reject()

    // return readFile(pkgPath).then(content => {
    //     const json = JSON.parse(content);
    //     if (typeof json.bilidl === 'object') return path;
    // }).catch(err => {
    //     if (err && err.code === 'ENOENT') {
    //         const parent = dirname(path);

    //         if (parent === path) return;
    //         return checkPkg(parent);
    //     }

    //     throw err;
    // });
}

module.exports = findPkg;