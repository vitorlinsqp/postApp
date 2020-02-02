const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

//config
    //template engine
    app.engine("handlebars",handlebars({defaultLayout : 'main'}))
    app.set('view engine', 'handlebars')
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

//routes
app.get("/", function(req,res){
    Post.findAll().then(function(posts){
        //console.log(posts)
        res.render("home",{"posts" : posts})
    })
})

//this route is where the form will be fill up
app.get("/cad", function (req,res){
    res.render('forms')
})

app.get("/delete/:id", function(req,res){
    Post.destroy({where:{'id': req.params.id}}).then(function(){
        res.send("Post Deleted")
    }).catch(function(err){
        res.send("That post does not exist" + err)
    })
})
// this route is where the information got in the forms will be add
app.post("/add", function (req,res){
    Post.create({
        title: req.body.title,
        content: req.body.content
    }).then(function(){
        res.redirect("/")
    }).catch(function(err){
        res.send("Some error occured."+err)
    })
})


app.listen(8081,function(){
    console.log("Server working ok at URL http://localhost:8081");
});