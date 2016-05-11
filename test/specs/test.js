'use strict';

const webdriverio = require('webdriverio');
const should = require('chai').should();
const gameUrl = 'http://panicky-car.surge.sh/';

describe('Test for card game', () => {

    beforeEach( () => {
        browser.url(gameUrl));
    });

    it('should not show cards when game starts', () => {
        browser.element('label[for="c-1-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
        browser.element('label[for="c-2-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
        browser.element('label[for="c-3-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
        browser.element('label[for="c-4-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
        browser.element('label[for="c-5-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
        browser.element('label[for="c-6-0"]')
            .getCssProperty('visibility').value.should.equal('hidden');
    });

    it('card should be visibled when click on it', () => {
        browser.click('label[for="c-0-0"]');
        browser.element('label[for="c-0-0"]')
            .getCssProperty('visibility').value.should.equal('visible');
    });

    it('cards should are visible when there are the same content', () => {
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-0"]');
        
        browser.element('#heart').getAttribute('checked').should.equal('true');
    });

    it('correctly pair should be showed when next choice is wrong', () => {
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="c-3-1"]');

        browser.element('#diamond').getAttribute('checked').should.equal(null);
        browser.element('#heart').getAttribute('checked').should.equal(true);
    });

    it('win label should be showed when there are 3 right pair', () => {
        browser.element('<a>').getCssProperty('opacity').value.should.equal(0);

        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="diamond"]');
        browser.click('label[for="c-0-2"]');

        browser.element('<a>').getCssProperty('opacity').value.should.equal(1);    
    });
});
