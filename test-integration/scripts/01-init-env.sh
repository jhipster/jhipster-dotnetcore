#!/bin/bash

if [[ $1 == "" ]]; then
    APP_FOLDER="jwt-with-angular-app"
else
    APP_FOLDER=$1
fi

if [[ $4 == "" ]]; then
    DEST_FOLDER=$HOME
else
    DEST_FOLDER=$4
fi

if [[ $GITHUB_WORKSPACE == "" ]]; then
    WORKSPACE=`pwd`
else
    WORKSPACE=$GITHUB_WORKSPACE
fi

if [[ "$APP_FOLDER" = "jwt-with-angular-app" && "$GITHUB_REPOSITORY" = "jhipster/jhipster-dotnetcore" && "$GITHUB_REF" = "refs/heads/main" ]]; then
    SONAR_ANALYSE_ANGULAR=true
fi

if [[ "$APP_FOLDER" = "jwt-with-blazor-app" && "$GITHUB_REPOSITORY" = "jhipster/jhipster-dotnetcore" && "$GITHUB_REF" = "refs/heads/main" ]]; then
    SONAR_ANALYSE_BLAZOR=true
fi

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cp -r "$WORKSPACE/test-integration" "$DEST_FOLDER"
cd "$DEST_FOLDER/test-integration/samples/$APP_FOLDER"
echo "*** changed directory in : $DEST_FOLDER/test-integration/samples/"$APP_FOLDER
