var express = require('express')

var app = express();

var todoController = require('./Controllers/todoController')

// set up template engine
app.set('view engine', 'ejs');



// use static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

app.listen(3000);
console.log('you are listening on port 3000...');
