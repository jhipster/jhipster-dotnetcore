#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
if [ "$3" = "blazor" ]; then
  cd test/JhipsterSampleApplication.Client.Test
else
  cd src/JhipsterSampleApplication/ClientApp
fi
echo "*** changed directory in : `pwd`" 


#-------------------------------------------------------------------------------
# Run unit test 
#-------------------------------------------------------------------------------
echo "*** run unit test in client for :  `pwd`"
if [ "$3" = "blazor" ]; then
  dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
else
  if [ -f "src/app/app.tsx" ]; then
    npm run lint:fix && npm run test-ci
  else
    npm run lint:fix && npm test
  fi
  if [ $? -ne 0 ]; then
   echo "${RED}FAILED CLIENT UNIT TEST COMMAND"
   exit 1
  fi
fi
