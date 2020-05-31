//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "This is the very simple notepad or daily journal that you can use as you wish. At the moment it is not saved forever, just until you close it in your browser... Feel free to try it as you wish. ;) ";
const aboutContent = "Any concent you enter here is under your responsibility. Any text entered are not transfered anywhere. Be safe.";
const contactContent = "I would appreciate sending me any comments and feedbacks; if you like or hate this small piece of code, let me know. Kiss.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

let _ = require('lodash');

let posts = [{
  title: "Your title",
  post: "Your story or notes, whatever you would like to store under a title..."
}];


let prispevok = 0;

app.get("/", function(req, res) {
  console.log(req.params);
  res.render("home", {
    hmstrtngcntnt: homeStartingContent,
    psts: posts,
  });

  });

  // for (let i = 0; i < posts.length; i++) {
  //   let hlavicka = posts[i].title;
  //   console.log(hlavicka);
  // }; namiesto takéhoto for loopu je možné spraviť nad array forEach metódu a je to oveľa jednoduchšie; ide to celým aktuálnym poľom... paráda




app.get("/about", function(req, res) {
  res.render("about", {
    abtcntnt: aboutContent
  })
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    cntctcntnt: contactContent
  })
});

app.get("/compose", function(req, res) {
  res.render("compose")
});

app.post("/", function(req, res) {

  post = {
    title: req.body.ttl,
    post: req.body.pst
  };

  posts.push(post);
  prispevok++;

  res.redirect("/");

});


app.get("/posts/:testing", function(req, res) {

posts.forEach(function(post) {
  console.log(post.title);
  let url = _.trim(_.lowerCase(_.deburr(req.params.testing)));
  let storedTitle = _.trim(_.lowerCase(_.deburr(post.title)));
  if (url === storedTitle) {
    res.render("post", {
      gnrtdTtl: post.title,
      gnrtdPst: post.post
    });
  }
else {
  console.log("No match found!");
}
});

});

// toto je routing; ako nodchytiť navigovanie; ":niečo" sa ukladá do objektu{req.params} a môže byť použité presne na navigovanie; a funguje aj naopak, že môže by redirect; ak niečo bude za posts/ napísané, tak to vidím v objekte presne v tom jeho parametri ako si honazvem keď ho odchytávam;

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
