#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run JHipster.NET Generator
#-------------------------------------------------------------------------------
echo "*** run generation app with dotnetcore blueprint for : "$APP_FOLDER

runOptions="--blueprints dotnetcore --skip-checks --force --no-insight --skip-install"

jhipster-dotnetcore $runOptions

echo "*** check if the generation is ok for csharp classes :"

if [[ -n $(find src -type f -name "*.cs") ]]; then
      echo "${GREEN}GENERATION OK"
else
      echo "${RED}WRONG GENERATION, NO CSHARP FILE FOUND"
      exit 1
fi


echo "*** check if the generation do not generate java classes :"

if [[ -z $(find src -type f -name "*.java") ]]; then
      echo "${GREEN}GENERATION OK"
else
      echo "${RED}WRONG GENERATION, JAVA FILE FOUND"
      exit 1
fi

