var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/save-file', function(req, res, next) {
	console.log('Received POST request in \'\/save-file\'')
	var filePath = path.join(__dirname, '../files/', req.body.filePath)
	console.log('filePath: ' + filePath)
	var fileContent = req.body.fileContent
	fs.writeFile(filePath, fileContent, function(err){
		if(err) return console.error(err)
		console.log("File saved")
	})
})

module.exports = router
