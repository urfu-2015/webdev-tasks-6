var should = require('chai').should();

describe('Card game', function() {
    it('should start with clear field', function () {
        browser.url('http://panicky-car.surge.sh/');
        var radio = browser.isSelected('input[type="radio"]');
        for (var i=0; i<radio.length; i++) {
            radio[i].should.be.false;
        }

    });

    it('should show picked card', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(800);
        browser.click('label[for="c-0-0"]');
        var pickedCard = browser.getCssProperty('label[for="c-0-0"]', 'visibility');
        pickedCard.value.should.be.equal('visible');
    });

    it('should hide 2 different cards', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(800);
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-1-1"]');
        browser.pause(800);
        browser.getCssProperty('label[for="c-0-0"]', 'visibility').value.should.be.equal('visible');
        browser.getCssProperty('label[for="c-0-1"]', 'visibility').value.should.be.equal('visible');
        browser.getCssProperty('label[for="c-1-0"]', 'visibility').value.should.be.equal('hidden');
        browser.getCssProperty('label[for="c-1-1"]', 'visibility').value.should.be.equal('hidden');
    });

    it('should not hide 2 same cards', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(800);
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.pause(800);
        browser.isSelected('#heart').should.be.true;
    });

    it('should show victory phrase', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.pause(800);
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="heart"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="club"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="diamond"]');
        browser.pause(800);
        browser.getCssProperty('footer', 'visibility').value.should.be.equal('visible');
    });
});
