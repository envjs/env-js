$log("Defining HTMLElement");
/*
* HTMLElement - DOM Level 2
*/
$w.__defineGetter__("HTMLElement", function(){
  return function(){
    throw new Error("Object cannot be created in this context");
  };
});

var HTMLElement = function(node){
  __extend__(this, new Element(node));  
	registerEventAttrs(this);
	return __extend__(this, {
		get className() { return this.getAttribute("class") || ""; },
		set className(val) { return this.setAttribute("class",trim(val)); },
		get dir() { return this.getAttribute("dir") || ""; },
		set dir(val) { return this.setAttribute("dir",val); },
		get id() { return this.getAttribute("id") || ""; },
		set id(val) { return this.setAttribute("id",val); },
		get innerHTML(){  return this.childNodes.xml; },
		set innerHTML(html){
		  //$debug("htmlElement.innerHTML("+html+")");
		  //Should be replaced with HTMLPARSER usage
			html = (html?html:"").replace(/<\/?([A-Z]+)/g, function(m){
				return m.toLowerCase();
			}).replace(/&nbsp;/g, " ");
			var doc = new DOMParser().
			  parseFromString('<div>'+html+'</div>');
      var elements, nodes = this.ownerDocument.importNode(doc.documentElement, true).childNodes;
			while (this.firstChild){ this.removeChild( this.firstChild );}
			for(var i = 0; i<nodes.length; i++ ){
			  this.appendChild( nodes.item(i) );
        correctHTMLIds(nodes.item(i));
		  }
		  delete doc;
		},
		get lang() { return this.getAttribute("lang") || ""; },
		set lang(val) { return this.setAttribute("lang",val); },
		offsetHeight: 0,
		offsetWidth: 0,
		offsetLeft: 0,
		offsetRight: 0,
		get offsetParent(){return;/* TODO */},
		set offsetParent(element){return;/*TODO*/},
		scrollHeight: 0,
		scrollWidth: 0,
		scrollLeft: 0, 
		scrollRight: 0,
		get style(){return null;},//new CSS2Properties(trim(this.getAttribute("style") || ""));},
		get title() { return this.getAttribute("title") || ""; },
		set title(val) { return this.setAttribute("title",val); },
		//Not in the specs but I'll leave it here for now.
		get outerHTML(){ return this.xml; },
	  scrollIntoView: function(){/*TODO*/},
		onclick: function(event){try{eval(this.getAttribute('onclick'));}catch(e){$error(e);}},
		ondblclick: function(event){try{eval(this.getAttribute('ondblclick'));}catch(e){$error(e);}},
		onkeydown: function(event){try{eval(this.getAttribute('onkeydown'));}catch(e){$error(e);}},
		onkeypress: function(event){try{eval(this.getAttribute('onkeypress'));}catch(e){$error(e);}},
		onkeyup: function(event){try{eval(this.getAttribute('onkeyup'));}catch(e){$error(e);}},
		onmousedown: function(event){try{eval(this.getAttribute('onmousedown'));}catch(e){$error(e);}},
		onmousemove: function(event){try{eval(this.getAttribute('onmousemove'));}catch(e){$error(e);}},
		onmouseout: function(event){try{eval(this.getAttribute('onmouseout'));}catch(e){$error(e);}},
		onmouseover: function(event){try{eval(this.getAttribute('onmouseover'));}catch(e){$error(e);}},
		onmouseup: function(event){try{eval(this.getAttribute('onmouseup'));}catch(e){$error(e);}}
	});
};


	var registerEventAttrs = function(elm){
    if(elm.hasAttribute('onclick')){ elm.addEventListener('click', elm.onclick ); }
    if(elm.hasAttribute('ondblclick')){ elm.addEventListener('dblclick', elm.onclick ); }
    if(elm.hasAttribute('onkeydown')){ elm.addEventListener('keydown', elm.onclick ); }
    if(elm.hasAttribute('onkeypress')){ elm.addEventListener('keypress', elm.onclick ); }
    if(elm.hasAttribute('onkeyup')){ elm.addEventListener('keyup', elm.onclick ); }
    if(elm.hasAttribute('onmousedown')){ elm.addEventListener('mousedown', elm.onclick ); }
    if(elm.hasAttribute('onmousemove')){ elm.addEventListener('mousemove', elm.onclick ); }
    if(elm.hasAttribute('onmouseout')){ elm.addEventListener('mouseout', elm.onclick ); }
    if(elm.hasAttribute('onmouseover')){ elm.addEventListener('mouseover', elm.onclick ); }
    if(elm.hasAttribute('onmouseup')){ elm.addEventListener('mouseup', elm.onclick ); }
    return elm;
	};
	
	var click = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("click");
		element.dispatchEvent(event);
	};
	var submit = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("submit");
		element.dispatchEvent(event);
	};
	var focus = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("focus");
		element.dispatchEvent(event);
	};
	var blur = function(element){
		var event = new Event({
		  target:element,
		  currentTarget:element
		});
		event.initEvent("blur");
		element.dispatchEvent(event);
	};