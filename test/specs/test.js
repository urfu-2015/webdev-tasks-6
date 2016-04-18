'use strict';

const webdriverio = require('webdriverio');
//const assert = require('assert');
require('chai').should();

var assert = require('assert');

describe('Яндекс игра', function() {
    this.timeout(1000000);

    //  если нажимаем карту, то она становится видна
    it('should show card', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');

        let card = browser.element('[for="c-0-0"]');
        let opacity = card.getCssProperty('opacity').value;
        opacity.should.be.equal(1);
    });

    // если нажимаем две карты, но они не совпадают
    it.skip('should return to start', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');

        let section = browser.element('section:first-child');
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');
    });

    // если нажимаем две карты, и они совпадают
    it('should show two card', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');

        let section = browser.element('[for="c-0-0"]');
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        let a = browser.element('[for="c-0-4"]');
        let visibility1 = a.getCssProperty('visibility').value;
        visibility1.should.be.equal('visible');
    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, но они не совпадают
     ♥ -> ♥ -> ♣ -> ♦
     */
    it.only('should show two cards that clicked first', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="c-2-2"]');

        let section = browser.element('[for="c-0-1"]');
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');

        let a = browser.element('[for="c-2-2"]');
        let visibility1 = a.getCssProperty('visibility').value;
        visibility1.should.be.equal('hidden');

    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, и они совпадают
     ♥ -> ♥ -> ♣ -> ♣
     */
    it.only('should show two cards that clicked first', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        let section = browser.element('[for="c-0-1"]');
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');

        let a = browser.element('[for="club"]');
        let visibility1 = a.getCssProperty('visibility').value;
        visibility1.should.be.equal('hidden');

    });

    /* если все карты угадали, то выигрываем
     ♥ -> ♥ -> ♣ -> ♣ -> ♦ -> ♦
     */
    it('should show win text', function () {
        browser.url('http://panicky-car.surge.sh/');

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
