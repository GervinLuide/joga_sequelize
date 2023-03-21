// get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')
const con = require('../../utils/db');

//read models data for table representation
const models = require('../../models')


//create new article into data table
const createArticle = (req,res) =>{
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body

    //create new article bu article model
    const newArticle = models.Article.create({
    // add values for not null fields
    // left one - data table fields
    // right one - values form form

        name:name,
        slug:slug,
        image:image,
        body:body,
        //publish date generate as now()
        published: new Date().toISOString().slice(0,19).replace('T', ' ')
    })

        .then(articles =>{
            console.log(articles)
            return res.status(200).json({message: "New article is added"});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}
const updateArticle = (req,res) =>{
    if(req.method == "GET"){
        let query = `SELECT * FROM Articles WHERE id="${req.params.id}"`
        let article
        con.query(query, (err, result) =>{
            if(err) throw err;
            article = result
            console.log(article)
            res.render('article', {
                article: article,
            })
        })
    }else if(req.method == "POST"){

        let name = req.body.name
        let slug = req.body.slug
        let image = req.body.image
        let body = req.body.body
        let author = req.body.author_id
        models.Article.update({
            name:name,
            slug:slug,
            image:image,
            body:body,
            author_id:author,
            updatedAt: new Date().toISOString().slice(0,19).replace('T', ' ')
        },{
            where:{id : req.params.id}
        })
            .then(articles =>{
                console.log(articles)
                return res.status(200).json({message: "New article is added"});
            })
            .catch(error=>{
                return res.status(500).send(error.message);
            })
    }
}
const deleteArticle = (req,res) =>{
    models.Article.destroy({
        where:{id : req.params.id}
    })
        .then(articles =>{
            console.log(articles)
            return res.status(200).json({message: "New article is added"});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

const getAllArticles = (req,res) =>{
    models.Article.findAll()
        .then(articles =>{
            console.log(articles)
            return res.status(200).json({article});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

const getArticleBySlug = (req,res) =>{
    models.Article.findOne({
        where: {
            slug:req.params.slug
        },
        include: [
            {
                model: models.Author,
            },
            {
                model: models.Tags,
                through:{
                    model: models.ArticleTag
                }
            }
        ],
    })
        .then(article =>{
            console.log(article)
            return res.status(200).json({article});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

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

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticleByAuthor,
    createArticle,
    updateArticle,
    deleteArticle
}
