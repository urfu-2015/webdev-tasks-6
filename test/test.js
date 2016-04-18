'use strict';

const webdriverio = require('webdriverio');
const expect = require('chai').expect;
const url = 'http://panicky-car.surge.sh/';

describe('Yandex.Cards', () => {
    beforeEach(() => browser.url(url));

    it('all cards should be invisible', () => {
        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push(browser.element('[for="c-' + (i + 1) + '-' + i + '"]'));
        }
        for (let i = 0; i < cards.length; i++) {
            expect(cards[i].getCssProperty('visibility').value).to.be.equal('hidden');
        }
    });

    it('should show clicked card', () => {
        browser.click('[for="c-0-0"]');
        let visibileElement = browser.element('[for="c-1-0"]');
        expect(visibileElement.getCssProperty('visibility').value).to.be.equal('visible');
    });

    it('should not show different cards after some time', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');
        browser.pause(1500);
        let hiddenElement1 = browser.element('[for="c-1-0"]');
        let hiddenElement2 = browser.element('[for="c-2-1"]');
        expect(hiddenElement1.getCssProperty('visibility').value).to.be.equal('hidden');
        expect(hiddenElement2.getCssProperty('visibility').value).to.be.equal('hidden');
    });

    it('should show same cards after some time', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.pause(1500);
        let visibileElement1 = browser.element('[for="c-0-0"]');
        let visibileElement2 = browser.element('[for="c-0-4"]');
        expect(visibileElement1.getCssProperty('visibility').value).to.be.equal('visible');
        expect(visibileElement2.getCssProperty('visibility').value).to.be.equal('visible');
    });

    it('should show two correct pair cards', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.pause(1500);

        let visibileElement1 = browser.element('[for="c-0-0"]');
        let visibileElement2 = browser.element('[for="c-0-2"]');
        expect(visibileElement1.getCssProperty('visibility').value).to.be.equal('visible');
        expect(visibileElement2.getCssProperty('visibility').value).to.be.equal('visible');
    });

    it('should show win card if all cards right', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        let winElement = browser.element('a');
        expect(winElement.getCssProperty('opacity').value).to.be.equal(1);
    });

    it('should start new game after click win card', () => {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        browser.click('a');
        browser.pause(5000);
        let winElement = browser.element('a');
        expect(winElement.getCssProperty('opacity').value).to.be.equal(0);

        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push(browser.element('[for="c-' + (i + 1) + '-' + i + '"]'));
        }
        for (let i = 0; i < cards.length; i++) {
            expect(cards[i].getCssProperty('visibility').value).to.be.equal('hidden');
        }
    });
});
