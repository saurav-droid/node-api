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


app.get('/API-call', (req, response) => {
  var data = []
  axios.get("https://chemistrydata.herokuapp.com/elements/").then(res => {
    data = res.data

    let queries = [];

    for(let name in data){
      // if(name !== 'helium') continue;

      const dat = data[name];
      const query = `INSERT INTO periodic (name, phase, atomic_mass, category) VALUES (?, ?, ?, ?)`;
      queries.push({
        query, 
        data: [name, dat.phase, dat.atomic_mass, dat.category]
      });
    }

    queries.slice(0,3).forEach((query, i)=>{
      con.query(query.query, query.data, (err, res)=>{
        if(err) throw new Error(err);
        if(i == 2) response.send('JSON Response has been Successfully Saved.');
      })
    });
  })
});


app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`)
});
