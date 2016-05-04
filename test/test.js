
const assert = require('assert');
var cardSelector = '.card';
const cardPairs = [
    ['#heart', '[for="c-0-0"]', '[for="heart"]'],
    ['#club', '[for="c-0-1"]', '[for="club"]'],
    ['#diamond', '[for="c-0-2"]', '[for="diamond"]']
];

describe ('test click', function () {
    this.timeout(120000);
    beforeEach(function () {
        browser.url('/');
    });
    it ('should show the victory message after all right pairs have been selected', function () {
        assert.equal(browser.getCssProperty('footer a', 'opacity').value, '0', 'Victory message is visible before the victory');
        cardPairs.forEach(function (pair) {
            browser.element(pair[1]).click();
            browser.element(pair[2]).click();
        });
        assert.equal(browser.getCssProperty('footer a', 'opacity').value, '1', 'Victory message has not been shown');
        console.log('OK - should show the victory message after all right pairs have been selected');
    });
    it ('should check if a checkbox has been checked for each right pair', function () {
        cardPairs.forEach(function (pair) {
            assert.equal(browser.element(pair[0]).getAttribute('checked'), null);
            browser.element(pair[1]).click();
            browser.element(pair[2]).click();
            assert.equal(browser.element(pair[0]).getAttribute('checked'), 'true');
        });
        console.log('OK - should check if a checkbox has been checked for each right pair');
    });
});
