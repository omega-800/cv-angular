public String updateUser(){
    	
	List<String> errors = new ArrayList<String>();
	
	//User mgnlUser = UserFactory.getUserByIdentifier(MgnlContext.getParameter("uuid"));
	User mgnlUser = UserFactory.getUserByNodeName(MgnlContext.getParameter("uuid"));
	
	Map<String,String> userMap = new HashMap<String, String>();
	if(StringUtils.isNotBlank(MgnlContext.getParameter("email"))){
		userMap.put("email", MgnlContext.getParameter("email"));
	}
	if(MgnlContext.getParameter("title") != null){
		userMap.put("title", MgnlContext.getParameter("title"));
	}
	if(MgnlContext.getParameter("firstName") != null){
		userMap.put("firstName", MgnlContext.getParameter("firstName"));
	}
	if(MgnlContext.getParameter("lastName") != null){
		userMap.put("lastName", MgnlContext.getParameter("lastName"));
	}
	if(MgnlContext.getParameter("phoneHome") != null){
		userMap.put("phoneHome", MgnlContext.getParameter("phoneHome"));
	}
	if(MgnlContext.getParameter("birthDate") != null){
		userMap.put("birthDate", MgnlContext.getParameter("birthDate"));
	}
	// ab hier neu hinzugefügter code
	if(StringUtils.isNotBlank(MgnlContext.getParameter("verifiedDate"))){
		userMap.put("verifiedDate", MgnlContext.getParameter("verifiedDate"));
	}
	// ende hinzugefügter code
	if(MgnlContext.getParameter("wegasUserId") != null){
		userMap.put("wegasUserId", MgnlContext.getParameter("wegasUserId").trim());
	}
	if(StringUtils.isNotBlank(MgnlContext.getParameter("pswd")) ){
		if(StringUtils.isNotBlank(MgnlContext.getParameter("pswdConfirm")) && MgnlContext.getParameter("pswd").equals(MgnlContext.getParameter("pswdConfirm"))){
			userMap.put("pswd", MgnlContext.getParameter("pswd"));
		}else{
			errors.add("Paswörter stimmen nicht überein");
		}
	}

	if(MgnlContext.getParameter("newCustomer") != null ){
		userMap.put("newCustomer", MgnlContext.getParameter("newCustomer").trim());
	}
	
	if(errors.size() > 0){
		MgnlContext.setAttribute("errorList", errors);
		return VIEW_ERROR; 
	}
	
	UserFactory.updateUser(userMap, mgnlUser);
	
	if(MgnlContext.getParameter("setGroup") != null){
		Iterator<Group> groupIter = Security.getSecuritySupport().getGroupManager().getAllGroups().iterator();
		while(groupIter.hasNext()){
			Security.getSecuritySupport().getUserManager("shop").removeGroup(mgnlUser, groupIter.next().getName());
		}
		if(StringUtils.isNotBlank(MgnlContext.getParameter("setGroup"))){
			Security.getSecuritySupport().getUserManager("shop").addGroup(mgnlUser, MgnlContext.getParameter("setGroup"));
		}
	}
	
	MgnlContext.setAttribute("success", "User geändert");
	
	return VIEW_SUCCESS;
}
