import express from "express"
require("dotenv").config();

import configViewEngine from "./config/viewEngine"
import initAPIRoute from "./routes";
import bodyParser from "body-parser";
import configCors from "./config/cors";
import connection from "./config/connectDB";

const app = express()
const PORT = process.env.PORT || 8081;

// config Cors
configCors(app)

// config view engine
configViewEngine(app)

// config body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connection db
connection()

// routes
initAPIRoute(app)

app.listen(PORT, () => {
    console.log(">>> Programming Course BACKEND is running on the PORT = " + PORT);
})