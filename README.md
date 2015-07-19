![RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-logo-full.png)

A REST client for the rest of us

RESTED is a new take on rest clients on Firefox.
It is meant to be easy to use to let you work as effective as possible.
It features all the most commonly used HTTP methods, setting headers,
saving requests to local storage, and more.

Since this is a relatively new project, I am also happy to announce that
it is also awesomely easy to contribute to the project! Everything is
javascript and html, so come join! All contributions welcome.

![Image of RESTED](https://github.com/esphen/RESTED/raw/master/images/rested-app.png)

## How to contribute
This project was from the very beginning intended to be easy to work with.
It is basically just an angular 1.4 app inside of Firefox, so if you know angular, you're in luck!

What features are on the to-do list:
 - Improve collections with collapsible collection groups
 - Templates in the URLs (example: www.vg.no?authToken={token})
 - Replace alert boxes with bootstrap modals
 - Basic auth

In order to work on this project, you're going to need a few things:
 - [Firefox](http://funny-pictures-blog.com/wp-content/uploads/funny-pictures/Hurr-durr.jpg) (duh)
 - [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_%28jpm%29), the build system for Firefox extensions
 - [Extension Auto-Installer](https://palant.de/2012/01/13/extension-auto-installer). Not neccecary, but highly reccomended

Once these formalities are in order, you can start developing.
If you use the Extension Auto-Installer, clone this project and run `jpm watchpost --post-url http://localhost:8888` in the root folder.
The extension will then be reinstalled every time you save a file, without you having to do a thing.

If you don't use Extension Auto-Installer, you need to do what the extension does for you manually every time you save.
That is, `jpm xpi && firefox rested@restedclient-0.1.0.xpi`.
