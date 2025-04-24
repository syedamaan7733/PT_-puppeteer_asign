const express = require("express");
const morgan = require("morgan");

// routing
const scapRoute = require("./routes/scrpper.route");
const app = express();

// middlewares
app.use(express.json());
// dev middleware
app.use(morgan("dev"));

// Routing
app.use("/github-user", scapRoute);

const port = 8080;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
