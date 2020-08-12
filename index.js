var express = require('express');
var todocontroller = require('./controllers/todocontroller.js');
var app = express();

//set up template engine
app.set('view engine','ejs');

//static file
app.use(express.static('public'));

todocontroller(app);
const port = process.env.PORT || 3000;
//listen to port
app.listen(port,()=>{
    console.log('listeing at 3000');
});



