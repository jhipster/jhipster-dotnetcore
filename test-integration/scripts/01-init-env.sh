#!/bin/bash

if [[ $1 == "" ]]; then
    APP_FOLDER="jwt-with-angular-app"
else
    APP_FOLDER=$1
fi

if [[ $3 == "" ]]; then
    DEST_FOLDER=$HOME
else
    DEST_FOLDER=$3
fi

if [[ $GITHUB_WORKSPACE == "" ]]; then
    WORKSPACE=`pwd`
else
    WORKSPACE=$GITHUB_WORKSPACE
fi

if [[ "$APP_FOLDER" = "jwt-with-angular-app" && "$GITHUB_REPOSITORY" = "jhipster/jhipster-dotnetcore" && "$GITHUB_REF" = "refs/heads/main" ]]; then
    SONAR_ANALYSE=true    
fi

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cp -r "$WORKSPACE/test-integration" "$DEST_FOLDER"
cd "$DEST_FOLDER/test-integration/samples/$APP_FOLDER"
echo "*** changed directory in : $DEST_FOLDER/test-integration/samples/"$APP_FOLDER
