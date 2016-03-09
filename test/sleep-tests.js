if (Meteor.isServer) {
    Tinytest.add("typeof Meteor.sleep === \"function\"", function(test) {
        test.equal(typeof Meteor.sleep, "function");
    });

    Tinytest.addAsync("for (var i=0;i<5;i++)Meteor.sleep(200);", function(test, done) {
        var start = Date.now();
        for (var i = 0; i < 5; i++) {
            Meteor.sleep(200);
        }
        var end = Date.now();
        var elapsed = end - start;
        var variance = Math.abs(1000 - elapsed);
        test.isTrue(variance < 10);
        done();
    });

    Tinytest.add("Meteor.sleepUntil() throws", function(test) {
        try {
            Meteor.sleepUntil();
            test.equal("did not throw", "did throw");
        } catch (err) {
            test.equal("did throw", "did throw");
        }
    });

    Tinytest.add("Meteor.sleepUntil(0) returns fast", function(test) {
        var start = Date.now();
        Meteor.sleepUntil(0);
        var end = Date.now();
        var elapsed = end - start;
        var variance = Math.abs(0 - elapsed);
        test.isTrue(variance < 10);
    });

    Tinytest.add("Meteor.sleepUntil(now + 1000)", function(test) {
        var start = Date.now();
        Meteor.sleepUntil(+start + 1000);
        var end = Date.now();
        var elapsed = end - start;
        var variance = Math.abs(1000 - elapsed);
        test.isTrue(variance < 10);
    });

    Tinytest.add("Meteor.sleepUntil(200 ms from now)", function(test) {
        var start = Date.now();
        var date = new Date();
        date.setTime(date.getTime() + 200);
        Meteor.sleepUntil(date);
        var end = Date.now();
        var elapsed = end - start;
        var variance = Math.abs(200 - elapsed);
        test.isTrue(variance < 10);
    });

    Tinytest.add("Meteor.sleepUntil(next minute)", function(test) {
        var date = new Date();
        date.setMinutes(date.getMinutes() + 1);
        date.setSeconds(0);
        Meteor.sleepUntil(date);

        var now = new Date();
        var diff = Math.abs(now.getTime() - date.getTime());
        test.isTrue(diff < 10);
    });
} else {
    Tinytest.add("typeof Meteor.sleep === \"function\"", function(test) {
        test.equal(typeof Meteor.sleep, "function");
    });

    Tinytest.add("typeof Meteor.sleepUntil === \"function\"", function(test) {
        test.equal(typeof Meteor.sleepUntil, "function");
    });

    Tinytest.add("Meteor.sleep returns a Promise", function(test) {
        test.isTrue(Meteor.sleep() instanceof Promise);
    });

    Tinytest.addAsync("Meteor.sleep()", function(test, done) {
        var start = Date.now();
        Meteor.sleep()
        .then(function() {
            var now = Date.now();
            var elapsed = now - start;
            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        })
        .catch(function() {
            test.fail();
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep(0)", function(test, done) {
        var start = Date.now();
        Meteor.sleep(0)
        .then(function() {
            var now = Date.now();
            var elapsed = now - start;
            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        })
        .catch(function() {
            test.fail();
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep(200)", function(test, done) {
        var start = Date.now();
        Meteor.sleep(200)
        .then(function() {
            var now = Date.now();
            var elapsed = now - start;
            var variance = Math.abs(elapsed - 200);
            test.isTrue(variance < 10);
            done();
        })
        .catch(function() {
            test.fail();
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleepUntil() returns rejected promise", function(test, done) {
        Meteor.sleepUntil()
        .then(function() {
            test.fail();
            done();
        })
        .catch(function() {
            test.ok();
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleepUntil(now + 1000)", function(test, done) {
        var start = Date.now();

        Meteor.sleepUntil(+start + 1000)
        .then(function() {
            var end = Date.now();
            var elapsed = end - start;
            var variance = Math.abs(1000 - elapsed);
            test.isTrue(variance < 10);
            done();
        });
    });

}

