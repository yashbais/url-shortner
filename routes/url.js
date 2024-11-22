const express = require('express')
const {
    handleGenerateNewShortURL,
    handleRedirectShortURL,
    hanldeAnalytics
} = require('../controllers/url')

const router = express.Router()

router.post("/",handleGenerateNewShortURL)

router.get("/:shortId",handleRedirectShortURL)

router.get("/analytics/:shortId",hanldeAnalytics)

module.exports = router