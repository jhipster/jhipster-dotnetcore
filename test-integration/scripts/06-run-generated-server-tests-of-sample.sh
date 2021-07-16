#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

ASPNETCORE_ENVIRONMENT="Production"

#-------------------------------------------------------------------------------
# Run test
#-------------------------------------------------------------------------------
echo "*** run test in server for : `pwd`"
if [[ "$IS_MONGO" ]]; then
  docker run --name some-mongo -p 27017:27017 -d mongo:latest
  sleep 30
fi

dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

if [[ "$IS_MONGO" ]]; then
  docker container stop some-mongo
fi
if [[ $? -ne 0 ]]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi
