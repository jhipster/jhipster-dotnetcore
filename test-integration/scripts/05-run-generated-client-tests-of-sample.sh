#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Change in template directory
#-------------------------------------------------------------------------------
cd src/JhipsterSampleApplication/ClientApp
echo "*** changed directory in : `pwd`" 


#-------------------------------------------------------------------------------
# Run unit test 
#-------------------------------------------------------------------------------
echo "*** run unit test in client for :  `pwd`"

if [ -f "ClientApp/app/app.tsx" ]; then
  npm run lint:fix && npm run test-ci
else
  npm run lint:fix && npm test
fi
if [ $? -ne 0 ]; then
  echo "${RED}FAILED CLIENT UNIT TEST COMMAND"
  exit 1
fi