# Code Analysis

## Running SonarQube by script

1. Run Sonar in container : `docker-compose -f ./docker/sonar.yml up -d`
2. Wait container was up Run `SonarAnalysis.ps1` and go to http://localhost:9001

## Running SonarQube manually

1. Run Sonar in container : `docker-compose -f ./docker/sonar.yml up -d`

2. Install sonar scanner for .net :

`dotnet tool install --global dotnet-sonarscanner`

3. Run

```bash
   dotnet sonarscanner begin /d:sonar.login=admin /d:sonar.password=admin /k:"YourProject" /d:sonar.host.url="http://localhost:9001" /s:"`pwd`/SonarQube.Analysis.xml"
```

4. Build your application : `dotnet build`

5. Publish sonar results : `dotnet sonarscanner end /d:sonar.login=admin /d:sonar.password=admin`

6. Go to http://localhost:9001
