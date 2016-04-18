var gemini = require('gemini');

gemini.suite('cards', function (suite) {

    suite.setUrl('/')
        .setCaptureElements('section')

        .before(function (actions) {
            actions.wait(2000);
        })

        .capture('plain')

        .capture('checked one card', function (actions) {
            actions.click('[for="c-0-0"]');
        })

        .capture('checked wrong pair', function (actions) {
            actions.click('[for="c-1-1"]');
            actions.wait(2000);
        })

        .capture('checked right pair', function (actions) {
            actions.click('[for="c-0-0"]');
            actions.click('[for="heart"]');
        })

        .capture('checked right pair and one card', function (actions) {
            actions.click('[for="c-0-1"]');
        })

        .capture('checked all right pair', function (actions) {
            actions.click('[for="club"]');
            actions.click('[for="c-0-2"]');
            actions.click('[for="diamond"]');
            actions.wait(1000);
        });
});
