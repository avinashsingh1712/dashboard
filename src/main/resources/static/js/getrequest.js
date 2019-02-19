$( document ).ready(function() {
	
	// GET REQUEST
	$("#getAlert").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : window.location + "api/alert/all",
			success: function(result){
				
				var alert_count = result.length;
				console.log("Success: ", result);
				console.log("Alert Count: ", alert_count);
				
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});	
	}
})