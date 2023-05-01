
/**
 * Updated den User. Map wird iteriert und jeder Value dem User hinzugefügt. Nur Properties, die im 'userProperties' Node definiert wurden werden updated. 
 * @param userParameter Dies ist eine Map mit den Parametern, die dem User als Property hinzugefügt werden.
 * @param user User, der geupdated werden sollte.
 */
public static void updateUser(Map<String, ? extends Object> userParameter, User user) {
	
	try {
		final UserManager manager = getUserManager(user);
		Node userConfig = Components.getComponent(SystemContext.class).getJCRSession("config").getNode("/modules/shop/settings/userProperties");
		
		//iteriert userParameters
		for (Entry<String, ? extends Object> userMapEntry : userParameter.entrySet()) {
			//Parameters müssen in userProperties vorhanden sein.
			if(userConfig.hasProperty(userMapEntry.getKey())){
				manager.setProperty(user, userMapEntry.getKey(), (String)userMapEntry.getValue());
			//eigene changePassword Funktion
			}else if(userMapEntry.getKey().equals("pswd")){
				manager.changePassword(user, (String)userMapEntry.getValue());
			// beginn neu hinzugefügter code
			}else if(userMapEntry.getKey().equals("verifiedDate")){
				manager.setProperty(user, userMapEntry.getKey(), (String)userMapEntry.getValue());
			// ende neu hinzugefügter code
			}else{
				log.info("wont save property \""+userMapEntry.getKey()+"\", no entry for it under /config/modules/shop/settings/userProperties");
			}
		}
		
	} catch (ItemNotFoundException e) {
		log.error("ItemNotFoundException",e);
	} catch (LoginException e) {
		log.error("LoginException",e);
	} catch (RepositoryException e) {
		log.error("RepositoryException",e);
	}
}
