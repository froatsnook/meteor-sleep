Package.describe({
    name: "froatsnook:sleep",
    summary: "Fiber-friendly sleep statements (server only)",
    version: "1.0.2",
    git: "https://github.com/froatsnook/meteor-sleep"
});

Package.onUse(function(api) {
    api.versionsFrom("0.9.2");
    api.addFiles("server/lib/sleep.js", ["server"]);
});

Package.onTest(function(api) {
    api.use("tinytest");
    api.use("froatsnook:sleep");

    api.addFiles("test/sleep-tests.js");
});

