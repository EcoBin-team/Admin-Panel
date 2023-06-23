const express = require('express');
const router = express.Router();
const { getFAQs, getGuides,addFAQ } = require('../controllers/helpsController');

// GET FAQs
router.get('/faqs', getFAQs);

// GET Guides
router.get('/guides', getGuides);
router.post('/faq/post',addFAQ)
module.exports = router;