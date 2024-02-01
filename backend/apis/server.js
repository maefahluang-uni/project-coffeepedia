const express = require("express");
const cors = require("cors");
const router = require("./routes/contactRoute");
const config = require("./config");
const port = config.SERVER_PORT;

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<p>Coffeepedia API server</p>");
});

app.use("/api", router);

app.listen(port, () => {
  console.log("API listenning on http://localhost:" + port + "/");
});
