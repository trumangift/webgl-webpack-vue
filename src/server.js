const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

let htmlPath = path.resolve(__dirname, '../dist/index.html');
let hellowordPath = path.resolve(__dirname, '../dist/hello-word.html');

app.get('/kiwi', function(req, res) {
   const data = fs.readFileSync(htmlPath, 'utf-8');
   res.send(data);
});
app.get('/hello-word', function(req, res) {
   const data = fs.readFileSync(hellowordPath, 'utf-8');
   res.send(data);
});
app.use(express.static('dist'));
app.listen(3000, function(){
  console.log('express server started on http://localhost:3000');
});
