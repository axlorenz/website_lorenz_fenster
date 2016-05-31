function refcatnext(start,anzahl) {
  start=parseInt(start);
  anzahl=parseInt(anzahl);
  var ende=start+8;

  var images = Array(anzahl);
  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      images[i] = document.getElementById("ref-cat-image-before-"+i).innerHTML;
    }
    else if(i>ende) {
      images[i] = document.getElementById("ref-cat-image-after-"+(i-ende-1)).innerHTML;
    }
    else {
      images[i] = document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML;
    }
  }

  start+=9;
  ende+=9;
  if(ende>=anzahl) {
    ende=anzahl-1;
    start=anzahl-9;
  }
  var before = "";
  var after = "";

  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      before += "<div id=\"ref-cat-image-before-"+i+"\">";
      before += images[i];
      before += "</div>";
    }
    else if(i>ende) {
      after += "<div id=\"ref-cat-image-after-"+(i-ende-1)+"\">";
      after += images[i];
      after += "</div>";
    }
    else {
      document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML=images[i];
    }
  }

  document.getElementById("ref-cat-image-invisible-before").innerHTML=before;
  document.getElementById("ref-cat-image-invisible-after").innerHTML=after;

  var zurueck = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(start>0)
    zurueck = "<a href=\"javascript:refcatprev('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/zurueck.png\" /></a>&nbsp;&nbsp;";
  var vor = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(ende<(anzahl-1))
    vor = "&nbsp;&nbsp;<a href=\"javascript:refcatnext('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/vor.png\" /></a>";

  document.getElementById("ref-cat-more").innerHTML = zurueck+"Weitere Referenzen ("+(start+1)+"/"+(anzahl-8)+")"+vor;

scanPage();
}

function refcatprev(start,anzahl) {
  start=parseInt(start);
  anzahl=parseInt(anzahl);

  var ende=start+8;

  var images = Array(anzahl);
  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      images[i] = document.getElementById("ref-cat-image-before-"+i).innerHTML;
    }
    else if(i>ende) {
      images[i] = document.getElementById("ref-cat-image-after-"+(i-ende-1)).innerHTML;
    }
    else {
      images[i] = document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML;
    }
  }

  start-=9;
  ende-=9;
  if(start<0) {
    ende=8;
    start=0;
  }

  var before = "";
  var after = "";

  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      before += "<div id=\"ref-cat-image-before-"+i+"\">";
      before += images[i];
      before += "</div>";
    }
    else if(i>ende) {
      after += "<div id=\"ref-cat-image-after-"+(i-ende-1)+"\">";
      after += images[i];
      after += "</div>";
    }
    else {
      document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML=images[i];
    }
  }

  document.getElementById("ref-cat-image-invisible-before").innerHTML=before;
  document.getElementById("ref-cat-image-invisible-after").innerHTML=after;

  var zurueck = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(start>0)
    zurueck = "<a href=\"javascript:refcatprev('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/zurueck.png\" /></a>&nbsp;&nbsp;";
  var vor = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(ende<(anzahl-1))
    vor = "&nbsp;&nbsp;<a href=\"javascript:refcatnext('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/vor.png\" /></a>";

  document.getElementById("ref-cat-more").innerHTML = zurueck+"Weitere Referenzen ("+(start+1)+"/"+(anzahl-8)+")"+vor;

scanPage();
}

