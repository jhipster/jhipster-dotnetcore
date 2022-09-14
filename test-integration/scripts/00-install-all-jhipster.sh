#!/bin/bash

set -e

#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------
echo "*** generator-jhipster: use last version"
npm install -g generator-jhipster@7.9.3


#-------------------------------------------------------------------------------
# Install JHipster.NET
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-dotnetcore: use current branch version"
npm ci
npm link
