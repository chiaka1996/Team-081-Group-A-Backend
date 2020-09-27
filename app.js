const express = require("express");

const cors = require("cors");

// const mongoose = require("mongoose");

const {MongoClient} = require("mongodb");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());


async function main() {
    const uri = process.env.ATLAS_URI;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    try{
        await client.connect();

        // await listDatabases(client);
        console.log("mongodb connected");

    } catch (e) {
        return e;
    } finally {
        await client.close();
    }

}

main().catch();

module.exports = app;