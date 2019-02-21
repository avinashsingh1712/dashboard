var getData1 = (function() {
    {

        /*var test = [
    {
        "desc": "pip_receipt_not_update",
        "count": 1,
        "rootList": [
            {
                "country": "IT",
                "desc": "pip_receipt_not_update",
                "alertDrilldown": {
                    "storeID": "101",
                    "rootcause": "N/W Connection issue",
                    "timestamp": "2019-12-30T18:30:00.000+0000",
                    "incidentId": "INC000010301307"
                }
            }
        ],
        "shortName": "PRNU",
        "lastModified": "qq"
    }
]; */

        var test;
        var saveData = $.ajax({
            type: "GET",
            url: "http://localhost:9090/api/alert/all",
            dataType: "json",
            'async': false,
            success: function(resultData) {
                console.log(resultData);
                if (resultData.length) {
                    loopAlert(resultData);
                }
                test = resultData;
            }

        });


        var lastModified = localStorage.getItem("lastModified");

        if (lastModified !== test[0].lastModified) {
            loopAlert(test);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("lastModified", test[0].lastModified);
            }
            document.getElementById("updated").innerHTML = 'Dashboard Updated...';
        } else {
            loopAlert(test);
            document.getElementById("updated").innerHTML = '';
        }
        return test;
    }
});

var JsonData = [];
$(document).ready(function() {
    window.setInterval(function() {
        JsonData = getData1();
        console.log(JsonData)
        //var response = [];
    }, 5000);
    // console.log( "ready!" );
    JsonData = getData1();
    console.log(JsonData)
});




function loopAlert(response) {
    $('#alert div').remove('');
    $('#rootCause div').remove('');

    var th = ['Alert', 'Shortname', 'Count'];
    var alerts = new Array();
    alerts.push(th);
    for (let i = 0; i < response.length; i++) {
        alerts.push([response[i].desc, response[i].shortName, '']);
    }

    var table = document.createElement("TABLE");
    table.id = 'alertTable';
    table.border = "1";

    //Get the count of columns.
    var columnCount = alerts[0].length;

    //Add the header row.
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

    var dvTable = document.getElementById("alert");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);

    for (var i = 1; i <= response.length; i++) {
        var headerCell = document.createElement("a");
        headerCell.innerHTML = response[i - 1].count;
        headerCell.id = 'row_' + i;
        document.getElementById("alertTable").rows[i].cells[2].appendChild(headerCell);
        document.getElementById("alertTable").rows[i].cells[2].setAttribute('data-alertName', response[i - 1].desc);
        document.getElementById("alertTable").rows[i].cells[2].className = 'popUp1';
    }
    const rootCauseData = [];

    for (let i = 0; i < response.length; i++) {
        rootCauseData.push(response[i]['rootList'])
    }

    var flatArray = [].concat.apply([], rootCauseData);

    var dat = Object.values(flatArray);
    const yyy = [];
    for (let i = 0; i < flatArray.length; i++) {
        yyy.push(flatArray[i]['alertDrilldown'].rootcause)
    }

    var uniqueRootCause = yyy.filter(function(item, i, ar) {
        return ar.indexOf(item) === i;
    });
    var alertData = [];
    for (let i = 0; i < response.length; i++) {
        alertData.push(response[i].shortName)
    }

    alertData.push('RootCause')

    var customers = new Array();
    customers.push(alertData);

    for (let i = 0; i < uniqueRootCause.length; i++) {
        var t = [];
        for (let j = 0; j < response.length; j++) {
            t.push("");
        }
        var a = t.concat(uniqueRootCause[i])
        customers.push(a);
    }

    console.log(customers)

    var table = document.createElement("TABLE");
    table.id = 'myTable';
    table.border = "1";

    //Get the count of columns.
    var columnCount = customers[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        headerCell.height = '33';
        headerCell.className = 'grey';
        headerCell.align = 'center';
        row.appendChild(headerCell);

    }

    //Add the data rows.
    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
            cell.height = '33';
            cell.align = 'center';
        }
    }

    var dvTable = document.getElementById("rootCause");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);

    for (var i = 1; i <= uniqueRootCause.length; i++) {
        var rootCauseRow = response.length;
        var thCount = 0;
        for (var j = 1; j <= response.length; j++) {
            var root = response[j - 1].rootList;
            for (var k = 0; k <= root.length; k++) {
                var alertL = root;
                var index = alertL.map(x => x['alertDrilldown'].rootcause).indexOf(uniqueRootCause[i - 1]);
            }
            var rL = response[j - 1].rootList;
            var counts = {};
            //  var countData = [];
            for (var c = 0; c < rL.length; c++) {
                counts[rL[c].alertDrilldown.rootcause] = 1 + (counts[rL[c].alertDrilldown.rootcause] || 0);
            }

            //	console.log(counts[uniqueRootCause[i - 1]])

            if (index != -1) {
                document.getElementById("myTable").rows[i].cells[j - 1].innerHTML = 'X';
                document.getElementById("myTable").rows[i].cells[j].setAttribute('data-count', 0);
            } else {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'green';
            }
            var g = document.getElementById("myTable").rows[i].cells[j].getAttribute('data-count');
            //console.log(g)
            //var thCount = g;
            if (g != null) {
                thCount = thCount + 1;
            } else {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'green';
            }
            if (thCount >= 3) {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'red';
            }

            if (thCount >= 2 && thCount < 3) {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'amber';
            }

            if ((thCount >= 1 && thCount < 2)) {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'yellow';
            }
            if ((thCount < 1)) {
                document.getElementById("myTable").rows[i].cells[rootCauseRow].className = 'green';
            }

        }


    }



}

