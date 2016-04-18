var assert = require('assert');
var webdriverio = require('webdriverio');

describe('Game', function () {
    this.timeout(20000);

    function getBeforeOpacity(selector) {
        return browser.execute(`return getComputedStyle(document.querySelector('${selector}'),
     '::before').getPropertyValue('opacity')`).value;
    }

    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should be visible card', function () {
        browser.click('label[for="c-0-0"]');
        assert.equal(getBeforeOpacity('[for="c-0-0"]'), 1);
    });

    it('should be visible right pair', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');

        assert.equal(getBeforeOpacity('[for="c-0-0"]'), 1);
        assert.equal(getBeforeOpacity('[for="c-0-4"]'), 1);
    });

    it('should be hidden wrong pair', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-1-1"]');

        browser.pause(2000);

        assert.equal(getBeforeOpacity('[for="c-0-0"]'), 0);
        assert.equal(getBeforeOpacity('[for="c-0-1"]'), 0);
    });

    it('should be visible right pair and one card', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');

        assert.equal(getBeforeOpacity('[for="c-0-0"]'), 1);
        assert.equal(getBeforeOpacity('[for="c-0-1"]'), 1);
        assert.equal(getBeforeOpacity('[for="c-0-4"]'), 1);
    });

    it('should show "you win" if all pair are visible', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');

        assert.equal(browser.element('footer a').getCssProperty('opacity').value, 1);
    });
});
