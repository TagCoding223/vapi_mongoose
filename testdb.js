// mongodb connection using mongoose

const mongoose = require("C:/Users/a1/AppData/Roaming/npm/node_modules/mongoose")
const uri = "mongodb://127.0.0.1/shop"
const runMain=async()=>{
    await mongoose.connect(uri).then((result) => {
        console.log("Connection done !!!");
    }).catch((err) => {
        console.log("Database Connection fail");
    });

    // schema
    const salesSchema = new mongoose.Schema({
        _id:Number,
        quantity:Number,
        price:Number,
        targetPrice:Number
    })

    // model
    const Sales = new mongoose.model("Sales",salesSchema)
    console.log(Sales);
    try {
        const data = await Sales.find()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
runMain()