var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;

function checkOpacity (element, browser) {
    var resultOpacity = browser.element('[for=' + element + ']').getCssProperty('opacity');
    resultOpacity.value.should.be.greaterThan(0);
}

function checkFailVisability (element, browser) {
    var resultVisibility = browser.element('[for=' + element + ']').getCssProperty('visibility');
    resultVisibility.value.should.be.equal('hidden');
}

describe('test first open card', function () {
    it('should show only first if first clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-0"]');
        checkOpacity("c-0-0", browser);
    });
    it('should show only second if second clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-1"]');
        checkOpacity("c-0-1", browser);
    });
    it('should show only third if third clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-2"]');
        checkOpacity("c-0-2", browser);
    });
    it('should show only fourth if fourth clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-3"]');
        checkOpacity("c-0-3", browser);
    });
    it('should show only fifth if fifth clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-4"]');
        checkOpacity("c-0-4", browser);
    });
    it('should show only sixth if sixth clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-5"]');
        checkOpacity("c-0-5", browser);
    });
});
describe('test failed if second card not right', function () {
    it('should hide first card if second card clicked after it', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-1"]');
        checkFailVisability("c-1-1", browser);
    });
    it('should hide second card if third card clicked after it', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-0"]');
        browser.click('[for="c-1-2"]');
        checkFailVisability("c-1-2", browser);
    });
});
describe('test open card after 2 opened cards', function () {
    it('should open 3rd card after open 1st and 5th', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        checkOpacity("c-0-2", browser);
    });
    it('should open 6st card after open 2nd and 4th', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-0"]');
        checkOpacity("c-0-0", browser);
    });
});
describe('test open 2 pair of cards', function () {
    it('should open 2 and 4, 1 and 5', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        checkOpacity("heart", browser);
    });
});
describe('open all cards', function () {
    it('should call win element', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        browser.element('<a>').getCssProperty('opacity').value.should.equal(1);
    });
});