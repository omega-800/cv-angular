/**
   * Calculates the minimum age needed to buy products inside of basket
   * from minAge of ageCategory assigned to product (eg. "wein" = 16)
   * 
   * @param basket
   * @return minAge
   */
  public static int getMinAge(Basket basket) {
	 int minAge = 0;
	 // get largest minAge of basket
	 for(Map<String, Object> product : basket.getProducts()) {
		if(product.containsKey("ageCategory")) {
			// eg. ageCategory = "wein" | categoryMinAge = 16
			String categoryMinAge = TemplatingFunctions.getConfigString("minAge", (String)product.get("ageCategory"));
			if(categoryMinAge != "" && categoryMinAge != null && Integer.parseInt(categoryMinAge) > minAge) {
				// save the largest minimum age
				minAge = Integer.parseInt(categoryMinAge);
			}
		}
	 }
	 return minAge;
  }
  
  public static int getMinAge() {
	  return getMinAge(getBasket());
  }
