/**
 * Activates Node from admin to www
 * 
 * @param workspace
 * @param path
 */
public static void activateNode(String workspace, String path) {

	try {
		Session configSession = Components.getComponent(SystemContext.class).getJCRSession(workspace);
	
		Node n = configSession.getNode(path);
		// activate node to www
		log.debug("Activating config:"+path);
		
		Rule rule = new Rule();
		rule.addAllowType("mgnl:contentNode");
		rule.addAllowType("mgnl:content");
		rule.addAllowType("mgnl:resource");
		rule.addAllowType("mgnl:metaData");

		Content content = ContentUtil.asContent(n);
		content.getMetaData().getActivationStatus();
		
		// activate node to each subscriber
		for (Iterator<Subscriber> subscriberIter = Components.getComponent(ActivationManager.class).getSubscribers().iterator(); subscriberIter.hasNext();) {
			Subscriber subscriber = subscriberIter.next();
			if(subscriber.isActive() && subscriber.isSubscribed(path, workspace)){
				Syndicator syndicator = Components.getComponentProvider().newInstance(Syndicator.class);
				syndicator.init(MgnlContext.getUser(), workspace, ContentRepository.getDefaultWorkspace(workspace), rule);
			
				log.debug("activating node "+workspace+":"+path+" to "+subscriber.getURL());
				syndicator.activate(subscriber, content.getParent().getHandle(), content);
				log.debug(workspace+":"+path+" wurde aktiviert nach "+subscriber.getURL());
			}
		}
	} catch (RepositoryException | ExchangeException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
