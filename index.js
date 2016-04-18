describe('Yandex Game Tester', function () {
    it('should draw invisible cards at start', function() {
        browser.url('http://panicky-car.surge.sh/');
        var result = [];
        for (var i = 2; i < 8; i++) {
            var section =  browser.element('main section:nth-child(' + i + ')');
            result.push(section.getCssProperty('visibility').value);
        }
        result.should.deep.equal(['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
    });
    it('should draw card if clicked', function () {
        browser.url('http://panicky-car.surge.sh/');
        browser.click('label[for="c-0-0"]');
        var heartSection = browser.element('main section:nth-child(2)');
        var opacity = heartSection.getCssProperty('visibility').value;
        opacity.should.be.equal('visible');
    });
    it('should make cards visible if same picked', function () {
        var result = [];
        browser.url('http://panicky-car.surge.sh/');
        browser.click('label[for="c-0-0"]');
        var heartSection = browser.element('main section:nth-child(2)');
        result.push(heartSection.getCssProperty('visibility').value);
        browser.click('label[for="c-0-4"]');
        heartSection = browser.element('main section:nth-child(6)');
        result.push(heartSection.getCssProperty('visibility').value);
        heartSection = browser.element('main section:nth-child(2)');
        result.push(heartSection.getCssProperty('visibility').value);
        result.should.deep.equal(['visible', 'hidden', 'hidden']);
    });
    it('should draw win if all right', function () {
        browser.click('label[for="c-0-0"]');
        browser.click('label[for="c-0-4"]');
        browser.click('label[for="c-0-1"]');
        browser.click('label[for="c-0-3"]');
        browser.click('label[for="c-0-2"]');
        browser.click('label[for="c-0-5"]');
        var winNode = browser.element('a=YOU WIN!');
        winNode.getCssProperty('opacity').value.should.be.equal(1);
    });
});
