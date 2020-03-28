# Lexical Density

[![Build Status](https://travis-ci.org/ashraymehta/lexical-density.svg?branch=master)](https://travis-ci.org/ashraymehta/lexical-density)

Lexical Density is a Node.js application for calculating the lexical density of a text.

## Tech Stack
* Node.js 12.16.1
* MongoDB 4.2
* TypeScript
* Express Server
* Inversify (Dependency Injection)

## Build

Please use `npm ci` to install the npm dependencies. After that, use the following command to build the project:

```bash
npm run build
```

The above command will run the tests, tslint, and produce the JS output in the `build` directory.

## Start

You can use the following command to start the application:

```bash
npm start
```

The application server boots-up on port `15000`.

#### Note
You'll only be able to start the project after a successful `npm run build` or `npm run assemble`.

## API

You can calculate the lexical density of a text using the following `GET` API:

```
http://localhost:15000/complexity?text=<text to calculate the lexical density>
```

You can also access the statement level lexical density by passing in an additional query parameter (`mode`) to the same API as
 demonstrated
 below:

```
http://localhost:15000/complexity?mode=verbose&text=<text to calculate the lexical density>
```

#### Note

The list of non-lexical words is seeded every time at application boot-up. This is only for better demo experience.

## Improvements

Here are the improvements which can be made to the project:

* Add non-lexical words on the fly. This is easily achievable in the current project structure
 without requiring many changes.
* Protect the above endpoint by using a lightweight auth mechanism like JWT. 
* Move configurations like server port, mongodb URL, etc. to a configuration mechanism (config file, third-party configuration service, etc
.). 

## License
[MIT](https://choosealicense.com/licenses/mit/)