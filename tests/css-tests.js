'use strict';

const webdriverio = require('webdriverio');
const webdriver = require('selenium-webdriver');
const assert = require('assert');

const browserURL = 'http://panicky-car.surge.sh/';
const msgOfWin = '<a>';

const cards = {
    firstClick: {
        heart: '[for="c-0-0"]',
        club: '[for="c-0-1"]',
        diamond: '[for="c-0-2"]'
    },
    afterFirstClick: {
        heart: '[for="c-1-0"]',
        club: '[for="c-2-1"]',
        diamond: '[for="c-3-2"]'
    },
    secondCorrectClick: {
        heart: '[for="heart"]',
        club: '[for="club"]',
        diamond: '[for="diamond"]'
    },
    secondIncorrectClick: {
        heart: '[for="c-1-3"]',
        club: '[for="c-2-4"]',
        diamond: '[for="c-3-4"]'
    }
};

describe('Яндекс.Карты', () => {
    beforeEach(() => {
        browser.url(browserURL);
    });

    it ('should be visible card', () => {
        browser.click(cards.firstClick.heart);
        let cardOpacity = browser.element(cards.firstClick.heart).getCssProperty('opacity');

        assert.equal(cardOpacity.value, 1);
    });

    it ('should be invisible cards after checking the unmatched cards', () => {
        browser.click(cards.firstClick.club);
        browser.click(cards.secondIncorrectClick.club);

        let visible1 = browser.element(cards.afterFirstClick.club).isVisible();
        let visible2 = browser.element(cards.secondIncorrectClick.club).isVisible();

        assert.equal(visible1, false);
        assert.equal(visible2, false);
    });

    it('should be visible cards after verification of matching cards', () => {
        browser.click(cards.firstClick.club);
        browser.click(cards.secondCorrectClick.club);

        let cardOpacity1 = browser.element(cards.firstClick.club).getCssProperty('opacity');
        let cardOpacity2 = browser.element(cards.secondCorrectClick.club).getCssProperty('opacity');

        assert.equal(cardOpacity1.value, 1);
        assert.equal(cardOpacity2.value, 1);
    });

    it('should be invisible unmatched cards after checking the matching cards', () => {
        browser.click(cards.firstClick.diamond);
        browser.click(cards.secondCorrectClick.diamond);

        browser.click(cards.firstClick.heart);
        browser.click(cards.secondIncorrectClick.heart);

        let visible1 = browser.element(cards.afterFirstClick.heart).isVisible();
        let visible2 = browser.element(cards.secondIncorrectClick.heart).isVisible();

        assert.equal(visible1, false);
        assert.equal(visible2, false);
    });

    it('should be visible card after the clicks on it and on already open card', () => {
        browser.click(cards.firstClick.club);
        browser.click(cards.secondCorrectClick.club);
        browser.click(cards.firstClick.heart);

        try {
            browser.click(cards.firstClick.club);
        } catch (err) {
            // А хром обойдется :(
        }

        let visible1 = browser.element(cards.afterFirstClick.heart).isVisible();
        let visible2 = browser.element(cards.firstClick.club).isVisible();

        assert.equal(visible1, true);
        assert.equal(visible2, true);
    });

    it('should show a message after the victory in the game', () => {
        browser.click(cards.firstClick.heart);
        browser.click(cards.secondCorrectClick.heart);
        browser.click(cards.firstClick.club);
        browser.click(cards.secondCorrectClick.club);
        browser.click(cards.firstClick.diamond);
        browser.click(cards.secondCorrectClick.diamond);

        let msgOpacity = browser.element(msgOfWin).getCssProperty('opacity');

        assert.equal(msgOpacity.value, 1);
    });
});

