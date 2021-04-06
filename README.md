# generator-jhipster-dotnetcore
[![NPM version][npm-image]][npm-url] 
[![Documentation Status](https://readthedocs.org/projects/jhipsternet/badge/?version=latest)](https://jhipsternet.readthedocs.io/en/latest/?badge=latest)
[![Generator Build Status][github-actions-generator-image]][github-actions-url]
[![Integration JWT Build Status][github-actions-integ-jwt-image]][github-actions-url]
[![Integration OAUTH Build Status][github-actions-integ-oauth-image]][github-actions-url]
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

Documentation and information about  `JHipster.NET` are available [here](https://jhipsternet.readthedocs.io/en/latest/)

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
jhipster --blueprints dotnetcore
```

## Using Docker

Download the Dockerfile:

```bash
mkdir docker
cd docker
wget https://github.com/jhipster/jhipster-dotnetcore/raw/main/docker/Dockerfile
```

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

## Deploy in Azure App using Terraform

Currently supports only monolithic app with sql server as database (will add support for other databases, soon). Terraform scripts will create Azure app service, azure sql server

### Pre-requisites
1. [Docker](https://www.docker.com/products/docker-desktop) is installed with docker-compose and have push access to any of the docker repository like docker hub or azure container registry.
2. Azure CLI is installed on your system. Terraform will require it to authenticate in azure subscription. 
3. [Terraform CLI](https://www.terraform.io/downloads.html) is installed on your system.

### Steps to follow:
1. Execute generate app command and select app as Monolithic with Microsoft SQL server as database. Select **yes** to generate terraform scripts. (_default:_ is _No_)
<img width="927" alt="Screen Shot 2021-04-06 at 10 34 10 PM" src="https://user-images.githubusercontent.com/32884734/113750309-48c09a00-9728-11eb-98bc-0c47f9e317aa.png">

2. Use docker-compose command to first build the docker image.
```bash
docker-compose -f docker/app.yml build
```
3. Tag the image built in step 2 to push to docker repository using:
```bash
docker tag <source-image> <destination-image>:version/tag
```
4. Push the image to docker hub or any docker service provider using:
```bash
docker push <destination-image>:version/tag
```
_Note:_ The docker image link and its tag will use as input to terraform variables.
5. In the generated app folder, change directory to terraform folder.
```bash
cd terraform
```
6. Login into your azure cli by using 
```bash
az login
```
_Note:_ Terraform plan command will work only if the user is authenticated using azure cli.

7. Create a file (_**terraform.tfvars**_) in terraform folder to provide input to the terraform main script using below content:
```
location                = "Central US"
subscription_id         = "<your-azure-subscription>"
mssql_admin_user        = "dbUser"
mssql_admin_password    = "Password!12"
docker_image            = "a5ingh/jhipster-dotnetcore-sampleapp"
docker_image_tag        = "0.1"
```

8. Execute below terraform commands (one by one) to create resources (Azure app service, azure sql) and deploy as a docker image to app service:
    1. `terraform init` # to initialize terraform.
    1. `terraform plan -out "MyAppPlan"` # can choose any name instead of MyAppPlan.
    1. `terraform apply "MyAppPlan"` # it will create the resources and then provide you the link to your deployed app as output variable.

9. You can use terraform destroy to delete/remove all the created resources once you are done using it.

## 🚦 What we have now

✅ General App generation

-   `jhipster --blueprints dotnetcore`
    -   JWT : ✅ 
    -   Oauth2 : ✅ 
  
✅ Entity generation

-   `jhipster entity <entity-name>`

✅ JDL Entity model support generation

-   `jhipster import-jdl my_file.jdl`



## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd dotnetcore
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the main branch or your own custom fork)

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

In case of Oracle database, see [official documentation](https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md)

# License

Apache-2.0 © [JHipster.NET]()


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-dotnetcore.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-dotnetcore
[daviddm-image]: https://david-dm.org/jhipster/jhipster-dotnetcore.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jhipster/jhipster-dotnetcore
[github-actions-generator-image]: https://github.com/jhipster/jhipster-dotnetcore/workflows/Generator/badge.svg?branch=main
[github-actions-integ-oauth-image]: https://github.com/jhipster/jhipster-dotnetcore/workflows/Test%20Integration%20OAUTH/badge.svg?branch=main
[github-actions-integ-jwt-image]: https://github.com/jhipster/jhipster-dotnetcore/workflows/Test%20Integration%20JWT/badge.svg?branch=main
[github-actions-url]: https://github.com/jhipster/jhipster-dotnetcore/actions
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
