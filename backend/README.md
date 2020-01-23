# Getting started
To help you with the setup we have provided a PostgreSQL database that runs in Docker. To use this you need to have [Docker](https://www.docker.com/) and [Node](https://nodejs.org/) installed on your computer and then run these commands in your terminal.

1. Open this folder in your terminal
2. Run `docker-compose up -d`
3. Run `npm i`
4. Run `npm run init-db` to setup the database and populate it with data. You can find the database definition in the migrations folder.

If you want to run the database without using docker you will have to update the `knexfile.js` file with the connection information for your database setup and then run `npm run init-db` to populate the database.

When you are done you can run `docker-compose down` to take down the database.

# Dev
Run `npm run dev` to start nodemon with index.js


