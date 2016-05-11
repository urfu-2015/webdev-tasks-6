'use strict';

const webdriverio = require('webdriverio');
const chai = require('chai');
const should = require('chai').should();

const gameUrl = 'http://panicky-car.surge.sh/';
const cards = {
    heart: {
        first: 'c-0-0',
        second: 'c-0-4',
        correct: 'heart',
        wrong: 'c-1-1'
    },
    diamond: {
        first: 'c-0-2',
        second: 'c-0-5',
        correct: 'diamond',
        wrong: 'c-3-1'
    },
    club: {
        first: 'c-0-1',
        second: 'c-0-3',
        correct: 'club',
        wrong: 'c-2-4'
    }
};

describe('Cards', function () {
    this.timeout(25000);
    function getOpacityBefore(name) {
        return browser.execute((name) => {
            return window
                .getComputedStyle(document.querySelector(`[for="${name}"]`),':before')
                .getPropertyValue('opacity');
        }, name).value;
    }
    beforeEach(function () {
        browser.url(gameUrl);
    });
    it('should show card', function () {
        browser.click(`[for="${cards.heart.first}"]`);
        const cardOpacity = getOpacityBefore(cards.heart.first);
        cardOpacity.should.be.equal('1');
    });
    it('should show heart section only', function () {
        browser.click(`[for="${cards.heart.first}"]`);
        const heartSectionVisibility = browser
            .element('section:nth-child(2)')
            .getCssProperty('visibility').value;
        heartSectionVisibility.should.be.equal('visible');
        for (let i = 3; i < 8; i++) {
            const sectionVisibility = browser
                .element(`section:nth-child(${i})`)
                .getCssProperty('visibility').value;
            sectionVisibility.should.be.equal('hidden');
        }
    });
    it('should hide incorrect pair', function() {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.wrong}"]`);
        const heartOpacity = getOpacityBefore(cards.heart.first);
        const clubVisibility = browser
            .element(`[for="${cards.heart.wrong}"]`)
            .getCssProperty('visibility').value;
        heartOpacity.should.not.be.equal('1');
        clubVisibility.should.be.equal('hidden');
    });
    it('should keep right pair visible', function() {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.correct}"]`);
        const heartOpacity = getOpacityBefore(cards.heart.first);
        const heart2Opacity = getOpacityBefore(cards.heart.second);
        heartOpacity.should.be.equal('1');
        heart2Opacity.should.be.equal('1');
    });
    it('should keep right pair visible then wrong checked', function() {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.correct}"]`);
        browser.click(`[for="${cards.diamond.first}"]`);
        browser.click(`[for="${cards.diamond.wrong}"]`);
        const heartOpacity = getOpacityBefore(cards.heart.first);
        const heart2Opacity = getOpacityBefore(cards.heart.second);
        heartOpacity.should.be.equal('1');
        heart2Opacity.should.be.equal('1');
    });
    it('should keep 2 right pairs visible', function () {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.correct}"]`);
        browser.click(`[for="${cards.club.first}"]`);
        browser.click(`[for="${cards.club.correct}"]`);
        const heartOpacity = getOpacityBefore(cards.heart.first);
        const heart2Opacity = getOpacityBefore(cards.heart.second);
        const clubOpacity = getOpacityBefore(cards.club.first);
        const club2Opacity = getOpacityBefore(cards.club.second);
        heartOpacity.should.be.equal('1');
        heart2Opacity.should.be.equal('1');
        clubOpacity.should.be.equal('1');
        club2Opacity.should.be.equal('1');
    });
    it('should show win message', function () {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.correct}"]`);
        browser.click(`[for="${cards.club.first}"]`);
        browser.click(`[for="${cards.club.correct}"]`);
        browser.click(`[for="${cards.diamond.first}"]`);
        browser.click(`[for="${cards.diamond.correct}"]`);
        const winMsg = browser.element('a').getCssProperty('opacity').value;
        winMsg.should.be.equal(1);
    });
    it('should start new game', function() {
        browser.click(`[for="${cards.heart.first}"]`);
        browser.click(`[for="${cards.heart.correct}"]`);
        browser.click(`[for="${cards.club.first}"]`);
        browser.click(`[for="${cards.club.correct}"]`);
        browser.click(`[for="${cards.diamond.first}"]`);
        browser.click(`[for="${cards.diamond.correct}"]`);
        browser.click('a');
        const heartOpacity = getOpacityBefore(cards.heart.first);
        const heart2Opacity = getOpacityBefore(cards.heart.second);
        const clubOpacity = getOpacityBefore(cards.club.first);
        const club2Opacity = getOpacityBefore(cards.club.second);
        const diamondOpacity = getOpacityBefore(cards.diamond.first);
        const diamond2Opacity = getOpacityBefore(cards.diamond.second);
        heartOpacity.should.not.be.equal('1');
        heart2Opacity.should.not.be.equal('1');
        clubOpacity.should.not.be.equal('1');
        club2Opacity.should.not.be.equal('1');
        diamondOpacity.should.not.be.equal('1');
        diamond2Opacity.should.not.be.equal('1');
    })
});
