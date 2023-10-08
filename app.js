const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const favicon = require('serve-favicon');
const sendMail = require('./sendMail');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname)));
app.use(favicon(path.join(__dirname + "/assets/favicon.ico")))

app.use(express.urlencoded({ extended: false }));


const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: String,
  date: String,
  body: String
});

const infoSchema = new Schema({
  title: String,
  content: Array,
  positions: Array,
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
const Info = mongoose.model('Info', infoSchema, 'background-info')



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
    const blogs = await Blog.find({}).sort({date:-1});
    //console.log(blogs)
    res.render("pages/index", {blogs})
  } catch (err) {
    console.error("Error retrieving blog posts: ", err)
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/about', async (req, res) => {
  try {
    const info = await Info.findOne({title: "About Me"});
    //console.log(info)
    res.render("pages/about", {info})
  } catch (err) {
    console.error("Error retrieving profile info: ", err)
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/education', async (req, res) => {
  try {
    const info = await Info.findOne({title: "Education"});
    //console.log(info)
    res.render("pages/education", {info})
  } catch (err) {
    console.error("Error retrieving profile info: ", err)
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/experience', async (req, res) => {
  try {
    const info = await Info.findOne({title: "Experience"});
    console.log(info)
    
    res.render("pages/experience", {info})
  } catch (err) {
    console.error("Error retrieving profile info: ", err)
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/contact', (req, res) => {
  res.render("pages/contact")
});

app.get('/resume', (req, res) => {
  res.render("pages/resume");
});

app.get('/confirm', (req, res) => {
  res.redirect("contact")
});

app.post('/confirm', (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const msg = req.body.message;

  sendMail({
    to: "donald.w.strong5@gmail.com",
    from: "ds.portfoliomailer@gmail.com",
    subject: "New Portfolio Contact Request",
    html: `
    <p><strong>Name:</strong> ${firstname} ${lastname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${msg}</p>
  `
  });
  res.render("pages/confirmation",  { message: "Thanks, I'll be in touch soon." });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});