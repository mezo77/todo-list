
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://muataz:icandoit7@ds055990.mlab.com:55990/todo');

// create the schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
//var data = [{item: 'get milk'}, {item: 'make tea with milk'}, {item: 'get to code'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});



module.exports = function(app) {

    // get data from mongoDB and pass it ti the view
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from the view and insert it into the mongoDb DB
        var itemToAdd = Todo(req.body).save(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item', function(req, res) {
        //delete the request item from the database
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
}