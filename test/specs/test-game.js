'use strict';

var webdriverio = require('webdriverio');
var assert = require('assert');

describe('Test game', function () {
    
    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should show empty card when start game', function () {
        var first = browser.element('label[for="c-1-0"]');
        var second = browser.element('label[for="c-2-0"]');
        var third = browser.element('label[for="c-3-0"]');
        var fourth = browser.element('label[for="c-4-0"]');
        var fifth = browser.element('label[for="c-5-1"]');
        var sixth = browser.element('label[for="c-6-0"]');

        assert.equal(first.getCssProperty('visibility').value, 'hidden');
        assert.equal(second.getCssProperty('visibility').value, 'hidden');
        assert.equal(third.getCssProperty('visibility').value, 'hidden');
        assert.equal(fourth.getCssProperty('visibility').value, 'hidden');
        assert.equal(fifth.getCssProperty('visibility').value, 'hidden');
        assert.equal(sixth.getCssProperty('visibility').value, 'hidden');
    });

    it('should be visible card when click on it', function() {
        var card = browser.element('label[for="c-1-0"]');
        assert.equal(card.getCssProperty('visibility').value, 'hidden');

        browser.click('label[for="c-0-0"]');
        assert.equal(card.getCssProperty('visibility').value, 'visible');
    });

    it('should are visible cards when there are the same content', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');

        var heart = browser.element('#heart');
        var heartChecked = heart.getAttribute('checked');
        assert.equal(heartChecked, 'true');
    });

    it('should are visible 2 pairs of cards with the right choice', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');

        var heart = browser.element('#heart');
        var heartChecked = heart.getAttribute('checked');
        assert.equal(heartChecked, 'true');

        var club = browser.element('#club');
        var clubChecked = club.getAttribute('checked');
        assert.equal(clubChecked, 'true');
    });

    it('should show win label when there are 3 right pair', function () {
        var winLabel = browser.element('<a>');
        var winLabelOpacity = winLabel.getCssProperty('opacity');
        assert.equal(winLabelOpacity.value, 0);

        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');

        winLabelOpacity = winLabel.getCssProperty('opacity');
        assert.equal(winLabelOpacity.value, 1);
    });

    it('should show cards correctly when there are the wrong choice in the beginning', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-1-2"]');

        var heart = browser.element('#heart');
        var heartChecked = heart.getAttribute('checked');
        assert.equal(heartChecked, null);

        var diamond = browser.element('#diamond');
        var diamondChecked = diamond.getAttribute('checked');
        assert.equal(diamondChecked, null);
    });

    it('should show 1 pair correctly when next choice is wrong', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="c-3-1"]');

        var heart = browser.element('#heart');
        var heartChecked = heart.getAttribute('checked');
        assert.equal(heartChecked, 'true');

        var diamond = browser.element('#diamond');
        var diamondChecked = diamond.getAttribute('checked');
        assert.equal(diamondChecked, null);
    });
});
