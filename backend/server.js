const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
import http from 'http';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

// Create a server object
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, {'Content-Type': 'text/plain'});
  // Write some text to the response
  res.end('Welcome to my simple Node.js app!');
});

server.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold);
});

// Serve front end in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.status(200);
//     res.send("API is running....");
//   });
// }

module.exports = app;
