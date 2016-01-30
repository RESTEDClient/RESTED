#!/bin/bash
# Can read pem from file or stdin

PEM=$1
TMPFILE="RESTED.pem"
SHRED=false

if test $# -ne 1; then
  while read i; do
    echo $(printf "\n$i") >> $TMPFILE
  done
  SHRED=true
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FILES="data main.js manifest.json"

echo
echo Packaging for Chrome

rm -fv manifest.json
ln -vs google-chrome/manifest.json
$DIR/mkcrx.sh $DIR "${PEM:-$TMPFILE}"

echo Done

echo
echo Packaging for Opera

cp -v RESTED.crx RESTED.nex

echo Done

echo
echo Packaging for Firefox

rm -fv manifest.json
ln -vs firefox/manifest.json
zip -qr RESTED.xpi $FILES

echo Done

ls -hl RESTED.*

if [ $SHRED == true ]; then
  echo Shredding temp file
  shred -u $TMPFILE
  echo Shredded $TMPFILE
fi

