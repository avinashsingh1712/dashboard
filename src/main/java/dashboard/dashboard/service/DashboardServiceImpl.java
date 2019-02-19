package dashboard.dashboard.service;

import java.io.FileReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

import dashboard.dashboard.model.Alert;
import dashboard.dashboard.model.AlertDrilldown;
import dashboard.dashboard.model.AlertRootList;
import dashboard.dashboard.model.Alert_Response;

@Service
@Transactional
public class DashboardServiceImpl implements DashboardService {

	static int count = 1; 
	
	@Autowired
	AlertRepository alertRepository;

	@Override
	public List<Alert_Response> getAlerts() {
		List<Alert> list = (List<Alert>) alertRepository.findAll();
		List<Alert_Response> resList = setAlertValues(list);
		return resList;
	}
	
	

	private List<Alert_Response> setAlertValues(List<Alert> list) {
		List<Alert_Response> alertList = new ArrayList<>();
		Map<String, Integer> map = new LinkedHashMap<>();
		 
		for (int i = 0; i < list.size(); i++) {
			String alert1 = list.get(i).getAlert();

			if (map.containsKey(alert1)) {
				map.put(alert1, map.get(alert1) + 1);
			} else {
				if(!(list.get(i).getRootcause().isEmpty())) {
					if (list.get(i).getRootcause() == "") {
						map.put(alert1, 0);	
					}
					else {
					map.put(alert1, 1);
					}
				} else {
					map.put(alert1, 0);	
				}	
			}
		}
		for (Map.Entry<String, Integer> entry : map.entrySet()) {
			String key = entry.getKey();
			Integer value = entry.getValue();
			String shortName=null; 
			List<AlertRootList> rootCauseList = new ArrayList<>();
			
			
			for (Alert alert : list) {
				AlertDrilldown alertDrilldown = new AlertDrilldown();
				AlertRootList alertRootList = new AlertRootList();
				if (alert.getAlert().equals(key)) {
					shortName = alert.getShortName(); 
					alertRootList.setCountry(alert.getCountry());
					alertRootList.setDesc(alert.getAlert());
					alertDrilldown.setIncidentId(alert.getIncidentId());
					alertDrilldown.setRootcause(alert.getRootcause());
					alertDrilldown.setStoreID(alert.getStoreID());
					alertDrilldown.setTimestamp(alert.getTimestamp());
					alertRootList.setAlertDrilldown(alertDrilldown);
					rootCauseList.add(alertRootList);
				}
			}						
			Alert_Response alert_Response = new Alert_Response();
			alert_Response.setDesc(key);
			alert_Response.setCount(value);
			alert_Response.setRootList(rootCauseList);
			alert_Response.setShortName(shortName); 
			alertList.add(alert_Response);
		}
		return alertList;
	}



	
	@Scheduled(cron = "45 * * * * *")
	public void getPostAlerts() {
		// TODO Auto-generated method stub
		alertRepository.deleteAll();
		if(count < 7) {
			List<Alert> ls =  readCSVFile();
			alertRepository.saveAll(ls);
		} else {
			count =1;
		}
		
	}
	
	private List<Alert> readCSVFile(){
		 String file = "C:\\Users\\avinasin\\Documents\\IRW\\ideas\\Dashboard_Task\\CSV\\";
		 List<Alert> listAlert = new ArrayList<Alert>();
			 try { 
				 
				 
			        String fileName = "sample_csv" + count + ".csv";
			        FileReader filereader = new FileReader(file + fileName); 		  
			      
			        CSVReader csvReader = new CSVReaderBuilder(filereader) 
			                                  .withSkipLines(1) 
			                                  .build(); 
			        List<String[]> allData = csvReader.readAll(); 
			  
			         
			        for (String[] row : allData) { 
			        	Alert alert = new Alert();
			        	Arrays.asList(row);
			        	alert.setAlert(row[0]);
			        	alert.setRootcause(row[1]);
			        	alert.setShortName(row[2]);
			        	alert.setCountry(row[3]);
			        	alert.setStoreID(row[4]);
			        	if(row[5].trim() != null && !row[5].trim().isEmpty()) {
			        		alert.setTimestamp(getDate(row[5]));
			        	}			        	
			        	alert.setIncidentId(row[6]);
//			            for (String cell : row) { 
//			                System.out.print(cell + "\t"); 			                
//			                if(!cell.trim().isEmpty()) {
//			                	 alert.setAlert(cell);
//			                }
//			               
//			            } 
			            System.out.println(); 
			            listAlert.add(alert);
			        } 
			    } 
			    catch (Exception e) { 
			        e.printStackTrace(); 
			    }  
		 
			 count++; 
		 	 
		return listAlert;
	}
	
	
	public Date getDate(String dateFromBE) throws ParseException {
		//String pattern = "yyyy-MM-dd"; //TODO
		String pattern = "dd-MM-yyyy";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		//Date date = new Date();
		//DateFormat formatter = new SimpleDateFormat(pattern); 
		//Date date = (Date)formatter.parse(dateFromBE);			
		//Date date = simpleDateFormat.parse(dateFromBE);
		Date date = DateUtils.parseDate(dateFromBE, pattern);
		return date;		
	}
}
