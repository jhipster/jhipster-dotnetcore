# Heroku Deploy
This sub-generator initializes a [Heroku](https://heroku.com) app with [jincod's Heroku .NET buildpack](https://github.com/jincod/dotnetcore-buildpack) using [.Net 5](https://docs.microsoft.com/pt-br/dotnet/core/dotnet-five) that is ready to push to Heroku.
Free dynos and database addons are used.

## Pre-requisites
Before running the sub-generator, you must install the [Heroku CLI](https://cli.heroku.com/).
You must also create a Heroku account and run:
```bash
heroku login
```
[Git](https://git-scm.com/) is also required to deploy to Heroku.

## Deploying to Heroku
To deploy your .Net 5 application to Heroku, run this command:
```bash
jhipster heroku
```
And follow the instructions.

## Databases

Currently MySql and PostgreSQL are supported and automatically added by the sub-generator when deploying to Heroku. [JawsDB MySQL addon](https://elements.heroku.com/addons/jawsdb) and [Heroku Postgres addon](https://elements.heroku.com/addons/heroku-postgresql) are added to the Heroku app using the free tier provided by the addons.

Since the [MSSQL addon](https://elements.heroku.com/addons/mssql) is not free it requires manual provisioning. This sub-generator provides instructions on how to manually install the MSSQL addon.

Heroku creates an environment variable named `DATABASE_URL` when using database addons. It contains an URI with the following structure: `dbType://user:password@server-url:db-port/db-name`.

If `DATABASE_URL` is present, it takes precedence over existing connection strings. The values from `DATABASE_URL` are parsed at `DatabaseConfiguration.cs` file.

**Note:**
The [heroku/nodejs](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs) buildpack is also added to the Heroku app. It is a pre-requisite to build Angular/React client applications. 
A `package.json` is automatically added to the root folder as It's required by the heroku/nodejs buildpack, otherwise the application deploy will fail.

The Jhipster.Net Heroku sub-generator is similar to its Java counterpart. Access its documentation at: https://www.jhipster.tech/heroku/. Keep in mind that there are some differences.