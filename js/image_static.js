var express = require('express');
var im = require('imagemagick');

var app = express();

var PORT = 9323;

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Image: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});

app.post('/', function(req, res, next){


/*

{"image":{"domain":null,"_events":null,"_maxListeners":10,"size":201671,"path":"/tmp/1677b69d92ea587e560400ee73542819","name":"Screen Shot 2013-03-21 at 9.28.10 AM.png","type":"image/png","hash":false,"lastModifiedDate":"2013-03-25T04:05:51.051Z","_writeStream":{"domain":null,"_events":null,"_maxListeners":10,"path":"/tmp/1677b69d92ea587e560400ee73542819","fd":11,"writable":false,"flags":"w","encoding":"binary","mode":438,"bytesWritten":201671,"busy":false,"_queue":[],"drainable":true},"length":201671,"filename":"Screen Shot 2013-03-21 at 9.28.10 AM.png","mime":"image/png"}}

*/

	var file = req.files.image.path;

	im.convert([file, '-threshold', '40%', file + 'bw'], 
	function(err, stdout){
		if (err) throw err;
		console.log('stdout:', stdout);
		res.set({'Content-Type': req.files.image.type}).sendfile(req.files.image.path + 'bw');
	});
		

});

app.get('/*', function(req, res){
    var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : 'index.html';
	console.log(path);
    res.sendfile('./www/' + path);
});

app.listen(PORT);
console.log("listening at http://localhost:"+PORT);
