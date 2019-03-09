const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger("dev"));

app.use(routes);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks", {useNewUrlParser: true});

app.listen(PORT, () => console.log(`now listening on http://localhost:${PORT}`));