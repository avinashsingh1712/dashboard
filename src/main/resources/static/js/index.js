var getData1 = (function() {
    {
    	var test;
    	var saveData = $.ajax({
		      type: "GET",
		      url: "http://localhost:9090/api/alert/all",
		      dataType: "json",
		      'async': false,
		      success: function(resultData){
		          console.log(resultData);
		          if (resultData.length) 
		          {
		              loopAlert(resultData);
		          }
		          
		     //     var uniq = ['PIA-OCAS Mapping issue', 'FTP Connection Issue', 'Order canceled not found', 'N/W Connection issue', 'Invoice Format Error', 'Upstream Issue']

		        //  for (var i = 1; i <= uniq.length; i++) {
		             //  document.getElementById("myTable").rows[i].cells[5].className = 'green';
		       //   }

		         test = resultData;
		      }
    	
		}); 
    	
    	 return test;
    }
});

//code added by vartika - starts
/*
function sendAjaxRequest() {
	//var id = sessionStorage.getItem("id");
     $.ajax({type: "POST",
         url: "http://localhost:9090/api/alert/postData" ,
         data: "",
         success:function(result){
          // id = id + 1;
         //  sessionStorage.setItem("id", id);
           
         },
        error:function(result)
         {
         alert('error');
        }
    });
}

var postData = sendAjaxRequest();
*/
//sessionStorage.setItem("id", 1);
//var id = 1;
//var postData = $.ajax({
//    type: 'POST',
//    url: "http://localhost:9090/api/alert/"+ id,
//    data: myKeyVals,
//    dataType: "text",
//    success: function(resultData) { alert("Save Complete") }
//});

/*

var newid = localStorage.getItem("test");

if(newid>6){
	document.getElementById("disableafter7").disabled = true;
}
else{
	document.getElementById("disableafter7").disabled = false;
}


console.log(newid);
//newid = 5;
//console.log(newid);

var id = 1;
var ky = 1;
 id = +newid + +ky;
console.log(id);

//console.log(setdata);


function sendAjaxRequest() {
	//var id = sessionStorage.getItem("id");
     $.ajax({type: "POST",
         url: "http://localhost:9090/api/alert/"+id ,
         data: id,
         success:function(result){
          // id = id + 1;
         //  sessionStorage.setItem("id", id);
           var setdata = localStorage.setItem("test",id);
         },
        error:function(result)
         {
         alert('error');
        }
    });
}
//console.log(id);

//var setdata = localStorage.setItem("test",id);
//console.log(setdata);

//console.log(newid);
//var plusid = 1;
//var add = plusid + newid;
//console.log(add);

*/
// code added by vartika - ends
var JsonData = getData1();
 console.log(JsonData)
var response = [];


function loopAlert(response) {

    $('#alert div').remove('');
    $('#rootCause div').remove('');
    for (var i = 1; i <= response.length; i++) {
        var headerCell = document.createElement("a");
        headerCell.innerHTML = response[i - 1].count;
        headerCell.id = 'row_' + i;
        document.getElementById("alertTable").rows[i].cells[2].appendChild(headerCell);
        document.getElementById("alertTable").rows[i].cells[2].setAttribute('data-alertName', response[i - 1].desc);
    }

    var uniq = ['PIA-OCAS Mapping issue', 'FTP Connection Issue', 'Order canceled not found', 'N/W Connection issue', 'Invoice Format Error', 'Upstream Issue']

    for (var i = 1; i <= uniq.length; i++) {
        var thCount = 0;
        for (var j = 1; j <= response.length; j++) {
            var root = response[j - 1].rootList;
            for (var k = 0; k <= root.length; k++) {
                var alertL = root;
                var index = alertL.map(x => x['alertDrilldown'].rootcause).indexOf(uniq[i - 1]);
            }
            var rL = response[j - 1].rootList;
            var counts = {};
            var countData = [];
            for (var c = 0; c < rL.length; c++) {
                counts[rL[c]] = 1 + (counts[rL[c]] || 0);
            }

            if (index != -1) {
                document.getElementById("myTable").rows[i].cells[j - 1].innerHTML = 'X';
                document.getElementById("myTable").rows[i].cells[j].setAttribute('data-count', counts[uniq[i - 1]]);
            } else {
                document.getElementById("myTable").rows[i].cells[6].className = 'green';
            }

            var g = document.getElementById("myTable").rows[i].cells[j].getAttribute('data-count')


            if (g != null) {
                thCount = thCount + 1;
            } else {
                document.getElementById("myTable").rows[i].cells[6].className = 'green';
            }


            if (thCount >= 3 && thCount < 4) {
                document.getElementById("myTable").rows[i].cells[6].className = 'red';
            }

            if (thCount >= 2 && thCount < 3) {
                document.getElementById("myTable").rows[i].cells[6].className = 'amber';
            }

            if ((thCount >= 1 && thCount < 2)) {
                document.getElementById("myTable").rows[i].cells[6].className = 'yellow';
            }
            if ((thCount < 1)) {
                document.getElementById("myTable").rows[i].cells[6].className = 'green';
            }
        }
    }
}

