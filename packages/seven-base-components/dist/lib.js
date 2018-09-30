!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("PropTypes"),require("Editable"),require("React")):"function"==typeof define&&define.amd?define(["PropTypes","Editable","React"],t):"object"==typeof exports?exports.Editable_SevenBaseComponents=t(require("PropTypes"),require("Editable"),require("React")):e.Editable_SevenBaseComponents=t(e.PropTypes,e.Editable,e.React)}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){(function(t){var n=1/0,r="[object Symbol]",o="object"==typeof t&&t&&t.Object===Object&&t,i="object"==typeof self&&self&&self.Object===Object&&self,a=o||i||Function("return this")(),u=0,c=Object.prototype.toString,l=a.Symbol,s=l?l.prototype:void 0,p=s?s.toString:void 0;function f(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&c.call(e)==r}(e))return p?p.call(e):"";var t=e+"";return"0"==t&&1/e==-n?"-0":t}e.exports=function(e){var t=++u;return function(e){return null==e?"":f(e)}(e)+t}}).call(this,n(5))},function(e,t,n){e.exports=n(6)},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n.n(r),i=n(0),a=n.n(i),u=n(3),c=n.n(u),l=n(1);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(){var e=j(["\n    border-radius: 50%;\n    width: 1em;\n    height: 1em;\n    border: 0.25em solid rgba(0, 0, 0, 0.1);\n    border-top: 0.25em solid #0074bd;\n    transform-origin: center;\n    animation: "," 0.8s infinite linear;\n    will-change: transform;\n  "]);return d=function(){return e},e}function v(){var e=j(["\n  100% {\n    transform: rotate(360deg);\n  }\n"]);return v=function(){return e},e}function j(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var O=Object(l.keyframes)(v()),h={spinner:Object(l.css)(d(),O)},g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,b(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,r["PureComponent"]),function(e,t,n){t&&p(e.prototype,t),n&&p(e,n)}(t,[{key:"render",value:function(){var e=this.props.className;return o.a.createElement("div",{"aria-label":"Loading",className:Object(l.cx)(h.spinner,"editable--spinner",e)})}}]),t}();function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(){var e=T(["\n    position: absolute;\n    right: 0.5em;\n    top: 0;\n    bottom: 0;\n    display: flex;\n    align-items: center;\n    font-size: 0.75em;\n  "]);return C=function(){return e},e}function E(){var e=T(["\n    position: relative;\n  "]);return E=function(){return e},e}function T(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}y(g,"propTypes",{className:a.a.string}),y(g,"defaultProps",{className:""});var q={inputWrapper:Object(l.css)(E()),spinnerWrapper:Object(l.css)(C())},R=function(e){function t(e){var n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=x(this,N(t).call(this,e));var r=e.name;return n.name=r||c()("input_"),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,r["PureComponent"]),function(e,t,n){t&&P(e.prototype,t),n&&P(e,n)}(t,[{key:"render",value:function(){var e=this.props,t=e.value,n=e.type,r=e.onChange,i=e.placeholder,a=e.label,u=e.propPath,c=e.className,s=e.labelClassName,p=e.inputClassName,f=e.inputWrapperClassName,b=e.spinnerClassName,m=e.disabled,y=e.loading;return o.a.createElement("div",{className:Object(l.cx)("form-item","editable--form-item","editable--form-item--input",c)},a&&o.a.createElement("label",{className:Object(l.cx)("editable--label",s),htmlFor:this.name},a),o.a.createElement("div",{className:Object(l.cx)("editable--input-wrapper",q.inputWrapper,f)},o.a.createElement("input",{className:Object(l.cx)("form-text","editable--form-text","editable--form-text--input",p),type:n,value:t,"data-prop-path":u,placeholder:i,onChange:r,id:this.name,disabled:m}),y&&o.a.createElement("div",{className:q.spinnerWrapper},o.a.createElement(g,{className:Object(l.cx)("editable--spinner--input",b)}))))}}]),t}();S(R,"propTypes",{value:a.a.string,type:a.a.oneOf(["text","email","password","number","date"]),onChange:a.a.func.isRequired,placeholder:a.a.string,label:a.a.string,propPath:a.a.string,name:a.a.string,className:a.a.string,labelClassName:a.a.string,inputClassName:a.a.string,inputWrapperClassName:a.a.string,spinnerClassName:a.a.string,loading:a.a.bool,disabled:a.a.bool}),S(R,"defaultProps",{value:"",type:"text",placeholder:"",label:null,propPath:null,name:null,className:"",labelClassName:"",inputClassName:"",inputWrapperClassName:"",spinnerClassName:"",loading:!1,disabled:!1}),n.d(t,"Input",function(){return R}),n.d(t,"Spinner",function(){return g})}])});
//# sourceMappingURL=lib.js.map