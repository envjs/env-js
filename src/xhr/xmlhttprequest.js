
/**
 *
 * @class XMLHttpRequest
 * @author Originally implemented by Yehuda Katz
 *
 */
    
(function(){
    
// this implementation can be used without requiring a DOMParser
// assuming you dont try to use it to get xml/html documents
var domparser,
    log = Envjs.logger();
    
Envjs.once('tick', function(){
    log = Envjs.logger('Envjs.XMLHttpRequest').
        debug('xhr logger available');
});

exports.XMLHttpRequest = XMLHttpRequest = function(){
    this.headers = {};
    this.responseHeaders = {};
    this.aborted = false;//non-standard
};

// defined by the standard: http://www.w3.org/TR/XMLHttpRequest/#xmlhttprequest
// but not provided by Firefox.  Safari and others do define it.
XMLHttpRequest.UNSENT = 0;
XMLHttpRequest.OPEN = 1;
XMLHttpRequest.HEADERS_RECEIVED = 2;
XMLHttpRequest.LOADING = 3;
XMLHttpRequest.DONE = 4;

XMLHttpRequest.prototype = {
    open: function(method, url, async, user, password){
        log.debug('opening xhr %s %s %s', method, url, async);
        this.readyState = 1;
        this.async = (async === false)?false:true;
        this.method = method || "GET";
        this.url = Envjs.uri(url);
        this.onreadystatechange();
    },
    setRequestHeader: function(header, value){
        this.headers[header] = value;
    },
    send: function(data, parsedoc/*non-standard*/, redirect_count){
        var _this = this;
        log.debug('sending request for url %s', this.url);
        parsedoc = (parsedoc === undefined)?true:!!parsedoc;
        redirect_count = (redirect_count === undefined) ? 0 : redirect_count;
        function makeRequest(){
            var cookie = Envjs.getCookies(_this.url),
                redirecting = false;
            if(cookie){
                _this.setRequestHeader('COOKIE', cookie);
            }
            if(window&&window.navigator&&window.navigator.userAgent){
                _this.setRequestHeader('User-Agent', window.navigator.userAgent);
            }
            
            log.debug('establishing platform native connection %s', _this.url);
            Envjs.connection(_this, function(){
                log.debug('callback remove xhr from network queue');
                Envjs.connections.removeConnection(_this);
                if (!_this.aborted){
                    var doc = null,
                        domparser,
                        cookie,
                        contentType,
                        location;
                    
                    try{
                        cookie = _this.getResponseHeader('SET-COOKIE');
                        if(cookie){
                            Envjs.setCookie(_this.url, cookie);
                        }
                    }catch(e){
                        log.warn("Failed to set cookie");
                    }
                    //console.log('status : %s', _this.status);
                    switch(_this.status){
                        case 301:
                        case 302:
                        case 303:
                        case 305:
                        case 307:
                        if(_this.getResponseHeader('Location') && redirect_count < 20){
                            //follow redirect and copy headers
                            redirecting = true;
                            location = _this.getResponseHeader('Location');
                            log.debug('following %s redirect %s from %s url %s', 
                                redirect_count, 
                                _this.status, 
                                _this.url, 
                                location);
                            _this.url = Envjs.uri(location);
                            //remove current cookie headers to allow the redirect to determine
                            //the currect cookie based on the new location
                            if('Cookie' in _this.headers ){
                                delete _this.headers.Cookie;
                            }
                            if('Cookie2' in _this.headers ){
                                delete _this.headers.Cookie2;
                            }
                            redirect_count++;
                            if (_this.async){
                                //TODO: see TODO notes below
                                Envjs.runAsync(makeRequest);
                            }else{
                                makeRequest();
                            }
                            return;
                        }break;
                        default:
                        // try to parse the document if we havent explicitly set a
                        // flag saying not to and if we can assure the text at least
                        // starts with valid xml
                        contentType = _this.getResponseHeader('Content-Type');
                        log.debug("response content-type : %s", contentType);
                        if ( parsedoc && 
                             contentType && 
                             contentType.indexOf('xml') > -1 &&
                            _this.responseText.match(/^\s*</) ) {
    
                            domparser = domparser||new DOMParser();
                            try {
                                log.debug("parsing response text into xml document");
                                doc = domparser.parseFromString(_this.responseText+"", 'text/xml');
                            } catch(ee) {
                                //Envjs.error('response XML does not appear to be well formed xml', e);
                                log.error('parseerror \n%s', ee);
                                doc = document.implementation.createDocument('','error',null);
                                doc.appendChild(doc.createTextNode(ee+''));
                            }

                        }else{
                            log.debug('response XML does not appear to be xml');
                        }

                        _this.__defineGetter__("responseXML", function(){
                            return doc;
                        });
                            
                    }
                }
            }, data);

            if (!_this.aborted  && !redirecting){
                log.debug('did not abort and not redirecting so calling onreadystatechange');
                _this.onreadystatechange();
            }

        }//end makeRequest
        
        log.debug('requesting async: %s', this.url);
        Envjs.connections.addConnection(this);
        if (this.async){
            //DONE: what we really need to do here is rejoin the
            //      current thread and call onreadystatechange via
            //      setTimeout so the callback is essentially applied
            //      at the end of the current callstack
            Envjs.runAsync(makeRequest);
        }else{
            log.debug('requesting sync: %s', this.url);
            makeRequest();
        }
    },
    abort: function(){
        this.aborted = true;
    },
    onreadystatechange: function(){
        //Instance specific
    },
    getResponseHeader: function(header){
        log.debug('getting response header %s', header);
        var rHeader, returnedHeaders;
        if (this.readyState < 3){
            throw new Error("INVALID_STATE_ERR");
        } else {
            returnedHeaders = [];
            log.debug('searching response headers for %s ', header);
            for (rHeader in this.responseHeaders) {
                if ((rHeader+'').match(new RegExp(header, "i"))) {
                    log.debug('found response header, %s is %s', rHeader, header);
                    returnedHeaders.push(this.responseHeaders[rHeader]);
                }
            }

            if (returnedHeaders.length){
                returnedHeaders = returnedHeaders.join(", ");
                log.debug('got response header %s', returnedHeaders);
                return returnedHeaders;
            }
        }   
        return null;
    },
    getAllResponseHeaders: function(){
        var header, returnedHeaders = [];
        if (this.readyState < 3){
            throw new Error("INVALID_STATE_ERR");
        } else {
            for (header in this.responseHeaders) {
                if(this.responseHeader.hasOwnProperty(header)){
                    returnedHeaders.push( header + ": " + this.responseHeaders[header] );
                }
            }
        }
        return returnedHeaders.join("\r\n");
    },
    async: true,
    readyState: 0,
    responseText: "",
    status: 0,
    statusText: "",
    withCredentials: false
};

}(/*XMLHttpREquest*/));