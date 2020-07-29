var express = require('express');
var router = express.Router();
const soap = require('soap');
const path = require('path');
const app = express()

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

const url = "http://www.dneonline.com/calculator.asmx?wsdl"

var PORT = process.env.PORT || 3000

//app.get('/',(req,res) => res.send('My Rest API running on port ' + PORT)); 

/*app.get('/', function (req, res) {
  let nums = {
    intA: 15,
    intB: 5
  }
  soap.createClient(url, (err, client) => {
    client.Add(nums, (err, result) => {
      res.send('<html><body><h1>Hello :)</h1><br><h3>' + result.AddResult + '</h3></body></html>');
    });
  });
  //res.sendFile(path.join(__dirname, 'express', 'index.html'),{result:result});
});
*/
app.get('/', function (req, res, next) {
  let nums = {
    intA: 15,
    intB: 5
  };
  soap.createClient(url, (err, client) => {
    client.Add(nums, (err, result) => {
      res.render('index', { resu: result.AddResult })
    });
  });
  
});

app.listen(PORT, () => {
  console.log('My Rest API running on port ' + PORT);
})