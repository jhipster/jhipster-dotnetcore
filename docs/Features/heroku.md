# Heroku Deploy
This sub-generator initializes a Heroku [.Net 5](https://docs.microsoft.com/pt-br/dotnet/core/dotnet-five) app that is ready to push to Heroku.

## Pre-requisites
Before running the sub-generator, you must install the [Heroku CLI](https://cli.heroku.com/).
You must also create a Heroku account and run:
```bash
heroku login
```
[Git](https://git-scm.com/) is also required to deploy to Heroku.
Also make sure you have a working Docker installation (eg. `docker ps`).

## Deploying to Heroku
To deploy your .Net 5 application to Heroku, run this command:

```bash
jhipster heroku
```

This will initialize a new Heroku app and git push your application to Heroku.
Free tier dynos and database addons are used by the generator. A verified Heroku account might be needed to add some of the resources.

If using OAuth 2.0/Okta please read the pre-requisites and instructions at the [main JHipster Heroku sub-generator](https://www.jhipster.tech/heroku/).

## Databases

Currently MySql and PostgreSQL are supported and automatically added by the sub-generator when deploying to Heroku. [JawsDB MySQL addon](https://elements.heroku.com/addons/jawsdb) and [Heroku Postgres addon](https://elements.heroku.com/addons/heroku-postgresql) are added to the Heroku app using the free tier.

Since the [MSSQL addon](https://elements.heroku.com/addons/mssql) is not free it requires manual provisioning to avoid unwanted chages. If the JHipster.NET application was generated using Microsoft SQL Server as the database a message will be shown providing instructions on how to manually install the MSSQL addon.

Heroku creates an environment variable named `DATABASE_URL` when using database addons. It contains the following structure: `dbType://user:password@server-url:db-port/db-name`. 
If `DATABASE_URL` is present the database credentials are parsed at `DatabaseConfiguration.cs` to create a properly formed connection string. And it takes precedence over existing connection strings. 
Also, maximum connections limit for database pooling are added to the connection string to respect the addon's limits.

Please refer to Jincod's dotnetcore buildpack documentation on [Enabling Automatic Migrations](https://github.com/jincod/dotnetcore-buildpack#enabling-automatic-migrations) if your application uses them.

## Limitations

Only monolithic deploys are supported. Microservice/Gateway deploys are not supported at the moment.

**Notes:**

This Heroku sub-generator is similar to its Java counterpart. Access the documentation at https://www.jhipster.tech/heroku/. It might provide helpful insight. But keep in mind that there are some differences between both implementations of the Heroku sub-generator.

[Jincod's Heroku .NET Core buildpack](https://github.com/jincod/dotnetcore-buildpack) is used to deploy this .Net 5 application to Heroku. Reading its documentation is also recommended.

The [heroku/nodejs buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs) is also added to the Heroku app. It is a pre-requisite to build Angular/React client applications.

A `package.json` file is automatically added to the root folder as It's required by the heroku/nodejs buildpack, otherwise the application deploy will fail.