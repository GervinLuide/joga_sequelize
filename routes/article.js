const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const articleAdminController = require('../controllers/admin/articles')

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

router.post('/create', articleAdminController.createArticle);

module.exports = router;