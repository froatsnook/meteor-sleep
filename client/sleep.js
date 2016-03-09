Meteor.sleep = function(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
    });
};

Meteor.sleepUntil = function(date) {
    if (typeof date === "undefined") {
        return Promise.reject("Missing parameter `date`");
    }

    var now = Date.now();
    var then = +date;
    var ms = Math.max(0, then - now);
    return Meteor.sleep(ms);
};

