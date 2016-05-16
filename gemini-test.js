var gemini = require('gemini');
var getNameAttributeSelector = require('./index.js');

gemini.suite('cards', function (suite) {

    suite.setUrl('/')
        .setCaptureElements('section')

        .before(function (actions) {
            actions.wait(2000);
        })

        .capture('plain')

        .capture('checked one card', function (actions) {
            actions.click(getNameAttributeSelector('c-0-0'));
        })

        .capture('checked wrong pair', function (actions) {
            actions.click(getNameAttributeSelector('c-1-1'));
            actions.wait(2000);
        })

        .capture('checked right pair', function (actions) {
            actions.click(getNameAttributeSelector('c-0-0'));
            actions.click(getNameAttributeSelector('heart'));
        })

        .capture('checked right pair and one card', function (actions) {
            actions.click(getNameAttributeSelector('c-0-1'));
        })

        .capture('checked all right pair', function (actions) {
            actions.click(getNameAttributeSelector('club'));
            actions.click(getNameAttributeSelector('c-0-2'));
            actions.click(getNameAttributeSelector('diamond'));
            actions.wait(1000);
        })

        .capture('checked new game', function (actions) {
            actions.click(getNameAttributeSelector('c-0-0'));
            actions.click(getNameAttributeSelector('heart'));
            actions.click(getNameAttributeSelector('c-0-1'));
            actions.click(getNameAttributeSelector('club'));
            actions.click(getNameAttributeSelector('c-0-2'));
            actions.click(getNameAttributeSelector('diamond'));
            actions.click('footer a');
            actions.wait(2000);
        });
});
