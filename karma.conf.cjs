module.exports = function(config) {
    config.set({
        singleRun: true,
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "int_tests/**/*.spec.ts"
        ],
        client: {
            mocha: {
                opts: '.mocharc.cjs'
            }
        },
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};

