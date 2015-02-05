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
} else {
    Tinytest.add("typeof Meteor.sleep === \"undefined\"", function(test) {
        test.equal(typeof Meteor.sleep, "undefined");
    });

    Tinytest.addAsync("Meteor.sleep(0)", function(test, done) {
        if (!Meteor.isClient) {
            done();
            return;
        }

        Meteor.call("sleep", 0, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep(1000)", function(test, done) {
        if (!Meteor.isClient) {
            done();
            return;
        }

        Meteor.call("sleep", 1000, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 1000);
            test.isTrue(variance < 10);
            done();
        });
    });

    Tinytest.addAsync("Meteor.sleep()", function(test, done) {
        if (!Meteor.isClient) {
            done();
            return;
        }

        Meteor.call("sleep", undefined, function(err, elapsed) {
            test.isUndefined(err);

            var variance = Math.abs(elapsed - 0);
            test.isTrue(variance < 10);
            done();
        });
    });
}
