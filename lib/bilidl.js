const path = require('path')
const minimist = require('minimist');
const Context = require('./context');
// const version = require('./console/version')
const findPkg = require('./find_pkg')
const goodbye = require('./goodbye')

function loadModule(path, args) {
    return Promise.resolve()
}

function watchSignal(bilidl) {
    process.on('SIGINT', () => {
        console.log(goodbye());
        bilidl.unwatch();

        bilidl.exit().then(() => {
            // eslint-disable-next-line no-process-exit
            process.exit();
        });
    });
}

function entry(cwd = process.cwd(), args) {

    console.log('Hello from bilidl!');
    // console.log("cwd: ", cwd); // 执行命令的路径
    // console.log("__dirname:", __dirname); // 文件所在的路径

    args = minimist(process.argv.slice(2), {
        string: ['_'],
        boolean: ["v", "version", "upload"]
    })
    console.log(args);

    // if (args.v || args.version || args["_"].includes("v" || "version")) {
    //   version.call(this, args)
    // }

    let bilidl = new Context(cwd, args)

    // 找包
    findPkg.call(this, cwd, args).then((dirPath) => {
        bilidl.base_dir = dirPath;
        // 加载模块
        return loadModule(dirPath, args).catch(err => {
            // log(err)
        })

    }).then(() => {
        // 加载CLIconsole
        require('./console')(bilidl);

    }).then(() => {
        bilidl.init()
        watchSignal(bilidl);

    }).then(() => {
        let cmd = 'help';
        if (!args.h && !args.help) {
            const c = args._.shift();
            if (c && bilidl.extend.console.get(c))
                cmd = c;
        }
        return cmd

    }).then((cmd) => {
        bilidl.call(cmd, args).then(() => bilidl.exit()).catch(err => bilidl.exit(err).then(() => {
            // `bilidl.exit()` already dumped `err`
            handleError(null);
        }));
    })



    // 创建上下文，得到主体
    // 先找包 findPkg
    // 加载模块 loadModule
    // 导入console模块，并传入主体运行
    // 弹出命令参数，判断是否为help
    // 
    // 开启信号监视（如kill等）
    // 由主体call 这个参数，运行这个参数默认的handle function

}

entry.version = require('../package.json').version;
// entry()
module.exports = entry;