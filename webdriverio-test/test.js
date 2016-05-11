'use strict';
var chai = require('chai');
var should = chai.should();

const diamonds = ['[for="c-0-2"]', '[for="c-0-5"]'];
const hearts = ['[for="c-0-0"]', '[for="c-0-4"]'];
const clubs = ['[for="c-0-1"]', '[for="c-0-3"]'];
const allCards = diamonds.concat(hearts).concat(clubs);
const winMessage = 'footer a';

browser.addCommand('getElementOpacity', function (element) {
    return parseInt(browser.execute(`return window
        .getComputedStyle(document.querySelector('${element}'), ':before')
        .getPropertyValue('opacity');`
    ).value, 10);
});

describe('panicky-car', function () {
    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
    });

    it('should not show cards at start', function () {
        for (let j = 0; j < 6; j++) {
            browser.getElementOpacity(allCards[j]).should.be.equal(0);
        }
    });

    // it('should show card on click', function () {
    //     for (let j = 0; j < 6; j++) {
    //         browser.click(allCards[j]);
    //         browser.getElementOpacity(allCards[j]).should.be.equal(0);
    //         browser.url('http://panicky-car.surge.sh/');
    //     }
    // });
    //
    // it('should hide cards if suites don\'t match', function () {
    //     var pairs = [
    //         clubs, clubs.reverse(),
    //         diamonds, diamonds.reverse(),
    //         hearts, hearts.reverse()
    //     ];
    //     for (var i = 0; i < pairs.length; i++) {
    //         for (var j = 0; j < pairs[i].length; j++) {
    //             browser.click(pairs[i][j]);
    //             for (var k = i + 1; k < pairs.length; k++) {
    //                 for (var l = 0; l < pairs[k].length; l++) {
    //                     browser.click(pairs[k][l]);
    //                     browser.getElementOpacity(pairs[k][l]).should.be.equal(0);
    //                     browser.getElementOpacity(pairs[i][j]).should.be.equal(0);
    //                     browser.url('http://panicky-car.surge.sh/');
    //                 }
    //             }
    //         }
    //     }
    // });

    // it('should not hide cards if suites match', function () {
    //     var pairs = [
    //         clubs, clubs.reverse(),
    //         diamonds, diamonds.reverse(),
    //         hearts, hearts.reverse()
    //     ];
    //     pairs.forEach(p => {
    //         browser.click(p[0]);
    //         browser.click(p[1]);
    //         browser.getElementOpacity(p[0]).should.be.equal(1);
    //         browser.getElementOpacity(p[1]).should.be.equal(1);
    //         browser.url('http://panicky-car.surge.sh/');
    //     });
    // });
    //
    // it('should show "You win" if all cards are visible', function () {
    //     var permutations = permutations([clubs, hearts, diamonds]);
    //     permutations.forEach(function (perm) {
    //         for (var i = 0; i < perm.length; i += 2) {
    //             browser.click(perm[i]);
    //             browser.click(perm[i + 1]);
    //             browser.getElementOpacity(winMessage).should.be.equal(1);
    //             browser.url('http://panicky-car.surge.sh/');
    //         }
    //     });
    // })
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