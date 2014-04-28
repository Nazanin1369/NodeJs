var url = require("url");
var http = require("http");
var fs = require('fs');

function read(response){
	fs.readFile("page.html","utf8",function read(err, data){
	if(err){
		response.end();
		return;
	}
	response.write(data);	
	response.end();
	
		});
}
function start(){
	function onRequest(request, response) {
		console.log(url.parse(request.url, true));
		response.writeHead(200, {"Content-Type": "text/html"});
		read(response);
	}
	
http.createServer(onRequest).listen(8080);
console.log("Server has started.");
}


exports.start = start;
