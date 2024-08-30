const express = require("express");
const app = express();
const port = 8080;
const {v4 : uuidv4}=require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const path = require("path");
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username:"vijay chandra",
        content :"I love coding!"
    },
    {
        id : uuidv4(),
        username : "Veer",
        content : "Hardwork is important to achieve success"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content} = req.body;
    posts.push({id,username,content});
    res.redirect("/posts");   //Adding the another page
});  

app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
   
    
});  

app.patch("/posts/:id", (req, res) => {
    console.log("Request body:", req.body);
    let { id } = req.params;
    let content = req.body.content;
    console.log("Content:", content);
    let post = posts.find((p) => id === p.id);
    post.content = content;
    console.log(post);
    res.redirect('/posts')
  });

  app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
   posts = posts.filter((p)=>id !== p.id);
   res.redirect('/posts');
  })

  app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let {username} = req.body;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{ post });

  })

app.listen(port,()=>{
    console.log(`Post ${port} is listening `)
})