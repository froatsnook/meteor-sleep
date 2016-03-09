Package.describe({
    name: "froatsnook:sleep",
    summary: "Fiber-friendly/async sleep statements",
    version: "1.1.0",
    git: "https://github.com/froatsnook/meteor-sleep"
});

Package.onUse(function(api) {
    api.versionsFrom("0.9.2");
    api.addFiles("server/sleep.js", ["server"]);
    api.addFiles("client/sleep.js", ["client"]);
});

Package.onTest(function(api) {
    api.use("tinytest");
    api.use("froatsnook:sleep");

    api.addFiles("test/sleep-tests.js");
});

