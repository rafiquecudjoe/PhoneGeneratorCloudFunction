const functions = require("firebase-functions");
require('dotenv').config()

const cors = require("cors");
const express = require("express");
const Router = require("./Routes/Router");

const app = express();

app.use(cors());
app.use(express.json());

app.use(Router);

exports.app = functions.https.onRequest(app);
