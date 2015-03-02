var asyncSleep = function(ms, callback) {
    Meteor.setTimeout(function() {
        callback(null);
    }, ms);
};

if (typeof Meteor.wrapAsync !== "undefined") {
    Meteor.sleep = Meteor.wrapAsync(asyncSleep);
} else {
    Meteor.sleep = Meteor._wrapAsync(asyncSleep);
}

