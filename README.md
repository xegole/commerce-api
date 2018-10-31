# Commerce-APi

Starter project for creating a MVC express server, using

+ express
+ mongoose
+ babel-cli
+ winston and morgan for logging
+ Async/Await

## Installation

Clone the repository and run `npm install`

```
git clone https://url-repo.git
npm install
```

## Starting the server

```
npm start
```

The server will run on port 3000. You can change this by editing `config.dev.js` file.

## Run server in production with Docker

```
npm run build
```

After npm building the project, go to project root directory, open shell and run:
```
docker build -t express-es6-starter .
```
