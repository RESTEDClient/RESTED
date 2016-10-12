![RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-logo-full.png)

A REST client for the rest of us.

_Note: This is the source code, the extension download is [here](https://addons.mozilla.org/en-US/firefox/addon/rested/?src=github)._

[![Build Status](https://travis-ci.org/esphen/RESTED.svg?branch=next)](https://travis-ci.org/esphen/RESTED)

RESTED is a new take on rest clients on Firefox.
It is designed to be easy to use to let you work as effective as possible.
It features all the most commonly used HTTP methods, setting headers, beautiful themes,
saving requests in your browser, and more.

Since this is a relatively new project, I am also happy to announce that
it is also awesomely easy to contribute to the project! Everything is
javascript and html using React.js and Redux, so come join! All contributions
welcome.

![Image of RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-app.png)

## How to contribute
For a short read on how the app works, go to [this page](https://github.com/esphen/RESTED/wiki).

In order to work on this project, you're going to need a few things:
 - [nvm](https://github.com/creationix/nvm)
   - Alternately npm 6.x)
 - [yarn](https://yarnpkg.com/en/docs/install)
 - [Firefox >= 47](http://funny-pictures-blog.com/wp-content/uploads/funny-pictures/Hurr-durr.jpg) (duh)

Once these formalities are in order, you can start developing.

    nvm use
    yarn
    npm run dev

If you need to empty and reset the database, enter
`chrome.storage.local.clear()` into your developer console. That should clear
the entire database and force a clean install on refresh.

**Please develop on the next branch.**
This makes it easier for me to merge and prepare releases in the future.
Thanks for the interest!

