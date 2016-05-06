var should = require('chai').should();
var responseTime = 800;
var firstCard = 'label[for="c-0-0"]';
var secondCard = 'label[for="c-0-1"]';
var thirdCard = 'label[for="c-0-2"]';
var secondHeartWhenFirstIsOpened = 'label[for="heart"]';
var secondClubWhenFirstIsOpened = 'label[for="club"]';
var secondDiamondWhenFirstIsOpened = 'label[for="diamond"]';
var firstCardWhenFirstIsSelected = 'label[for="c-1-0"]';
var secondCardWhenFirstIsSelected = 'label[for="c-1-1"]';
var thirdCardWhenSecondIsSelected = 'label[for="c-2-2"]';

describe('Card game', function() {
    beforeEach(function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(responseTime);
    });

    it('should be written without any scripts', function () {
        browser.isExisting('script').should.be.false;
    });

    it('should start with clear field', function () {
        var radio = browser.isSelected('input[type="radio"]');
        for (var i=0; i<radio.length; i++) {
            radio[i].should.be.false;
        }

    });

    it('should show picked card', function () {
        browser.click(firstCard);
        var pickedCard = browser.getCssProperty(firstCard, 'visibility');
        pickedCard.value.should.be.equal('visible');
    });

    it('should hide 2 different cards', function () {
        browser.click(firstCard);
        browser.click(secondCardWhenFirstIsSelected);
        browser.pause(responseTime);
        browser.getCssProperty(firstCard, 'visibility').value.should.be.equal('visible');
        browser.getCssProperty(secondCard, 'visibility').value.should.be.equal('visible');
        browser.getCssProperty(firstCardWhenFirstIsSelected, 'visibility').value.should.be.equal('hidden');
        browser.getCssProperty(secondCardWhenFirstIsSelected, 'visibility').value.should.be.equal('hidden');
    });

    it('should not hide 2 same cards', function () {
        browser.click(firstCard);
        browser.click(secondHeartWhenFirstIsOpened);
        browser.pause(responseTime);
        browser.isSelected('#heart').should.be.true;
    });

    it('should not hide guessed cards while hiding other', function () {
        browser.click(firstCard);
        browser.click(secondHeartWhenFirstIsOpened);
        browser.click(secondCard);
        browser.click(thirdCardWhenSecondIsSelected);
        browser.pause(responseTime);
        browser.isSelected('#heart').should.be.true;
    });

    it('should show victory phrase', function () {
        browser.click(firstCard);
        browser.click(secondHeartWhenFirstIsOpened);
        browser.click(secondCard);
        browser.click(secondClubWhenFirstIsOpened);
        browser.click(thirdCard);
        browser.click(secondDiamondWhenFirstIsOpened);
        browser.pause(responseTime);
        browser.getCssProperty('footer', 'visibility').value.should.be.equal('visible');
    });

    it('should restart game', function () {
        browser.click(firstCard);
        browser.click(secondHeartWhenFirstIsOpened);
        browser.click(secondCard);
        browser.click(secondClubWhenFirstIsOpened);
        browser.click(thirdCard);
        browser.click(secondDiamondWhenFirstIsOpened);
        browser.pause(responseTime);
        browser.click('footer a');
        browser.pause(responseTime);
        var radio = browser.isSelected('input[type="radio"]');
        for (var i=0; i<radio.length; i++) {
            radio[i].should.be.false;
        }
    });
});
