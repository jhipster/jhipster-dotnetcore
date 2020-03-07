# generator-jhipster-dotnetcore
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster blueprint, 

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-dotnetcore
```

To update this blueprint:

```bash
npm update -g generator-jhipster-dotnetcore
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-dotnetcore
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-dotnetcore
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprint dotnetcore
```


## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd dotnetcore
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd dotnetcore
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-dotnetcore
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprint dotnetcore

```

## Running the generated app in a Docker container

1. Build the Docker image of the app

```bash
docker build -f "[Dockerfile path]" -t [An image name]:[A tag] "[Application root path]"
```

2. Run your image in a Docker container

```bash
docker run -d -p [A host port]:80 [Image name]:[Image tag]
```

3. Open your favorite browser at ```localhost:[Chosen host port]``` and enjoy ! :whale:

Docker compose file can be used to start the application with database as a service. To build images, run

```bash
docker-compose -f docker/app.yml build
```

To start services, use

```bash
docker-compose -f docker/app.yml up
```

In case of Oracle database, see [official documentation](https://github.com/oracle/docker-images/blob/master/OracleDatabase/SingleInstance/README.md)

# Running SonarQube

## By Script : 

1. Run Sonar in container : ```docker-compose -f ./docker/sonar.yml up -d```
   
2. Wait container was up Run ```SonarAnalysis.ps1``` and go to http://localhost:9001

## Manually : 

1. Run Sonar in container : ```docker-compose -f ./docker/sonar.yml up -d```

2. Install sonar scanner for .net :
   
 ```dotnet tool install --global dotnet-sonarscanner```

3. Run ```dotnet sonarscanner begin /d:sonar.login=admin /d:sonar.password=admin /k:"AwesomeKey" /d:sonar.host.url="http://localhost:9001"```

4. Build your application : ```dotnet build```

5. Publish sonar results : ```dotnet sonarscanner end /d:sonar.login=admin /d:sonar.password=admin```

6. Go to http://localhost:9001
   
# Monitoring your app

1. Run container (uncomment chronograf and kapacitor if you would use it): ```docker-compose -f ./docker/monitoring.yml up -d```

2. Go to http://localhost:3000 (or http://localhost:8888 if you use chronograf)
   
3. (Only for chronograf) Change influxdb connection string by ```YourApp-influxdb```

4. (Only for chronograf) Change kapacitor connection string by ```YourApp-kapacitor```
   
5. (Only for chronograf) You can now add dashboard (like docker), see your app log in Cronograf Log viewer and send alert with kapacitor

# License

Apache-2.0 © [Daniel Petisme]()


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-dotnetcore.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-dotnetcore
[travis-image]: https://api.travis-ci.com/jhipster/jhipster-dotnetcore.svg?branch=master
[travis-url]: https://travis-ci.com/jhipster/jhipster-dotnetcore
[daviddm-image]: https://david-dm.org/jhipster/jhipster-dotnetcore.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jhipster/jhipster-dotnetcore
