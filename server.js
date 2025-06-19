const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

console.log('Starting server...');
console.log('Static directory:', __dirname);

app.listen(port, () => {
  console.log('=================================');
  console.log(`Server running on port ${port}`);
  console.log('Open http://localhost:3000/email-header-sample.html to view the template');
  console.log('=================================');
}); 