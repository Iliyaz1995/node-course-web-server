 const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
  var time = new Date().toString();
  var log = `${time}: ${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('serverlog.log', log +'\n',(err)=>{
    if (err) {
console.log('unable to connect to server');
    }
  }
  )
  next();
})
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
})



app.get('/', (req, res) =>{
  res.render('home.hbs',{
    pageName: 'this is home page'
  })
});

app.get('/help', (req, res) =>{
  res.render('help.hbs',{
    pageName: 'this is help page'
  })
});

app.get('/about', (req, res) =>{
  res.render('about.hbs',{
    pageName: 'this is about page'
  })
});
app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageName:"this is projects page"
  })
})

app.listen(port,()=>{
  console.log(`the server is running on ${port}`);
});
