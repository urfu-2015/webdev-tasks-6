'use strict';
var chai = require('chai');
var should = chai.should();

const diamonds = ['[for="c-0-2"]', '[for="c-0-5"]'];
const hearts = ['[for="c-0-0"]', '[for="c-0-4"]'];
const clubs = ['[for="c-0-1"]', '[for="c-0-3"]'];
const allCards = diamonds.concat(hearts).concat(clubs);

browser.addCommand('getElementOpacity', function (element, pseudoElement) {
    return parseInt(browser.execute(`return window
        .getComputedStyle(document.querySelector('${element}'), '${pseudoElement}')
        .getPropertyValue('opacity');`
    ).value, 10);
});

function getWinOpacity() {
    return browser.getElementOpacity('footer a', '');
}

function getCardOpacity(card) {
    return browser.getElementOpacity(card, ':before');
}
describe('panicky-car', function () {
    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should not show cards at start', function () {
        for (let j = 0; j < 6; j++) {
            getCardOpacity(allCards[j]).should.be.equal(0);
        }
    });

    it('should show card on click part1', function () {
        allCards.slice(0, 3).forEach(card => {
            browser.click(card);
            getCardOpacity(card).should.be.equal(1);
            browser.url('http://panicky-car.surge.sh/');
        });
    });

    it('should show card on click part2', function () {
        allCards.slice(3).forEach(card => {
            browser.click(card);
            getCardOpacity(card).should.be.equal(1);
            browser.url('http://panicky-car.surge.sh/');
        });
    });

    function getVisibleCards(index) {
        var res = [0, 1, 2, 3, 4, 5].map(i => ({link: `[for="c-${index + 1}-${i}"]`}));
        res[0].suit = res[4].suit = 'hearts';
        res[1].suit = res[3].suit = 'clubs';
        res[2].suit = res[5].suit = 'diamonds';
        return res;
    }
    function getCardVisibility(card) {
        return browser.getCssProperty(card, 'visibility').value;
    }
    it('should hide cards if suites don\'t match', function () {
        this.timeout(0);
        var cards = [
            {link: hearts[0], suit: 'hearts'}, {link: clubs[0], suit: 'clubs'}, {link: diamonds[0], suit: 'diamonds'},
            {link: clubs[1], suit: 'clubs'}, {link: hearts[1], suit: 'hearts'}, {link: diamonds[1], suit: 'diamonds'}
        ];
        var labels = [0, 1, 2, 3, 4, 5].map(i => ({link: `[for="c-${i + 1}-${i}"]`}));
        cards.forEach((card1, index) => {
            console.log(card1);
            getVisibleCards(index).forEach(card2 => {
                if (card1.suit == card2.suit) {
                    return;
                }
                browser.click(card1.link);
                browser.click(card2.link);
                getCardVisibility(labels[index].link).should.be.equal('hidden');
                getCardVisibility(card2.link).should.be.equal('hidden');
            });
        });
    });

    it('should not hide cards if suites match', function () {
        this.timeout(0);
        var cards = [
            {link: hearts[0], suit: 'hearts'}, {link: clubs[0], suit: 'clubs'}, {link: diamonds[0], suit: 'diamonds'},
            {link: clubs[1], suit: 'clubs'}, {link: hearts[1], suit: 'hearts'}, {link: diamonds[1], suit: 'diamonds'}
        ];
        cards.forEach((card, i) => {
            browser.click(card.link);
            var index = i + 2;
            browser.click(`section:nth-child(${index}) label[for='${card.suit.slice(0, -1)}']`);
            getCardVisibility(card.link).should.be.equal('visible');
            getCardVisibility(cards.find(c => c.link != card.link && c.suit == card.suit).link).should.be.equal('visible');
            browser.url('http://panicky-car.surge.sh/');
        });
    });

    function permutations(array) {
        if (array.length == 1) {
            return [array];
        }
        var res = [];
        permutations(array.slice(1)).forEach(p => {
            for (var i = 0; i < array.length; i++) {
                res.push(p.slice(0, i).concat(array.slice(0, 1)).concat(p.slice(i)))
            }
        });
        return res;
    }

    it('should show "You win" if all cards are visible', function () {
        this.timeout(0);
        var cards = [
            {link: hearts[0], suit: 'hearts'}, {link: clubs[0], suit: 'clubs'}, {link: diamonds[0], suit: 'diamonds'},
            {link: clubs[1], suit: 'clubs'}, {link: hearts[1], suit: 'hearts'}, {link: diamonds[1], suit: 'diamonds'}
        ];
        cards.forEach((card, i) => {
            if (i == 3) {
                getWinOpacity().should.be.equal(1);
                browser.click('footer a');
            }
            browser.click(card.link);
            var index = i + 2;
            browser.click(`section:nth-child(${index}) label[for='${card.suit.slice(0, -1)}']`);
        });
        getWinOpacity().should.be.equal(1);
    })
});
