'use strict';

const webdriverio = require('webdriverio');
const expect = require('chai').expect;
const url = 'http://panicky-car.surge.sh';

describe('yandex cards', () => {
    describe('visibility of the cards at the start of the game', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should check visibility of the sections', () => {
            var startSection = browser.element('section:first-child');
            var visibility = startSection.getCssProperty('visibility').value;
            expect(visibility).to.be.equal('visible');
            for (var i = 2; i < 6; i++) {
                var section = browser.element('section:nth-child(' + i + ')');
                visibility = section.getCssProperty('visibility').value;
                expect(visibility).to.be.equal('hidden');
            }
        });
        it('should check opacity of the sections', () => {
            expect(browser.element('section:first-child').getCssProperty('opacity').value).to.be.equal(1);
            for (var i = 2; i < 6; i++) {
                var opacity = browser
                              .element('section:nth-child(' + i + ')')
                              .getCssProperty('opacity').value;
                //0 <= opacity < 1
                expect(opacity).to.be.at.least(0);
            }
        });
    });

    describe('visibility after clicking on first 2 cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should show hidden card on click', () => {
            //var selector = '[for="c-1-0"]';
            var selector = 'section:nth-child(2)';
            var beforeVisibility = browser.element(selector).getCssProperty('visibility').value;
            expect(beforeVisibility).to.be.equal('hidden');
            browser.click('[for="c-0-0"]');
            var afterVisibility = browser.element(selector).getCssProperty('visibility').value;
            expect(afterVisibility).to.be.equal('visible');
        });
        it('should hide 2 different cards', () => {
            var selector = '[for="c-1-3"]';
            browser.click('[for="c-0-0"]');
            expect(browser.element(selector).getCssProperty('visibility').value).to.be.equal('visible');
            browser.click('[for="c-1-3"]');
            expect(browser.element(selector).getCssProperty('visibility').value).to.be.equal('hidden');
        });
        it('should show 2 same cards', () => {
            browser.click('[for="c-0-1"]');
            browser.click('[for="club"]');
            expect(browser.element('#club').getAttribute('checked')).to.be.equal('true');
        });
    });

    describe('visibility after clicking on first 4 cards', () => {
        beforeEach(() => {
            browser.url(url);
        });
        it('should keep first pair of cards visible and hide next pair of diff cards', () => {
            var selector = 'section:nth-child(5)';
            browser.click('#heart');
            browser.click('[for="c-0-3"]');
            expect(browser.element(selector).getCssProperty('visibility').value).to.be.equal('visible');
            browser.click('[for="c-4-2"]');
            expect(browser.element(selector).getCssProperty('visibility').value).to.be.equal('hidden');
        });
        it('should keep both pairs of cards visible if next pair is correct', () => {
            browser.click('#heart');
            browser.click('[for="c-0-3"]');
            browser.click('[for="c-4-2"]');
            expect(browser.element('#club').getAttribute('checked')).to.be.equal('true');
        });
    });

    describe('visibility after clicking on all cards', () => {
        it('should show win message', () => {
            browser.url(url);
            var selector = 'footer a';
            expect(browser.element(selector).getCssProperty('opacity').value).to.be.at.least(0);
            browser.click('#heart');
            browser.click('#club');
            browser.click('#diamond');
            expect(browser.element(selector).getCssProperty('opacity').value).to.be.equal(1);
        });
    });
});
