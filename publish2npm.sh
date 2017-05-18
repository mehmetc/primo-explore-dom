#!/usr/bin/env bash
mkdir -p /tmp/primo-explore-dom.release/js

cp package.json /tmp/primo-explore-dom.release
cp README.md /tmp/primo-explore-dom.release
cp js/custom.js /tmp/primo-explore-dom.release/js/primo-explore-dom.js

cd /tmp/primo-explore-dom.release
npm publish
cd -
rm -Rf /tmp/primo-explore-dom.release
