Made by Kusti Hämäläinen, student id 706799

---- LAUNCHING LOCALLY ----
No test environment databases, application uses only production configurations.
Launch:
$ docker-compose up
-enter http://localhost:7777

Run tests:
$ deno test --allow-env --allow-net

---- CREATE TABLE statements used: ----

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE mreports (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    sleepduration NUMERIC(3, 1),
    sleepquality NUMERIC(1) CHECK (sleepquality <= 5 AND sleepquality >= 1),
    genericmood NUMERIC(1) CHECK (genericmood <= 5 AND genericmood >= 1),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE ereports (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    sportduration NUMERIC(3, 1),
    studyduration NUMERIC(3, 1),
    regularity NUMERIC(1) CHECK (regularity <= 5 AND regularity >= 1),
    eatquality NUMERIC(1) CHECK (eatquality <= 5 AND eatquality >= 1),
    genericmood NUMERIC(1) CHECK (genericmood <= 5 AND genericmood >= 1),
    user_id INTEGER REFERENCES users(id)
);




---- STRUCTURE ----

│   app.js
│   deps.js
│   docker-compose.yml
│   Dockerfile
│   README.md
├───.github
│   └───workflows
│           deno.yml
├───postgres-data
├───config
│       config.js
├───database
│       database.js
├───middlewares
│       middlewares.js
├───routes
│   │   routes.js
│   ├───apis
│   │       summaryApi.js
│   └───controllers
│           authController.js
│           getNavbarContent.js
│           siteController.js
│           summaryController.js
├───services
│       authentication.js
│       report.js
│       summary.js
├───static
|       logo.png
├───tests
│       app_test.js
├───utils
│       dateValidate.js
└───views
    │   index.ejs
    │   login.ejs
    │   register.ejs
    ├───partials
    │       footer.ejs
    │       header.ejs
    │       navbar.ejs
    ├───reporting
    │       evening.ejs
    │       morning.ejs
    │       repindex.ejs
    └───summary
            summary.ejs