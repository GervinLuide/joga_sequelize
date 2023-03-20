// get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

// read model data table representation
const models = require('../models')

// get all data from table
const getAllArticles = (req, res) => {
    models.Article.findAll()
        .then(articles =>{
            console.log(articles)
            return res.status(200).json({articles});
        })
        .catch (error =>{
            return res.status(500).send(error.message);
        })
}
//show article by this slug
const getArticleBySlug = (req, res) =>{
    models.findOne({
        where: {
            slug : rq.params.slug
        },
        include: [{
            model: models.Author
        }],
    })
        .then(article =>{
            console.log(article)
            return res.status(200).json({article});
        })
        .catch(error =>{
            return res.status(500).send(error.message);
        })
};

const getArticleByAuthor = (req,res) =>{
    models.Article.findAll({
        where: {
            author_id:req.params.author_id
        },
    })
        .then(article =>{
            console.log(article)
            return res.status(200).json({article});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

//export controllers functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticleByAuthor
};