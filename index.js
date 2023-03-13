const express = require("express")
const app = express()

//parse request of content type aplication/json
app.use(express.json());
//parse request of content type application/x-ww-form-urlencoded
app.use(express.urlencoded({extended:true}));

//connect to database
const Sequelize = require("sequelize");
const sequalize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

//testing connection
sequalize
    .authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err =>{
        console.error('Unable to connect to the database:', err);
    });

//simple route
app.get ("/", (req,res) =>{
    res.json({ message: "Welcome to sequelize application."});
});

app.listen(3000, () =>{
    console.log("Server is running on http://localhost:3000")
})