#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run FORMATTING  
#-------------------------------------------------------------------------------
dotnet tool install -g dotnet-format
dotnet format --check

if [ $? -ne 0 ]; then
  echo "${RED}FAILED FORMATTING"
  exit 1
fi