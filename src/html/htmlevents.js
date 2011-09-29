
/**
 * @name HTMLEvents
 * @w3c:domlevel 2
 * @uri http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
 */

var __eval__ = function(script, node){
    if (script !== "" && Envjs.scriptTypes['']){
        // don't assemble environment if no script...
        try{
            Envjs['eval'](node.ownerDocument.ownerWindow, script, script+" ("+node+")");
        }catch(e){
            console.log('error evaluating %s', e);
        }
    }
};

var HTMLEvents = function(){};
HTMLEvents.prototype = {
    onload: function(event){
        __eval__(this.getAttribute('onload')||'', this);
    },
    onunload: function(event){
        __eval__(this.getAttribute('onunload')||'', this);
    },
    onabort: function(event){
        __eval__(this.getAttribute('onabort')||'', this);
    },
    onerror: function(event){
        __eval__(this.getAttribute('onerror')||'', this);
    },
    onselect: function(event){
        __eval__(this.getAttribute('onselect')||'', this);
    },
    onchange: function(event){
        __eval__(this.getAttribute('onchange')||'', this);
    },
    onsubmit: function(event){
        if (__eval__(this.getAttribute('onsubmit')||'', this)) {
            this.submit();
        }
    },
    onreset: function(event){
        __eval__(this.getAttribute('onreset')||'', this);
    },
    onfocus: function(event){
        __eval__(this.getAttribute('onfocus')||'', this);
    },
    onblur: function(event){
        __eval__(this.getAttribute('onblur')||'', this);
    },
    onresize: function(event){
        __eval__(this.getAttribute('onresize')||'', this);
    },
    onscroll: function(event){
        __eval__(this.getAttribute('onscroll')||'', this);
    }
};

//HTMLDocument, HTMLFramesetElement, HTMLObjectElement
var  __load__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("load", false, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLFramesetElement, HTMLBodyElement
var  __unload__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("unload", false, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLObjectElement
var  __abort__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("abort", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLFramesetElement, HTMLObjectElement, HTMLBodyElement
var  __error__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("error", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLInputElement, HTMLTextAreaElement
var  __select__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("select", true, false);
    element.dispatchEvent(event);
    return event;
};

//HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement
var  __change__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("change", true, false);
    element.dispatchEvent(event);
    return event;
};

//HtmlFormElement
var __submit__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("submit", true, true);
    element.dispatchEvent(event);
    return event;
};

//HtmlFormElement
var  __reset__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("reset", false, false);
    element.dispatchEvent(event);
    return event;
};

//LABEL, INPUT, SELECT, TEXTAREA, and BUTTON
var __focus__ = function(element){
    if (element.ownerDocument){
      element.ownerDocument.activeElement = element;
    }
    var event = new Event('HTMLEvents');
    event.initEvent("focus", false, false);
    element.dispatchEvent(event);
    return event;
};

//LABEL, INPUT, SELECT, TEXTAREA, and BUTTON
var __blur__ = function(element){
    if (element === element.ownerDocument.activeElement){
      element.ownerDocument.activeElement = null;
    }
    var event = new Event('HTMLEvents');
    event.initEvent("blur", false, false);
    element.dispatchEvent(event);
    return event;
};

//Window
var __resize__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("resize", true, false);
    element.dispatchEvent(event);
    return event;
};

//Window
var __scroll__ = function(element){
    var event = new Event('HTMLEvents');
    event.initEvent("scroll", true, false);
    element.dispatchEvent(event);
    return event;
};
