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
  database: "weatherbit"
});

con.connect(function (err) {
  if (err) throw err;
  // This is my database

});

//Ignore this one
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/API-call', (req, response) => {
  var data = []

  //Passing static lat and lng value

  con.query("SELECT lat ,lon FROM severe_weather_report", function (err, result, fields) {
    if (err) throw err;

    let total = 0;
    result.map((data, i) => {
      const { lat, lon } = data;


      
        axios.get(`https://api.weatherbit.io/v2.0/alerts?lat=${lat}&lon=${lon}&key=3b80cc57b5294b21842ad122ab1cf35c`).then(res =>{
        data = res.data


        console.log(data);
        ++total;
        // if(total === result.length-1){
        //   response.send("Please Check your Terminal.");
        // }

       // From here the data will be inserted into database
        let queries = [];

        for (let lon in data) {
           //if(name !== 'helium') continue;

           const dat = data[lon];
           const query = `UPDATE severe_weather_report SET ( lon,state_code,city_code) = (?, ?, ?)`;
           queries.push({
             query,
             data: [lon, dat.state_code, dat.city_code]
           });
        }

         queries.slice(0 ,3).forEach((query, i) => {
           con.query(query.query, query.data, (err, res) => {
             if (err) throw new Error(err);
             if (i == 2) response.send('JSON Response has been Successfully Saved.');
           })
        });
      })

    });
   });


});

app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`)
});
