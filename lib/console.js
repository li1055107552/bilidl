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
        return this.store[this.alias[name]]
    }
}


module.exports = CLIconsole