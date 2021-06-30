#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

ASPNETCORE_ENVIRONMENT="Production"

#-------------------------------------------------------------------------------
# Run test
#-------------------------------------------------------------------------------
echo "*** run test in server for : `pwd`"
if "$SONAR_ANALYSE_MONGO" ; then
  docker run --name some-mongo -d mongo:latest
fi
timeout 300 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:8080/health)" != "200" ]]; do echo "Waiting for http://localhost:8080/health" && sleep 5; done' || false

dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

if "$SONAR_ANALYSE_MONGO" ; then
  docker container stop some-mongo
fi
if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi