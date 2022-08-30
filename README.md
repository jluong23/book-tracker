# Task Tracker

Following the MERN Stack Tutorial by The Net Ninja [here](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE).

# Running the Project

- Create a .env file in [backend](./backend/), following the structure from [example.env](./backend/example.env).
  - `MONGO_URI` and `JWT_SECRET` values are provided by the repository owners.
- Starting the backend express server: 
  - In the [backend](./backend/) directory, run `npm install`.
  - Start the server with `npm run dev`, running on port 5000. (specified in .env)
  - If successful, the server will print *Connected to database* and show incoming HTTP requests.

- Starting the react Frontend:
  - In a separate terminal and in the [frontend](./frontend/) directory, run `npm install`
  - Start the frontend with `npm start`, running on port 3000.