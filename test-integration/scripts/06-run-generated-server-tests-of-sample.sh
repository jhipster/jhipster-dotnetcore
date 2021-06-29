#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

ASPNETCORE_ENVIRONMENT="Production"

#-------------------------------------------------------------------------------
# Run test
#-------------------------------------------------------------------------------
echo "*** run test in server for : `pwd`"
docker-compose -f docker/app.yml up -d
timeout 300 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:8080/health)" != "200" ]]; do echo "Waiting for http://localhost:8080/health" && sleep 5; done' || false

dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

docker-compose -f docker/app.yml down
if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi