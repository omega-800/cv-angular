final Delta for1_1_23 = DeltaBuilder.update("1.1.23", "Age Verification")
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "IDAgeVerification Config",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.templates.components.IDAgeVerification.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "IDAgeVerification component inside account",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.templates.pages.account.areas.content.availableComponents.IDAgeVerification.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "IDAgeVerification component inside order overview",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.templates.pages.order.areas.content.availableComponents.IDAgeVerification.xml"))
		.addTask(new BootstrapReplaceOrCreate("ConfigPageIntern", "Menu link",
				"/mgnl-bootstrap/1.1.23/config.modules.adminInterface.config.menu.settings.configPageIntern.xml"))
		.addTask(new BootstrapReplaceOrCreate("ConfigPageIntern", "Config node",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.pages.ConfigPageIntern.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "Stores defined min age for categories",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.settings.minAge.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "Imports category property on which to check age into product jcr",
				"/mgnl-bootstrap/1.1.23/config.modules.exchange.imports.produkte.nodeData.ageCategory.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "Min age basket rule",
				"/mgnl-bootstrap/1.1.23/config.modules.shop.settings.basketRules.min-age.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "Verification form order",
				"/mgnl-bootstrap/1.1.23/website.bestellen.uebersicht.content.00.xml"))
		.addTask(new BootstrapReplaceOrCreate("Age Verification", "Verification form account",
				"/mgnl-bootstrap/1.1.23/website.konto.anpassen.content.00.xml"));
register(for1_1_23);
