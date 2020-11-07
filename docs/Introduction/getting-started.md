# Getting Started 

## Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

## Generate your first application

Installation of the blueprint 

```bash
npm install -g generator-jhipster-dotnetcore
```

Call the generator

```bash
jhipster --blueprints dotnetcore
```

After running this command you have few questions to answer, as Application name, authentication mode, client framework etc 
Once it's done, you can build and run your application.

```bash
dotnet run --verbosity normal --project ./src/YourAppName/YourAppName.csproj
```

Your first application is ready and you can now use it with default user like JHipster (admin admin or user user)

Ok now you have an application but without entity. 
JHipster allow you to add entity with cli or with jdl file (add link)
JHipster.NET have the same behavior.

```bash
jhipster entity <entity-name>
```

Or with jdl 

```bash
jhipster import-jdl my_file.jdl
```
You can edit jdl with https://start.jhipster.tech/jdl-studio/

You have now an application with CRUD operations on each new entities with potentially link between entities (one-to-one, many-to-one or many-to-many)

Default configurations are availables in the generated project. As an example, a docker compose file is generated with monitoring solutions (influxdb telegraf and chronograf or grafana)

The repository : [https://github.com/jhipster/jhipster-dotnetcore](https://github.com/jhipster/jhipster-dotnetcore)

Sample project : [https://github.com/jhipster/jhipster-sample-app-dotnetcore](https://github.com/jhipster/jhipster-sample-app-dotnetcore)