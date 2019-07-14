var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res)=> {
	res.render('index',{title:"welcome"});
})

app.get('/about', (req,res)=> {
	res.render('about');
})

app.get('/contact', (req,res)=> {
	res.render('contact');
})

app.post('/contact/send', (req,res)=> {
	var transporter= nodemailer.createTransport({
		service : 'Gmail',
		auth:{
			user: 'bestpjshakespeare@gmail.com',
			pass: 'rakesh208'
		}
	});

	var mailoptions = {
		from : 'Purvil jain <bestpjshakespeare@gmail.com>',
		to: 'jainpurvil98@gmail.com',
		subject: 'contact request',
		text: 'you have a request from Name :'+req.body.name+'Email:'+req.body.email+'message'+req.body.message,
		html: '<p>you have a request from</p><ul><li>Name:'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailoptions, (error, info)=>{
		if(error){
			console.log(error);
			res.send({redirect: '/'});
		} else {
			console.log('message sent'+ info.response);

		}
	});
})

app.listen(3000,()=>{
	console.log('server started at 3000');
});
