const express = require("express")
const app = express()

//parse request of content type aplication/json
app.use(express.json())
//parse request of content type application/x-ww-form-urlencoded
app.use(express.urlencoded({extended:true}));
//simple route
app.get ("/", (req,res) =>{
    res.json({ message: "Welcome to sequelize application."});
});

app.listen(3000, () =>{
    console.log("Server is running on http://localhost:3000")
})