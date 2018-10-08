var pstmt;
var rs;
var get_query;
var vendors = [];
var Details = [];
var get_vendors;
var vendor_stmt;
var vendor_result;
var vendorid;

var finaloutput = {FinalDetails: []};

var record = {};


try {
	
	var conn = $.db.getConnection();
	var body = "";
	
	 get_vendors = 'SELECT DISTINCT SUPPLIER_NUM FROM "AGCO"."FACTORY_FCST_SPEND_DATA"';
	 vendor_stmt = conn.prepareStatement(get_vendors);
	 vendor_result = vendor_stmt.executeQuery();
	 while(vendor_result.next()){
	     record.Supplier_Num = vendor_result.getString(1);
	     vendors.push(record);
	      record = {};
	 }
	 
	
	
	get_query = 'select * from "AGCO"."FACTORY_FCST_SPEND_DATA"';
    pstmt = conn.prepareStatement(get_query);
    rs = pstmt.executeQuery();
    record = {};
    while (rs.next()) {
            record.Factory = rs.getString(1);
            record.Supplier_Num = rs.getString(2);
            record.Supplier_Name = rs.getString(3);
            record.Part_Num = rs.getString(4);
            record.Part_Description = rs.getString(5);
            record.Quantity = rs.getString(6);
            record.Month = rs.getString(7);
            record.Unit_Stdmat_Cost = rs.getString(8);
            record.Process_Id = rs.getString(9);
            Details.push(record);
            record = {};
    }


var temp = {}; var id; var factory;
var supplier_num; var supplier_name; var part_num; var part_description; var quantity; var unit_stdmat_cost; var process_id;
var jan; var feb; var mar; var apr; var may; var june; var july; var aug; var sep; var oct; var nov; var dec;
    
   var test_results = {Result:[]};
   var final = [];


for (var i in vendors){

    for  (var j in Details){
      if(vendors[i].Supplier_Num === Details[j].Supplier_Num){
        switch (Details[j].Month){
            case 'Jan':
               factory = Details[j].Factory;
               supplier_num = Details[j].Supplier_Num;
               supplier_name = Details[j].Supplier_Name;
               jan = Details[j].Quantity;
               part_num = Details[j].Part_Num;
               part_description = Details[j].Part_Description;
               unit_stdmat_cost = Details[j].Unit_Stdmat_Cost;
               process_id = Details[j].Process_Id;
               break;
            case 'Feb':
                feb = Details[j].Quantity;
                break;
            case 'Mar':
                mar = Details[j].Quantity;
                break;
            case 'Apr':
                apr = Details[j].Quantity;
                break;
            case 'May':
                may = Details[j].Quantity;
                break;
            case 'June':
                june = Details[j].Quantity;
                break;
            case 'July':
                july = Details[j].Quantity;
                break;
            case 'Aug':
                aug = Details[j].Quantity;
                break;
            case 'Sep':
                sep = Details[j].Quantity;
                break;
            case 'Oct':
                oct = Details[j].Quantity;
                break;
            case 'Nov':
                nov = Details[j].Quantity;
                break;
            case 'Dec':
                dec = Details[j].Quantity;
                break;
        }
      }
      
    }
      body = "\n" + factory + ',' + supplier_num + ',' + supplier_name +  ',' + part_num + ',' + part_description + ',' + unit_stdmat_cost + ',' + process_id
      + ',' + jan + ',' + feb + ',' + mar + ',' + apr + ',' + may + ',' + june + ',' + july + ',' + aug + ',' + sep + ',' + oct + ',' + nov + ',' + dec + body;
    var Data = "FACTORY_CODE" +
","+"SUPPLIER_NUM"+
","+"SUPPLIER_NAME"+
","+"PART_NUM"+
","+"PART_DESCRIPTION"+
","+"UNIT_STDMAT_COST"+
","+"PROCESS_ID"+
","+"JAN"+
","  + "FEB" +
","  + "MAR" +
","  + "APR" +
","  + "MAY" +
","  + "JUNE" +
","  + "JULY" +
","  + "AUG" +
","  + "SEP" +
","  + "OCT" +
","  + "NOV" +
","  + "DEC" + body;
}

    conn.close();
} 
catch (e) {
$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
$.response.setBody(e.message);
}


	//--------------------------------------------------------//
	$.response.setBody(Data);
  $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le'; 
  $.response.headers.set('Content-Disposition','attachment; filename=FactoryForecastSpendData.csv'); 
  $.response.headers.set('access-control-allow-origin','*'); 
  $.response.status = $.net.http.OK;