const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var compiler = require('compilex');
var options = {stats : true}; 
compiler.init(options);

app.get("/", function(req , res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req, res){
    var code = req.body.code;
    var envData = { OS : "windows" , cmd : "g++"}; 
    compiler.compileCPP(envData , code , function (data) {
        if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"})
        }
    });
});
app.listen(3000,function(){
    console.log("server running on 3000");
});