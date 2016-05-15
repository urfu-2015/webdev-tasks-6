'use strict';

const assert = require('assert');
const appURL = 'http://panicky-car.surge.sh/';

const getCardOpacity = (selector) => {
    return browser.execute(
        `return getComputedStyle(document.querySelector('${selector}'), '::before')
        .getPropertyValue('opacity')`
    ).value;
};

const getSelector = (a, b) => {
    return typeof b !== 'undefined' ? `[for="c-${a}-${b}"]` : `[for="${a}"]`;
};

describe('Card game test', () => {
    beforeEach(() => {
        browser.url(appURL);
    });

    it('Should not show winning message at start of the game', () => {
        assert.equal(browser.element('a').getCssProperty('opacity').value, 0);
    });

    it('Should show cards at start of the game', () => {
        const firstSelector = getSelector(0, 0);
        const secondSelector = getSelector(0, 3);

        assert(getCardOpacity(firstSelector) > 0);
        assert(getCardOpacity(secondSelector) > 0);
    });

    it('Should hide cards after few sec', () => {
        browser.pause(1200);
        const firstSelector = getSelector(0, 0);
        const secondSelector = getSelector(0, 3);

        assert.equal(getCardOpacity(firstSelector), 0);
        assert.equal(getCardOpacity(secondSelector), 0);
    });

    it('Should show card after click', () => {
        const selector = getSelector(0, 0);

        browser.click(selector);
        assert.equal(getCardOpacity(selector), 1);
    });

    it('Should hide card after wrong second click', () => {
        const firstSelector = getSelector(0, 0);
        const secondSelector = getSelector(1, 3);

        browser.click(firstSelector);
        browser.click(secondSelector);
        browser.pause(1200);

        assert.equal(getCardOpacity(firstSelector), 0);
    });

    it('Should show both cards after correct second click', () => {
        const firstSelector = getSelector(0, 0);
        const secondSelector = getSelector('heart');

        browser.click(firstSelector);
        browser.click(secondSelector);
        browser.pause(500);

        assert.equal(getCardOpacity(firstSelector), 1);
        assert.equal(getCardOpacity(getSelector(0, 4)), 1);
    });

    it('Should show correct chosen pair after picking incorrect pair', () => {
        browser.click(getSelector(0, 0));
        browser.click(getSelector('heart'));
        browser.click(getSelector(0, 1));
        browser.click(getSelector(2, 5));
        browser.pause(1200);

        assert.equal(getCardOpacity(getSelector(0, 0)), 1);
    });

    it('Should show message after winning', () => {
        browser.click(getSelector(0, 0));
        browser.click(getSelector('heart'));
        browser.click(getSelector(0, 1));
        browser.click(getSelector('club'));
        browser.click(getSelector(0, 2));
        browser.click(getSelector('diamond'));

        assert.equal(browser.element('a').getCssProperty('opacity').value, 1);
    });

    it('Should restart game after clicking at message', () => {
        browser.click(getSelector(0, 0));
        browser.click(getSelector('heart'));
        browser.click(getSelector(0, 1));
        browser.click(getSelector('club'));
        browser.click(getSelector(0, 2));
        browser.click(getSelector('diamond'));
        browser.click('a');
        browser.pause(1500);

        assert.equal(getCardOpacity(getSelector(0, 0)), 0);
        assert.equal(getCardOpacity(getSelector(0, 3)), 0);
    });
});