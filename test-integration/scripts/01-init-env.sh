#!/bin/bash

if [ -z "$1" ]; then
    APP_FOLDER="app-sample-dev"
else
    APP_FOLDER=$1
fi

if [ -z "$3" ]; then
    DEST_FOLDER=$HOME
else
    DEST_FOLDER=$3
fi

if [ -z "$GITHUB_WORKSPACE" ]; then
    WORKSPACE=`pwd`
else
    WORKSPACE=$GITHUB_WORKSPACE
fi

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cp -r "$WORKSPACE/test-integration" "$DEST_FOLDER"
cd "$DEST_FOLDER/test-integration/samples/$APP_FOLDER"
echo "*** changed directory in : $DEST_FOLDER/test-integration/samples/"$APP_FOLDER
