#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

if [ "$2" = "import-jdl" ]; then
  #-------------------------------------------------------------------------------
  # Run JHipster.NET Generator
  #-------------------------------------------------------------------------------
  echo "*** run generation app with dotnetcore blueprint for : "$APP_FOLDER
  runOptions="--blueprints dotnetcore --skip-checks --force --no-insight --skip-install"

  runOptions="import-jdl ../jdl-default/app.jdl $runOptions"  
  jhipster $runOptions
  
  if [[ -n $(find src -type f -name "*Employee.cs") ]]; then
      echo "${GREEN}GENERATION OK"
  else
      echo "${RED}WRONG GENERATION"
      exit 1
  fi
fi

