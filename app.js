const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const dbo = require('./db');
const bodyParser = require('body-parser');
const ObjectID = dbo.ObjectID;

app.engine('hbs', exhbs.engine({layoutsDir:'views/', defaultLayout:"main",extname:"hbs"}));
app.set('view engine', 'hbs');
app.set('views','views');
app.use(bodyParser.urlencoded())

app.get('/', async (req,res) => {
let database = await dbo.getdatabase();
const collection = database.collection('books');
const cursor =   collection.find({})
let employees = await cursor.toArray()

let message = '';
let edit_books;
let edit_id;
if(req.query.edit_id){
  edit_id = req.query.edit_id;
  edit_books = await collection.findOne({_id:ObjectID(edit_id)})
}
  res.render('main',{message,employees, edit_books,edit_id})
})


app.post('/store_books',async (req,res) => {
let database = await dbo.getdatabase();
const collection = database.collection('books');
let tit = req.body.title;
let aut = req.body.author;
const insertdata = collection.insertOne({title: tit, author : aut})
if(!insertdata){
  console.log("something wrong");
}
let message = "data inserted successfully"
let cursor = collection.find({})
let employees = await cursor.toArray();
res.redirect('/')
})



app.post('/update_book/:edit_id', async (req,res) => {
let database = await dbo.getdatabase();
const collection = database.collection('books');
let tit = req.body.title;
let aut = req.body.author;
const updatedata = collection.updateOne({_id:ObjectID(req.params.edit_id)},{$set: {title: tit, author: aut}})
console.log("dataaaaaa ", tit,aut);

if (!updatedata){
    console.log("something wrong");
}
console.log("Updated successfully");
let message = "Updated successfully"
res.redirect('/')
})


app.get('/delete_book/:del_id',async (req,res) => {
  console.log("entered");
    const delId = req.params.del_id;
  res.redirect('/delete_book?del_id=${delId}')
} ) 


app.get('/delete_book', async (req,res) => {
    let database = await dbo.getdatabase();
  const collection = database.collection('books');

  let del_id = req.query.del_id;

  let del_data = collection.deleteOne({_id:ObjectID(del_id)})
  if (!del_data){
    console.log("successfully deleted");
  }
res.redirect('/')
})









app.listen(9090, () => {
  console.log("app is running on port 9090")
})