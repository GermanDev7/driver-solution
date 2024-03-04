To run the application, the following steps must be done:
clone the repository
In the root folder open the terminal and run npm i
configure the .env.example with the connection to the postgres database
to run the migrations and seeds:
npm run migrations:run
npm run seed:run

finally run the server

npm run dev


