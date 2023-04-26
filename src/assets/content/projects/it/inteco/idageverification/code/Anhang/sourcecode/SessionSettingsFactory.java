// gets verified user birth date
public static String getVerifiedDate() {
  HttpSession session = MgnlContext.getWebContext().getRequest().getSession();
  return (String) session.getAttribute("verifiedDate");
}

// sets verified user birth date
public static void setVerifiedDate(String verifiedDate) {
  HttpSession session = MgnlContext.getWebContext().getRequest().getSession();
  session.setAttribute("verifiedDate", verifiedDate);
}
