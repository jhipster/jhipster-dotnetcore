# Heroku Deploy
The heroku sub-generator initializes a Heroku app with [jincod's .NET 5 buildpack](https://github.com/jincod/dotnetcore-buildpack) that is ready to push to Heroku. Free dynos and database addons are used.

Usage:
```bash
jhipster heroku
```
And
```bash
git push heroku main
```

## Databases

Currently MySql and PostgreSQL are supported and automatically added by the sub-generator when deploying to Heroku. [JawsDB MySQL addon](https://elements.heroku.com/addons/jawsdb) and [Heroku Postgres addon](https://elements.heroku.com/addons/heroku-postgresql) are used.

When using database addons, Heroku creates an environment variable named `DATABASE_URL`. 
It contains an URI with the following structure:
```
dbType://user:password@server-url:db-port/db-name
```

If `DATABASE_URL` is present, it takes precedence over existing connection strings. The values from `DATABASE_URL` are parsed at `DatabaseConfiguration.cs` file to build the final connection string.

Since the [MSSQL addon](https://elements.heroku.com/addons/mssql) is not free it requires manual provisioning. This sub-generator provides instructions on how to install the MSSQL addon.

If you want to stay at the free tier, consider changing the database type at `.yo-rc.json` to either mysql or postgres and re-generate the application.

**Note:**
The [heroku/nodejs](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs) buildpack is also added. It is a pre-requisite to build Angular/React client applications. A `package.json` is automatically added to the root folder as It's required by the heroku/nodejs buildpack, otherwise the application deploy will fail.