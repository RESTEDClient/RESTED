#!/bin/bash
# Execute from the root of the git repo

rm -rf node_modules RESTED.* dist/rested* coverage
cd ..
zip -r -9 RESTED/RESTED.src.zip RESTED
cd RESTED

