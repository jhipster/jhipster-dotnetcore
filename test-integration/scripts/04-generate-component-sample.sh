#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $WORKSPACE/test-integration/scripts/01-init-env.sh

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cd test-integration/samples/$APP_FOLDER
echo "*** changed directory in : test-integration/samples/"$APP_FOLDER

#-------------------------------------------------------------------------------
# Link dotnet core blueprint in folder
#-------------------------------------------------------------------------------
echo "*** link nodejs blueprint in : test-integration/samples/"$APP_FOLDER
sudo npm link generator-jhipster-dotnetcore


#-------------------------------------------------------------------------------
# Generate component (service or controller)
# $2 : service or controller
# $3 : name
#-------------------------------------------------------------------------------
echo "*** run generation" $2 $3 "with dotnetcore blueprint for : "$APP_FOLDER

componentGenerator="spring-$2 $3"
runOptions="$componentGenerator --blueprints dotnetcore --force"

jhipster $runOptions

echo "*** check if the "$2 "generation is wrong :"

if [ -z $(find server/src -type f -name "$3.$2.cs" ) ]; then
      echo "${RED}WRONG GENERATION"
      exit 1
else
      echo "${GREEN}GENERATION OK"
fi