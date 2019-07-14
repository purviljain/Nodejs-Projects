var argv = require('yargs').argv;
var http = require('http');

let apiKey = '8848c17d046edc839733b68a0c227e58';
let city = argv.c || 'mumbai';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`


http.createServer(function(request, response){
	var request = require('request');
	request(url, function(err, res, body){
		if(err){
			console.log(err);
		}
		else {
			let weather = JSON.parse(body);
			let message = `It's ${weather.main.temp} degrees in ${weather.name}`;
			response.write("<html><body><div>");
			response.write("<h1>"+ message+ "</h1>");
			response.write("<html><body><div>");
			
			response.end();
		}
	});


	//'City name - :'+ ${weather.name}+ <br/>
	
}).listen(3000);
