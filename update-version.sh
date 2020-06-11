#!/bin/bash

# usage: ./update-version 1.99.9
currentPath=`pwd`

# BACKEND
cd $currentPath/backend/ || exit
./mvnw versions:set -DnewVersion=$1 -DgenerateBackupPoms=false -DprocessAllModules=true

# FRONT-END
cd $currentPath/app/ || exit
npm version $1