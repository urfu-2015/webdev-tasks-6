'use strict';

const webdriverio = require('webdriverio');
const expect = require('chai').expect;
const url = 'http://panicky-car.surge.sh';

describe('yandex cards', () => {
    describe('visibility of the cards at the start of the game', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should check first card to be hidden', () => {
            var card = browser.element('[for="c-0-0"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
        it('should check second card to be hidden', () => {
            var card = browser.element('[for="c-0-1"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
        it('should check third card to be hidden', () => {
            var card = browser.element('[for="c-0-2"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
        it('should check fourth card to be hidden', () => {
            var card = browser.element('[for="c-0-3"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
        it('should check fifth card to be hidden', () => {
            var card = browser.element('[for="c-0-4"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
        it('should check sixth card to be hidden', () => {
            var card = browser.element('[for="c-0-5"]');
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            expect(visibility).to.be.equal('hidden');
            expect(opacity).to.be.equal(0);
        });
    });

    describe('visibility after clicking on first 2 cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should show hidden card on click', () => {
            var selector = '[for="c-0-0"]';
            var card = browser.element(selector);
            var visibility = card.getCssProperty('visibility').value;
            var opacity = card.getCssProperty('opacity').value;
            browser.click(selector);
            expect(visibility).to.be.equal('visible');
            expect(opacity).to.be.equal(1);
        });
        it('should hide 2 different cards', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-2"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var firstCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            firstCardOpacity = firstCard.getCssProperty('opacity').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            var secondCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('hidden');
            expect(secondCardVisibility).to.be.equal('hidden');
            expect(firstCardOpacity).to.be.equal(0);
            expect(secondCardOpacity).to.be.equal(0);
        });
        it('should show 2 same cards', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-4"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var firstCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            firstCardOpacity = firstCard.getCssProperty('opacity').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            var secondCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(secondCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);
            expect(secondCardOpacity).to.be.equal(1);
        });
    });

    describe('visibility after clicking on first 4 cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should keep first pair of cards visible and hide next pair of diff cards', () => {
            browser.click('[for="heart"]');
            var firstSelector = '[for="c-0-2"]';
            var secondSelector = '[for="c-3-3"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var firstCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            firstCardOpacity = firstCard.getCssProperty('opacity').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            var secondCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('hidden');
            expect(secondCardVisibility).to.be.equal('hidden');
            expect(firstCardOpacity).to.be.equal(0);
            expect(secondCardOpacity).to.be.equal(0);
        });
        it('should keep both pairs of cards visible if next pair is correct', () => {
            browser.click('[for="heart"]');
            var firstSelector = '[for="c-0-2"]';
            var secondSelector = '[for="c-3-4"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var firstCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            firstCardOpacity = firstCard.getCssProperty('opacity').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            var secondCardOpacity = firstCard.getCssProperty('opacity').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(secondCardVisibility).to.be.equal('visible');
            expect(firstCardOpacity).to.be.equal(1);
            expect(secondCardOpacity).to.be.equal(1);
        });
    });

    describe('visibility after clicking on all cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should show win message', () => {
            var winMessage = browser.element('<a>');
            var winMessageOpacity = winMessage.getCssProperty('opacity').value;
            expect(winMessageOpacity).to.be.equal(1);

            browser.click('[for="heart"]');
            browser.click('[for="diamond"]');
            browser.click('[for="club"]');

            winMessageOpacity = winMessage.getCssProperty('opacity').value;
            expect(winMessageOpacity).to.be.equal(1);
        });
    });
});
