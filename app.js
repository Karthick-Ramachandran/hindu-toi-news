const express = require("express");
const exphbs = require("express-handlebars");
var Feed = require("rss-to-json");
const path = require("path");

const app = express();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  Feed.load(
    "https://www.thehindu.com/news/national/tamil-nadu/feeder/default.rss",
    function(err, rss) {
      var data = rss.items;
      res.render("index", {
        data: data
      });
    }
  );
});

app.get("/toi", (req, res) => {
  Feed.load(
    "https://timesofindia.indiatimes.com/rssfeeds/2950623.cms",
    function(err, rss) {
      var data = rss.items;
      res.render("toi", {
        data: data
      });
    }
  );
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening");
});
