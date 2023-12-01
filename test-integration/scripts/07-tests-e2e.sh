#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run Docker
#-------------------------------------------------------------------------------

if [[ "$3" != "blazor" ]]; then
  docker compose -f docker/app.yml up --wait

  timeout 300 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:5000/health)" != "200" ]]; do echo "Waiting for http://localhost:5000/health" && sleep 5; done' || false

  if [[ "$3" = "blazor" && -f "cypress.json" ]]; then
    cd test/JhipsterSampleApplication.Client.Test
  else
    cd src/JhipsterSampleApplication/ClientApp
  fi
  echo "*** changed directory in : `pwd`"

  npm run e2e

  cd ../../../

  docker compose -f docker/app.yml down

fi

if [[ $? -ne 0 ]]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi