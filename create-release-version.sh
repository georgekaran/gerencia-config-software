#!/bin/bash

# usage: ./create-release-version.sh 3.6.0 3.7.0

./update-version.sh $1
git add .
git commit -m "version bump"

git tag -a $1 -m "Release $1"