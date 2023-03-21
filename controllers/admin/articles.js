// get connection to database ORM object
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

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

//export controller functions
module.exports = {
    createArticle
}