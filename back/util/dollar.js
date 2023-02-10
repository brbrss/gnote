
class Dollar {
    constructor() {
        this.count = 0;
    }
    call() {
        this.count++;
        return '$' + String(this.count);
    }
};

module.exports = Dollar;
