var assert = require('assert');
var webdriverio = require('webdriverio');

describe('Яндекс Карты', function() {
    this.timeout(20000);

    // Выбираем произвольную карту и проверяем, что ее видно
    it('should be visible card', function () {
        browser.url('http://panicky-car.surge.sh/');

        // Выбор произвольной карты
        browser.click('[for="c-0-3"]'); // ♣︎

        // Проверяем, что ее видно
        var clubCard = browser.element('[for="c-0-3"]');
        var clubCardOpacity = clubCard.getCssProperty('opacity');

        //console.log(clubCardOpacity);
        assert.equal(clubCardOpacity.value, 1);
    });

    // После выбора всех карт - выигрываем
    it('should be won after right cards', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');

        var winElem = browser.element('<a>');
        assert.equal(winElem.getCssProperty('opacity').value, 1);
    });

    // Выбираем две карты из начального состояния
    it('should return to init state after wrong cards', function () {
        browser.url('http://panicky-car.surge.sh/');

        browser.click('[for="c-0-0"]'); // выбираем первую карту ♥︎
        browser.click('[for="c-1-1"]'); // выбираем вторую карту ♣︎

        // Проверяем, что вернулись в начальное состояние
        // Т.е вторая карта спрятана
        var clubCard = browser.element('[for="c-1-1"]');
        var clubCardVisibility = clubCard.getCssProperty('visibility');
        //console.log(clubCardVisibility);
        assert.equal(clubCardVisibility.value, 'hidden');
    });

    // Выбираем еще две карты при правильно выбранных двух
    it('should return to two checked cards', function () {
        browser.url('http://panicky-car.surge.sh/');

        // Выбор двух правильных карт
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');

        // Выбор еще двух произвольных
        browser.click('[for="c-0-1"]'); // выбираем первую карту ♣︎
        browser.click('[for="c-2-2"]'); // выбираем вторую карту ♦︎︎

        // Проверяем, что вернулись в состояние с двумя картами
        // Т.е только что выбранные карты пропали
        var clubCard = browser.element('[for="c-0-1"]');
        // не смог заставить работать псевдоэлементы, говорят, еще не поддерживается
        var clubCardVisibility = clubCard.getCssProperty('visibility');

        var diamondCard = browser.element('[for="c-2-2"]');
        var diamondCardVisibility = diamondCard.getCssProperty('visibility');
        // console.log(clubCardVisibility);
        // console.log(diamondCardVisibility);
        assert.equal(diamondCardVisibility.value, 'hidden');
    });

    // Выбираем две правильные карты при правильно выбранных двух
    it('should return to two checked cards', function () {
        browser.url('http://panicky-car.surge.sh/');

        // Выбор двух правильных карт
        browser.click('[for="c-0-0"]'); // первая ♥︎
        browser.click('[for="heart"]'); // вторая ♥︎

        // Выбор еще двух правильных
        browser.click('[for="c-0-2"]'); // выбираем первую карту ♦︎︎
        browser.click('[for="diamond"]'); // выбираем вторую карту ♦︎︎

        // Проверяем, что остались все 4 карты
        var hearCardGroup = browser.element('#heart');
        var hearCardGroupVisibility = hearCardGroup.getAttribute('checked');

        var diamondCardGroup = browser.element('#heart');
        var diamondCardGroupVisibility = diamondCardGroup.getAttribute('checked');

        // console.log(hearCardGroupVisibility, diamondCardGroupVisibility);
        assert.equal(hearCardGroupVisibility, 'true');
        assert.equal(diamondCardGroupVisibility, 'true');
    });
});