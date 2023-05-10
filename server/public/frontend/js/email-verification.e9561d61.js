(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["email-verification"],{"154d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("external-layout",{staticClass:"pg-login"},[e.loaded?t("div",{staticClass:"form-container animated zoomIn fast"},[t("div",{staticClass:"login-form card bg-light shadow-lg rounded-0 border-0"},[t("div",{staticClass:"card-header bg-dark rounded-0"},[t("img",{attrs:{src:a("1ae4")}})]),t("div",{staticClass:"card-body"},[t("h1",{staticClass:"h3 text-shadow text-center"},[e._v(e._s(e.$t("Account verification")))]),t("hr"),e.sent||e.haveCode?t("div",[t("p",{staticClass:"alert alert-success"},[t("i",{staticClass:"mdi mdi-check"}),e._v(" "+e._s(e.$t("Please check your email inbox, we just sent you an email with a PIN to validate your account."))+" ")]),t("div",[t("b-form",{staticClass:"floating-labels",on:{submit:function(t){return t.preventDefault(),e.verify.apply(null,arguments)}}},[e.form.hasErrors?t("b-alert",{staticClass:"text-sm",attrs:{variant:"danger",dismissible:"",show:""}},[t("i",{staticClass:"mdi mdi-close-octagon"}),e._v(" "+e._s(e.form.errors.message)+" ")]):e._e(),t("div",{staticClass:"form-label-group required"},[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|length:6",expression:"'required|length:6'"}],attrs:{id:"code",type:"text",disabled:e.form.busy,placeholder:e.$t("Received code"),state:e.$validateState("code",e.form),autocomplete:"new-code",name:"code",autofocus:""},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}}),t("label",{attrs:{for:"code"}},[t("i",{staticClass:"mdi mdi-dialpad"}),e._v(" "+e._s(e.$t("Received code"))+" ")]),t("b-form-invalid-feedback",[e._v(e._s(e.$displayError("code",e.form)))])],1),e.showResend?t("p",{staticClass:"text-center"},[t("small",[e._v(" "+e._s(e.$t("Didn't get the email?"))+" "),t("a",{attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.resend.apply(null,arguments)}}},[e._v(e._s(e.$t("Try Again")))])])]):e._e(),t("div",{staticClass:"mb-3"},[t("hr"),t("loading-button",{attrs:{type:"submit",size:"lg",disabled:e.form.busy||e.vErrors.any(),loading:e.form.busy,block:!0,variant:"primary"}},[e._v(e._s(e.$t("Verify my account")))])],1)],1)],1)]):t("div",[t("p",[t("small",[e._v(e._s(e.$t("Please provide your email address, we'll send you an email with instructions to verify your account.")))])]),t("b-form",{staticClass:"floating-labels",on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[e.form.hasErrors?t("b-alert",{staticClass:"text-sm",attrs:{variant:"danger",dismissible:"",show:""}},[t("i",{staticClass:"mdi mdi-close-octagon"}),e._v(" "+e._s(e.form.errors.message)+" ")]):e._e(),t("div",{staticClass:"form-label-group required"},[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{id:"username",type:"text",disabled:e.form.busy,placeholder:e.$t("Username"),state:e.$validateState("username",e.form),autocomplete:"new-username",name:"username",autofocus:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}}),t("label",{attrs:{for:"username"}},[t("i",{staticClass:"mdi mdi-account"}),e._v(" "+e._s(e.$t("Username"))+" ")]),t("b-form-invalid-feedback",[e._v(e._s(e.$displayError("username",e.form)))])],1),t("div",{staticClass:"mb-3"},[t("hr"),t("loading-button",{attrs:{type:"submit",size:"lg",disabled:e.form.busy||e.vErrors.any(),loading:e.form.busy,block:!0,variant:"primary"}},[e._v(e._s(e.$t("Send verification instructions")))])],1)],1)],1)])]),t("div",{staticClass:"text-center"},[t("router-link",{staticClass:"text-sm",attrs:{to:{name:"login"}}},[e._v(e._s(e.$t("Already verified?")))])],1)]):e._e()])},s=[],n=a("c7eb"),i=a("1da1"),o=a("5530"),c=(a("14d9"),a("ac1f"),a("5319"),a("2f62")),l=a("9fee"),d={data:function(){return{form:new l["a"]({username:"",code:null}),sent:!1,showResend:!1,haveCode:!1}},computed:Object(o["a"])({},Object(c["b"])({loaded:"app/loaded"})),mounted:function(){this.form.fields.username=this.$route.query.email},methods:{onSubmit:function(){var e=this;return Object(i["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$validator.validateAll();case 3:if(!e.vErrors.any()){t.next=5;break}return t.abrupt("return");case 5:return e.$validator.reset(),e.form.fields.code=null,e.showResend=!1,t.next=10,e.$store.dispatch("auth/sendVerificationEmail",e.form);case 10:e.sent=!0,setTimeout((function(){e.showResend=!0}),3e4),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),"USER_ALREADY_VERIFIED"===t.t0.code&&e.$router.push({name:"login"}),console.log(t.t0);case 18:return t.prev=18,t.finish(18);case 20:case"end":return t.stop()}}),t,null,[[0,14,18,20]])})))()},verify:function(){var e=this;return Object(i["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$validator.validateAll();case 3:if(!e.vErrors.any()){t.next=5;break}return t.abrupt("return");case 5:return e.$validator.reset(),t.next=8,e.$store.dispatch("auth/verifyAccount",e.form);case 8:return t.next=10,e.$router.replace("/");case 10:t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](0),"TOKEN_EXPIRED"===t.t0.code&&e.resend(),"USER_ALREADY_VERIFIED"===t.t0.code&&e.$router.push({name:"login"});case 16:return t.prev=16,t.finish(16);case 18:case"end":return t.stop()}}),t,null,[[0,12,16,18]])})))()},resend:function(){this.$validator.reset(),this.sent=!1}}},u=d,m=a("2877"),f=Object(m["a"])(u,r,s,!1,null,null,null);t["default"]=f.exports},"2fb7":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("external-layout",{staticClass:"pg-login"},[e.loaded?t("div",{staticClass:"form-container animated zoomIn fast"},[t("div",{staticClass:"login-form card bg-light shadow-lg rounded-0 border-0"},[t("div",{staticClass:"card-header bg-dark rounded-0"},[t("img",{attrs:{src:a("1ae4")}})]),t("div",{staticClass:"card-body text-center d-flex justify-content-center flex-column"},[t("div",{staticClass:"text-center"},[t("b-spinner",{attrs:{variant:"primary",label:"Spinning"}})],1),t("p",[e._v(e._s(e.$t("Validating your account...")))])])])]):e._e()])},s=[],n=a("c7eb"),i=a("1da1"),o=a("5530"),c=(a("ac1f"),a("5319"),a("2f62")),l=a("9fee"),d={data:function(){return{form:new l["a"]({username:"",code:"",remember:!1})}},computed:Object(o["a"])({},Object(c["b"])({loaded:"app/loaded"})),mounted:function(){var e=this;return Object(i["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$route.query){t.next=6;break}return e.form.fields={username:e.$route.query.username,code:e.$route.query.code},t.next=4,e.send();case 4:t.next=8;break;case 6:return t.next=8,e.$router.replace("/");case 8:case"end":return t.stop()}}),t)})))()},methods:{send:function(){var e=this;return Object(i["a"])(Object(n["a"])().mark((function t(){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("auth/verifyAccount",e.form);case 3:return t.next=5,e.$router.replace("/");case 5:t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](0),"TOKEN_EXPIRED"===t.t0.code&&e.resend(),"USER_ALREADY_VERIFIED"===t.t0.code?e.$router.replace({name:"login"}):e.$router.replace({name:"send-email-verification"});case 11:return t.prev=11,e.$validator.reset(),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[0,7,11,14]])})))()}}},u=d,m=a("2877"),f=Object(m["a"])(u,r,s,!1,null,null,null);t["default"]=f.exports}}]);