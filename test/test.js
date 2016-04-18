'use strict';

var should = require('chai').should();
var webdriverio = require('webdriverio');

describe('Test page: "Яндекс.Карты"', function() {

    var clickElementByIndex = function (selector, index) {
        var id = browser.elements(selector).value[index].ELEMENT;
        browser.elementIdClick(id);
    };

    it('should chosen card be visible', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(1000);

        browser.click('[for="c-0-0"]');

        var opacity = browser.getCssProperty('[for="c-0-0"]', 'opacity');
        opacity.value.should.be.equal(1);
    });

    it('should chosen cards be visible because correct turn', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(1000);

        browser.click('[for="c-0-0"]');
        clickElementByIndex('[for="heart"]', 0);
        browser.pause(1000);

        var checked = browser.getAttribute('#heart', 'checked');
        checked.should.be.equal('true');
    });

    it('should chosen cards be invisible because wrong turn', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(1000);

        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-3"]');
        browser.pause(1000);

        var visibility = browser.getCssProperty('[for="c-1-3"]', 'visibility');
        visibility.value.should.be.equal('hidden');
    });

    it('should show "won message" at this turns', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(1000);

        browser.click('[for="c-0-0"]');
        clickElementByIndex('[for="heart"]', 0);
        browser.click('[for="c-0-1"]');
        clickElementByIndex('[for="club"]', 0);
        browser.click('[for="c-0-2"]');
        clickElementByIndex('[for="diamond"]', 0);

        var opacity = browser.getCssProperty('a', 'opacity');
        opacity.value.should.be.equal(1);
    });

    it('should show "won message" at other turns', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(1000);

        browser.click('[for="c-0-5"]');
        clickElementByIndex('[for="diamond"]', 1);
        browser.click('[for="c-0-1"]');
        clickElementByIndex('[for="club"]', 0);
        browser.click('[for="c-0-4"]');
        clickElementByIndex('[for="heart"]', 1);

        var opacity = browser.getCssProperty('a', 'opacity');
        opacity.value.should.be.equal(1);
    });
});
