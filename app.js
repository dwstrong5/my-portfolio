const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/')));

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
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});