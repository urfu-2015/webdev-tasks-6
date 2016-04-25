/**
 * Created by Max on 18.04.2016.
 */
var webdriverio = require('wdio-mocha-framework');
var assert = require('assert');

describe('Card game engine', function() {
    beforeEach(function() {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should fix card when click on it', function() {
        browser.click('label[for="c-0-0"]');

        var card = browser.element('label[for="c-1-0"]');
        var cardVisibility = card.getCssProperty('visibility').value;
        assert.equal(cardVisibility, 'visible');
    });

    it('should fix cards when click on pair', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');

        var card = browser.element('#heart');
        var isChecked = card.getAttribute('checked');
        assert(isChecked, 'true');
    });

    it('should save pair when open another pair', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');

        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');


        var card = browser.element('#heart');
        var isChecked = card.getAttribute('checked');
        assert(isChecked, 'true');
    });

    it('should unfix card when click on wrong pair', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-1-2"]');

        browser.waitUntil(function() {
            var card1 = browser.element('label[for="c-1-0"]');
            return card1.getCssProperty('visibility').then(function(res) {
                return res.value === 'hidden';
            });
        });

        var card2 = browser.element('label[for="c-1-2"]');
        var cardVisibility2 = card2.getCssProperty('visibility').value;
        assert.equal(cardVisibility2, 'hidden');
    });

    it('should show open pairs when mistake happens', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');

        browser.click('label[for="c-0-1"]');
        browser.click('label[for="c-2-2"]');

        var card = browser.element('#heart');
        var isChecked = card.getAttribute('checked');
        assert(isChecked, 'true');
    });

    it('should finish the game', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');

        browser.waitUntil(function() {
            var footer = browser.element('footer a');
            return footer.getCssProperty('opacity').then(function(res) {
                return res.value === 1;
            });
        });

    });

    it('should do what it should not do', function() {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-1-1"]');

        browser.click('label[for="heart"]');

        var card = browser.element('#heart');
        var isChecked = card.getAttribute('checked');
        assert(isChecked, 'true');
    });
});