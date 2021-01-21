---- STRUCTURE ----

|
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
├───views
|   │   index.ejs
|   │   login.ejs
|   │   register.ejs
|   ├───partials
|   │       footer.ejs
|   │       header.ejs
|   │       navbar.ejs
|   ├───reporting
|   │       evening.ejs
|   │       morning.ejs
|   │       repindex.ejs
|   └───summary
|           summary.ejs
|
│   app.js
│   deps.js
│   docker-compose.yml
│   Dockerfile
|   Procfile
│   README.md
|   runtime.txt

---- FILES EXPLAINED ----

database.js: Database functionalities, using a connection pool of 5 concurrent connections and query caching. Cache is cleared
after each REMOVE, UPDATE or INSERT INTO statement by function clearCache.
Authentication-related queries aren't cached due to security reasons.

middlewares.js: For each request, these middleware functions are called to redirect to login if unauthenticated, log errors, serve
static files and time the requests.

summaryApi.js: Responds with a JSON-format document generated over data of all users

controllers: Responsible for passing data by 'render' function to views

services: Authentication, behavior reporting and summary request processing and database queries.
Passwords are encrypted to database by library bcrypt.

app_test.js: Tests

dateValidate.js: A helper function to format dates to SQL- and HTML-friendly format

views: EJS template views for sites

deps.js: Externally imported functionalities

app.js: Main
