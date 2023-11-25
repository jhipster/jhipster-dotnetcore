# Dependencies Management

## Nuget Management

We have chosen to centralize the c# dependencies.

To do this we use a Directory.Packages.props file (you can find it in root folder)

This file contains all nuget dependencies with for each one their version.

To add a dependency, you need to add it in csproj without the version and add it in Directory.Packages.props with the version

example:

in csproj

```xml
<PackageReference Include="Newtonsoft.Json" />
```

in Directory.Packages.props

```xml
<PackageVersion Install="Newtonsoft.Json" Version="12.0.3" />
```