function objcatnext(start,anzahl) {
  start=parseInt(start);
  anzahl=parseInt(anzahl);
  var ende=start+8;

  var images = Array(anzahl);
  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      images[i] = document.getElementById("ref-cat-image-before-"+i).innerHTML;
    }
    else if(i>ende) {
      images[i] = document.getElementById("ref-cat-image-after-"+(i-ende-1)).innerHTML;
    }
    else {
      images[i] = document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML;
    }
  }

  start+=9;
  ende+=9;
  if(ende>=anzahl) {
    ende=anzahl-1;
    start=anzahl-9;
  }
  var before = "";
  var after = "";

  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      before += "<div id=\"ref-cat-image-before-"+i+"\">";
      before += images[i];
      before += "</div>";
    }
    else if(i>ende) {
      after += "<div id=\"ref-cat-image-after-"+(i-ende-1)+"\">";
      after += images[i];
      after += "</div>";
    }
    else {
      document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML=images[i];
    }
  }

  document.getElementById("ref-cat-image-invisible-before").innerHTML=before;
  document.getElementById("ref-cat-image-invisible-after").innerHTML=after;

  var zurueck = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(start>0)
    zurueck = "<a href=\"javascript:objcatprev('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/zurueck.png\" /></a>&nbsp;&nbsp;";
  var vor = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(ende<(anzahl-1))
    vor = "&nbsp;&nbsp;<a href=\"javascript:objcatnext('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/vor.png\" /></a>";

  document.getElementById("ref-cat-more").innerHTML = zurueck+"Weitere Objekte ("+(start+1)+"/"+(anzahl-8)+")"+vor;

scanPage();
}

function objcatprev(start,anzahl) {
  start=parseInt(start);
  anzahl=parseInt(anzahl);

  var ende=start+8;

  var images = Array(anzahl);
  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      images[i] = document.getElementById("ref-cat-image-before-"+i).innerHTML;
    }
    else if(i>ende) {
      images[i] = document.getElementById("ref-cat-image-after-"+(i-ende-1)).innerHTML;
    }
    else {
      images[i] = document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML;
    }
  }

  start-=9;
  ende-=9;
  if(start<0) {
    ende=8;
    start=0;
  }
  var before = "";
  var after = "";

  for(var i=0;i<anzahl;i++) {
    if(i<start) {
      before += "<div id=\"ref-cat-image-before-"+i+"\">";
      before += images[i];
      before += "</div>";
    }
    else if(i>ende) {
      after += "<div id=\"ref-cat-image-after-"+(i-ende-1)+"\">";
      after += images[i];
      after += "</div>";
    }
    else {
      document.getElementById("ref-cat-image-visible-"+(i-start)).innerHTML=images[i];
    }
  }

  document.getElementById("ref-cat-image-invisible-before").innerHTML=before;
  document.getElementById("ref-cat-image-invisible-after").innerHTML=after;

  var zurueck = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(start>0)
    zurueck = "<a href=\"javascript:objcatprev('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/zurueck.png\" /></a>&nbsp;&nbsp;";
  var vor = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  if(ende<(anzahl-1))
    vor = "&nbsp;&nbsp;<a href=\"javascript:objcatnext('"+start+"','"+anzahl+"');\"><img src=\"./fileadmin/schillinger/bilder/vor.png\" /></a>";

  document.getElementById("ref-cat-more").innerHTML = zurueck+"Weitere Objekte ("+(start+1)+"/"+(anzahl-8)+")"+vor;

scanPage();
}

function scanPage() {
	var links = $$("a").filter(
		function(el) {
			return el.rel && el.rel.test(/^lightbox/i);
		}
	);
	$$(links).slimbox(
		{
			resizeDuration: 400, 
			resizeTransition: Fx.Transitions.Sine.easeInOut, 
			opacity: 0.8, 
			opacityDuration: 500, 
			loop: 1, 
			initialWidth: 250, 
			initialHeight: 250, 
			animateCaption: 1, 
			showCounter: 1, 
			defaultIframeWidth: 500, 
			defaultIframeHeight: 300, 
			iframeScrolling: 'auto', 
			enablePrintButton: 0, 
			enableSaveButton: 0,
			counterText: 'Seite  {x} von {y}', 
			psScriptPath: 'http://www.schillinger-fenster.de/typo3conf/ext/pmkslimbox/savefile.php'
		}, 
		null, 
		function(el) {
			return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
		}
	);
}
