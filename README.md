
# Expense App : Backend

The Backend of Expense app, server that handle requests for CRUD operations on a database.
## Features
 - Backend is developed by following MVC (Model View Controller) architecture.
 - Used ExpressJS to handle the incoming requests from client.
 - Mongoose is used as a driver to connect with MongoDB.
 - Authentication is performed
 - Password is encrypted during registeraton using 'bcryptjs' package.
 

## Installation

Clone the repository

```
  git clone https://github.com/Prakash-Er24/Expense-App-Backend.git
```
Go to the project directory
```
  cd <my-project>
``` 
Install the packages
```
  npm install <package-name>
```
Install MongoDB Community Edition and run it by executing
```` 
  mongod
````
Run the server
```
  npm index.js
```
Use nodemon to run the server (Recommended).

## Packages installed 
 - express, mongoose, bcryptjs, jsonwebtoken, cors, validator, dotenv, multer, lodash.

## Authors

- [@Prakash-Er24](https://github.com/Prakash-Er24)

