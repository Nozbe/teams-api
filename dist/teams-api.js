!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(this,(function(){return e={206:(e,t,r)=>{e.exports=r(57)},298:(e,t,r)=>{"use strict";var n=r(485),o=r(570),s=r(574),i=r(581),a=r(605),c=r(211),u=r(95).http,p=r(95).https,h=r(835),f=r(761),d=r(995),l=r(524),m=r(953),g=/https:?/;e.exports=function(e){return new Promise((function(t,r){var y=function(e){t(e)},v=function(e){r(e)},x=e.data,_=e.headers;if(_["User-Agent"]||_["user-agent"]||(_["User-Agent"]="axios/"+d.version),x&&!n.isStream(x)){if(Buffer.isBuffer(x));else if(n.isArrayBuffer(x))x=Buffer.from(new Uint8Array(x));else{if(!n.isString(x))return v(l("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",e));x=Buffer.from(x,"utf-8")}_["Content-Length"]=x.length}var b=void 0;e.auth&&(b=(e.auth.username||"")+":"+(e.auth.password||""));var w=s(e.baseURL,e.url),R=h.parse(w),j=R.protocol||"http:";if(!b&&R.auth){var E=R.auth.split(":");b=(E[0]||"")+":"+(E[1]||"")}b&&delete _.Authorization;var A=g.test(j),k=A?e.httpsAgent:e.httpAgent,T={path:i(R.path,e.params,e.paramsSerializer).replace(/^\?/,""),method:e.method.toUpperCase(),headers:_,agent:k,agents:{http:e.httpAgent,https:e.httpsAgent},auth:b};e.socketPath?T.socketPath=e.socketPath:(T.hostname=R.hostname,T.port=R.port);var C,O=e.proxy;if(!O&&!1!==O){var B=j.slice(0,-1)+"_proxy",q=process.env[B]||process.env[B.toUpperCase()];if(q){var S=h.parse(q),N=process.env.no_proxy||process.env.NO_PROXY,P=!0;if(N&&(P=!N.split(",").map((function(e){return e.trim()})).some((function(e){return!!e&&("*"===e||"."===e[0]&&R.hostname.substr(R.hostname.length-e.length)===e||R.hostname===e)}))),P&&(O={host:S.hostname,port:S.port},S.auth)){var U=S.auth.split(":");O.auth={username:U[0],password:U[1]}}}}if(O&&(T.hostname=O.host,T.host=O.host,T.headers.host=R.hostname+(R.port?":"+R.port:""),T.port=O.port,T.path=j+"//"+R.hostname+(R.port?":"+R.port:"")+T.path,O.auth)){var L=Buffer.from(O.auth.username+":"+O.auth.password,"utf8").toString("base64");T.headers["Proxy-Authorization"]="Basic "+L}var D=A&&(!O||g.test(O.protocol));e.transport?C=e.transport:0===e.maxRedirects?C=D?c:a:(e.maxRedirects&&(T.maxRedirects=e.maxRedirects),C=D?p:u),e.maxBodyLength>-1&&(T.maxBodyLength=e.maxBodyLength);var I=C.request(T,(function(t){if(!I.aborted){var r=t,s=t.req||I;if(204!==t.statusCode&&"HEAD"!==s.method&&!1!==e.decompress)switch(t.headers["content-encoding"]){case"gzip":case"compress":case"deflate":r=r.pipe(f.createUnzip()),delete t.headers["content-encoding"]}var i={status:t.statusCode,statusText:t.statusMessage,headers:t.headers,config:e,request:s};if("stream"===e.responseType)i.data=r,o(y,v,i);else{var a=[];r.on("data",(function(t){a.push(t),e.maxContentLength>-1&&Buffer.concat(a).length>e.maxContentLength&&(r.destroy(),v(l("maxContentLength size of "+e.maxContentLength+" exceeded",e,null,s)))})),r.on("error",(function(t){I.aborted||v(m(t,e,null,s))})),r.on("end",(function(){var t=Buffer.concat(a);"arraybuffer"!==e.responseType&&(t=t.toString(e.responseEncoding),e.responseEncoding&&"utf8"!==e.responseEncoding||(t=n.stripBOM(t))),i.data=t,o(y,v,i)}))}}}));I.on("error",(function(t){I.aborted&&"ERR_FR_TOO_MANY_REDIRECTS"!==t.code||v(m(t,e,null,I))})),e.timeout&&I.setTimeout(e.timeout,(function(){I.abort(),v(l("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",I))})),e.cancelToken&&e.cancelToken.promise.then((function(e){I.aborted||(I.abort(),v(e))})),n.isStream(x)?x.on("error",(function(t){v(m(t,e,null,I))})).pipe(I):I.end(x)}))}},387:(e,t,r)=>{"use strict";var n=r(485),o=r(570),s=r(940),i=r(581),a=r(574),c=r(845),u=r(338),p=r(524);e.exports=function(e){return new Promise((function(t,r){var h=e.data,f=e.headers;n.isFormData(h)&&delete f["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var l=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";f.Authorization="Basic "+btoa(l+":"+m)}var g=a(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),i(g,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?c(d.getAllResponseHeaders()):null,s={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:n,config:e,request:d};o(t,r,s),d=null}},d.onabort=function(){d&&(r(p("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){r(p("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(p(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var y=(e.withCredentials||u(g))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;y&&(f[e.xsrfHeaderName]=y)}if("setRequestHeader"in d&&n.forEach(f,(function(e,t){void 0===h&&"content-type"===t.toLowerCase()?delete f[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),r(e),d=null)})),h||(h=null),d.send(h)}))}},57:(e,t,r)=>{"use strict";var n=r(485),o=r(875),s=r(29),i=r(941);function a(e){var t=new s(e),r=o(s.prototype.request,t);return n.extend(r,s.prototype,t),n.extend(r,t),r}var c=a(r(141));c.Axios=s,c.create=function(e){return a(i(c.defaults,e))},c.Cancel=r(132),c.CancelToken=r(603),c.isCancel=r(475),c.all=function(e){return Promise.all(e)},c.spread=r(739),e.exports=c,e.exports.default=c},132:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},603:(e,t,r)=>{"use strict";var n=r(132);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},475:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},29:(e,t,r)=>{"use strict";var n=r(485),o=r(581),s=r(96),i=r(9),a=r(941);function c(e){this.defaults=e,this.interceptors={request:new s,response:new s}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=c},96:(e,t,r)=>{"use strict";var n=r(485);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},574:(e,t,r)=>{"use strict";var n=r(642),o=r(288);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},524:(e,t,r)=>{"use strict";var n=r(953);e.exports=function(e,t,r,o,s){var i=new Error(e);return n(i,t,r,o,s)}},9:(e,t,r)=>{"use strict";var n=r(485),o=r(212),s=r(475),i=r(141);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return a(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(a(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},953:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},941:(e,t,r)=>{"use strict";var n=r(485);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],s=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function u(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),n.forEach(s,u),n.forEach(i,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(void 0,t[o])})),n.forEach(a,(function(n){n in t?r[n]=c(e[n],t[n]):n in e&&(r[n]=c(void 0,e[n]))}));var p=o.concat(s).concat(i).concat(a),h=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===p.indexOf(e)}));return n.forEach(h,u),r}},570:(e,t,r)=>{"use strict";var n=r(524);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},212:(e,t,r)=>{"use strict";var n=r(485);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},141:(e,t,r)=>{"use strict";var n=r(485),o=r(446),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=r(387):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(a=r(298)),a),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(s)})),e.exports=c},875:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},581:(e,t,r)=>{"use strict";var n=r(485);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},288:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},940:(e,t,r)=>{"use strict";var n=r(485);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},642:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},338:(e,t,r)=>{"use strict";var n=r(485);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},446:(e,t,r)=>{"use strict";var n=r(485);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},845:(e,t,r)=>{"use strict";var n=r(485),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,i={};return e?(n.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},739:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},485:(e,t,r)=>{"use strict";var n=r(875),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:p,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):s(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)p(arguments[n],r);return t},extend:function(e,t,r){return p(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},995:e=>{"use strict";e.exports=JSON.parse('{"name":"axios","version":"0.21.0","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test && bundlesize","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://github.com/axios/axios","devDependencies":{"bundlesize":"^0.17.0","coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.0.2","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^20.1.0","grunt-karma":"^2.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.1","karma-firefox-launcher":"^1.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.2.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^5.2.0","sinon":"^4.5.0","typescript":"^2.8.1","url-search-params":"^0.10.0","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.10.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')},276:(e,t,r)=>{var n;try{n=r(Object(function(){var e=new Error("Cannot find module 'debug'");throw e.code="MODULE_NOT_FOUND",e}()))("follow-redirects")}catch(e){n=function(){}}e.exports=n},95:(e,t,r)=>{var n=r(835),o=n.URL,s=r(605),i=r(211),a=r(413).Writable,c=r(357),u=r(276),p=Object.create(null);["abort","aborted","connect","error","socket","timeout"].forEach((function(e){p[e]=function(t,r,n){this._redirectable.emit(e,t,r,n)}}));var h=w("ERR_FR_REDIRECTION_FAILURE",""),f=w("ERR_FR_TOO_MANY_REDIRECTS","Maximum number of redirects exceeded"),d=w("ERR_FR_MAX_BODY_LENGTH_EXCEEDED","Request body larger than maxBodyLength limit"),l=w("ERR_STREAM_WRITE_AFTER_END","write after end");function m(e,t){a.call(this),this._sanitizeOptions(e),this._options=e,this._ended=!1,this._ending=!1,this._redirectCount=0,this._redirects=[],this._requestBodyLength=0,this._requestBodyBuffers=[],t&&this.on("response",t);var r=this;this._onNativeResponse=function(e){r._processResponse(e)},this._performRequest()}function g(e,t){clearTimeout(e._timeout),e._timeout=setTimeout((function(){e.emit("timeout")}),t)}function y(){clearTimeout(this._timeout)}function v(e){var t={maxRedirects:21,maxBodyLength:10485760},r={};return Object.keys(e).forEach((function(s){var i=s+":",a=r[i]=e[s],p=t[s]=Object.create(a);p.request=function(e,s,a){if("string"==typeof e){var p=e;try{e=_(new o(p))}catch(t){e=n.parse(p)}}else o&&e instanceof o?e=_(e):(a=s,s=e,e={protocol:i});return"function"==typeof s&&(a=s,s=null),(s=Object.assign({maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e,s)).nativeProtocols=r,c.equal(s.protocol,i,"protocol mismatch"),u("options",s),new m(s,a)},p.get=function(e,t,r){var n=p.request(e,t,r);return n.end(),n}})),t}function x(){}function _(e){var t={protocol:e.protocol,hostname:e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:e.pathname+e.search,href:e.href};return""!==e.port&&(t.port=Number(e.port)),t}function b(e,t){var r;for(var n in t)e.test(n)&&(r=t[n],delete t[n]);return r}function w(e,t){function r(e){Error.captureStackTrace(this,this.constructor),this.message=e||t}return r.prototype=new Error,r.prototype.constructor=r,r.prototype.name="Error ["+e+"]",r.prototype.code=e,r}m.prototype=Object.create(a.prototype),m.prototype.write=function(e,t,r){if(this._ending)throw new l;if(!("string"==typeof e||"object"==typeof e&&"length"in e))throw new TypeError("data should be a string, Buffer or Uint8Array");"function"==typeof t&&(r=t,t=null),0!==e.length?this._requestBodyLength+e.length<=this._options.maxBodyLength?(this._requestBodyLength+=e.length,this._requestBodyBuffers.push({data:e,encoding:t}),this._currentRequest.write(e,t,r)):(this.emit("error",new d),this.abort()):r&&r()},m.prototype.end=function(e,t,r){if("function"==typeof e?(r=e,e=t=null):"function"==typeof t&&(r=t,t=null),e){var n=this,o=this._currentRequest;this.write(e,t,(function(){n._ended=!0,o.end(null,null,r)})),this._ending=!0}else this._ended=this._ending=!0,this._currentRequest.end(null,null,r)},m.prototype.setHeader=function(e,t){this._options.headers[e]=t,this._currentRequest.setHeader(e,t)},m.prototype.removeHeader=function(e){delete this._options.headers[e],this._currentRequest.removeHeader(e)},m.prototype.setTimeout=function(e,t){if(t&&this.once("timeout",t),this.socket)g(this,e);else{var r=this;this._currentRequest.once("socket",(function(){g(r,e)}))}return this.once("response",y),this.once("error",y),this},["abort","flushHeaders","getHeader","setNoDelay","setSocketKeepAlive"].forEach((function(e){m.prototype[e]=function(t,r){return this._currentRequest[e](t,r)}})),["aborted","connection","socket"].forEach((function(e){Object.defineProperty(m.prototype,e,{get:function(){return this._currentRequest[e]}})})),m.prototype._sanitizeOptions=function(e){if(e.headers||(e.headers={}),e.host&&(e.hostname||(e.hostname=e.host),delete e.host),!e.pathname&&e.path){var t=e.path.indexOf("?");t<0?e.pathname=e.path:(e.pathname=e.path.substring(0,t),e.search=e.path.substring(t))}},m.prototype._performRequest=function(){var e=this._options.protocol,t=this._options.nativeProtocols[e];if(t){if(this._options.agents){var r=e.substr(0,e.length-1);this._options.agent=this._options.agents[r]}var o=this._currentRequest=t.request(this._options,this._onNativeResponse);for(var s in this._currentUrl=n.format(this._options),o._redirectable=this,p)s&&o.on(s,p[s]);if(this._isRedirect){var i=0,a=this,c=this._requestBodyBuffers;!function e(t){if(o===a._currentRequest)if(t)a.emit("error",t);else if(i<c.length){var r=c[i++];o.finished||o.write(r.data,r.encoding,e)}else a._ended&&o.end()}()}}else this.emit("error",new TypeError("Unsupported protocol "+e))},m.prototype._processResponse=function(e){var t=e.statusCode;this._options.trackRedirects&&this._redirects.push({url:this._currentUrl,headers:e.headers,statusCode:t});var r=e.headers.location;if(r&&!1!==this._options.followRedirects&&t>=300&&t<400){if(this._currentRequest.removeAllListeners(),this._currentRequest.on("error",x),this._currentRequest.abort(),e.destroy(),++this._redirectCount>this._options.maxRedirects)return void this.emit("error",new f);((301===t||302===t)&&"POST"===this._options.method||303===t&&!/^(?:GET|HEAD)$/.test(this._options.method))&&(this._options.method="GET",this._requestBodyBuffers=[],b(/^content-/i,this._options.headers));var o=b(/^host$/i,this._options.headers)||n.parse(this._currentUrl).hostname,s=n.resolve(this._currentUrl,r);u("redirecting to",s),this._isRedirect=!0;var i=n.parse(s);if(Object.assign(this._options,i),i.hostname!==o&&b(/^authorization$/i,this._options.headers),"function"==typeof this._options.beforeRedirect){var a={headers:e.headers};try{this._options.beforeRedirect.call(null,this._options,a)}catch(e){return void this.emit("error",e)}this._sanitizeOptions(this._options)}try{this._performRequest()}catch(e){var c=new h("Redirected request failed: "+e.message);c.cause=e,this.emit("error",c)}}else e.responseUrl=this._currentUrl,e.redirects=this._redirects,this.emit("response",e),this._requestBodyBuffers=[]},e.exports=v({http:s,https:i}),e.exports.wrap=v},138:(e,t,r)=>{const n=r(610),o=r(896),s=r(517),{getSingleActionsProjectId:i}=r(517);class a{constructor(e){this.apiKey=e,this._apiClient=n({Authorization:"Apikey "+e})}async _getSingleActionsProjectId(){return this._singleActionsProjectId=await s.getSingleActionsProjectId(this._apiClient),this._singleActionsProjectId}async getLoggedUserData(){try{return await this._apiClient.get("me")}catch(e){console.error(e)}}async getTasks(e){try{return await o.getTasks(this._apiClient,{projectId:e})}catch(e){console.error(e)}}async addTask(e,t){try{t||this._singleActionsProjectId||await this._getSingleActionsProjectId(),await tasks.addTask(this._apiClient,{taskName:e,projectId:t||this._singleActionsProjectId})}catch(e){console.error(e)}}async getAllProjects(){try{return await s.getAllProjects(this._apiClient)}catch(e){console.error(e)}}}e.exports=a;const c=new a("7GbRyUeDVshRJhe7_G7J4LqtwRSwq_5mnaTDldyEjnp1oQZNaPukdPQD5fhXsTGTN_dAZoppXhhQHbvTe");(async()=>{const e=await c._getSingleActionsProjectId(),t=await c.getTasks(e);console.log(t[0])})()},517:(e,t)=>{const r=async e=>{try{const{data:t}=await e.get("sync",{collection_name:"projects"});return t.changes.projects.updated}catch(e){console.error(e)}};e.exports={getAllProjects:r,getSingleActionsProjectId:async e=>(await r(e)).find((e=>e.is_single_actions)).id}},896:(e,t,r)=>{const n=r(686);e.exports={getTasks:async(e,{projectId:t})=>{try{const{data:{changes:{tasks:{updated:r}}}}=await e.get("sync",{collection_name:"tasks"});return t?r.filter((e=>e.project_id===t)):r}catch(e){console.error(e)}},addTask:async(e,{taskName:t,projectId:r})=>{try{await e.post("sync",{tasks:{created:[{id:n(),name:t,is_all_day:!0,project_id:r,review_reason:"newly_added",responsible_id:"author"}],updated:[],deleted:[]}})}catch(e){console.error(e)}}}},610:(e,t,r)=>{const n=r(206);e.exports=e=>n.create({baseURL:"https://api4.nozbe.com/v1/",headers:{"API-Version":"99",...e}})},686:(e,t)=>{const r="0123456789abcdefghijklmnopqrstuvwxyz",n=r.length;e.exports=()=>{let e="";for(let t=0;t<8;t+=1){const t=Math.floor(Math.random()*n*n);e+=r[Math.floor(t/n)],e+=r[t%n]}return e}},357:e=>{"use strict";e.exports=require("assert")},605:e=>{"use strict";e.exports=require("http")},211:e=>{"use strict";e.exports=require("https")},413:e=>{"use strict";e.exports=require("stream")},835:e=>{"use strict";e.exports=require("url")},761:e=>{"use strict";e.exports=require("zlib")}},t={},function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}(138);var e,t}));