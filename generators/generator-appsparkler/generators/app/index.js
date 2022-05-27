var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    method1() {
        this.fs.write(this.destinationPath('index.js'), 'const foo = 1;');
    }
};