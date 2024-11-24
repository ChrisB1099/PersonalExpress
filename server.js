const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://christianbradford99:nA9vh6TEnS7w5frO@cluster0.xs3nl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "PersonalExpress";

app.listen(7000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.put('/athletes', (req, res) => {
  const { oldAmount, oldCategory, oldDate, newAmount, newCategory, newDate } = req.body;
  db.collection('athletes').findOneAndUpdate(
    { amount: oldAmount, category: oldCategory, date: oldDate },
    { $set: { amount: newAmount, category: newCategory, date: newDate } },
    { returnOriginal: false },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});




app.get('/', (req, res) => {  //refreshing the page 
db.collection('athletes').find().toArray((err, result) => {   // this is going to the database of collecetion of rappers 
  if (err) return console.log(err)
  res.render('index.ejs', {entries: result})   // you have to pass this through an object
})
})


app.post('/athletes', (req, res) => {        //post is the first thing that happen when you send somthing from the form to the server
  db.collection('athletes').insertOne({amount: req.body.amount, category: req.body.category, date: req.body.date}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/athletes', (req, res) => {
  db.collection('athletes').findOneAndDelete({amount: req.body.amount, category: req.body.category, date: req.body.date}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
