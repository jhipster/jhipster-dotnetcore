#!/bin/bash

set -e

#-------------------------------------------------------------------------------
# Install JHipster Generator
#-------------------------------------------------------------------------------
echo "*** generator-jhipster: use last version"
npm install -g generator-jhipster@7.0.0

#-------------------------------------------------------------------------------
# Install yeoman
#-------------------------------------------------------------------------------
echo "*** yeoman: use last version"
npm install -g yo


#-------------------------------------------------------------------------------
# Install JHipster.NET
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-dotnetcore: use current branch version"
npm ci
npm link
