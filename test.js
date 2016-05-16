var assert = require('assert');
var webdriverio = require('webdriverio');
var getNameAttributeSelector = require('./index.js');

describe('Game', function () {
    this.timeout(30000);

    function getBeforeOpacity(selector) {
        return browser.execute(`return getComputedStyle(document.querySelector('${selector}'),
     '::before').getPropertyValue('opacity')`).value;
    }

    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should be the initial animation', function () {
        assert.notEqual(getBeforeOpacity(getNameAttributeSelector('c-0-0')), 0);

        browser.pause(2000);

        assert.equal(getBeforeOpacity(getNameAttributeSelector('c-0-0')), 0);
    });

    it('should be visible card', function () {
        browser.click(getNameAttributeSelector('c-0-0'));
        assert.equal(getBeforeOpacity(getNameAttributeSelector('c-0-0')), 1);
    });

    it('should be visible right pair', function () {
        ['c-0-0', 'heart'].forEach(function (item) {
            browser.click(getNameAttributeSelector(item));
        });

        ['c-0-0', 'c-0-4'].forEach(function (item) {
            assert.equal(getBeforeOpacity(getNameAttributeSelector(item)), 1);
        });
    });

    it('should be hidden wrong pair', function () {
        ['c-0-0', 'c-1-1'].forEach(function (item) {
            browser.click(getNameAttributeSelector(item));
        });

        browser.pause(2000);

        ['c-0-0', 'c-0-4'].forEach(function (item) {
            assert.equal(getBeforeOpacity(getNameAttributeSelector(item)), 0);
        });
    });

    it('should be visible right pair and one card', function () {
        ['c-0-0', 'heart', 'c-0-1'].forEach(function (item) {
            browser.click(getNameAttributeSelector(item));
        });

        ['c-0-0', 'c-0-1', 'c-0-4'].forEach(function (item) {
            assert.equal(getBeforeOpacity(getNameAttributeSelector(item)), 1);
        });
    });

    it('should show "you win" if all pair are visible', function () {
        ['c-0-0', 'heart', 'c-0-1', 'club', 'c-0-2', 'diamond'].forEach(function (item) {
            browser.click(getNameAttributeSelector(item));
        });

        assert.equal(browser.element('footer a').getCssProperty('opacity').value, 1);
    });

    it('should start a new game when you click on "you win"', function () {
        ['c-0-0', 'heart', 'c-0-1', 'club', 'c-0-2', 'diamond'].forEach(function (item) {
            browser.click(getNameAttributeSelector(item));
        });
        browser.click('footer a');

        browser.pause(2000);

        ['c-0-0', 'c-0-1', 'c-0-2', 'c-0-3', 'c-0-4', 'c-0-5'].forEach(function (item) {
            assert.equal(getBeforeOpacity(getNameAttributeSelector(item)), 0);
        });
    });
});
