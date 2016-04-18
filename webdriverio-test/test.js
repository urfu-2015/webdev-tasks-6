it('should search repo', function () {
    console.log(browser);
    browser.url('https://github.com/urfu-2015');

    browser.setValue('input[name="query"]', 'slides');
    browser.waitUntil(function () {
        return browser
            .getUrl()
            .then(function (url) {
                return /query=slides/.test(url);
            });
    });
    var repos = browser.getText('h3.repo-list-name');

    repos.should.deep.equal([
        'webdev-slides',
        'javascript-slides',
        'verstka-slides'
    ]);
});