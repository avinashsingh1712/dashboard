package dashboard.dashboard.model;

import java.util.Date;

public class AlertDrilldown {
	
	private String storeID;
	private String rootcause;
	private Date timestamp;
	private String incidentId;
	
	public String getStoreID() {
		return storeID;
	}
	public void setStoreID(String storeID) {
		this.storeID = storeID;
	}
	
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	public String getIncidentId() {
		return incidentId;
	}
	public void setIncidentId(String incidentId) {
		this.incidentId = incidentId;
	}
	public String getRootcause() {
		return rootcause;
	}
	public void setRootcause(String rootcause) {
		this.rootcause = rootcause;
	}
}
