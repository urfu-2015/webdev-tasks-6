describe('Yandex.Cards test', function() {
    this.timeout(15000);
    before(function() {
        var chai = require('chai');
        global.assert = chai.assert;
        global.allCards = ['heart', 'diamond', 'club'];
    });

    beforeEach(function (){
        browser.url('http://panicky-car.surge.sh');
    });

    it('labels with empty image should be hidden', function () {
        allCards.forEach(function (elem) {
            assert.isOk(browser.element('section:not([class]) > .card.' + elem).isVisible());
        });
    });

    it('cards should be hidden in heart section', function () {
        allCards.forEach(function(labelClass) {
                assert.isNotOk(browser.element('section.heart > .card.' + labelClass).isVisible());
            }
        )
    });

    it('cards should be hidden in club section', function () {
        allCards.forEach(
            function(labelClass) {
                assert.isNotOk(browser.element('section.club > .card.' + labelClass).isVisible());
            }
        )
    });

    it('cards should be hidden in diamond section', function () {
        allCards.forEach(
            function(labelClass) {
                assert.isNotOk(browser.element('section.diamond > .card.' + labelClass).isVisible());
            }
        )
    });

    it('should make visible only heart in section heart', function () {
        //выбираем самую первую карточку
        browser.click('[for="c-0-0"]');
        assert.isOk(browser.element('section.heart > .card.heart').isVisible());
        assert.isNotOk(browser.element('section.diamond > .card.heart').isVisible());
        assert.isNotOk(browser.element('section.club > .card.heart').isVisible());
    });


    it('should make visible only diamond in section diamond', function () {
        //выбираем самую первую карточку
        browser.click('[for="c-0-2"]');
        assert.isNotOk(browser.element('section.heart > .card.diamond').isVisible());
        assert.isOk(browser.element('section.diamond > .card.diamond').isVisible());
        assert.isNotOk(browser.element('section.club > .card.diamond').isVisible());
    });

    it('should hidden all cards', function () {
        //выбрали 1-ую
        browser.click('[for="c-0-0"]');
        //выбрали 3-ю, что неверно, закрыли все карты
        browser.click('[for="c-1-3"]');
        assert.isNotOk(browser.element('section.heart > .card.heart').isVisible());
        assert.isNotOk(browser.element('section.diamond > .card.heart').isVisible());
        assert.isNotOk(browser.element('section.club > .card.heart').isVisible());
    });

    it('should open two cards', function () {
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        //когда 2 карты открыты, то отображение передается section без классов,
        // а точнее регулируется в opacity label.club:before, но данный селектор не принимает element
        assert.isNotOk(browser.element('section.club > .card.club').isVisible());
        assert.isNotOk(browser.element('section.club > .card.heart').isVisible());
        assert.isNotOk(browser.element('section.club > .card.diamond').isVisible());
        assert.isOk(browser.element('#club').getAttribute('checked'));
    });

    it('should close only one card', function () {
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-0"]');
        assert.isOk(browser.element('section.heart > .card.heart').isVisible());
        browser.click('[for="c-1-5"]');
        assert.isNotOk(browser.element('section.heart > .card.heart').isVisible());
    });

    it('it should winner', function () {
        browser.click('[for="c-0-1"]');
        browser.click('[for="club"]');
        browser.click('[for="c-0-0"]');
        browser.click('[for="heart"]');
        browser.click('[for="c-0-2"]');
        browser.click('[for="diamond"]');
        assert.isOk(browser.element('#club').getAttribute('checked'));
        assert.isOk(browser.element('#heart').getAttribute('checked'));
        assert.isOk(browser.element('#diamond').getAttribute('checked'));
        assert.equal(browser.element('footer > a').getCssProperty('opacity').value, 1);
    })
});
