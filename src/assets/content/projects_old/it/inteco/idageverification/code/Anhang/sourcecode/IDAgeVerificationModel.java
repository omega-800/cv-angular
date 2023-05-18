package ch.inteco.magnolia.module.shop.model;

import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.inteco.magnolia.module.shop.Basket;
import ch.inteco.magnolia.module.shop.factories.BasketFactory;
import ch.inteco.magnolia.module.shop.factories.SessionSettingsFactory;
import ch.inteco.magnolia.module.util.form.SimpleFormProcessorFailedException;
import info.magnolia.cms.security.User;
import info.magnolia.context.MgnlContext;
import info.magnolia.context.SystemContext;
import info.magnolia.objectfactory.Components;
import info.magnolia.rendering.model.RenderingModel;
import info.magnolia.rendering.model.RenderingModelImpl;
import info.magnolia.rendering.template.RenderableDefinition;


/**
 * 
 * Verifies age input from swiss ID/Passport form 
 * 
 * @author gs2
 *
 */
public class IDAgeVerificationModel extends RenderingModelImpl<RenderableDefinition> {
	
	private static Logger log = LoggerFactory.getLogger(IDAgeVerificationModel.class);
	private boolean showLog;
	private static final int verification[] = {7,3,1};
	private Node userNode = null;
	private boolean loggedIn;
	private String verifiedDate = "";
	private boolean errorMessage = false;

	public IDAgeVerificationModel(Node content, RenderableDefinition definition, RenderingModel<?> parent) {
		super(content, definition, parent);
		
		try {
			User user = MgnlContext.getUser();
			loggedIn = !user.hasRole("anonymous");
			
			QueryManager qm = Components.getComponent(SystemContext.class).getJCRSession("shop").getWorkspace().getQueryManager();
			String query = "SELECT * from [mgnl:user] WHERE name=\""+user.getIdentifier()+"\" AND ISDESCENDANTNODE('/shop')";
			NodeIterator iter = qm.createQuery(query, Query.JCR_SQL2).execute().getNodes();
			if(iter.hasNext()) {
				userNode = iter.nextNode();
			} 
			// get already verified date
			verifiedDate = getVerifiedUserDate();
			
			// if date wasn't verified yet
			if(verifiedDate.equals("")) {
				// get params from sent form 
				Map<String, String> params = MgnlContext.getParameters();
				
				if(params.containsKey("id") && params.containsKey("idNr") && params.containsKey("date") && params.containsKey("valid") && params.containsKey("nr")) { 
					String id = params.get("id"); 
					String idNr = params.get("idNr"); 
					String date = params.get("date"); 
					String valid = params.get("valid"); 
					String nr = params.get("nr"); 
	
					// set verified date if the numbers given are correct
					if(verifyID(id, idNr, date, valid, nr)){
						errorMessage = false;
						setVerifiedUserDate(date.substring(0, date.length()-1));
					} else {
						errorMessage = true;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	/**
	 * Gets verifiedDate from either user JCR (if user is logged in) or otherwise session
	 * - static, because BlockUnderage also uses this method
	 * 
	 * @return verifiedDate
	 */
	public static String getVerifiedUserDate() {
		try {
			User user = MgnlContext.getUser();
			// if user is logged in
			if(!user.hasRole("anonymous")) {
				// get user JCR Node
				QueryManager qm = Components.getComponent(SystemContext.class).getJCRSession("shop").getWorkspace().getQueryManager();
				String query = "SELECT * from [mgnl:user] WHERE name=\""+user.getIdentifier()+"\" AND ISDESCENDANTNODE('/shop')";
				NodeIterator iter = qm.createQuery(query, Query.JCR_SQL2).execute().getNodes();
				if(iter.hasNext()) {
					Node userNode = iter.nextNode();
					// return verifiedDate if exists
					if(userNode.hasProperty("verifiedDate")) {
						return userNode.getProperty("verifiedDate").getString();
					}
				}
			} else {
				// if user is not logged in, get verifiedDate from session
				String sessionDate = SessionSettingsFactory.getVerifiedDate();
				return sessionDate == null ? "" : sessionDate;
			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// return empty string if error occurs or verifiedDate doesn't exist yet
		return "";
	}
	

	/**
	 * Sets verifiedDate to either user JCR (if user is logged in) or otherwise session
	 *
	 * @param date
	 */
	public void setVerifiedUserDate(String date) {
		if(loggedIn) {
			try {
				userNode.setProperty("verifiedDate", date);
				userNode.getSession().save();
				log.debug("Verified Date \""+date+"\" set for User \""+userNode.getName()+"\"");
			} catch (RepositoryException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		} else {
			SessionSettingsFactory.setVerifiedDate(date);
			log.debug("Verified Date \""+date+"\" set for User \"anonymous\"");
		}
	}
	
	/**
	 * Verifies validity of all of the numbers
	 * 
	 * @param id 			(Ausweisnummer) 			eg. C8912345
	 * @param idNr			(Prüfziffer Ausweisnummer) 	eg. 6
	 * @param fullDate		(Geburtsdatum + Prüfziffer)	eg. 8801018
	 * @param fullValid		(Gültig bis + Prüfziffer)	eg. 2501017
	 * @param completeNr	(Globale Prüfziffer)		eg. 2
	 * @return validity		
	 */
	public boolean verifyID(String id, String idNr, String fullDate, String fullValid, String completeNr) {
		// split fullDate into dateNr (Prüfziffer) and date (Geburtsdatum)
		int dateLength = fullDate.length() - 1;
		String dateNr = fullDate.substring(dateLength);
		String date = fullDate.substring(0, dateLength);
		
		// split fullValid into validNr (Prüfziffer) and valid (Gültig bis)
		int validLength = fullValid.length() - 1;
		String validNr = fullValid.substring(validLength);
		String valid = fullValid.substring(0, validLength);
		
		// convert first char of id into int (A=0, B=1, C=2, etc.)
		int idFirstNr = (int) id.charAt(0) - (int) 'A'; 
		id = idFirstNr + id.substring(1);
		
		// build the complete number
		String complete = id+0+idNr+date+dateNr+valid+validNr;
		
		// evaluate all numbers
		return (verifyNumber(id, idNr) && verifyNumber(date, dateNr) && verifyNumber(valid, validNr) && verifyNumber(complete, completeNr));
	}
	
	/**
	 * Verifies a number from the ID with it's verification number
	 * - verification process = every digit of number gets multiplied with verification 
	 * - last digit of result == verification number
	 * - eg. 2*7 + 5*3 + 0*1 + 1*7 + 0*3 + 1*1 = 37
	 * 
	 * @param number	(Nummer) 		eg. 250101
	 * @param toCheck	(Prüfziffer)	eg. 7
	 * @return validity
	 */
	public boolean verifyNumber(String number, String toCheck) {
		int result = 0;
		// for each digit in number
		for(int i = 0; i < number.length(); i++) {
			result += Character.getNumericValue(number.charAt(i))*verification[i%3];
		}
		String resultString = Integer.toString(result);
		return resultString.substring(resultString.length() -1).equals(toCheck);
	}
	
	public Boolean getErrorMessage() {
		return errorMessage;
	}
	/**
	 * Returns true if ageCheckForm needs to be displayed
	 * 
	 * @return needsDisplaying
	 */
	public boolean needsDisplaying() {
		boolean result = true;
		// if user is on the order page
		if(MgnlContext.getAggregationState().getCurrentURI().contains("bestellen")) {
			// don't display ageCheck if minAge for the products equals 0
			if(BasketFactory.getMinAge() == 0) {
				result = false;
			}
		}
		return result;
	}
}

