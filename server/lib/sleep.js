var caller = function(ms, callback) {
    Meteor.setTimeout(function() {
        callback(null);
    }, ms);
};

if (typeof Meteor.wrapAsync !== "undefined") {
    Meteor.sleep = Meteor.wrapAsync(caller);
} else {
    Meteor.sleep = Meteor._wrapAsync(caller);
}

