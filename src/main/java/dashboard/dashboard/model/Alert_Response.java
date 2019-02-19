package dashboard.dashboard.model;

import java.util.List;

public class Alert_Response {

	private String desc;
	private int count;
	private List<AlertRootList> rootList;
	private String shortName;
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	} 
	
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<AlertRootList> getRootList() {
		return rootList;
	}
	public void setRootList(List<AlertRootList> rootList) {
		this.rootList = rootList;
	}
	
}
