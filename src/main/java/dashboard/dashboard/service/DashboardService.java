package dashboard.dashboard.service;

import java.util.List;

import dashboard.dashboard.model.Alert_Response;

public interface DashboardService {
	List<Alert_Response> getAlerts();
	void getPostAlerts();
}
