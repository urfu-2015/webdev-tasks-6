'use strict';
var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;


browser.addCommand('getCardOpacity', function (element) {
    return parseInt(browser.execute(`return window
        .getComputedStyle(document.querySelector('${element}'), ':before')
        .getPropertyValue('opacity');`
    ).value, 10);
});

browser.addCommand('waitCardOpacity', function (element, endOpacityValue) {
    return browser.waitUntil(function () {
        return browser
            .getCardOpacity(element)
            .then(function (opacity) {
                return opacity === endOpacityValue;
            });
    });
});

browser.addCommand('getWinOpacity', function () {
    return parseInt(browser.execute(`return window
        .getComputedStyle(document.querySelector('footer a'))
        .getPropertyValue('opacity');`
    ).value, 10);
});

describe('panicky-car', function () {
    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.waitForVisible('body');
    });

    it('should not show cards at start part1', function () {
        for (let j = 0; j < 6; j++) {
            browser.getCardOpacity(`[for="c-0-${j}"]`).should.be.equal(0);
        }
    });

    it('should show card on click', function () {
        browser.click('label[for="c-0-0"');
        var cardVisibility = browser.getCssProperty('label[for="c-0-0"]', 'visibility');
        cardVisibility.value.should.be.equal('visible');
    });

    it('should hide cards if suites don\'t match', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-0-1"]');
        browser.waitCardOpacity('[for="c-0-0"]', 0);
        browser.waitCardOpacity('[for="c-0-1"]', 0);
        browser.getCardOpacity('[for="c-0-0"]').should.be.equal(0);
        browser.getCardOpacity('[for="c-0-1"]').should.be.equal(0);
    });
    it('should not hide cards if suites match', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-0-4"]');
        browser.getCardOpacity('[for="c-0-0"]').should.be.equal(1);
        browser.getCardOpacity('[for="c-0-4"]').should.be.equal(1);
        // i want to wait when opacity will be equal 0 and assert error, but it doesn't work

    });
    it('should show "You win" if all cards are visible', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-0-4"]');
        browser.click('[for="c-0-2"');
        browser.click('[for="c-0-5"');
        browser.click('[for="c-0-1"');
        browser.click('[for="c-0-3"');
        browser.getWinOpacity().should.be.equal(1);
    })
});
