var gemini =require('gemini');

gemini.suite('Cards placeholder', function(suite) {
    suite.setUrl('/')
        .setCaptureElements('main section:first-child')
        .capture('plain');
});

gemini.suite('Right pairs', function(suite) {
    suite.setUrl('/')
        .setCaptureElements('main section:first-child')
        .capture('clicked first club', (actions, find) => {
            actions.click('[for="c-0-1"]');
        })
        .capture('clicked second club', (actions, find) => {
            actions.click('[for="club"]');
        })
        .capture('clicked first heart', (actions, find) => {
            actions.click('[for="c-0-0"]');
        })
        .capture('clicked second heart', (actions, find) => {
            actions.click('[for="heart"]');
        })
        .capture('clicked first diamond', (actions, find) => {
            actions.click('[for="c-0-2"]');
        })
        .capture('clicked second diamond', (actions, find) => {
            actions.click('[for="diamond"]');
        });
});