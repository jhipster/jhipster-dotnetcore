
#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

export NODE_ENV="development"

export APP_VERSION="1.0"

#-------------------------------------------------------------------------------
# Install app dependencies and build 
#-------------------------------------------------------------------------------
echo "*** install dependencies and build : `pwd`"

dotnet build 

if [ $? -ne 0 ]; then
  echo "${RED}FAILED INSTALL DEPENDENCIES OR BUILD"
  exit 1
fi