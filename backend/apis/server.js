const express = require("express");
const cors = require("cors");
const router = require("./routes");
const config = require("./config");
const port = config.SERVER_PORT;

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to check API key
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (apiKey && apiKey === config.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.use(apiKeyMiddleware);

app.get("/", (req, res) => {
  res.send("<p>Coffeepedia API server</p>");
});

app.use("/api", router);

app.use(
  "/images/roasted_coffee/",
  express.static("public/images/roasted_coffee")
);
app.use("/images/blog/", express.static("public/images/roasted_coffee"));

app.listen(port, () => {
  console.log("API listenning on http://localhost:" + port + "/");
});
