var http = require("http"); // creating server
var path = require("path"); // finding the actual path for directories / files 
var url = require("url"); // parse url
var fs = require('fs'); // file system core , dealing with files operations


// Array of mime types ..
var mimeTypes = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'js'   : 'text/javascript',
    'jpg'  : 'image/jpg',
    'png'  : 'image/png',
    'jpeg' : 'image/jpeg'
}

// creating server ...
http.createServer(function(req , res){

    var uri = url.parse(req.url).pathname // parse url , exctract the path after the host name 'incuding /'
    var fileName = path.join(process.cwd(),unescape(uri)); // returing current directory path , unescape the url path in case it contains special char. 
    console.log("data is loading"+uri);
    console.log("File name : "+fileName);
    var stats;

    try {
        stats = fs.lstatSync(fileName) // Returns an instance of fs.Stats.
        console.log(stats);
    } catch (e) {
        console.log(stats);      
        // if the file not exists [NOT FOUND]
        res.writeHead(404,{'Context-Type':'text/plain'});
        res.write('Error 404 , page not Found \n');
        res.end();
        return;
    }

    // file actual path is a file / directory

    // file it's a file 
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]]; // file name without extension
        res.writeHead(200,{'Content-Type':mimeType});
        var readStream = fs.createReadStream(fileName);
        readStream.pipe(res);
    }else if(stats.isDirectory()){
        res.writeHead(302,{
            'Location' : 'index.html'
        });
        res.end();
    }else{
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.write('500 Internal Error \n');
        res.end();
    }

}).listen(8888);