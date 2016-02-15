# spring-rest

Demo REST service and client.

The REST service was developed as a Maven based project, using these on the server:

* Java 8 - (e.g see `CompanyController.listCompanies()`)
* Spring Boot, Spring MVC (`@RestController`)
* Spring Data JPA (currently uses in memory database where data will be lost when application stops)

The client application was developed as a single page application (SPA) to demonstrate usage of the REST service. It was developed using the following tools/stack:

* [ReactJS](https://facebook.github.io/react/), [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), ECMAScript 2015 ([modules](http://es6-features.org/#ValueExportImport))
* [Material Design Lite](https://www.getmdl.io/) (MDL) as a light weight, cross browser and mobile compliant UI toolkit.
* [Gulp](http://gulpjs.com/) to package the SPA (babel, minify, sourcemap) and ease development with [live reload](http://livereload.com/).

### Requirements

* Java 8, Maven 3.2.3 - for Spring Boot based REST service
* NPM, Gulp - for REST client application

### Running

It is a Maven based Spring Boot application.

    mvn spring-boot:run
    # visit http://localhost:8080/

### Developing the SPA

The SPA application was developed as a standalone frontend application.

    # in the "client" directory (run a console for each command)
    # need to use @CrossOrigin in CompanyController
    gulp                      // build SPA, watch for change, livereload
    npm run http-server       // frontend's development HTTP server

// TODO: expand from `package.json` and `gulpfile.js`.

### Accessing the REST Service

The services can be accessed via a built-in client application, Postman Chrome extension or cURL commands.

#### via Client Application

A ReactJS single page application was developed using ECMAScript 2015 and Material Design Lite (MDL) to demonstrate the use of these REST APIs. It can be accessed via `http://localhost:8080`

#### via Postman

Load the `companies-service.json.postman_collection` from Postman Chrome extension.

#### via cURL

The REST services can be accessed with these cURL commands.

##### Create a new company

    curl 'http://localhost:8080/companies' -H 'Content-Type: application/json' --data-binary $'{\n    "name": "Company B",\n    "address": "123, Location ABC",\n    "city": "Starling City",\n    "country": "UX",\n    "email": "abc@123",\n    "owners": ["carter", "dr wells"]\n}'

Sample Output:

``` javascript
{
  "id": "1",
  "name": "Company B",
  "address": "123, Location ABC",
  "city": "Starling City",
  "country": "UX",
  "email": "abc@123",
  "phoneNumber": null,
  "owners": [
    "dr wells",
    "carter"
  ]
}
```

##### Get a list of all companies

    curl 'http://localhost:8080/companies'

Sample output:

``` javascript
[
  {
    "id": "1",
    "name": "Company B"
  },
  {
    "id": "2",
    "name": "Company B"
  }
]
```

##### Get details about a company

    curl 'http://localhost:8080/companies/2'

Sample output:

``` javascript
{
  "id": "2",
  "name": "Company B",
  "address": "123, Location ABC",
  "city": "Starling City",
  "country": "UX",
  "email": "abc@123",
  "phoneNumber": null,
  "owners": [
    "dr wells",
    "carter"
  ]
}
```

##### Update a company

The update service will not update owners. To update owners, use the "add owners" service.

    curl 'http://localhost:8080/companies/2' -X PUT -H 'Content-Type: application/json' --data-binary $'{\n    "name": "updated company name",\n    "id": "bobby",\n    "sdsa": "sdsd",\n    "city": "Rimau"\n}'

Sample output:

``` javascript
{
  "id": "2",
  "name": "updated company name",
  "address": "123, Location ABC",
  "city": "Rimau",
  "country": "UX",
  "email": "abc@123",
  "phoneNumber": null,
  "owners": [
    "dr wells",
    "carter"
  ]
}
```

##### Add owner(s) of the company

    curl 'http://localhost:8080/companies/2/addOwner' -X PUT -H 'Content-Type: application/json' --data-binary $'[\n    "owner-1", "owner-2", "owner-3"\n]'

Sample output:

``` javascript
[
  "dr wells",
  "carter",
  "owner-1",
  "owner-2",
  "owner-3"
]
```


