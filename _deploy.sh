#!/bin/bash

pushd _stagingsite || exit 1
git add -f .
git commit -m "$(date +%Y-%m-%d)"
git push --force
popd