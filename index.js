//installation
//-> npm install uuidv4
//->npm install method-override

//CRUD->create read update delete
const express = require("express");
const app = express();
const path =  require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride('_method'))
//LOOP
let posts = [
    {   
        id: uuidv4(),  
        username : "snehakashyap",
        content : "i am learning web dev."
    },
    {
        id : uuidv4(),
        username : "ajaysingh",
        content : "i love DSA."
    },
    { 
        id: uuidv4(),
        username : "aniketjain",
        content : "i miss my clg days."
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})


 //CREATE
//creating new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
   let{username,content} = req.body;
   let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
}) 


//READ
//getting details
app.get("/posts/:id", (req, res) => {
    let { id } = req.params; 
    const post = posts.find(p => p.id === id);
    console.log(post);
    // res.send("ok")
    res.render("detail.ejs",{post});
});


//UPDATE
//for updation
app.patch("/posts/:id",(req,res)  =>{
    let{id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find(p => p.id === id);
    post.content = newcontent;
    res.redirect("/posts"); 
})

app.get("/posts/:id/edits",(req,res)=>{
    let{id} = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs",{post});
})


//DELETE
//for deletion
app.delete("/posts/:id", (req, res) => {
    let{id} = req.params;
    posts = posts.filter(p => p.id !== id);
    //  res.send("yes deletion done!")
     res.redirect("/posts"); 
})
//listening
app.get("/",(req,res)=>{res.send("service working properly!!")})
app.listen(port,()=>{
    console.log("app is listening now!!");
})