exports.config = {

    user: 'vvladimirova',
    key: '6c624950-580d-4b06-aac2-e4ce20be8b3e',

    specs: [
        'test.js'
    ],

    capabilities: [
        {
            browserName: 'firefox'
        }
    ],

    sync: true,

    logLevel: 'verbose',

    coloredLogs: true,

    screenshotPath: './errorShots/',

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    services: ['sauce'],

    framework: 'mocha',

    reporters: ['dot'],

    mochaOpts: {
        ui: 'bdd'
    }
};