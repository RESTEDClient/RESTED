#!/bin/bash

FILES="data main.js"

echo Packaging for Chrome

rm -fv manifest.json
ln -vs google-chrome/manifest.json
zip -qr RESTED.crx $FILES

echo Done

echo Packaging for Opera

zip -qr RESTED.nex $FILES

echo Done

echo Packaging for Firefox

rm -fv manifest.json
ln -vs firefox/manifest.json
zip -qr RESTED.xpi $FILES

echo Done

ls -hl RESTED.*

