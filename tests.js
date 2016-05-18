'use strict';

const url = 'http://panicky-car.surge.sh/';
const webdriverio = require('webdriverio');
const assert = require('assert');
const cards = [];

var getCards = () => {
    for (var i = 1; i <= 6; i++) {
        var selector = `label[for="c-${i}-${i - 1}"]`;
        cards.push(browser.element(selector));
    }
}

describe('Яндекс.Карты ♥︎ ♣︎ ♦︎', () => {
    beforeEach(() => {
        browser.url(url);
        getCards;
    });
    it('should keep every card hidden', () => {
        cards.forEach((card, index, cards) => {
            assert(!browser.isVisible(card.selector));
        })
    });
    it('should show picture on click', () => {
        var card = browser.element('label[for="c-0-0"]');
        browser.click(card.selector);
        browser.pause(500);
        assert(browser.isVisible('label[for="c-1-0"]'));
    });
    it('should hide different pictures', () => {
        var heartCard = browser.element('label[for="c-0-0"]');
        browser.click(heartCard.selector);
        var cluBCard = browser.element('label[for="c-1-1"]');
        browser.click(cluBCard.selector);
        browser.pause(1000);
        assert(browser.isVisible(heartCard.selector) && !browser.isVisible(cluBCard.selector));
    });
    it('should show equals pictures', () => {
        var heartCard = browser.element('label[for="c-0-0"]');
        browser.click(heartCard.selector);
        var anotherHeartCard = browser.element('label[for="heart"]');
        browser.click(anotherHeartCard.selector);
        assert(browser.isVisible(heartCard.selector) && browser.isVisible('label[for="c-0-4"]'));
    });
    it('should show message when you win', () => {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');
        browser.pause(2000);
        assert(browser.isVisible('a'));
    });
    it('should start new game after previous victory', () => {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');
        browser.click('a');
        browser.pause(2000);
        cards.forEach((card, index, cards) => {
            assert(!browser.isVisible(card.selector));
        })
    });
})
