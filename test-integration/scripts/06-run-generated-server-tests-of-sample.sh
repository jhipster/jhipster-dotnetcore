#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

ASPNETCORE_ENVIRONMENT="Production"

#-------------------------------------------------------------------------------
# Run test 
#-------------------------------------------------------------------------------
echo "*** run test in server for : `pwd`"
dotnet test 
if [ $? -ne 0 ]; then
  echo "${RED}FAILED SERVER TEST COMMAND"
  exit 1
fi