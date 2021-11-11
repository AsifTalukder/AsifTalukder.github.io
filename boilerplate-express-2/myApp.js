var express = require('express');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false})

var app = express();

console.log("Hello World");


app.get("/", function(req, res) {
  res.send("Hello Express");
});


app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public/style.css"));

app.get("/json", (req, res) => {
  res.json({
    "message": "Hello json"
  });
});

app.get("/json", (req, res) => {
  var response = "Hello World".toUpperCase();

  if (process.env.VAR_NAME === "allCaps"){
    response = "Hello World".toUpperCase();

  }else{
    response = "Hello World";
  }
  res.json({
    "message": response,
  });
});

app.use(function middleware(req, res, next){
  var string = req.method+" "+req.path+"_" + req.ip;
  console.log(string);

  next();
});

app.get("/now", (req, res, next) =>{
  req.time = new Date().toString();
  next();

},
(req, res) => {
  res.send({
    time: req.time
  });
}
);

app.get("/:word/echo", (req, res) => {
  const {word} = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;

  var { first: firstName, last: lastName } = req.query;

  res.json({
    name: `${firstName} ${lastName}`
  });
});

app.use(urlencoded);
app.use(bodyParser.json());

app.post("/name", function(req, res){
  var string = req.body.first+" "+req.body.last;
  res.json({name: string});
});






































 module.exports = app;
