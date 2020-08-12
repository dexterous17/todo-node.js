const bodyParser = require('body-parser');
const urlencondedParser = bodyParser.urlencoded({extended: false});
const url ='mongodb://harshil:Dexterous18@cluster0-shard-00-00.ducsw.mongodb.net:27017,cluster0-shard-00-01.ducsw.mongodb.net:27017,cluster0-shard-00-02.ducsw.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-mjmp0o-shard-0&authSource=admin&retryWrites=true&w=majority';
const mongoose = require('mongoose');

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{});

const Schema = mongoose.Schema;

const TodoAppSchema = new Schema({
    item : String,
});

const TodoApp = mongoose.model('TodoApp',TodoAppSchema);

module.exports = function(app){
    
    app.get('/todo',function(req,res){
        TodoApp.find({},(err,data)=>{
            if(err) throw err;
            res.render('todo',{todo:data})
        })   
    });

    app.post('/todo',urlencondedParser,function(req,res){
        var newTodoApp = TodoApp(req.body).save(function(err,data){
            if(err)throw err;
            res.json(data);
        });
        
    });

    app.delete('/todo/:item',function(req,res){
        TodoApp.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });      
    });
};