$(document).ready(function() {
    $("#dialog1").dialog({
        autoOpen: false
    });

    /*   $("#dialog2").dialog({
           autoOpen: false
       }); */
});

$(document).on('click', '.popUp1', function(e) {
    $('#alertTable td').find('a').removeClass('red-text-color');
    $('#dialog1 table').remove();
    var example1 = $(this).children('a').attr('id');

    var id = $(this).attr('data-alertname');
    var found_names = $.grep(JsonData, function(v) {
        return v.desc === id;
    });
    //console.log(found_names);
    if (found_names[0].count != 0) {
        $(this).children('a').addClass('red-text-color');
        var headerCell = document.createElement("table");

        var th = ['Country', 'Alert Description', 'Alert Count'];

        var alerts = new Array();
        alerts.push(th);

        var popup1Data = found_names[0].rootList;

        var counts = {};
        popup1Data.forEach(function(x) {
            counts[x.country] = (counts[x.country] || 0) + 1;
        });

        var uniqueCountry = popup1Data.map(function(obj) {
            return obj.country;
        });
        uniqueCountryList = uniqueCountry.filter(function(v, i) {
            return uniqueCountry.indexOf(v) == i;
        });

        //console.log(counts);
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
        //console.log(th)
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
    var example1 = $(this).children('a').attr('id');


    if ($('.' + example1 + ':visible').length)
        $('#popUp2').hide();
    else {
        $('#popUp2').show();

        $('#popUp2').remove();
        $('#popUp2').hide();

        //  console.log(example1)
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

        for (let i = 0; i < countryList.length; i++) {
            alerts.push([countryList[i].country, countryList[i].alertDrilldown['storeID'],
                countryList[i].alertDrilldown['rootcause'], countryList[i].alertDrilldown['incidentId'],
                formatTimeStamp(countryList[i].alertDrilldown['timestamp'])
            ]);
        }
        var table = document.createElement("TABLE");
        table.id = 'popUp2';
        table.border = "1";
        table.className = example1;
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
            d2.innerHTML = document.getElementById("popUp2").rows[i].cells[0].innerHTML;
            document.getElementById("popUp2").rows[i].cells[0].innerHTML = "";
            document.getElementById("popUp2").rows[i].cells[0].appendChild(d2);
            document.getElementById("popUp2").rows[i].cells[0].className = 'popUp2'
        }
    }

});

function formatTimeStamp(date) {
    var res = date.split("T");
    return res[0]
}