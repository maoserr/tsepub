module.exports = function(config) {
    config.set({
        singleRun: true,
        frameworks: ["mocha", "karma-typescript"],
        files: [
            "int_tests/**/*.spec.ts",
            "src/**/*.ts"
        ],
        karmaTypescriptConfig: {
            compilerOptions: {
                module: "commonjs",
                target: "ES5",
                esModuleInterop: true
            }
        },
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["ChromeHeadless"]
    });
};

