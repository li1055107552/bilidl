const util = require('util')

class CLIconsole {
    constructor(){
        this.store = {}
        this.alias = {}
    }

    list(){
        return this.store
    }

    get(name){
        name = name.toLowerCase()
        return this.store[name]
    }

    register(name, desc, options, fn){
        if (!name) throw new TypeError('name is required');

        if (!fn) {
          if (options) {
            if (typeof options === 'function') {
              fn = options;
    
              if (typeof desc === 'object') { // name, options, fn
                options = desc;
                desc = '';
              } else { // name, desc, fn
                options = {};
              }
            } else {
              throw new TypeError('fn must be a function');
            }
          } else {
            // name, fn
            if (typeof desc === 'function') {
              fn = desc;
              options = {};
              desc = '';
            } else {
              throw new TypeError('fn must be a function');
            }
          }
        }
    
        fn = util.promisify(fn);

        // if (fn.length > 1) {
        //   fn = Promise.promisify(fn);
        // } else {
        //   fn = Promise.method(fn);
        // }
    
        this.store[name.toLowerCase()] = fn;
        const c = fn;
        c.options = options;
        c.desc = desc;
    
        this.alias = Object.keys(this.store);
    }
}


module.exports = CLIconsole