# Deploying to Heroku

This sub-generator allows the deployment of your JHipster .Net application to Heroku cloud.

The Heroku sub-generator will always use free tiers/options but there would be no resources and dynos available hence a paid plan of Heroku is required. 

Therefore to avoid any unexpected build failures, we would recommend verifying your Heroku account before starting this sub-generator.

## Pre-requisites

Before running the sub-generator, you must install the [Heroku CLI](https://cli.heroku.com/).

Make sure that you are logged into Heroku.
```bash
heroku login
```

[Git](https://git-scm.com/) is also required to deploy to Heroku.

Also make sure you have a working [Docker](https://docs.docker.com) installation (eg. `docker ps`) if deploying to Heroku Container Registry.

## Deploying to Heroku

To deploy your application to Heroku, run the following command:

```bash
jhipster heroku
```

## Databases

- Mysql ✔
- Postgres ✔ 
- MSSQL ✔ (requires a manual step described below)

The MySql and PostgreSQL database addons are not free of cost and won't be automatically added by the sub-generator when deploying to Heroku. A paid plan is required to use the resources and addons.

Likewise, Heroku's [MSSQL addon](https://elements.heroku.com/addons/mssql) is not free of cost and to avoid unexpected costs It will not be provisioned automatically when deploying to Heroku.

Please visit [the MSSQL addon page](https://elements.heroku.com/addons/mssql), review the pricing and add the MSSQL addon to your account with the following command:
```bash
heroku addons:create mssql:REPLACE_PLAN_NAME --as DATABASE --app REPLACE_YOUR_APP_NAME
```

## Oauth2

For applications that use Oauth2 the following manual steps are required:

    1. Deploy the application to Heroku using `jhipster heroku`.
    2. Access your (Heroku Dashboard)[https://dashboard.heroku.com/] and select the app you have just created.
    3. Under `Installed add-ons` okta should be already installed.
    4. Click on `okta` to open the addon's Dashboard.
    5. To configure it follow the documentation (here)[https://jhipsternet.readthedocs.io/en/latest/Features/security.html#okta]


## Limitations

Only monolithic deploys are supported at the moment.
