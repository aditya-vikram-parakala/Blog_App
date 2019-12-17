var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
mongoose.connect("mongodb://localhost/blogApp");

var BlogSchema = new mongoose.Schema({
name:String,
image:String,
body:String,
created:{type:Date, default:Date.now}
});

var Blog = mongoose.model("Blog",BlogSchema);
app.get("/",(req,res)=>{
res.redirect("/blogs");
});
// INDEX ROUTE
app.get("/blogs" ,(req,res)=>{
        Blog.find({},(err,blogsfound)=>{
        if(err){
            console.log(err);
            console.log("error encountered");
        }
        else{
            res.render("index", {blogs:blogsfound});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
res.render("new");
});

// CREATE ROUTE
app.post("/blogs",function(req,res){
//create blog
Blog.create(req.body.blog , function(err, newblog){
if(err){
    res.render("new");
}
else{
    res.redirect("/blogs");
}
});
});

app.listen(3000, ()=>{
console.log("Server started...");
});




