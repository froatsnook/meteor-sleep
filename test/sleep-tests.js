if (Meteor.isServer) {
    Meteor.methods({
        sleep: function(ms) {
            var start = Date.now();
            Meteor.sleep(ms);
            var end = Date.now();
            return end - start;
        }
    });

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
    Tinytest.add("typeof Meteor.sleep === \"undefined\"", function(test) {
        test.equal(typeof Meteor.sleep, "undefined");
    });

    Tinytest.add("typeof Meteor.sleepUntil === \"undefined\"", function(test) {
        test.equal(typeof Meteor.sleepUntil, "undefined");
    });

    Tinytest.addAsync("Meteor.sleep(0)", function(test, done) {
        Meteor.call("sleep", 0, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep(1000)", function(test, done) {
        Meteor.call("sleep", 1000, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 1000);
            test.isTrue(variance < 10);
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep()", function(test, done) {
        Meteor.call("sleep", undefined, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        });
    });
}
