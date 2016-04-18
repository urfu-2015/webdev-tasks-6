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
            expect(visibility).to.be.equal('hidden');
        });
        it('should check second card to be hidden', () => {
            var card = browser.element('[for="c-0-1"]');
            var visibility = card.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('hidden');
        });
        it('should check third card to be hidden', () => {
            var card = browser.element('[for="c-0-2"]');
            var visibility = card.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('hidden');
        });
        it('should check fourth card to be hidden', () => {
            var card = browser.element('[for="c-0-3"]');
            var visibility = card.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('hidden');
        });
        it('should check fifth card to be hidden', () => {
            var card = browser.element('[for="c-0-4"]');
            var visibility = card.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('hidden');
        });
        it('should check sixth card to be hidden', () => {
            var card = browser.element('[for="c-0-5"]');
            var visibility = card.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('hidden');
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
            browser.click(selector);
            expect(visibility).to.be.equal('visible');
        });
        it('should hide 2 different cards', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-2"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('visible');

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('hidden');
            expect(secondCardVisibility).to.be.equal('hidden');
        });
        it('should show 2 same cards', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-4"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);

            browser.click(firstSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('visible');

            browser.click(secondSelector);
            firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(secondCardVisibility).to.be.equal('visible');
        });
    });

    describe('visibility after clicking on first 4 cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should keep first pair of cards visible and hide next pair of diff cards', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-2"]';
            var thirdSelector = '[for="c-0-2"]';
            var fourthSelector = '[for="c-3-3"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);
            var thirdCard = browser.element(thirdSelector);
            var fourthCard = browser.element(fourthSelector);

            browser.click(firstSelector);
            browser.click(secondSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(secondCardVisibility).to.be.equal('visible');

            browser.click(thirdSelector);
            var thirdCardVisibility = thirdCard.getCssProperty('visibility').value;
            expect(thirdCardVisibility).to.be.equal('visible');

            browser.click(fourthSelector);
            var fourthCardVisibility = fourthCard.getCssProperty('visibility').value;
            thirdCardVisibility = thirdCard.getCssProperty('visibility').value;
            expect(thirdCardVisibility).to.be.equal('hidden');
            expect(fourthCardVisibility).to.be.equal('hidden');
        });
        it('should keep both pairs of cards visible if next pair is correct', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-2"]';
            var thirdSelector = '[for="c-0-2"]';
            var fourthSelector = '[for="c-3-4"]';
            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);
            var thirdCard = browser.element(thirdSelector);
            var fourthCard = browser.element(fourthSelector);

            browser.click(firstSelector);
            browser.click(secondSelector);
            var firstCardVisibility = firstCard.getCssProperty('visibility').value;
            var secondCardVisibility = secondCard.getCssProperty('visibility').value;
            expect(firstCardVisibility).to.be.equal('visible');
            expect(secondCardVisibility).to.be.equal('visible');

            browser.click(thirdSelector);
            browser.click(fourthSelector);
            var thirdCardVisibility = thirdCard.getCssProperty('visibility').value;
            var fourthCardVisibility = fourthCard.getCssProperty('visibility').value;
            expect(thirdCardVisibility).to.be.equal('visible');
            expect(fourthCardVisibility).to.be.equal('visible');
        });
    });

    describe('visibility after clicking on all cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should show win message', () => {
            var firstSelector = '[for="c-0-0"]';
            var secondSelector = '[for="c-1-2"]';
            var thirdSelector = '[for="c-0-2"]';
            var fourthSelector = '[for="c-3-3"]';
            var fifthSelector = '[for="c-0-1"]';
            var sixthSelector = '[for="c-2-2"]';
            var winMessage = browser.element('<a>');
            var winMessageOpacity = winMessage.getCssProperty('opacity').value;
            //expect(winMessageOpacity).to.be.equal('1');
            expect(winMessageOpacity).to.be.equal(1);

            var firstCard = browser.element(firstSelector);
            var secondCard = browser.element(secondSelector);
            var thirdCard = browser.element(thirdSelector);
            var fourthCard = browser.element(fourthSelector);
            var fifthCard = browser.element(fifthSelector);
            var sixthCard = browser.element(sixthSelector);

            browser.click(firstSelector);
            browser.click(secondSelector);
            browser.click(thirdSelector);
            browser.click(fourthSelector);
            browser.click(fifthSelector);
            browser.click(sixthSelector);
            winMessageOpacity = winMessage.getCssProperty('opacity').value;
            //expect(winMessageOpacity).to.be.equal('1');
            expect(winMessageOpacity).to.be.equal(1);
        });
    });
});
