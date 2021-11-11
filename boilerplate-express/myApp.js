var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
});

console.log("Hello World");

/*app.get("/", (req, res) => {
  res.send("Hello Express");
});*/

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public/style.css"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  var response = { "message": "Hello json" };
  //var response = "Hello json".toUpperCase();

  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  } else {
    res.json(response);
  }
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
