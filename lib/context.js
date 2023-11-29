
const { EventEmitter } = require('events');
const CLIconsole = require('./extend/console')

class Context extends EventEmitter {
    constructor(base = process.cwd(), args = {}) {
        super()
        this.base_dir = base
        // this.log = log()

        this.extend = {
            console: new CLIconsole()
        }
    }

    init() {
        
    }

    call(name, args, callback) {
        if (!callback && typeof args === 'function') {
            callback = args;
            args = {};
        }

        return new Promise((resolve, reject) => {
            const c = this.extend.console.get(name);

            if (c) {
                c.call(this, args).then(resolve, reject);
            } else {
                reject(new Error(`Console \`${name}\` has not been registered yet!`));
            }
        })

    }

    exit(err) {
        if (err) {
            // log(err);
        }

        return Promise.resolve();
    }

    unwatch() {
        // Do nothing
    }
}

module.exports = Context;