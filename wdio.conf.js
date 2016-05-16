exports.config = {

    user: process.env.username,
    key: process.env.accessKey,

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