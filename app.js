const express = require("express");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 5000;
const HttpError = require('./models/http-error')

// routing
const placesRoutes = require("./routes/places.routes");
const usersRoutes = require("./routes/users.routes");

app.use(express.json()).use(express.urlencoded({ extended: true }));

app.use("/api/places", placesRoutes).use("/api/users", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route', 404)
})

// errors handlers
app.use((err, req, res, next) => {
  if (res.headerSend) {
    return next(err);
  }

  res.status(err.code || 500).json({
    message: err.message || "An unknown error occurred!"
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
