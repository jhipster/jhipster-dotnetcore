
#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Install app dependencies and build 
#-------------------------------------------------------------------------------
if "$SONAR_ANALYSE" ; then
  dotnet tool install --global dotnet-sonarscanner
  dotnet tool install --global coverlet.console
  dotnet sonarscanner begin /k:"jhipster_jhipster-sample-app-dotnetcore" /o:"jhipster" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login=$SONAR_TOKEN /s:"`pwd`/SonarQube.Analysis.xml"
fi

echo "*** install dependencies and build : `pwd`"
dotnet build
if [ $? -ne 0 ]; then
  echo "${RED}FAILED INSTALL DEPENDENCIES OR BUILD"
  exit 1
fi