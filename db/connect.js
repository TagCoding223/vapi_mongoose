const mongoose = require("C:/Users/a1/AppData/Roaming/npm/node_modules/mongoose")

// connection
const connectDB = async (uri) =>{
    return await mongoose.connect(uri).then(()=>{
        console.log("Database connection done");
    }).catch(()=>{
        console.log("Connection failed");
    })
}
// schema
const newsSchema = new mongoose.Schema({
    news_id:Number,
    title:String,
    news_link:String,
    image_link:String,
    news_host:String,
    posted_in:String
})

// model
const News = new mongoose.model("News",newsSchema)
const modelDB = async ()=>{
    return News
}
module.exports={connectDB,modelDB}