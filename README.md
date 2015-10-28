![RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-logo-full.png)

A REST client for the rest of us.

_Note: This is the source code, the extension download is [here](https://addons.mozilla.org/en-US/firefox/addon/rested/?src=search)._

[![Build Status](https://travis-ci.org/esphen/RESTED.svg?branch=master)](https://travis-ci.org/esphen/RESTED)

RESTED is a new take on rest clients on Firefox.
It is designed to be easy to use to let you work as effective as possible.
It features all the most commonly used HTTP methods, setting headers, beautiful themes,
saving requests in your browser, and more.

Since this is a relatively new project, I am also happy to announce that
it is also awesomely easy to contribute to the project! Everything is
javascript and html, so come join! All contributions welcome (but no guarantees
that they will be merged - requests will be reviewed).

![Image of RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-app.png)

## How to contribute
This project was from the very beginning intended to be easy to work with.
It is basically just an angular 1.4 app inside of Firefox, so if you know angular, you're in luck!

What features are on the to-do list:
 - Request history
 - Export collections

In order to work on this project, you're going to need a few things:
 - [Firefox](http://funny-pictures-blog.com/wp-content/uploads/funny-pictures/Hurr-durr.jpg) (duh)
 - [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_%28jpm%29), the build system for Firefox extensions
 - [Extension Auto-Installer](https://palant.de/2012/01/13/extension-auto-installer). Not neccecary, but highly reccomended

Once these formalities are in order, you can start developing.

If you use the Extension Auto-Installer, clone this project and run `jpm watchpost --post-url http://localhost:8888` in the root folder.
The extension will then be reinstalled every time you save a file, without you having to do a thing.

If you don't use Extension Auto-Installer, you need to do what the extension does for you manually every time you save.
That is, `jpm xpi && firefox rested@restedclient-0.x.y.xpi` (remember to change the version number).

Note: Soon Mozilla will require unsigned extenstions (not from addons.mozilla.org) to be run in [Nightly](https://www.mozilla.org/firefox/nightly/).
If you see a "RESTED could not be verified for use in Firefox", you may need to go get Nightly and develop from there. You also need to go to
[about:config](about:config) and the following flags to false: `xpinstall.signatures.required` and `xpinstall.whitelist.required`.

Protip: If you are working on IndexedDB and fail to inspect the contents with the dev tools, that may be because you can't do that in
a chrome URL. Try starting up a [static webserver](https://www.npmjs.com/package/static-server) in the data directory of the project and
dev tools should work as normal. Note that you cannot run requests from the static web server, as one does not have the elevated
permissions the chrome URLs get.

Another indexedDB tip: If you need to empty and reset the database, enter `indexedDB.deleteDatabase('RESTED');` into your developer console.
That should clear the entire database and force a clean install on refresh.

**Please develop on the next branch.**
This makes it easier for me to merge and prepare releases in the future.
Thanks for the interest!

### Tests
This project runs unit tests through travis-ci. This is to ensure critical components correctness, there is no 100% test coverage requirement.
If you make an addition, please consider if your change is critical in nature, i.e. would cause grief if stops working or is not correct.
If this is the case, please write unit tests for your feature.

In order to run the test suite on your machine, the following is required:
 - [nodejs](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 - [nvm](https://github.com/creationix/nvm)

After installing the required components, navigate to the root folder of the project and set up the test suite:
```
$ nvm use
$ npm install
```

Now you can `npm test` for a single-run test, or `npm run dev` for continually watching files and running tests on change.

