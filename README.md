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

Documentation and information about  `JHipster.NET ` is available [here](https://jhipsternet.readthedocs.io/en/latest/)

Full documentation and information about JHipster is available [here](https://www.jhipster.tech/) 

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


## Generating Services

You can use services to move business logic away from controllers. It also allows you to use DTOs.

You can generate services using the entity generator:

`jhipster entity newentity`

Or by using JDL:

 `service all with serviceImpl except Employee, Job`

Notice that only the service with interface option (serviceImpl) is enabled on this generator.

### Extending and Customizing Services 

One common use case is to customize service classes to suit different business needs. When using the jhipster generator to edit an existing entity or upgrading the generator's version, changes to the generated service classes might be overwritten. Altough it is possible to make changes directly to generated service classes, It might get tricky keeping track of changes.

Optionally, you can extend and customize service classes to avoid service class code overwriting.

Example:
Add an Author entity with service generation enabled by using the generator's cli. 
Then create the following class named `AuthorExtendedService.cs`:

```csharp
namespace MyCompany.Domain.Services {
    public class AuthorExtendedService : AuthorService, IAuthorService 
    {
        public CountryExtendedService(ApplicationDatabaseContext applicationDatabaseContext) : base(applicationDatabaseContext)
        {   
        }
        
        public override async Task Delete(long id) 
        {
            // add custom business logic before delete
            await base.Delete(id);
        }
    }
}
```

AuthorExtendedService class will override one specific method of its base class (or more if you wish) adding custom business logic and AuthorExtendedService class will be automatically be registered with the dotnet container. Any code using the IAuthorService dependency will use this class for its implementation.

Currently the automatic registration strategy for class/interface is used only for service classes/interfaces and more details are explained below.

### Automatic Service Registration In DI Container

Under the hood this project uses reflection for assembly scanning to automatically register service classes/interfaces with dotnet's dependency injection container.  Implementation details can be found at `ServiceStartup.cs` file located at `src/ProjectName/Configuration/` folder.

The following steps are used to automatically register service classes and interfaces:
- Scan `ProjectName.Domain.Services.Interfaces` namespace (at `ProjectName.Domain` assembly) for service interfaces and `ProjectName.Domain.Services` namespace (at `ProjectName.Domain.Services` assembly) for service classes.
- Find matching classes and its interfaces using the "I" prefix convention for interface name. This step registers the generated service classes/interfaces since they use "I" interface prefix convention, but user-defined services and interfaces can also be automatically registered using this convention.
For example: JobService class matches IJobService interface, EmployeeService class matches IEmployeeService interface, MyNewService class matches IMyNewService interface, etc...
- Service class names ending with 'ExtendedService' have higher priority for registration on the DI container. This is useful to make sure that the class will be registered and will replace any existing DI registrations.
For example: if JobExtendedService class is present and implements IJobService, then replace existing registrations.


## Using DTOs

Notice that this blueprint uses [AutoMapper](https://automapper.org/) to handle dto conversion instead of Java's mapstruct.

Example using JDL:

 ```dto * with mapstruct```

 See [JHispter's documentation](https://www.jhipster.tech/using-dtos/) for more details about using DTOs.


## Using database migrations

If you had already run the application before creating your first migration, some database tables might be already 
created automatically on application startup.
So you have the options of removing conflicting tables or editing the migration you just created.
If you wish to automatically apply database migrations when the application is started replace method 
EnsureCreated() by Migrate() at DatabaseStartup.cs file. Be aware of the implications of doing so.
Currently it is up to the user to create migrations.

1. Add EF Core cli tools

With .net core 3.0 the cli tool for entity framework was removed from the core sdk so you need to install it globally. 
You only need to do this once. See [Breaking changes included in EF Core 3.0](https://docs.microsoft.com/pt-br/ef/core/what-is-new/ef-core-3.0/breaking-changes#dotnet-ef) for reference.

```bash
dotnet tool install --global dotnet-ef
```

If using Visual Studio follow the documentation on [Entity Framework Core tools reference - Package Manager Console in Visual Studio](https://docs.microsoft.com/pt-br/ef/core/miscellaneous/cli/powershell)

2. Create the initial database migration

```bash
dotnet ef migrations add InitialCreate --project YourProject.csproj
```

3. Update the database

```bash
dotnet ef database update --project YourProject.csproj
```

Tips: 
- Remember to change the connection string to point to your database at appsettings.json.
- It is a good practice to check your migration files and backup your database before running migrations.


# Running SonarQube

## By Script : 

1. Run Sonar in container : ```docker-compose -f ./docker/sonar.yml up -d```
   
2. Wait container was up Run ```SonarAnalysis.ps1``` and go to http://localhost:9001

## Manually : 

1. Run Sonar in container : ```docker-compose -f ./docker/sonar.yml up -d```

2. Install sonar scanner for .net :
   
 ```dotnet tool install --global dotnet-sonarscanner```

3. Run ```dotnet sonarscanner begin /d:sonar.login=admin /d:sonar.password=admin /k:"YourProject" /d:sonar.host.url="http://localhost:9001" /s:"`pwd`/SonarQube.Analysis.xml"```

4. Build your application : ```dotnet build```

5. Publish sonar results : ```dotnet sonarscanner end /d:sonar.login=admin /d:sonar.password=admin```

6. Go to http://localhost:9001
   
# Monitoring your app

1. Run container (uncomment chronograf and kapacitor if you would use it): ```docker-compose -f ./docker/monitoring.yml up -d```

2. Go to http://localhost:3000 (or http://localhost:8888 if you use chronograf)
   
3. (Only for chronograf) Change influxdb connection string by ```YourApp-influxdb```

4. (Only for chronograf) Change kapacitor connection string by ```YourApp-kapacitor```
   
5. (Only for chronograf) You can now add dashboard (like docker), see your app log in Cronograf Log viewer and send alert with kapacitor

# <a name="oauth2"></a> OAuth2 and OpenID Connect

OAuth is a stateful security mechanism, like HTTP Session. Spring Security provides excellent OAuth 2.0 and OIDC support, and this is leveraged by JHipster. If you're not sure what OAuth and OpenID Connect (OIDC) are, please see [What the Heck is OAuth?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

## Keycloak

[Keycloak](https://keycloak.org) is the default OpenID Connect server configured with JHipster.

To log into your application, you'll need to have [Keycloak](https://keycloak.org) up and running. The JHipster Team has created a Docker container for you that has the default users and roles. Start Keycloak using the following command.

```
docker-compose -f ./docker/keycloak.yml up
```

The security settings in `appsettings.json` are configured for this image.

```
appsettings.json:
  ...
"jhipster": {
    "Security": {
      "Authentication": {
        "OAuth2": {
          "Provider": {
            "IssuerUri": "http://localhost:9080/auth/realms/jhipster",
            "LogOutUri": "http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/logout",
            "ClientId": "web_app",
            "ClientSecret": "web_app"
          }  
```

Keycloak uses an embedded H2 database by default, so you will lose the created users if you restart your Docker container. To keep your data, please read the [Keycloak Docker documentation](https://hub.docker.com/r/jboss/keycloak/). One solution, with keeping the H2 database, is to do the following:

- Add a volume that will be persisted: `./keycloak-db:/opt/jboss/keycloak/standalone/data`
- Change the migration strategy from `OVERWRITE_EXISTING`, to `IGNORE_EXISTING` (in the command section)

In production, it is required by Keycloak that you use HTTPS. There are several ways to achieve this, including using a reverse proxy or load balancer that will manage HTTPS. We recommend that you read the [Keycloak HTTPS documentation](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl) to learn more about this topic.

## Okta

If you'd like to use Okta instead of Keycloak, you'll need to change a few things. First, you'll need to create a free developer account at <https://developer.okta.com/signup/>. After doing so, you'll get your own Okta domain, that has a name like `https://dev-123456.okta.com`.

Modify `appsettings.json` to use your Okta settings. Hint: replace `{yourOktaDomain}` with your org's name (e.g., `dev-123456.okta.com`).

```
appsettings.json:
  ...
"jhipster": {
    "Security": {
      "Authentication": {
        "OAuth2": {
          "Provider": {
            "IssuerUri": "https://{yourOktaDomain}/oauth2/default",
            "LogOutUri": "https://{yourOktaDomain}/oauth2/default/v1/logout",
            "ClientId": "client_id",
            "ClientSecret": "client_secret"
          }
```

Create an OIDC App in Okta to get a `{client-id}` and `{client-secret}`. To do this, log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Web** and click the **Next** button. Give the app a name you’ll remember, and specify `http://localhost:[port]/login/oauth2/code/oidc` as a Login redirect URI. Click **Done**, then edit your app to add `http://localhost:[port]` as a Logout redirect URI. Copy the client ID and secret into your `application.yml` file.

Create a `ROLE_ADMIN` and `ROLE_USER` group (**Users** > **Groups** > **Add Group**) and add users to them. You can use the account you signed up with, or create a new user (**Users** > **Add Person**). Navigate to **API** > **Authorization Servers**, and click on the `default` server. Click the **Claims** tab and **Add Claim**. Name it `groups`, and include it in the ID Token. Set the value type to `Groups` and set the filter to be a Regex of `.*`. Click **Create**.

<img src="https://www.jhipster.tech/images/security-add-claim.png" alt="Add Claim" width="600" style="margin: 10px">

# License

Apache-2.0 © [Daniel Petisme]()


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
