package ch.inteco.magnolia.module.shop.rules.modifiers;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import ch.inteco.magnolia.module.shop.Basket;
import ch.inteco.magnolia.module.shop.TemplatingFunctions;
import ch.inteco.magnolia.module.shop.factories.BasketFactory;
import ch.inteco.magnolia.module.shop.factories.SessionSettingsFactory;
import ch.inteco.magnolia.module.shop.model.IDAgeVerificationModel;
import info.magnolia.cms.i18n.I18nContentSupport;
import info.magnolia.objectfactory.Components;

/**
 * 
 * Prevents User to finish order if user's age is under the minimum age
 * - minimum age = largest defined minAge of the categories which apply to the products inside of basket
 * 
 * @author gs2
 *
 */
public class BlockUnderage extends AbstractBasketModifier{
	
	private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(BlockUnderage.class);
	
	public BlockUnderage(Basket basket, Node node) {
		super(basket, node);
		
		// define variables with default values
		String message = "Too young to purchase Product";
		String message2 = "Verify age first to purchase Product";

		// get minimum age needed to buy products inside of basket
		int minAge = BasketFactory.getMinAge(basket);
		
		if (minAge > 0) {
			try {
				// get messages defined in JCR BasketRule
				if(node.hasProperty("multilanguage") && node.getProperty("multilanguage").getString().equals("true")){
					Locale locale = Components.getComponent(I18nContentSupport.class).getLocale();
					message = node.getProperty("message_"+locale.getLanguage()).getString();
					message2 = node.getProperty("message2_"+locale.getLanguage()).getString();
				} else if(node.hasProperty("message")){
					message = node.getProperty("message").getString(); 
					message2 = node.getProperty("message2").getString();
				}
			} catch (RepositoryException e) {
				e.printStackTrace();
			}
			
			// get already verified date
			String verifiedDate = IDAgeVerificationModel.getVerifiedUserDate();
			
			if(verifiedDate.equals("")) {
				// if date wasn't verified yet
				SessionSettingsFactory.addOrderError(message2);
			} else {
				// formatter is in the form of birthdate written on swiss ID and Passport
				LocalDate userDate = LocalDate.parse(verifiedDate, DateTimeFormatter.ofPattern("yyMMdd"));
				LocalDate currentDate = LocalDate.now();
				
				// shift 1 century back if userYear > currentYear
				// eg. if verifiedDate = "880101" then LocalDate parses it to 2088-01-01
				// if we have 2022 as of now, userAge gets set to 1988-01-01
				if(userDate.isAfter(currentDate)) {
					userDate = userDate.withYear(userDate.getYear()-100);
				}
				
				if(Period.between(userDate, currentDate).getYears() < minAge) {
					// if user isn't old enough to buy products
					SessionSettingsFactory.addOrderError(message);
				}
			}
		}
	}
}
