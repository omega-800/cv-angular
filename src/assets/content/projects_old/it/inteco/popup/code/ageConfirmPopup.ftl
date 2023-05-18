[#if shopfn.getConfigString("popup", "popupEnabled") == "true"]
<script>displayAgePopup();</script>
<div id="[#if shopfn.getConfigString("popup", "popupBig") == "true"]confirmAge[#else]confirmAgeSmall[/#if]">
	[#assign popupTitle = shopfn.getConfigString("popup", "popupTitle")]
	[#assign popupText = shopfn.getConfigString("popup", "popupText")]
	[#assign popupButtonText = shopfn.getConfigString("popup", "popupButtonText")]
	<div id="modal">
		<div><h1>[#if popupTitle?has_content]${popupTitle}[#else]Altersüberprüfung[/#if]</h1></div>
		<div><p>[#if popupText?has_content]${popupText}[#else]Bitte bestätigen Sie, dass Sie über 18J alt sind.[/#if]</p></div>
		<div><a href="javascript:setAgeConfirmation();" class="button">[#if popupButtonText?has_content]${popupButtonText}[#else]Bestätigen[/#if]</a></div>
	</div>
</div>
[/#if]
