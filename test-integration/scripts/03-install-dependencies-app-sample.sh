
#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

#-------------------------------------------------------------------------------
# Install app dependencies and build
#-------------------------------------------------------------------------------
echo "*** install dependencies and build : `pwd`"

dotnet build

if [[ $? -ne 0 ]]; then
  echo "${RED}FAILED INSTALL DEPENDENCIES OR BUILD"
  exit 1
fi