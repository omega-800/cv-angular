# seo rio    
    
## [google mobile friendly](https://search.google.com/test/mobile-friendly/result?id=G6ydqQrxryGRT7qX0h0xEQ)    
    
usable on mobile    
    
## [webpagetest](https://www.webpagetest.org/result/230227_BiDc95_9AC/)     
    
SETTINGS: DESKTOP | Chromev110 | Cable | Frankfurt, Germany    
    
### web vitals    
    
(0.9) First Contentful Paint	0.593s / 0.591s    
(1.2) Largest Contentful Paint	7.883s / 1.218s    
(0.015) Total Blocking Time	0.008s / 0.018s    
(0.1) Cumulative Layout Shift	0.032  / 0.031    
(1.3) Speed Index		2.754s / 2.067s    
First Byte			0.294s / 0.279s    
Start render			0.700s / 0.600s    
Total bytes			4462KB / 20KB    
    
### optimization    
    
F	[Security score](https://snyk.io/test/website-scanner/?test=230227_BiDc95_9AC&utm_medium=referral&utm_source=webpagetest&utm_campaign=website-scanner)    
A	First Byte Time    
A	Keep-alive Enabled    
B	Compress Transfer    
D	Compress Images    
F	Progressive JPEGs    
F	Cache static content    
X	Effective use of CDN    
    
### is it quick?    
    
Not bad    
- 11 JavaScript files are blocking page rendering. >(Defer/Async/Inline)    
	- /.resources/shop/js/ecommerce.js    
	- /.resources/js/external/jquery-3.3.1.min.js    
	- /.resources/shop/js/jquery.cookie.js    
	- /.resources/js/external/jquery.slideme2.js    
	- /.resources/js/external/rellax.min.js    
	- /.resources/js/filterLinkFollow.js    
	- /.resources/js/page.js    
	- /.resources/js/lib/shop.js    
	- /.resources/rio/js/test.js    
	- /.resources/js/temp.js    
	- /.resources/util/js/simpleForm.js    
- 3 externally-referenced CSS files are blocking page rendering. >(Async/Inline)    
	- /.resources/rio/css/style.min.css    
	- /.resources/rio/css/customer-additional.css    
	- /.resources/css/additional.css    
- Largest Contentful Paint is high (over 2.5s). >(Preload LCP Image/add priority hint)    
	- LCP Image: https://www.rio-getraenke.ch/.imaging/teaser-100-full_JPG/dms/websites/teaser/Gruppe-97.JPG    
- Images outside the critical viewport can be lazy-loaded.    
- Several fonts are loaded with settings that hide text while they are loading. >(font-display:swap)    
	- Roboto 400 normal    
	- Roboto 500 normal    
	- Comfortaa 600 normal    
	- quicksandReg 400 normal    
	- quicksandB 400 normal    
	- karlaReg 400 normal    
- 2 fonts are hosted on 3rd-party hosts >(self-host/preconnect/preload)    
	- https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2    
	- https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2    
- 53 static files have inadequate cache settings.    
	- various JS,PNG,SVG files    
- 1 request is resulting in an HTTP redirect. >(remove redirect on first request)    
	- FROM: https://www.rio-getraenke.ch/ TO: 302    
- Final HTML (DOM) size is significantly larger than initially delivered HTML (98.77kb larger, or 56.65% of total HTML).    
    
### is it usable?    
    
Needs Improvement    
    
- Layout shifts exist and may be caused by images missing aspect ratio. >(add aspect ratios)    
	- /.resources/rio/img/logos/logo.png    
	- /.imaging/teaser-100-full_JPG/dms/websites/teaser/Gruppe-97.JPG    
- ARIA Commands Must Have An Accessible Name    
- Elements Must Have Sufficient Color Contrast    
	- search, various links, sale elements     
- Id Attribute Value Must Be Unique    
	- Document has multiple static elements with the same id attribute: metaMenu<div id="metaMenu" class="metaMenuMobile"> </div>    
- Images Must Have Alternate Text    
	- various Startseite_LoremIpsum.JPG    
- Form Elements Must Have Labels    
	- email, password, product-amount-input    
- Links Must Have Discernible Text    
	- various category links    
- ul And ol Must Only Directly Contain li, script Or template Elements    
	- List element has direct children that are not allowed inside <li> elements<ul class="main-menu-subitem">    
- Select Element Must Have An Accessible Name    
	- Gebinde     
    
### is it resilient?    
    
Not bad    
    
- Update the following JavaScript packages: jquery 3.3.1    
    
### miscellaneous    
    
87.8% [potential image weight reduction](https://webspeedtest.cloudinary.com/results/230227_BiDc95_9AC)    
[request map](https://requestmap.herokuapp.com/render/230227_BiDc95_9AC/)    
[data cost](https://whatdoesmysitecost.com/index.php?testID=230227_BiDc95_9AC)    
    
## [pagespeed insights](https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.rio-getraenke.ch%2F&form_factor=desktop)    
    
### best practices    
    
- Enthält Front-End-JavaScript-Bibliotheken mit bekannten Sicherheitslücken (3 Sicherheitslücken erkannt)    
- Stellt Bilder mit niedriger Auflösung bereit    
    
### seo    
    
- Bildelemente haben keine [alt]-Attribute    
    
### performance    
    
Bilder in modernen Formaten bereitstellen 	Einsparung: 12,63 s    
Bilder effizient codieren			Einsparung: 4,68 s    
Bilder richtig dimensionieren			Einsparung: 3,53 s    
Reduzieren Sie nicht verwendetes JavaScript	Einsparung: 1,2 s    
Nicht sichtbare Bilder aufschieben		Einsparung: 1,05 s    
    
- Statische Inhalte mit einer effizienten Cache-Richtlinie bereitstellen (45 Ressourcen gefunden)    
- Aufwand für Hauptthread minimieren (7,0 s)    
- Sehr große Netzwerknutzlasten vermeiden (Die Gesamtgröße war 4.462 KiB)    
- First Contentful Paint (3G) (5130 ms)    
- Ausführungszeit von JavaScript reduzieren (3,4 s)    
- Übermäßige DOM-Größe vermeiden (1.299 Elemente)    
- Bildelemente haben keine explizite width und height    
    
### accessibility    
    
- Die Formularelemente sind nicht mit Labels verknüpft    
- Links haben keinen leicht erkennbaren Namen    
- button-, link- und menuitem-Elemente haben keine zugänglichen Namen.    
- Das Kontrastverhältnis von Hintergrund- und Vordergrundfarben ist nicht ausreichend.    
- Listen enthalten nicht nur <li>-Elemente und Elemente zur Skriptunterstützung (script sowie template).    
- Überschriftenelemente sind nicht in einer fortlaufenden absteigenden Reihenfolge angeordnet    
    
    
    
    
LAZY LOADING FIRST IMAGE? DOES BROWSER "REALIZE" IT'S IN THE VIEWPORT?    
