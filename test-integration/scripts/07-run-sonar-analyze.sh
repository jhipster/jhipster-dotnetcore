#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run Sonar  
#-------------------------------------------------------------------------------
if [[ "$SONAR_ANALYSE_ANGULAR" = true || "$SONAR_ANALYSE_BLAZOR" = true ]] ; then
  echo "*** run sonar analyze in server for : `pwd`"
  dotnet sonarscanner end /d:sonar.login=$SONAR_TOKEN
fi

if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi