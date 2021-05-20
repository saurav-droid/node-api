const express = require('express')
const mysql = require('mysql');
const axios = require('axios');
const { response } = require('express');
const app = express()
const port = 3007

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "employees"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/API-call', (req, res) => {
  var data = []
  axios.get("https://api.weatherbit.io/v2.0/alerts?&lat=18.18005&lng=-66.75218?&key=3b80cc57b5294b21842ad122ab1cf35c").then(res => {console.log(res.data);
  data = res.data
  var json = JSON.parse(data);
  console.log(json["Hydrogen"])
 return
  var final_data   = 
  [
    {
      "element": "value",
      "Appearance": "value",
      "Atomic_mass": "value",
      "Data": "value"
    },
    {
      "element": "value",
      "Appearance": "value",
      "Atomic_mass": "value",
      "Data": "value"
    },
  
    {
      "element": "value",
      "Appearance": "value",
      "Atomic_mass": "value",
      "Data": "value"
    }
  ]

  let sql = "INSERT INTO periodic SET ?";
        let query = con.query(sql,  {
          "element": "value",
          "Appearance": "value",
          "Atomic_mass": "value",
          "Data": "value"
        }, (err, results1) => {
          if (err) {
            console.log(err)
          } else {
            console.log(results1)
          }
        });
  
})
  res.send('Check your Terminal')
  
})


app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`)
})
