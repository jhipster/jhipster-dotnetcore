#!/bin/bash

echo "Starting the application..."

# if $PORT is set in the environment, set ASPNETCORE_URLS to "http://*:$PORT"
if [ -n "$PORT" ]; then
    echo "Setting ASPNETCORE_URLS with the PORT environment variable..."
    export ASPNETCORE_URLS=http://*:$PORT
    echo "ASPNETCORE_URLS: $ASPNETCORE_URLS"
fi

if [ "$INCLUDE_BLAZOR" = "true" ];  then
    # replace blazor server url if INCLUDE_BLAZOR is true
    echo "Replacing blazor server url in appsettings.json with the ServerUrl environment variable..."
    sed -i "/ServerUrl/c\   "\"ServerUrl"\" : "\"$ServerUrl"\"," wwwroot/appsettings.json
fi

# run the dotnet app
dotnet App.dll
