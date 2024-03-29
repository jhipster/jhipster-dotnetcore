#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'

source $(dirname $0)/01-init-env.sh

if [[ "$2" = "import-jdl" ]]; then
  # copy files required for testing automatic service class/interface registration on dependency injection container
  if [[ -n $(find src/JhipsterSampleApplication.Domain.Services -type f -name "*CountryService.cs") ]]; then
      cp ../csharp-di-test/CountryExtendedService.cs src/JhipsterSampleApplication.Domain.Services/
      mkdir test/JhipsterSampleApplication.Test/AutomaticServiceDI/
      cp ../csharp-di-test/ExtendedServiceRegistrationTest.cs test/JhipsterSampleApplication.Test/AutomaticServiceDI/
  fi

  if [[ -n $(find src/JhipsterSampleApplication.Domain -type f -name "*Employee.cs") ]]; then
      if [[ "$SONAR_ANALYSE_ANGULAR" ]] ; then
        dotnet tool install --global dotnet-sonarscanner
        dotnet tool install --global coverlet.console
        dotnet sonarscanner begin /k:"jhipster_jhipster-sample-app-dotnetcore" /o:"jhipster" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login=$SONAR_TOKEN /s:"`pwd`/SonarQube.Analysis.xml"
      elif [[ "$SONAR_ANALYSE_BLAZOR" ]] ; then
        dotnet tool install --global dotnet-sonarscanner
        dotnet tool install --global coverlet.console
        dotnet sonarscanner begin /k:"jhipster_jhipster-sample-app-blazor" /o:"jhipster" /d:sonar.host.url="https://sonarcloud.io" /d:sonar.login=$SONAR_TOKEN /s:"`pwd`/SonarQube.Analysis.xml"
      fi
      dotnet build
      echo "${GREEN}GENERATION OK"
  else
      echo "${RED}WRONG GENERATION"
      exit 1
  fi
fi

