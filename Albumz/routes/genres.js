var express =require('express');
var router = express.Router();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDK9n3wDhr9s3dvYcL0BADpnggdl51cPfs",
    authDomain: "albumz-250898.firebaseapp.com",
    databaseURL: "https://albumz-250898.firebaseio.com",
    projectId: "albumz-250898",
    storageBucket: "albumz-250898.appspot.com",
    messagingSenderId: "726276432069"
};
//firebase.initializeApp(config);


router.get('/', function(req, res, next){
	res.render('genres/index');
});

router.get('/add', function(req, res, next){
	res.render('genres/add');
});

router.post('/add', function(req, res, next){
	var genre = {
		name: req.body.name
	}
	console.log(genre);
	return;
});

module.exports = router;
