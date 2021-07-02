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
  docker run --rm mongo mongo --add-host mongo:`cat /etc/hosts | grep mongo | awk '{print $1}'` --net host --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD
  sleep 300
fi

dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

if "$SONAR_ANALYSE_MONGO" ; then
  docker container stop some-mongo
fi
if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi
