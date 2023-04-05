const express = require("express");
const app = express();
const body = require("body-parser");
const helmet = require('helmet');

const port = 3000;
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(body.urlencoded({ extended: true }));

var items = ["buy food", "cook food", "eat food"];
let workItems = [];
let hobbies =[];
const today = new Date();
const day_value = today.getDay();
var options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};
var day = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {

  res.render("index", { list:"Item-list", newListItem: items ,KindOfDay: day });
});

app.get("/work", (req, res) => {

res.render("index", { list:"work-list", newListItem: workItems,KindOfDay: day });
});

app.get("/hobbies", (req, res) => {
  res.render("index", { list:"hobbies-list", newListItem: hobbies,KindOfDay: day });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/", (req, res) => {

  let type = req.body.button;
    let newitem = req.body.addItem;

  if(type==="Item-list"){
  
    items.push(newitem);
    res.redirect("/");
  }
  else if(type ==="work-list"){

    workItems.push(newitem);
    res.redirect("/work");
  }
  else if(type ==="hobbies-list"){
    hobbies.push(newitem);
    res.redirect("/hobbies");
  }
 
});


app.listen(process.env.port||port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
