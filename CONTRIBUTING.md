# Contributing

So you want to help the RESTED project? Awesome! Any contribution, large or
small, is greatly appreciated. This document sets out some guidelines on how you
can get started as easily as possible.

This project adheres to the [Contributor Covenant Code of Conduct][COC], so rest
assured that all contributions will be treated with respect and empathy.

If you do not feel like contributing code, creating issues on any bugs you find
or suggestions for improvements are also appreciated. Also feel free to
participate in discussions in issues if you have an opinion.

## Required software

In order to work on this project, you're going to need a few tools. Ensure you
have the below set up on your machine.

### [nvm](https://github.com/creationix/nvm)

`nvm` ensures that you are running the correct version of `node` when compiling
the project. If you have a version that is too low, you might see
incompatibilities with webpack and plugins.

Alternately you can install node >= 6.x and npm >= 3.x on your machine

### [yarn](https://yarnpkg.com/en/docs/install)

This project uses an alternative package manager for `npm` called `yarn` to
install dependencies. There are many reasons for this, most notably speed and
consistency. If you need to read up on how it works, [this document explains
yarn](https://yarnpkg.com/en/docs/usage)

### A browser with WebExtension support
Today we are blessed with cross-browser support for browser extensions with the
WebExtension API. Many browsers support this, including, but not limited to:

- Firefox
- Chrome
- Opera
- Edge
- Vivaldi
- Firefox mobile for Android

 Notable exceptions that do NOT support the WebExtension API:

- Safari
- Internet Explorer
- All mobile browsers except Firefox


## Setting up the project

Now that you have made sure you have the required tools, we can start setting up
the project. First you should make a fork and clone it to your machine so you
get a copy of the source code.

    git clone git@github.com:YOUR_USERNAME/RESTED.git

Contributions should be made against the `next` branch, so make sure you are on
that branch.

    git checkout next

To make it easier for you to keep the `next` branch up to date, you could create
a branch based on `next` for each feature you would like to work on, but this is
not required.

    git checkout -b your-feature next

Now to set up your development environment. First you need to symlink a manifest
file to the root directory of the project. This manifest file tells the browser
how to load the extension files, so you need to link the correct file according
to which browser you are using.

    # For Firefox
    ln -s firefox/manifest.json

    # For Chrome and Opera
    ln -s google-chrome/manifest.json

### Compiling

Now that the browser knows how to load the extension, we need to start compiling
the extension code. This is done in a few steps, and these need to be done every
time you want to start developing.

First we install the correct version of `node`. Skip this if you are not using
`nvm` and have the correct version installed globally instead.

    nvm install

Now we download and install all the dependencies into the `node_modules`
directory with the following command.

    yarn

Now we are ready to start the development server. The following command will
start a webpack process which will compile your code every time you make
a change automatically. Leave it running for the best development experience.

    yarn start

### Loading the extension

Now that you have compiled the extension and prepared it for being loaded, we
can load it into your browser to run it. This differs depending on which browser
you are using, so you will find resources for loading the extension below.

- [Load unpacked extension in Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
- [Load unpacked extension in Chrome](https://developer.chrome.com/extensions/getstarted#unpacked)

## Getting help

If you're stuck and need a hand, I'll be happy to help. You can contact me in
a few different ways:

- [The official RESTED chat room](https://gitter.im/RESTEDclient/Lobby)
- [The RESTED email](mailto:rested+cguide@henriksen.is)
- [My twitter](https://twitter.com/espen_dev)
- [Create an issue](https://github.com/esphen/RESTED/issues/new)

Drop me a line at any of those places, and I'll answer as best as I can.

## Tips and tricks

If you need to empty and reset the database, enter
`chrome.storage.local.clear()` into your developer console. That should clear
the entire database and force a clean install on refresh.

## Tests

The tests are written using
[jest](https://facebook.github.io/jest/docs/en/tutorial-react.html#content) and
[enzyme](http://airbnb.io/enzyme/), read up on those if you have not used these
before.

To run the tests, run the following command.

    yarn run test:watch

If you get snapshot mismatches, inspect the changes, and if they look OK, run
this command:

    yarn run test:snapshot

[COC]: https://github.com/esphen/RESTED/blob/master/CODE_OF_CONDUCT.md
