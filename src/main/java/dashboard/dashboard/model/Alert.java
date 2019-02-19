package dashboard.dashboard.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="alert_rootcause")
@SequenceGenerator(name="seq", initialValue=1, allocationSize=100)
public class Alert {
	
	 @Id
	 //@GeneratedValue(strategy = GenerationType.AUTO)
	 @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	 @Column(name="id")
	 private int id;
	 @Column(name="alert")
	 private String alert;
	 @Column(name="rootcause")
	 private String rootcause;
	 @Column(name="short_name")
	 private String shortName;
	 @Column(name="storeID")
	 private String storeID;
	 @Column(name="country")
	 private String country;
	 @Column(name="timestamp")
	 private Date timestamp;	 
	 @Column(name="incident_id")
	 private String incidentId;
	 public String getStoreID() {
		return storeID;
	}
	public void setStoreID(String storeID) {
		this.storeID = storeID;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAlert() {
		return alert;
	}
	public void setAlert(String alert) {
		this.alert = alert;
	}
	public String getRootcause() {
		return rootcause;
	}
	public void setRootcause(String rootcause) {
		this.rootcause = rootcause;
	}
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
		
}
