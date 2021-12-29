const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiId = "87ee5b49351008ccd4bdb583789dae76"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      //const cityName = weatherData.name;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const wind = weatherData.wind.speed;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      const fellsLike = weatherData.main.feels_like;

      res.write("<p>Actualmente las condiciones son " + weatherDescription + "</p>")
      res.write("<h1>La temperatura en " + query + " es " + temp + " grados.</h1>")
      res.write("<h3>Velocidad del viento " + wind + "km/h.</h3>")
      res.write("<h3>Sensacion termica: " + fellsLike + "</h3>")
      res.write("<img src= '" + icon + "'>")

      res.send()

      console.log(weatherDescription);

    })
  })

})


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});
