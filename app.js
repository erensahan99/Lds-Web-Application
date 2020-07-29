const express = require('express');
const app = express()

port = process.env.PORT || 3000

app.get('/',(req,res) => res.send('My Rest API running on port ' + port)); 

app.get('/page2',function(req,res) {
  res.sendFile(__dirname + '/express/index.html');
  });

app.listen(port, () => {
    console.log('My Rest API running on port ' + port);
})