'use strict';

const webdriverio = require('webdriverio');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const url = 'http://panicky-car.surge.sh/';

describe('Yandex.Cards', () => {
    beforeEach(() => browser.url(url));

    it('all cards should be invisible', () => {
        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push('[for="c-' + (i + 1) + '-' + i + '"]');
        }

        for (let i = 0; i < cards.length; i++) {
            expect(browser.isVisible(cards[i])).to.be.false;
        }
    });

    it('should show clicked card', done => {
        browser.click('[for="c-0-0"]');
        browser.pause(1500);

        expect(browser.isVisible('[for="c-1-0"]')).to.be.true;
    });

    it('should not show different cards after some time', done => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');
        browser.pause(1500);

        expect(browser.isVisible('[for="c-1-0"]')).to.be.false;
        expect(browser.isVisible('[for="c-2-1"]')).to.be.false;
    });

    it('should show same cards after some time', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.pause(1500);

        expect(browser.isVisible('[for="c-0-0"]')).to.be.true;
        expect(browser.isVisible('[for="c-0-4"]')).to.be.true;
    });

    it('should show two correct pair cards', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.pause(1500);

        expect(browser.isVisible('[for="c-0-0"]')).to.be.true;
        expect(browser.isVisible('[for="c-0-2"]')).to.be.true;
    });

    it('should show win card if all cards right', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        expect(browser.isVisibleWithinViewport('a')).to.be.true;
    });

    it('should start new game after click win card', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        browser.click('a');
        browser.pause(3000);

        expect(browser.isVisibleWithinViewport('a')).to.be.false;

        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push('[for="c-' + (i + 1) + '-' + i + '"]');
        }
        for (let i = 0; i < cards.length; i++) {
            expect(browser.isVisible(cards[i])).to.be.false;
        }
    });
});
