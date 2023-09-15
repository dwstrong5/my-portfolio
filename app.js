const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const favicon = require('serve-favicon');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname)));
app.use(favicon(path.join(__dirname + "/assets/favicon.ico")))

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: String,
  date: String,
  body: String
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');

// Get MongoDB credentials and generate connection String
fs.readFile('config.txt', (err, data) => {
  if (err) throw err;
  const creds = JSON.parse(data.toString());
  const uri = `mongodb+srv://${creds.username}:${creds.password}@cluster0.2hj2thp.mongodb.net/${creds.database}?retryWrites=true&w=majority`;
  // Connect to MongoDB using the connection string
  mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then(() => {
      console.log('Connected to MongoDB...');
  })
  .catch((error) => {
      console.log("Error connecting to MongoDB: ", error);
  })
  .finally(() => {
    console.log("Successfully connected to MongoDB!");
  });
});

app.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    //console.log(blogs)
    res.render("pages/index", {blogs})
  } catch (err) {
    console.error("Error retrieving blog posts: ", err)
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/about', (req, res) => {
  res.render("pages/about");
});

app.get('/contact', (req, res) => {
  res.render("pages/contact")
});

app.get('/resume', (req, res) => {
  res.render("pages/resume");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});