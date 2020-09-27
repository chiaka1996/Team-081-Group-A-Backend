const http = require("http");
// const app = require("./app");
const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

// const {MongoClient} = require("mongodb");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.set("port", port);

app.use(cors());

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',(res) => {
    console.log("MongoDB connected");
});

const api = require("./routes");

app.use("/apis", api);

const server = http.createServer(app);

server.listen(port);