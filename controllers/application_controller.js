
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var fs = require('fs');

router.get('/api', function (req, res) {
var dataFile = "database.json";
var crimeData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
res.json(crimeData.data);	
});

router.post('/api/new', function (req, res) {
	if(!req.body) return res.end();
	var dataFile = "database.json";
	var newcrime = req.body;
	var crimeData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));	
	
	newcrime.crime_id = crimeData.data.length+1;

	crimeData.data.push(newcrime);

	fs.writeFile(dataFile, JSON.stringify(crimeData, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}
	});


	res.json(newcrime);
});

router.get('/', function(req, res) {
  res.redirect('/burgers');
});

router.get('/crimeapi', function (req, res) {
	res.render('crimes/index');
})

module.exports = router;