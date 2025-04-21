# generator-jhipster-dotnetcore

[![NPM version][npm-image]][npm-url]
[![Documentation Status](https://readthedocs.org/projects/jhipsternet/badge/?version=latest)](https://jhipsternet.readthedocs.io/en/latest/?badge=latest)
[![Generator Build Status][github-actions-generator-image]][github-actions-generator-url]
[![Integration JWT Build Status][github-actions-integ-jwt-image]][github-actions-integ-jwt-url]
[![Integration OAUTH Build Status][github-actions-integ-oauth-image]][github-actions-integ-oauth-url]
[![build docker image][github-actions-docker-build-image]][github-actions-docker-build-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Sonar Cloud Quality Gate][sonar-gate-image]][sonar-url]
[![Sonar Cloud Reliability Rate][sonar-reliability-image]][sonar-url]
[![Sonar Cloud Security Rate][sonar-security-image]][sonar-url]
[![Sonar Cloud Maintainability Rate][sonar-maintainability-image]][sonar-url]
[![Sonar Cloud Duplicated Code][sonar-duplication-image]][sonar-url]

> JHipster blueprint

# Big Picture

JHipster is a well-known platform for generating modern application in java world.
JHipster provides a blueprints system that allows to override the default behavior of the generator

JHipster.NET is a blueprint that overrides the back-end part, originally generated in spring boot, by back-end in asp.net core. For the front-end all the common language can be used (angular, react, vue.js).

In alpha version we also have the possibility to choose either [Blazor](https://github.com/jhipster/jhipster-dotnetcore/issues/165) or [Xamarin](https://github.com/jhipster/jhipster-dotnetcore/issues/488) for the front.

This blueprint is an official blueprint of JHipster [official-blueprints](https://www.jhipster.tech/modules/official-blueprints/)

# Docs

Documentation and information about `JHipster.NET` are available [here](https://jhipsternet.readthedocs.io/en/latest/)

Full documentation and information about JHipster are available [here](https://www.jhipster.tech/)

# Analysis of the sample project

https://github.com/jhipster/jhipster-sample-app-dotnetcore

[![Sonar Cloud Quality Gate][sonar-sample-gate-image]][sonar-sample-url]
[![Sonar Cloud Coverage Rate][sonar-sample-coverage-image]][sonar-sample-coverage-url]
[![Sonar Cloud Reliability Rate][sonar-sample-reliability-image]][sonar-sample-url]
[![Sonar Cloud Security Rate][sonar-sample-security-image]][sonar-sample-url]
[![Sonar Cloud Maintainability Rate][sonar-sample-maintainability-image]][sonar-sample-url]
[![Sonar Cloud Duplicated Code][sonar-sample-duplication-image]][sonar-sample-url]

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Gitter

https://gitter.im/JHipster-NET/jhipster-dotnetcore

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
jhipster-dotnetcore
```

## Using Docker

Build the Docker images:

```bash
docker build -t jhipster-generator-dotnetcore:latest .
```

Make a folder where you want to generate the Service:

```bash
mkdir service
cd service
```

Run the generator from image to generate service:

```bash
docker run -it --rm -v $PWD:/home/jhipster/app jhipster-generator-dotnetcore
```

## 🚦 What we have now

✅ General App generation

- `jhipster-dotnetcore`
  - JWT : ✅
  - Oauth2 : ✅

✅ Entity generation

- `jhipster-dotnetcore <entity-name>`

✅ JDL Entity model support generation

- `jhipster-dotnetcore import-jdl my_file.jdl`

## Running the generated app in a Docker container

1. Build the Docker image of the app

```bash
docker build -f "[Dockerfile path]" -t [An image name]:[A tag] "[Application root path]"
```

2. Run your image in a Docker container

```bash
docker run -d -p [A host port]:8080 [Image name]:[Image tag]
```

3. Open your favorite browser at `localhost:[Chosen host port]` and enjoy ! :whale:

Docker compose file can be used to start the application with database as a service. To build images, run

```bash
docker compose -f docker/app.yml build
```

To start services, use

```bash
docker compose -f docker/app.yml up
```

In case of Oracle database, see [official documentation](https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md)

## Continuous Integration

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Currently, it is supporting:

- GitHub
- GItLab

# License

Apache-2.0 © [JHipster.NET]()

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-dotnetcore.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-dotnetcore
[daviddm-image]: https://david-dm.org/jhipster/jhipster-dotnetcore.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jhipster/jhipster-dotnetcore
[github-actions-generator-image]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/generator.yml/badge.svg
[github-actions-generator-url]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/generator.yml
[github-actions-integ-oauth-image]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/test-integration-oauth.yml/badge.svg
[github-actions-integ-oauth-url]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/test-integration-oauth.yml
[github-actions-integ-jwt-image]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/test-integration-jwt.yml/badge.svg
[github-actions-integ-jwt-url]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/test-integration-jwt.yml
[github-actions-docker-build-image]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/build-docker-image.yml/badge.svg
[github-actions-docker-build-url]: https://github.com/jhipster/jhipster-dotnetcore/actions/workflows/build-docker-image.yml
[sonar-url]: https://sonarcloud.io/dashboard?branch=main&id=jhipster_jhipster-dotnetcore
[sonar-coverage-url]: https://sonarcloud.io/component_measures?branch=main&id=jhipster_jhipster-dotnetcore&metric=coverage&view=list
[sonar-gate-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=alert_status
[sonar-coverage-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=coverage
[sonar-reliability-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=reliability_rating
[sonar-security-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=security_rating
[sonar-maintainability-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=sqale_rating
[sonar-duplication-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-dotnetcore&metric=duplicated_lines_density
[sonar-sample-url]: https://sonarcloud.io/dashboard?branch=main&id=jhipster_jhipster-sample-app-dotnetcore
[sonar-sample-coverage-url]: https://sonarcloud.io/component_measures?branch=main&id=jhipster_jhipster-sample-app-dotnetcore&metric=coverage&view=list
[sonar-sample-gate-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=alert_status
[sonar-sample-coverage-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=coverage
[sonar-sample-reliability-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=reliability_rating
[sonar-sample-security-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=security_rating
[sonar-sample-maintainability-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=sqale_rating
[sonar-sample-duplication-image]: https://sonarcloud.io/api/project_badges/measure?branch=main&project=jhipster_jhipster-sample-app-dotnetcore&metric=duplicated_lines_density
