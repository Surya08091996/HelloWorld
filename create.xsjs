var body = {
	"region_code": "GER",
	"region_name": "Germany",
	"status": "D",
	"isDeleted": "N",
	"region_desc": "Germany"
};

	var destination_package = "hanaxstestsaml";
	var destination_name = "java";
	var client;
	var dest;
	
dest = $.net.http.readDestination(destination_package, destination_name);
	
	try{
	
	client = new $.net.http.Client();
      var req = $.net.http.Request($.net.http.POST, "/saveRegion");
      req.headers.set("Content-Type","application/json");
     req.headers.set("Accept","application/json");
      req.setBody(JSON.stringify(body));
     client.request(req, dest);
     var response1 = client.getResponse();
//      	$.response.setBody(response1.body.asString());
// 	
// 	client.close();
	}
	catch (e) {
      $.response.contentType = "text/plain";
      $.response.setBody(e.message);
 }
 
 $.response.setBody(response1);
 $.response.status = $.net.http.OK;
$.respose.contentType = "application/json";
 
 
 
       
       

