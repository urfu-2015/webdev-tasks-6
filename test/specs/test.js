'use strict';

const webdriverio = require('webdriverio');
const url = 'http://panicky-car.surge.sh/';
require('chai').should();

var assert = require('assert');

describe('Яндекс игра', function() {
    beforeEach(() => {
        browser.url(url);
    });
    this.timeout(1000000);

    //  если нажимаем карту, то она становится видна
    it('should show card', function () {
        browser.click('[for="c-0-0"]');

        let card = browser.element('[for="c-0-0"]');
        let opacity = card.getCssProperty('opacity').value;
        opacity.should.be.equal(1);
    });

    // если нажимаем две карты, но они не совпадают
    it('should return to start', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');

        let section = browser.element('section:first-child');
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        let secondCard = browser.element('[for="c-1-1"]');
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');
    });

    // если нажимаем две карты, и они совпадают
    it('should show two card', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');

        let firstCard = browser.element('[for="c-0-0"]');
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        // тут хочется проверять псевдоэлемент [for="c-0-4"]:before
        let secondCard = browser.element('[for="c-0-4"]');
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');
    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, но они не совпадают
     ♥ -> ♥ -> ♣ -> ♦
     */
    it('should show two cards that clicked first', function () {
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="c-2-2"]');

        // тут хочется проверять псевдоэлемент [for="c-0-0"]:before
        let firstCard = browser.element('[for="c-0-0"]');
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        // тут хочется проверять псевдоэлемент [for="c-0-4"]:before
        let secondCard = browser.element('[for="c-0-4"]');
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        let thirdCard = browser.element('[for="c-0-1"]');
        visibility = thirdCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        let fourthCard = browser.element('[for="c-2-2"]');
        visibility = fourthCard.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');
    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, и они совпадают
     ♥ -> ♥ -> ♣ -> ♣
     */
    it.skip('should show two cards that clicked first', function () {
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        // тут хочется проверять псевдоэлемент [for="c-0-0"]:before
        let firstCard = browser.element('[for="c-0-0"]');
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        // тут хочется проверять псевдоэлемент [for="c-0-4"]:before
        let secondCard = browser.element('[for="c-0-4"]');
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        // тут хочется проверять псевдоэлемент [for="c-0-1"]:before
        let thirdCard = browser.element('[for="c-0-1"]');
        visibility = thirdCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        // тут хочется проверять псевдоэлемент [for="c-0-3"]:before
        let fourthCard = browser.element('[for="c-0-3"]');
        visibility = fourthCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');
    });

    /* если все карты угадали, то выигрываем
     ♥ -> ♥ -> ♣ -> ♣ -> ♦ -> ♦
     */
    it.skip('should show win text', function () {
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');

        let link = browser.element('<a>');
        let opacity = link.getCssProperty('opacity').value;
        opacity.should.be.equal(1);
    });
});
