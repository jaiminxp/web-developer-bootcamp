const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("NEW REQUEST!");
//   res.send("<h1>This is my response</h1>");
// });

app.get("/", (req, res) => {
  res.send("Welcome to the Home page");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>Viewing post: ${postId} on the ${subreddit} subreddit</h1>`);
});

app.post("/cats", (req, res) => {
  res.send("Posting to cats!!");
});

app.get("/cats", (req, res) => {
  res.send("MEOW!!");
});

app.get("/dogs", (req, res) => {
  res.send("WOOF!!");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("nothing found if nothing searched");
  }
  res.send(`<h1>search results for ${q}</h1>`);
});

app.get("*", (req, res) => {
  res.send("I don't know that path :(");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
