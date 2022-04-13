#!/bin/bash

set -e

RED='\033[0;31m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Run FORMATTING
#-------------------------------------------------------------------------------
# Commented lines below due to error in dotnet format tool - see https://github.com/dotnet/format/issues/1519
dotnet format --verify-no-changes --severity error

if [[ $? -ne 0 ]]; then
  echo "${RED}FAILED FORMATTING"
  exit 1
fi
