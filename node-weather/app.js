const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

let apiKey = '8848c17d046edc839733b68a0c227e58';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index', {weather:null, error:null, humid:null, windspeed:windspeed});
});

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let humid = `Humidity is ${weather.main.humidity}%`;
        let windspeed = `Wind speed is ${weather.wind.speed} m/s`;
        res.render('index', {weather: weatherText, error: null, humid:humid, windspeed:windspeed});
      }
    }
  });
})

app.listen(3000, function(){
	console.log('Server started on port 3000!');
});

// {"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":711,"main":"Smoke","descript
// ion":"smoke","icon":"50d"}],"base":"stations","main":{"temp":301.66,"pressure":1
// 015,"humidity":51,"temp_min":300.15,"temp_max":303.15},"visibility":3000,"wind":
// {"speed":5.7,"deg":270},"clouds":{"all":20},"dt":1518422400,"sys":{"type":1,"id"
// :7761,"message":0.0019,"country":"IN","sunrise":1518399502,"sunset":1518440851},
// "id":1275339,"name":"Mumbai","cod":200}