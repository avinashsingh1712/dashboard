package dashboard.dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dashboard.dashboard.model.Alert_Response;
import dashboard.dashboard.service.DashboardService;

@RestController
@RequestMapping("/api/alert")
public class RestWebController {
	@Autowired
	DashboardService dashboardService;

	@GetMapping(value = "/all" , headers="Accept=application/json")
	 public List<Alert_Response> getAlerts() {
		List<Alert_Response> tasks=dashboardService.getAlerts();
        return tasks;
	}
	 
//	 @PostMapping(value = "/{id}" , headers="Accept=application/json")	 
//	 public void getPostAlerts(@PathVariable int id) {		
//		dashboardService.getPostAlerts(id);        
//	}
	 
//	 @PostMapping(value = "/postData" , headers="Accept=application/json")	
//	 @Scheduled(cron = "45 * * * * *")
//	 public void getPostAlerts() {			
//		dashboardService.getPostAlerts();        
//	}
	 
	 
}