casper.test.begin('Open site', 1, function (test) {
    casper
        .start('http://panicky-car.surge.sh', function() {
            test.assertHttpStatus(200);
        })
        .run(function () {
            test.done();
        });
});
