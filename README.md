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
