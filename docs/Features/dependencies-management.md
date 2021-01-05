# Dependencies Management

## Nuget Management

We have chosen to centralize the c# dependencies.

To do this we use a Directory.Build.targets file (you can find it in root folder)

This file contains all nuget dependencies with for each one their version.

To add a dependency, you need to add it in csproj without the version and add it in Directory.Build.targets with the version 

example: 

in csproj
```xml
<PackageReference Include="Newtonsoft.Json" />
```

in Directory.Build.targets
```xml
<PackageReference Update="Newtonsoft.Json" Version="12.0.3" />
```

## Caution

Visual studio do not manage the nuget with Directory.Build.targets if you add or update nuget by visual studio you need to remove version in csproj and add or update dependency in Directory.Build.targets