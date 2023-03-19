module.exports = function(config) {
    config.set({
        singleRun: true,
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "int_tests/**/*.spec.ts"
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                module: "commonjs",
                sourceMap: true,
                target: "ES5"
            },
            exclude: ["node_modules"]
        },
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["ChromeHeadless"]
    });
};

