![RESTED](https://github.com/esphen/RESTED/raw/master/doc/images/rested-logo-full.png)

A REST client for the rest of us.

_Note: This is the source code, the extension download is [here](https://addons.mozilla.org/en-US/firefox/addon/rested/?src=github)._

[![Build Status](https://travis-ci.org/esphen/RESTED.svg?branch=next)](https://travis-ci.org/esphen/RESTED)
[![Coverage Status](https://coveralls.io/repos/github/esphen/RESTED/badge.svg?branch=next)](https://coveralls.io/github/esphen/RESTED?branch=next)
[![Join the chat at https://gitter.im/RESTEDclient](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/RESTEDclient?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**RESTED** is a new take on REST clients for browsers.

It is designed to be easy to use to let you work as effective as possible.
It features all the most commonly used HTTP methods, setting headers, beautiful themes,
saving requests in your browser, and more.
**RESTED** is built upon all the latest web technologies to make
both the user's and developer's experience as great as possible. _Enjoy!_


Since this is a relatively new project, I am also happy to announce that
it is also awesomely easy to contribute to the project! Everything is
javascript and html using React.js and Redux, so come join! All contributions
welcome.

![Image of RESTED](https://github.com/esphen/RESTED/raw/master/doc/images/rested-app.png)

## How to contribute
In order to work on this project, you're going to need a few things:
 - [nvm](https://github.com/creationix/nvm)
   - Alternately node 6.x and npm 3.x
 - [yarn](https://yarnpkg.com/en/docs/install)
 - A browser with WebExtension support

Now to set up your development environment. First, check out the repository from
git and open a terminal in it. Then you need to symlink in the correct manifest
file to the root directory of the project.

    # For Firefox
    ln -s firefox/manifest.json

    # For Chrome and Opera
    ln -s google-chrome/manifest.json

Once these formalities are in order, you can start the development server which
will compile the code into something that can be loaded in the browser.

    nvm install
    yarn
    yarn start

Now you can go into your favourite browser's extension panel and enable
developer mode. Then manually load the extension as a "Temporary Add-on" or
an "Unpackaged extension". In Firefox, this panel is hidden in
`about:debugging#addons`.

If you need to empty and reset the database, enter
`chrome.storage.local.clear()` into your developer console. That should clear
the entire database and force a clean install on refresh.

**Please develop on the next branch.**
This is where all the magic happens.

### Tests

To run the tests, run one of the following commands.

    yarn run test
    yarn run test:watch

If you get snapshot mismatches, inspect the changes, and if they look OK, run
this command:

    yarn run test:snapshot

You can use Chrome's debugger if you need to inspect any part of a test. Simply
place a `debugger;` statement where you want the debugger to start and run the
following command. Then open the provided URL in Chrome.

    yarn run test:watch

