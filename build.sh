#!/bin/bash

if test $# -ne 1; then
  echo "Usage: build.sh <pem path>"
  exit 1
fi

PEM=$1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FILES="data main.js manifest.json"

echo Packaging for Chrome

rm -fv manifest.json
ln -vs google-chrome/manifest.json
echo "$(dirname "$0")" $0
$DIR/mkcrx.sh $DIR $PEM

echo Done

echo Packaging for Opera

cp -v RESTED.crx RESTED.nex

echo Done

echo Packaging for Firefox

rm -fv manifest.json
ln -vs firefox/manifest.json
zip -qr RESTED.xpi $FILES

echo Done

ls -hl RESTED.*

