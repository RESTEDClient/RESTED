#!/bin/bash -e
#
# Purpose: Pack a Chromium extension directory into crx format
# Taken from https://developer.chrome.com/extensions/crx#scripts

SCRIPT="$(realpath -s $0)"
SCRIPTPATH="$(dirname $SCRIPT)"
BASEDIR="$SCRIPTPATH/.."
FILES="$BASEDIR/dist $BASEDIR/main.js $BASEDIR/manifest.json"

hash xxd 2>/dev/null || {
  echo "The utility xxd is required to run $(basename $0). Install it."
  exit 1
}

if test $# -ne 2; then
  echo "Usage: crxmake.sh <extension dir> <pem path>"
  exit 1
fi

dir=$1
key=$2
name=RESTED
crx="$name.crx"
pub="$name.pub"
sig="$name.sig"
zip="$name.zip"
trap 'rm -f "$pub" "$sig" "$zip"' EXIT

# zip up the crx dir
(cd "$dir" && zip -qr -9 -X "$BASEDIR/$zip" $FILES)

# signature
openssl sha1 -sha1 -binary -sign "$key" < "$zip" > "$sig"

# public key
openssl rsa -pubout -outform DER < "$key" > "$pub" 2>/dev/null

byte_swap () {
  # Take "abcdefgh" and return it as "ghefcdab"
  echo "${1:6:2}${1:4:2}${1:2:2}${1:0:2}"
}

crmagic_hex="4372 3234" # Cr24
version_hex="0200 0000" # 2
pub_len_hex=$(byte_swap $(printf '%08x\n' $(ls -l "$pub" | awk '{print $5}')))
sig_len_hex=$(byte_swap $(printf '%08x\n' $(ls -l "$sig" | awk '{print $5}')))
(
echo "$crmagic_hex $version_hex $pub_len_hex $sig_len_hex" | xxd -r -p
cat "$pub" "$sig" "$zip"
) > "$crx"
echo "Wrote $crx"
