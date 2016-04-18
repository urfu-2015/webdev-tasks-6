'use strict';

const should = require('chai').should();
const wdio = require('webdriverio');

browser.addCommand('getPseudoElementProperty', (elementSelector, pseudoSelector, property) => {
    return browser.execute(`return window.getComputedStyle(
        document.querySelector('${elementSelector}'), '${pseudoSelector}').getPropertyValue('${property}');`).value;
});

browser.addCommand('waitUntilPseudoElementHidden', (elementSelector, pseudoSelector) => {
    return browser.waitUntil(() => {
        return browser.getPseudoElementProperty(elementSelector, pseudoSelector, 'opacity').then((opacity) => {
            return opacity === '0';
        });
    });
});

describe('Card Game', function() {
    it('should not show winner message at the beginning', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.element('footer a').getCssProperty('opacity').value.should.be.equal(0);
    });

    it('should not show any card at the beginning', function(done) {
        browser.url('http://panicky-car.surge.sh/');

        browser.waitUntilPseudoElementHidden('[for="c-0-0"]', ':before');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-1"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-2"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-3"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-4"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-5"]', ':before', 'opacity').should.be.equal('0');
    });

    it('should show clicked card', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('1');
    });

    it('should show second cads for a moment if wrong pair clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');

        browser.getPseudoElementProperty('[for="c-1-1"]', ':before', 'opacity').should.not.be.equal('0');
    });

    it('should hide both cads if wrong pair clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');

        browser.waitUntilPseudoElementHidden('[for="c-0-0"]', ':before');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('0');
        browser.getPseudoElementProperty('[for="c-0-1"]', ':before', 'opacity').should.be.equal('0');
    });

    it('should show both cads if right pair clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-4"]', ':before', 'opacity').should.be.equal('1');
    });

    it('should show 4 cads if 2 right pairs clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-4"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-1"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-3"]', ':before', 'opacity').should.be.equal('1');
    });

    it('should show all cads if all right pairs clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');

        browser.getPseudoElementProperty('[for="c-0-0"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-4"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-1"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-3"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-2"]', ':before', 'opacity').should.be.equal('1');
        browser.getPseudoElementProperty('[for="c-0-5"]', ':before', 'opacity').should.be.equal('1');
    });

    it('should show winner message if all right pairs clicked', function() {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');

        browser.element('footer a').getCssProperty('opacity').value.should.not.be.equal(0);
    });
});