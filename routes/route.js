const express = require('C:/Users/a1/AppData/Roaming/npm/node_modules/express');
const router = express.Router()
const {homePage,allNews,idNews,postNews,putNews,delNews}=require('../controller/route_func')

router.route("/").get(homePage)
router.route("/news").get(allNews)
router.route("/news/:id").get(idNews)
router.route("/news").post(postNews)
router.route("/news").put(putNews)
router.route("/news").delete(delNews)

module.exports=router