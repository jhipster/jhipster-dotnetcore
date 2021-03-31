#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run Docker 
#-------------------------------------------------------------------------------

if [ "$APP_FOLDER" = "jwt-with-angular-app" ]; then
  docker-compose -f docker/app.yml up -d
  sleep 60

  if [ "$3" = "blazor" ]; then
    cd test/JhipsterSampleApplication.Client.Test
  else
    cd src/JhipsterSampleApplication/ClientApp
  fi
  echo "*** changed directory in : `pwd`" 

  sed -i 's/5001/8080/g' cypress.json

  npm run e2e:headless

  cd ../../../

  docker-compose -f docker/app.yml down

fi

if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi