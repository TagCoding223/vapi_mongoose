const path = require('path');
const mongoose = require("C:/Users/a1/AppData/Roaming/npm/node_modules/mongoose")
const { connectDB, modelDB } = require("../db/connect");
const { title } = require('process');

const homePage = async (req, res) => {
    // res.status(200).send("Home Page");
    res.status(200).sendFile(path.resolve(__filename, "../../index.html"))
}

const allNews = async (req, res) => {
    try {
        await connectDB(process.env.DB_URI)
        const News = await modelDB()
        const data = await News.find({}, { _id: 0 }).sort({news_id:1});
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("Something is wrong when getting all news.")
    } finally {
        mongoose.connection.close().then(() => {
            console.log("Database connection succefully closed.");
        }).catch(() => {
            console.log("Database close process fail.");
        })
    }
}
const idNews = async (req, res) => {
    const id = req.params.id
    try {
        await connectDB(process.env.DB_URI)
        const News = await modelDB()
        // const data = await News.aggregate([{$match : {news_id:{eq:id}}}]);
        const data = await News.find({ news_id: id }, { _id: 0 })
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send("Something is wrong when getting specific news.")
    } finally {
        mongoose.connection.close().then(() => {
            console.log("Database connection succefully closed.");
        }).catch(() => {
            console.log("Database close process fail.");
        })
    }
}
const postNews = async (req, res) => {
    try {
        await connectDB(process.env.DB_URI)
        const News = await modelDB()
        const nextId = (await News.find({}, { news_id: 1, _id: 0 }).sort({ news_id: -1 }).limit(1))[0].news_id + 1
        const d = new Date()
        const data = {
            news_id: nextId,
            title: req.body.title,
            news_link: req.body.news_link,
            image_link: req.body.image_link,
            news_host: req.body.news_host,
            posted_in: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }
        const response = await News.insertMany(data)
        console.log(response);
        res.status(200).send({ response, status: "news created!" })// send json but user has option to handle responsce as a json or text
    } catch (error) {
        console.log(error);
        res.status(500).send("Something is wrong when post a news.")
    } finally {
        mongoose.connection.close().then(() => {
            console.log("Database connection succefully closed.");
        }).catch(() => {
            console.log("Database close process fail.");
        })
    }
}
const putNews = async (req, res) => {
    try {
        await connectDB(process.env.DB_URI)
        const News = await modelDB()
        const isIdPresent = await News.find({ news_id: req.body.id }, { news_id: 1, _id: 0 })
        if (isIdPresent == 0 || req.body.id<6) {
            res.status(200).send({ status: "News Not Present on Given news_id or update opration not allow at below news_id 6 ." })
        } else {
            const data = {
                title: req.body.title,
                news_link: req.body.news_link,
                image_link: req.body.image_link,
                news_host: req.body.news_host
            }
            const response = await News.updateOne({news_id:req.body.id},{$set:data})
            console.log(response);
            res.status(200).send({response,status:"News update successfully!"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something is wrong when post a news.")
    } finally {
        mongoose.connection.close().then(() => {
            console.log("Database connection succefully closed.");
        }).catch(() => {
            console.log("Database close process fail.");
        })
    }
}
const delNews = async (req, res) => {
    try {
        await connectDB(process.env.DB_URI)
        const News = await modelDB()
        const isIdPresent = await News.find({ news_id: req.body.id }, { news_id: 1, _id: 0 })
        if (isIdPresent == 0 || req.body.id<6) {
            res.status(200).send({ status: "News Not Present on Given news_id when you perfrom delete operation or below news_id 6 delete operation not allowed ." })
        } else {
            const response = await News.deleteOne({news_id:req.body.id})
            console.log(response);
            res.status(200).send({response,status:"News deleted successfully!"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something is wrong when post a news.")
    } finally {
        mongoose.connection.close().then(() => {
            console.log("Database connection succefully closed.");
        }).catch(() => {
            console.log("Database close process fail.");
        })
    }
}
module.exports = { homePage, allNews, idNews, postNews, putNews, delNews }