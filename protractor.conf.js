const SpecReporter = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    allScriptsTimeout: 21000,
    specs: [
        './e2e/**/*.e2e.ts'
    ],
    baseUrl: 'http://annodanini.it-devgroup.com/',
    multiCapabilities: [{
        'browserName': 'chrome'
    }
    ],
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    beforeLaunch: () => {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    onPrepare: () => {
        browser.manage().window().maximize();
        browser.waitForAngularEnabled(false);
        jasmine.getEnv().addReporter(new SpecReporter());
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({ savePath: 'target/screenshots'}));
    }
};
