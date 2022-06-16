# Deploying to Heroku

This sub-generator allows the deployment of your JHipster .Net application to Heroku cloud.

The Heroku sub-generator will always use free tiers/options. Nevertheless installing addons needs a properly verified Heroku account. 

Therefore to avoid any unexpected build failures, we would recommend verifying your Heroku account before starting this sub-generator.

## Pre-requisites

Before running the sub-generator, you must install the [Heroku CLI](https://cli.heroku.com/).

Make sure that you are logged into Heroku.
```bash
heroku login
```

[Git](https://git-scm.com/) is also required to deploy to Heroku.

Also make sure you have a working Docker installation (eg. `docker ps`) if deploying to Heroku Container Registry.

## Deploying to Heroku

To deploy your .Net application to Heroku, run the following command:

```bash
jhipster heroku
```

## Databases

Currently MySql and PostgreSQL database addons are free and automatically added by this sub-generator when deploying to Heroku. Even though those resouces are free, an accound with verified credit card is required to add them.

Heroku's [MSSQL addon](https://elements.heroku.com/addons/mssql) is not free of cost and to avoid unexpected costs It's not automatically added when deploying to Heroku. To use MSSQL It requires manual provisioning to avoid unwanted chages and a message will be displayed with instructions on how to manually install the addon.

## Limitations

Only monolithic deploys are supported. Microservice/Gateway deploys are not supported at the moment.

**Notes:**

This Heroku sub-generator is similar to its Java counterpart. Access the documentation at https://www.jhipster.tech/heroku/. It might provide helpful insight.
