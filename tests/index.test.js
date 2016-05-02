var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;
const SITE_FOR_TEST = "http://panicky-car.surge.sh/";

describe('test application "Cards', function() {
    function checkOpacity (element, NotForElement) {
        var resultOpacity;
        if (NotForElement) {
            resultOpacity = browser.element(element).getCssProperty('opacity');
        } else {
            resultOpacity = browser.element('[for=' + element + ']').getCssProperty('opacity');
        }
        resultOpacity.value.should.be.equal(1);
    }

    function checkFailVisability (element) {
        var resultVisibility = browser.element('[for=' + element + ']').getCssProperty('visibility');
        resultVisibility.value.should.be.equal('hidden');
    }

    beforeEach(function() {
        browser.url(SITE_FOR_TEST);
    });
    
    describe('test first open card', function () {

        it('should show only first if first clicked', function () {
            browser.click('[for="c-0-0"]');
            checkOpacity("c-0-0");
        });
        it('should show only second if second clicked', function () {
            browser.click('[for="c-0-1"]');
            checkOpacity("c-0-1");
        });
        it('should show only third if third clicked', function () {
            browser.click('[for="c-0-2"]');
            checkOpacity("c-0-2");
        });
        it('should show only fourth if fourth clicked', function () {
            browser.click('[for="c-0-3"]');
            checkOpacity("c-0-3");
        });
        it('should show only fifth if fifth clicked', function () {
            browser.click('[for="c-0-4"]');
            checkOpacity("c-0-4");
        });
        it('should show only sixth if sixth clicked', function () {
            browser.click('[for="c-0-5"]');
            checkOpacity("c-0-5");
        });
    });
    describe('test failed if second card not right', function () {
        it('should hide first card if second card clicked after it', function () {
            browser.click('[for="c-0-0"]');
            browser.click('[for="c-1-1"]');
            checkFailVisability("c-1-1");
        });
        it('should hide second card if third card clicked after it', function () {
            browser.click('[for="c-0-0"]');
            browser.click('[for="c-1-2"]');
            checkFailVisability("c-1-2");
        });
    });
    describe('test open card after 2 opened cards', function () {
        it('should open 3rd card after open 1st and 5th', function () {
            browser.click('[for="c-0-0"]');
            browser.click('[for="heart"]');
            browser.click('[for="c-0-2"]');
            checkOpacity("c-0-2");
        });
        it('should open 6st card after open 2nd and 4th', function () {
            browser.click('[for="c-0-1"]');
            browser.click('[for="club"]');
            browser.click('[for="c-0-0"]');
            checkOpacity("c-0-0");
        });
    });
    describe('test open 2 pair of cards', function () {
        it('should open 2 and 4, 1 and 5', function () {
            browser.click('[for="c-0-1"]');
            browser.click('[for="club"]');
            browser.click('[for="c-0-0"]');
            browser.click('[for="heart"]');
            checkOpacity("heart");
        });
    });
    describe('open all cards', function () {
        it('should call win element', function () {
            browser.click('[for="c-0-1"]');
            browser.click('[for="club"]');
            browser.click('[for="c-0-0"]');
            browser.click('[for="heart"]');
            browser.click('[for="c-0-2"]');
            browser.click('[for="diamond"]');
            checkOpacity('<a>', true);
        });
    });
});