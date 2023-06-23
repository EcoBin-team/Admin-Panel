const router = require("express").Router()
const {createFeed } = require("../controllers/feedsController")

router.post('/feeds/post', createFeed);

module.exports = router

