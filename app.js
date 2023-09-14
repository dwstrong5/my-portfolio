const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});