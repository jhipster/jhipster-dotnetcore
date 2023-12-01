#!/bin/bash

set -e
#-------------------------------------------------------------------------------
# Install JHipster.NET
#-------------------------------------------------------------------------------
echo "*** generator-jhipster-dotnetcore: use current branch version"
npm ci
npm link
