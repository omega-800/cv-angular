<img src="${defaultBaseUrl}/.shopResources/img/logo_email.png" />
<br>
<br>
<br>
<b>Sehr geehrte/r ${title!} ${lastName!}</b>
<br>
<br>
<br>
Sie wünschen eine manuelle Altersüberprüfung.
<br>
<br>
Wir werden Ihren Antrag prüfen und uns mit Ihnen in Verbindung setzten.
<br>
<br>
<br>
<br>
<p style="margin-left:4px;font-size: 13px; line-height: 21px; font-family: myfont_book, sans-serif;">
  <strong style="font-weight:normal; font-family: myfont_bold, sans-serif;">${client.name}</strong><br>
  [#if client.street?has_content]${client.street}<br>[/#if]
  [#if client.plz?has_content]${client.plz}<br>[/#if]
  <br>
  [#if client.telefon?has_content]${client.telefon}<br>[/#if]
  [#if client.fax?has_content]${client.fax}<br>[/#if]
  <br>
  [#if client.mail?has_content]<a style="color:#${shopfn.getStyle('color')};" href="mailto:${client.mail}">${client.mail}[/#if]</a><br>
  [#if client.domain?has_content]<a style="color:#${shopfn.getStyle('color')};" href="http://${client.domain}">${client.domain}[/#if]</a><br>
  </p>
<br>
