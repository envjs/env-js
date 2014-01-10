
/**
 * HTMLAnchorElement - DOM Level 2
 *
 * HTML5: 4.6.1 The a element
 * http://dev.w3.org/html5/spec/Overview.html#the-a-element
 */
 
(function(){
    
var log = Envjs.logger();

Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.HTML.HTMLAnchorElement').
		debug('HTMLAnchorElement available');    
});

exports.HTMLAnchorElement = HTMLAnchorElement = function(ownerDocument) {
    HTMLElement.apply(this, arguments);
};
HTMLAnchorElement.prototype = new HTMLElement();
__extend__(HTMLAnchorElement.prototype, {
    get accessKey() {
        return this.getAttribute("accesskey")||'';
    },
    set accessKey(val) {
        return this.setAttribute("accesskey",val);
    },
    get charset() {
        return this.getAttribute("charset")||'';
    },
    set charset(val) {
        return this.setAttribute("charset",val);
    },
    get coords() {
        return this.getAttribute("coords")||'';
    },
    set coords(val) {
        return this.setAttribute("coords",val);
    },
    get href() {
        var link = this.getAttribute('href');
        if (!link) {
            return '';
        }
        return Envjs.uri(link, this.ownerDocument.location.toString());
    },
    set href(val) {
        return this.setAttribute("href", val);
    },
    get hreflang() {
        return this.getAttribute("hreflang")||'';
    },
    set hreflang(val) {
        this.setAttribute("hreflang",val);
    },
    get name() {
        return this.getAttribute("name")||'';
    },
    set name(val) {
        this.setAttribute("name",val);
    },
    get pathname() {
        var uri = Envjs.urlsplit(this.href);
        return uri.path;
    },
    set pathname(val) {
        var uri = Envjs.urlsplit(this.href);
        uri.path = val
        this.href(uri.urlunsplit(uri));
    },
    get rel() {
        return this.getAttribute("rel")||'';
    },
    set rel(val) {
        return this.setAttribute("rel", val);
    },
    get rev() {
        return this.getAttribute("rev")||'';
    },
    set rev(val) {
        return this.setAttribute("rev",val);
    },
    get shape() {
        return this.getAttribute("shape")||'';
    },
    set shape(val) {
        return this.setAttribute("shape",val);
    },
    get target() {
        return this.getAttribute("target")||'';
    },
    set target(val) {
        return this.setAttribute("target",val);
    },
    get type() {
        return this.getAttribute("type")||'';
    },
    set type(val) {
        return this.setAttribute("type",val);
    },
    blur: function() {
        __blur__(this);
    },
    focus: function() {
        __focus__(this);
    },
	click: function(){
		__click__(this);
	},
    /**
     * Unlike other elements, toString returns the href
     */
    toString: function() {
        return this.href;
    }
});

}(/*Envjs.HTML.HTMLAnchorElement*/));
