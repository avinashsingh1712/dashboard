package dashboard.dashboard.model;

public class AlertRootList {
	
	private String country;
	private String desc;
	private AlertDrilldown alertDrilldown;
	
	public AlertDrilldown getAlertDrilldown() {
		return alertDrilldown;
	}
	public void setAlertDrilldown(AlertDrilldown alertDrilldown) {
		this.alertDrilldown = alertDrilldown;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
