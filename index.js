const express = require('C:/Users/a1/AppData/Roaming/npm/node_modules/express');
const mongoose = require("C:/Users/a1/AppData/Roaming/npm/node_modules/mongoose")
const cors = require("C:/Users/a1/AppData/Roaming/npm/node_modules/cors")
const bodyParser = require("C:/Users/a1/AppData/Roaming/npm/node_modules/body-parser")
const app = express()
require('C:/Users/a1/AppData/Roaming/npm/node_modules/dotenv').config()
const apiRouter = require("./routes/route")
const {connectDB} = require("./db/connect")
const PORT = process.env.PORT || 3000

// use in this why cors , bodyParser , router , static
app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())
app.use("/", apiRouter)
app.use(express.static(__dirname + "/static"))

const apiGateway = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server curruntly run on http://localhost:3000`);
        })
    } catch (error) {
        console.log(error);
    } finally {
        
    }
}
apiGateway()