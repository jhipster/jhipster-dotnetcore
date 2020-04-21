#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run test 
#-------------------------------------------------------------------------------

if [[ "$APP_FOLDER" = "jwt-with-angular-app" && "$GITHUB_REPOSITORY" = "jhipster/jhipster-dotnetcore" && "$GITHUB_REF" = "refs/heads/master" ]]; then
  echo "*** run sonar analyze in server for : `pwd`"
  dotnet tool install --global dotnet-sonarscanner
  dotnet sonarscanner begin /k:"jhipster_jhipster-dotnetcore" /d:sonar.organization="jhipster" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login=$SONAR_TOKEN
  dotnet build
  dotnet test
  dotnet sonarscanner end /d:sonar.login=$SONAR_TOKEN
fi

if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi