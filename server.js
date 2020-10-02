const http= require("http");

const express= require("express");

const cors= require("cors");

const mongoose= require("mongoose");

const expressfileupload= require("express-fileupload");

require("dotenv").config();

const app= express(); 

app.use(expressfileupload({useTempFiles: true}));

app.use(express.json());

const port= process.env.PORT || 5000;

app.set("port", port);

app.use(cors());

const uri= process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',(res) => {
    console.log("mongodb connected");
});
const api= require("./routes");

app.use("/apis", api);

const server= http.createServer(app);

server.listen(port);