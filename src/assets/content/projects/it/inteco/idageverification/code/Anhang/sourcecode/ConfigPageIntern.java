package ch.inteco.magnolia.module.shop.pages;

import info.magnolia.cms.beans.config.ContentRepository;
import info.magnolia.cms.core.Content;
import info.magnolia.cms.exchange.ActivationManager;
import info.magnolia.cms.exchange.ExchangeException;
import info.magnolia.cms.exchange.Subscriber;
import info.magnolia.cms.exchange.Syndicator;
import info.magnolia.cms.util.ContentUtil;
import info.magnolia.cms.util.Rule;
import info.magnolia.context.MgnlContext;
import info.magnolia.context.SystemContext;
import info.magnolia.module.admininterface.TemplatedMVCHandler;
import info.magnolia.objectfactory.Components;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.jcr.LoginException;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.inteco.magnolia.module.shop.TemplatingFunctions;

public class ConfigPageIntern extends TemplatedMVCHandler {
	
	String weine = "";
	String spirituosen = "";
	String bier = "";
	String andere = "";

	private static final Logger log = LoggerFactory.getLogger(ConfigurationPage.class);

    public ConfigPageIntern(String name, HttpServletRequest request, HttpServletResponse response) {
        super(name, request, response);
    }

    public String saveMinAge(){
    	
			try {
	    		Session configSession = Components.getComponent(SystemContext.class).getJCRSession("config");
    			String path = "/modules/shop/settings/minAge/";
				Node n = configSession.getNode(path);
    			
				weine = request.getParameter("weine");
				spirituosen = request.getParameter("spirituosen");
				bier = request.getParameter("bier");
				andere = request.getParameter("andere");
				
	    		if(weine != null && !weine.equals("")){
	    	    	n.setProperty("weine", weine);
	    		}
	    		
	    		if(spirituosen != null && !spirituosen.equals("")){
	    	    	n.setProperty("spirituosen", spirituosen);
	    		}
	    		
	    		if(bier != null && !bier.equals("")){
	    			n.setProperty("bier", bier);
	    		}
	    		
	    		if(andere != null && !andere.equals("")){
	    			n.setProperty("andere", andere);
	    		}
	    		
    	    	n.getSession().save();
    	    	TemplatingFunctions.activateNode("config", path);
    	    	
			} catch (Exception e) {
				e.printStackTrace();
			} 
    		
    	
    	return VIEW_SHOW;
    }
    
    public String getWeine() {
    	return TemplatingFunctions.getConfigString("minAge", "weine");
    }
	public String getSpirituosen() {
    	return TemplatingFunctions.getConfigString("minAge", "spirituosen");
	}
	public String getBier() {
    	return TemplatingFunctions.getConfigString("minAge", "bier");
	}
	public String getAndere() {
    	return TemplatingFunctions.getConfigString("minAge", "andere");
	}
}