$(document).ready(function() {
    $("#dialog1").dialog({
        autoOpen: false
    });

    $("#dialog2").dialog({
        autoOpen: false
    });
});

$(document).on('click', '.popUp1', function(e) {
    $('#alertTable td').find('a').removeClass('red-text-color');
    $('#dialog1 table').remove();
    var example1 = $(this).children('a').attr('id');

    var id = $(this).attr('data-alertname');
    var found_names = $.grep(JsonData, function(v) {
        return v.desc === id;
    });
	console.log(found_names);
	if(found_names[0].count != 0) { 
    $(this).children('a').addClass('red-text-color');
    var headerCell = document.createElement("table");

    var th = ['Country', 'Alert Description', 'Alert Count'];

    var alerts = new Array();
    alerts.push(th);

    var popup1Data = found_names[0].rootList;

	var counts = {};
	popup1Data.forEach(function(x) { counts[x.country] = (counts[x.country] || 0)+1; });
	
	var uniqueCountry = popup1Data.map(function(obj) { return obj.country; });
	uniqueCountryList = uniqueCountry.filter(function(v,i) { return uniqueCountry.indexOf(v) == i; });

	console.log(counts);
    for (let i = 0; i < uniqueCountryList.length; i++) {
		var th = 0;
		    for (let j = 0; j < uniqueCountryList.length; j++) {
				th = th + counts[uniqueCountryList[j]];
			}
		var threshold = (counts[uniqueCountryList[i]] / th) * 100
        alerts.push([uniqueCountryList[i], 
            popup1Data[0].desc, counts[uniqueCountryList[i]]
        ]);
    }
	console.log(th)
    var table = document.createElement("TABLE");
    table.id = 'popUp1';
    table.border = "1";

    //Get the count of columns.
    var columnCount = alerts[0].length;
    var row = table.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = alerts[0][i];
        headerCell.height = '33';
        headerCell.className = 'grey';
        headerCell.align = 'center';
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < alerts.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = alerts[i][j];
            cell.height = '33';
            cell.align = 'center'
            if (alerts[i][j] == undefined) {
                cell.innerHTML = '';
            }

        }
    }

    document.getElementById("dialog1").appendChild(table);
    for (var i = 1; i < alerts.length; i++) {
        var d2 = document.createElement("a");
        d2.id = 'row_' + i;
        d2.innerHTML = document.getElementById("popUp1").rows[i].cells[0].innerHTML;
        document.getElementById("popUp1").rows[i].cells[0].innerHTML = "";
        document.getElementById("popUp1").rows[i].cells[0].appendChild(d2);
        document.getElementById("popUp1").rows[i].cells[0].className = 'popUp2';
        document.getElementById("popUp1").rows[i].cells[0].setAttribute('data-country', alerts[i][0]); 
        document.getElementById("popUp1").rows[i].cells[0].setAttribute('data-alert', popup1Data[i - 1].desc);

    }
    $("#dialog1").dialog('open');
	} else {
		 $("#dialog1").dialog('close');
	} 
});


$(document).on('click', '.popUp2', function(e) {

    $('#dialog2 table').remove();
    var example1 = $(this).children('a').attr('id');

    // console.log(example1)
    var headerCell = document.createElement("table");

    var th = ['Country', 'Store', 'rootCause', 'Incident ID', 'Timestamp'];

    var alerts = new Array();
    alerts.push(th);

    var alertName = $(this).attr('data-alert');
    var country = $(this).attr('data-country');
    var record = $.grep(JsonData, function(v) {
        return v.desc === alertName;
    });

    var countryList = $.grep(record[0].rootList, function(v) {
        return v.country === country;
    });
    console.log(countryList)

    for (let i = 0; i < countryList.length; i++) {
        alerts.push([countryList[i].country, countryList[i].alertDrilldown['storeID'],
            countryList[i].alertDrilldown['rootcause'], countryList[i].alertDrilldown['incidentId'],
            formatTimeStamp(countryList[i].alertDrilldown['timestamp'])
        ]);
    }
    var table = document.createElement("TABLE");
    table.id = 'popUp2';
    table.border = "1";

    //Get the count of columns.
    var columnCount = alerts[0].length;
    var row = table.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = alerts[0][i];
        headerCell.height = '33';
        headerCell.className = 'grey';
        headerCell.align = 'center';
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < alerts.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = alerts[i][j];
            cell.height = '33';
            cell.align = 'center'
            if (alerts[i][j] == undefined) {
                cell.innerHTML = '';
            }

        }
    }

    document.getElementById("dialog2").appendChild(table);
    for (var i = 1; i < alerts.length; i++) {
        var d2 = document.createElement("a");
        d2.id = 'row_' + i;
        d2.innerHTML = document.getElementById("popUp1").rows[i].cells[0].innerHTML;
        document.getElementById("popUp1").rows[i].cells[0].innerHTML = "";
        document.getElementById("popUp1").rows[i].cells[0].appendChild(d2);
        document.getElementById("popUp1").rows[i].cells[0].className = 'popUp2'
    }
    $('#dialog1').dialog('close');
    $("#dialog2").dialog('open');
});

function formatTimeStamp(date) {
	var res = date.split("T");
	return res[0]
}