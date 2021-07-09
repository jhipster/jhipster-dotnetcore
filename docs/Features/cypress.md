# Cypress

When generating an application, you are able to auto-generate Cypress tests.

## Introduction

Cypress is a next generation front end testing tool built for the modern web. It allows to run multiple end to end tests on all your application features.

## Pre-requisites

When generating your application, make sure to check "Cypress" in your optional testing framworks (by pressing the space bar).

![cypress-choice](../assets/cypress-choice.png)

## How to use it

Once your application is generated, you can optionally add some entities, it will auto-generate the corresponding tests for your entities. Make sure to run it at least once then execute cypress using this command :
```bash
cd src/YourApplication/ClientApp
./node_modules/.bin/cypress open
```
You can click on "run tests" to get started