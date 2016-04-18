var webdriverio = require('webdriverio');
var chai = require('chai');
var expect = chai.expect;

describe('test game', function (){
    this.timeout(99999999);
    var client = {};
    before(function (done){
        client = webdriverio.remote({
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        });
        client.init(done);
    });

    after(function (done) {
        client.end(done);
    });

    it('only first section should be visibility at start', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .getCssProperty('section:first-child', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('visible');
            })
            .getCssProperty('section:nth-child(2)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .getCssProperty('section:nth-child(3)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .getCssProperty('section:nth-child(4)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .getCssProperty('section:nth-child(5)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .getCssProperty('section:nth-child(6)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .getCssProperty('section:nth-child(7)', 'visibility')
            .then(function (result) {
                expect(result.value).to.equal('hidden');
            })
            .call(done);
    });

    it('only one section should be visibility after click', function (done) {
        var countOfVisible = 0;
        client
            .url('http://panicky-car.surge.sh/')
            .click('[for="c-0-0"]')
            .getCssProperty('section:first-child', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(2)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(3)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(4)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(5)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(6)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .getCssProperty('section:nth-child(7)', 'visibility')
            .then(function (result) {
                if(result.value ==='visible') {
                    countOfVisible++;
                }
            })
            .then(function () {
                expect(countOfVisible).to.equal(1);
            })
            .call(done);
    });

    it('should show card onClick', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .click('label[for="c-0-0"]')
            .getCssProperty('label[for="c-0-0"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .call(done)
    })

    it('should save correct pairs', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .click('label[for="c-0-0"]')
            .click('label[for="heart')
            .getCssProperty('label[for="c-0-0"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .getCssProperty('label[for="c-0-4"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .call(done)
    })

    it('should hide wrong pairs', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .click('label[for="c-0-0"]')
            .click('label[for="c-1-5]')
            .getCssProperty('label[for="c-0-0"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(0);
            })
            .getCssProperty('label[for="c-0-4"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(0);
            })
            .call(done)
    })

    it('should hide wrong pairs but show cards which were open before', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .click('label[for="c-0-0"]')
            .click('label[for="heart')
            .click('label[for="c-0-1"]')
            .click('label[for="c-2-5"]')
            .getCssProperty('label[for="c-0-0"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(0);
            })
            .getCssProperty('label[for="c-0-4"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(0);
            })
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .getCssProperty('label[for="c-0-4"]:before', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .call(done)
    })

    it('should show win message if all pairs are open', function (done) {
        client
            .url('http://panicky-car.surge.sh/')
            .click('#heart')
            .click('#club')
            .click('#diamond')
            .getCssProperty('footer a', 'opacity')
            .then(function (result) {
                expect(result.value).to.equal(1);
            })
            .call(done)
    })
});