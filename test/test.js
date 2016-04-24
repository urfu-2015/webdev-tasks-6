
describe ('test click', function () {
    this.timeout(120000);
    it ('should show the first card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(1)');
    });
    it ('should show the second card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(2)');
    });
    it ('should show the third card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(3)');
    });
    it ('should show the fourth card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(4)');
    });
    it ('should show the fifth card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(5)');
    });
    it ('should show the sixth card on click', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(6)');
    });
    it ('should show a message of victory if all pairs have been found', function () {
        browser.url('/');
        browser.click('main section:nth-child(1) label:nth-child(1)');
        browser.click('main section.heart label:nth-child(5)');
        browser.click('main section:nth-child(1) label:nth-child(2)');
        browser.click('main section.club label:nth-child(4)');
        browser.click('main section:nth-child(1) label:nth-child(3)');
        browser.click('main section.diamond label:nth-child(6)');
    });
    it ('should close the shown card if wrong pair has been selected', function () {
        var cardPairs = [5, 4, 6];
        for (var i = 1; i < 7; i++) {
            browser.url('/');
            for (var j = 1; j < 7; j++) {
                if (i === j || j === cardPairs[i - 1] || i === cardPairs[j - 1]) {
                    continue;
                }
                browser.click('main section:nth-child(1) label:nth-child(' + i + ')');
                browser.click('main section:nth-child(' + (i + 1) + ') label:nth-child(' + j + ')');
            }
        }
    });
});
