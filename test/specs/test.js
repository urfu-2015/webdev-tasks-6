'use strict';

const data = require('./data.json');
require('chai').should();

describe('Яндекс игра', function() {
    beforeEach(() => {
        browser.url(data.url);
    });
    this.timeout(1000000);

    //  если нажимаем карту, то она становится видна
    it('should show card', function () {
        browser.click(data.firstTest.card);

        const card = browser.element(data.firstTest.card);
        const opacity = card.getCssProperty('opacity').value;
        opacity.should.be.equal(1);
    });

    // если нажимаем две карты, но они не совпадают
    it('should return to start', function () {
        browser.click(data.secondTest.firstCard);
        browser.click(data.secondTest.secondCard);

        const section = browser.element(data.secondTest.visibleCard);
        let visibility = section.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const secondCard = browser.element(data.secondTest.invisibleCard);
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');
    });

    // если нажимаем две карты, и они совпадают
    it('should show two card', function () {
        browser.click(data.thirdTest.firstCard);
        browser.click(data.thirdTest.secondCard);

        const firstCard = browser.element(data.thirdTest.firstVisibleCard);
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const secondCard = browser.element(data.thirdTest.secondVisibleCard);
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');
    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, но они не совпадают
     пример: ♥ -> ♥ -> ♣ -> ♦
     */
    it('should show two cards that clicked first', function () {
        browser.click(data.fourthTest.firstCard);
        browser.click(data.fourthTest.secondCard);
        browser.click(data.fourthTest.thirdCard);
        browser.click(data.fourthTest.fourthCard);

        const firstCard = browser.element(data.fourthTest.firstVisibleCard);
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const secondCard = browser.element(data.fourthTest.secondVisibleCard);
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const fourthCard = browser.element(data.fourthTest.invisibleCard);
        visibility = fourthCard.getCssProperty('visibility').value;
        visibility.should.be.equal('hidden');
    });

    /*  если нажимаем две карты, и они совпадают
     потом нажимаем еще две, и они совпадают
     пример: ♥ -> ♥ -> ♣ -> ♣
     */
    it('should show two cards that clicked first', function () {
        browser.click(data.fifthTest.firstCard);
        browser.click(data.fifthTest.secondCard);
        browser.click(data.fifthTest.thirdCard);
        browser.click(data.fifthTest.fourthCard);

        const firstCard = browser.element(data.fifthTest.firstVisibleCard);
        let visibility = firstCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const secondCard = browser.element(data.fifthTest.secondVisibleCard);
        visibility = secondCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const thirdCard = browser.element(data.fifthTest.thirdVisibleCard);
        visibility = thirdCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');

        const fourthCard = browser.element(data.fifthTest.fourthVisibleCard);
        visibility = fourthCard.getCssProperty('visibility').value;
        visibility.should.be.equal('visible');
    });

    /* если все карты угадали, то выигрываем
     пример: ♥ -> ♥ -> ♣ -> ♣ -> ♦ -> ♦
     */
    it('should show win text', function () {
        browser.click(data.sixthTest.firstCard);
        browser.click(data.sixthTest.secondCard);
        browser.click(data.sixthTest.thirdCard);
        browser.click(data.sixthTest.fourthCard);
        browser.click(data.sixthTest.fifthCard);
        browser.click(data.sixthTest.sixthCard);

        const link = browser.element(data.sixthTest.visibleElement);
        const opacity = link.getCssProperty('opacity').value;
        opacity.should.be.equal(1);
    });
});
