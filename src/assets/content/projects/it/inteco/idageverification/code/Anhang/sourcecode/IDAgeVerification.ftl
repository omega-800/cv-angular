<script src="${contextPath}/.resources/shop/js/IDAgeVerification.js" defer></script>
[#assign verifiedDate = model.getVerifiedUserDate()]
[#assign errorMessage = model.getErrorMessage()]
[#if verifiedDate == "" && model.needsDisplaying()]
	<div class="age-verification">
		<p>${i18n['IDAgeVerification.title']}</p>
		[#if errorMessage]
			<h3 id="age-verification-error">${i18n['IDAgeVerification.error']}</h3>
		[/#if]
		<label for="verification-options">${i18n['IDAgeVerification.choose']}</label>
		<select name="verification-options" id="verification-options" onchange="selectAgeVerification(this);">
		  	<option value="id-verification" selected>${i18n['IDAgeVerification.swissID']}</option>
		  	<option value="pass-verification">${i18n['IDAgeVerification.swissPass']}</option>
		  	<option value="other-verification">${i18n['IDAgeVerification.other']}</option>
		</select>
		
		<div class="id-verification">
		<form class="verification-form" method="post" class="simpleForm">
			<div class="id-top">
				<p class="age-verification-info">${i18n['IDAgeVerification.backID']}</p>
			</div>
			<div class="id-bottom">
				<div class="id-row">
					<span>IDCHE</span>
					<input type="text" size="8" maxlength="8" minlength="8" placeholder="C4328590" id="id-idInput" name="id" pattern="[a-zA-Z]{1}[0-9]{7}" required>
					<span>&lt;</span>
					<input type="text" size="1" maxlength="1" minlength="1" placeholder="3" id="id-idNrInput" name="idNr" pattern="[0-9]{1}" required>
					<span>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
				</div>
				<div class="id-row">
					<input type="text" size="7" maxlength="7" minlength="7" placeholder="1202054" id="id-dateInput" name="date" pattern="[0-9]{7}" required>
					<span>X</span>
					<input type="text" size="7" maxlength="7" minlength="7" placeholder="9805123" id="id-validInput" name="valid" pattern="[0-9]{7}" required>
					<span>CHE&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
					<input type="text" size="1" maxlength="1" minlength="1" placeholder="2" id="id-nrInput" name="nr" pattern="[0-9]{1}" required>
				</div>
				<div class="id-row">
					<span>MUSTER&lt;&lt;HANS&lt;MICHAEL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
				</div>
			</div>
			<input type="submit" value="${i18n['IDAgeVerification.submit']?html}"/>
		</form>
		</div>
		
		<div class="pass-verification hidden">
		<form class="verification-form" method="post" class="simpleForm">
			<div class="pass-top">
				<p class="age-verification-info">${i18n['IDAgeVerification.frontPass']}</p>
				<img src="${defaultBaseUrl}/.resources/shop/img/user-icon.svg" id="pass-profilepic"/>
			</div>
			<div class="pass-bottom">
				<div class="pass-row">
					<span>PMCHEMUSTER&lt;&lt;HANS&lt;MICHAEL&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
				</div>
				<div class="pass-row">
					<input type="text" size="8" maxlength="8" minlength="8" placeholder="C4328590" id="pass-idInput" name="id" pattern="[a-zA-Z]{1}[0-9]{7}" required>
					<span>&lt;</span>
					<input type="text" size="1" maxlength="1" minlength="1" placeholder="3" id="pass-idNrInput" name="idNr" pattern="[0-9]{1}" required>
					<span>IDCHE</span>
					<input type="text" size="7" maxlength="7" minlength="7" placeholder="1202054" id="pass-dateInput" name="date" pattern="[0-9]{7}" required>
					<span>X</span>
					<input type="text" size="7" maxlength="7" minlength="7" placeholder="9805123" id="pass-validInput" name="valid" pattern="[0-9]{7}" required>
					<span>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span>
					<input type="text" size="1" maxlength="1" minlength="1" placeholder="2" id="pass-nrInput" name="nr" pattern="[0-9]{1}" required>
				</div>
			</div>
			<input type="submit" value="${i18n['IDAgeVerification.submit']?html}"/>
		</form>
		</div>
		
		
		<div class="other-verification hidden">
			<p>${i18n['IDAgeVerification.contact']}</p>
			[@cms.area name="contactForm" /]
			[#-- cms.component content=employee  --]
		</div>
	</div>
[/#if]
