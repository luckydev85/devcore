(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"5c27":function(e,a,t){"use strict";t("74f2")},"74f2":function(e,a,t){},"8b48":function(e,a,t){"use strict";t.r(a);t("498a");var r=function(){var e=this,a=e._self._c;return a("external-layout",{staticClass:"pg-login"},[e.loaded?a("div",{staticClass:"form-container animated zoomIn fast"},[e.showRegister?e._e():a("div",{staticClass:"login-form card bg-light shadow-lg rounded-0 border-0"},[a("div",{staticClass:"card-body",staticStyle:{display:"flex","flex-direction":"column","place-content":"center"}},[a("h1",{staticClass:"h3 text-shadow text-center"},[e._v(e._s(e.$t("Login")))]),a("hr"),a("b-form",{staticClass:"floating-labels",on:{submit:function(a){return a.preventDefault(),e.onSubmit.apply(null,arguments)}}},[e.form.hasErrors?a("b-alert",{staticClass:"text-sm",attrs:{variant:"danger",dismissible:"",show:""}},[a("i",{staticClass:"mdi mdi-close-octagon"}),e._v(" "+e._s(e.form.errors.message)+" ")]):e._e(),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{id:"username",type:"text",disabled:e.form.busy,placeholder:e.$t("Username"),state:e.$validateState("username",e.form),autocomplete:"new-username",name:"username",autofocus:""},model:{value:e.form.username,callback:function(a){e.$set(e.form,"username","string"===typeof a?a.trim():a)},expression:"form.username"}}),a("label",{attrs:{for:"username"}},[a("i",{staticClass:"mdi mdi-account"}),e._v(" "+e._s(e.$t("Username"))+" ")]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("username",e.form)))])],1),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"}],attrs:{id:"password",state:e.$validateState("password",e.form),disabled:e.form.busy,placeholder:e.$t("Password"),type:"password",name:"password",autocomplete:"new-password"},model:{value:e.form.password,callback:function(a){e.$set(e.form,"password",a)},expression:"form.password"}}),a("label",{attrs:{for:"password"}},[a("i",{staticClass:"mdi mdi-lock-question"}),e._v(" "+e._s(e.$t("Password"))+" ")]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("password",e.form)))])],1),a("b-form-checkbox",{attrs:{name:"remember"},model:{value:e.form.remember,callback:function(a){e.$set(e.form,"remember",a)},expression:"form.remember"}},[a("span",{staticClass:"text-gray"},[e._v(e._s(e.$t("Remember me")))])]),a("div",{staticClass:"mb-3"},[a("hr"),a("loading-button",{style:{cursor:e.form.username||e.form.password?"pointer":"not-allowed"},attrs:{type:"submit",size:"lg",disabled:e.form.busy||e.vErrors.any()||!e.form.username&&!e.form.password,loading:e.form.busy,block:!0,variant:"primary"}},[e._v(e._s(e.$t("Login")))])],1)],1),e.shareLink?a("div",{staticClass:"text-center"},[e._v(" New to Devcore? "),a("a",{staticStyle:{cursor:"pointer","text-decoration":"underline"},on:{click:e.toggleRegister}},[e._v("Register")])]):e._e()],1)]),e.showRegister&&e.shareLink?a("div",{staticClass:"login-form card bg-light shadow-lg rounded-0 border-0"},[a("register-form",{attrs:{callback:e.toggleRegister}})],1):e._e(),a("div",{staticClass:"text-center"},[a("router-link",{staticClass:"text-sm",attrs:{to:{name:"forgot-password"}}},[e._v(e._s(e.$t("Forgot password?")))])],1),a("div",{staticClass:"text-center"},[a("a",{staticClass:"link title text-sm",attrs:{target:"_blank",href:"/privacy/privacypolicy.pdf"}},[e._v(" "+e._s(e.$t("Privacy Policy")))])]),a("div",{staticClass:"text-center"},[a("a",{staticClass:"link title text-sm",attrs:{target:"_blank",href:"/privacy/eula.pdf"}},[e._v(e._s(e.$t("EULA")))])])]):e._e()])},s=[],o=t("c7eb"),i=t("1da1"),n=t("5530"),l=(t("ac1f"),t("5319"),t("b0c0"),t("14d9"),t("2f62")),d=t("9fee"),m=t("b279"),c=function(){var e=this,a=e._self._c;return a("div",{staticClass:"card-body",staticStyle:{display:"flex","flex-direction":"column","place-content":"center"}},[a("h1",{staticClass:"h3 text-shadow text-center"},[e._v(e._s(e.$t("Register to join the Project")))]),a("hr"),a("b-form",{staticClass:"floating-labels",on:{submit:function(a){return a.preventDefault(),e.save.apply(null,arguments)}}},[e.form.hasErrors?a("b-alert",{staticClass:"text-sm",attrs:{variant:"danger",dismissible:"",show:""}},[a("i",{staticClass:"mdi mdi-close-octagon"}),e._v(" "+e._s(e.form.errors.message)+" ")]):e._e(),a("b-row",[a("b-col",{staticClass:"col-12 col-lg-6"},[a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{id:"firstName",disabled:e.form.busy,placeholder:e.$t("First name"),type:"text",name:"firstName",state:e.$validateState("firstName",e.form),autofocus:""},model:{value:e.form.firstName,callback:function(a){e.$set(e.form,"firstName","string"===typeof a?a.trim():a)},expression:"form.firstName"}}),a("label",{attrs:{for:"firstName"}},[e._v(e._s(e.$t("First name")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("firstName",e.form)))])],1)]),a("b-col",{staticClass:"col-12 col-lg-6"},[a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{id:"lastName",disabled:e.form.busy,placeholder:e.$t("Last name"),type:"text",name:"lastName",state:e.$validateState("lastName",e.form)},model:{value:e.form.lastName,callback:function(a){e.$set(e.form,"lastName",a)},expression:"form.lastName"}}),a("label",{attrs:{for:"lastName"}},[e._v(e._s(e.$t("Last name")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("lastName",e.form)))])],1)])],1),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{id:"email",disabled:e.form.busy,placeholder:e.$t("Email"),type:"email",name:"email",state:e.$validateState("email",e.form)},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}}),a("label",{attrs:{for:"email"}},[e._v(e._s(e.$t("Email")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("email",e.form)))])],1),a("div",{staticClass:"form-label-group select required role_wrapper"},[a("v-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":!1===e.$validateState("companyRole",e.form),"is-valid":!0===e.$validateState("companyRole",e.form)},attrs:{label:"name","data-vv-name":"companyRole",placeholder:e.$t("Role"),options:e.getAvailableRoles,reduce:function(e){return e.id}},model:{value:e.form.companyRoleId,callback:function(a){e.$set(e.form,"companyRoleId",a)},expression:"form.companyRoleId"}}),a("label",{attrs:{for:"companyRole"}},[e._v(e._s(e.$t("Role")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("companyRole",e.form)))])],1),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"phone_validation",expression:"'phone_validation'"}],attrs:{id:"phone",disabled:e.form.busy,placeholder:e.$t("Mobile No."),type:"text",name:"phone",state:e.$validateState("phone",e.form)},model:{value:e.form.phone,callback:function(a){e.$set(e.form,"phone",a)},expression:"form.phone"}}),a("label",{attrs:{for:"phone"}},[e._v(e._s(e.$t("Mobile No.")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("phone",e.form)))])],1),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:6",expression:"'required|min:6'"}],ref:"password",attrs:{id:"password",disabled:e.form.busy,placeholder:e.$t("Password"),type:"password",name:"password",state:e.$validateState("password",e.form)},model:{value:e.form.password,callback:function(a){e.$set(e.form,"password",a)},expression:"form.password"}}),a("label",{attrs:{for:"password"}},[e._v(e._s(e.$t("Password")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("password",e.form)))])],1),a("div",{staticClass:"form-label-group required"},[a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|confirmed:password",expression:"\n                    `required|confirmed:password`\n                  "}],ref:"passwordConfirmation",attrs:{id:"passwordConfirmation",disabled:e.form.busy,placeholder:e.$t("Confirm Password"),type:"password",name:"passwordConfirmation",state:e.$validateState("passwordConfirmation",e.form)},model:{value:e.passwordConfirmation,callback:function(a){e.passwordConfirmation=a},expression:"passwordConfirmation"}}),a("label",{attrs:{for:"passwordConfirmation"}},[e._v(e._s(e.$t("Confirm Password")))]),a("b-form-invalid-feedback",[e._v(e._s(e.$displayError("passwordConfirmation",e.form)))])],1),a("div",{staticClass:"mb-3"},[a("hr"),a("loading-button",{attrs:{type:"submit",size:"lg",disabled:e.form.busy||e.vErrors.any(),loading:e.form.busy,block:!0,variant:"primary"}},[e._v(" "+e._s(e.$t("Register"))+" ")])],1)],1),a("div",{staticClass:"text-center"},[e._v(" Already have an account? "),a("a",{staticStyle:{cursor:"pointer","text-decoration":"underline"},on:{click:e.showLogin}},[e._v("Login")])])],1)},u=[],p=(t("4de4"),t("d3b7"),t("caad"),t("2532"),{props:{callback:null},data:function(){return{form:new d["a"]({firstName:null,lastName:null,email:null,phone:null,password:null,companyRoleId:null,companyId:null,projectId:null}),passwordConfirmation:""}},computed:Object(n["a"])(Object(n["a"])({},Object(l["b"])({shareLink:"app/shared",user:"auth/user",companyRoles:"companyRole/all"})),{},{getAvailableRoles:{get:function(){var e;console.log(this.shareLink);var a=null!==(e=this.shareLink.companyRoleIds)&&void 0!==e?e:[];return this.companyRoles.filter((function(e){return a.includes(e.id)}))}}}),mounted:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function a(){return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$store.dispatch("companyRole/findAll");case 2:e.form.companyId=e.shareLink.companyId,e.form.projectId=e.shareLink.projectId;case 4:case"end":return a.stop()}}),a)})))()},methods:{initForm:function(){this.form=new d["a"]({firstName:null,lastName:null,email:null,phone:null,password:""})},showLogin:function(){this.callback()},save:function(){var e=Object(i["a"])(Object(o["a"])().mark((function e(){var a,t;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$validator.validateAll();case 2:if(this.vErrors.any()){e.next=32;break}return e.next=5,this.$validator.reset();case 5:return e.next=7,this.$store.dispatch("user/register",this.form);case 7:return a=new d["a"]({username:this.form.email,password:this.form.password,remember:!1}),e.prev=8,e.next=11,this.$store.dispatch("auth/login",a);case 11:if(Object(m["a"])(),this.$store.dispatch("app/load"),this.$store.dispatch("app/asyncLoad"),t="/",!this.user||!this.user.can("core/company/manage")){e.next=18;break}return e.next=18,this.$router.replace("/manage/companies");case 18:return e.next=20,this.$router.replace(this.$store.getters["app/intented_route"]||t);case 20:e.next=27;break;case 22:if(e.prev=22,e.t0=e["catch"](8),!e.t0.code||"MUST_VERIFY_EMAIL"!==e.t0.code){e.next=27;break}return e.next=27,this.$router.push({name:"send-email-verification",query:{email:this.form.username}});case 27:return e.prev=27,Object(m["j"])(),e.finish(27);case 30:this.$emit("input",this.input),this.$emit("done");case 32:case"end":return e.stop()}}),e,this,[[8,22,27,30]])})));function a(){return e.apply(this,arguments)}return a}()}}),f=p,v=(t("5c27"),t("2877")),b=Object(v["a"])(f,c,u,!1,null,null,null),h=b.exports,w={data:function(){return{form:new d["a"]({username:"",password:"",remember:!1}),showRegister:!1}},components:{"register-form":h},computed:Object(n["a"])({},Object(l["b"])({loaded:"app/loaded",user:"auth/user",session:"auth/access_token",shareLink:"app/shared"})),methods:{onSubmit:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function a(){var t;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$store.dispatch("auth/login",e.form);case 3:if(Object(m["a"])(),e.$store.dispatch("app/load"),e.$store.dispatch("app/asyncLoad"),t="/",!e.user||!e.user.can("core/company/manage")){a.next=10;break}return a.next=10,e.$router.replace("/manage/companies");case 10:return e.user&&"User"===e.user.roles[0].name&&window.location.replace("https://devcore.app/mobile/home"),a.next=13,e.$router.replace(e.$store.getters["app/intented_route"]||t);case 13:a.next=20;break;case 15:if(a.prev=15,a.t0=a["catch"](0),!a.t0.code||"MUST_VERIFY_EMAIL"!==a.t0.code){a.next=20;break}return a.next=20,e.$router.push({name:"send-email-verification",query:{email:e.form.username}});case 20:return a.prev=20,Object(m["j"])(),a.finish(20);case 23:case"end":return a.stop()}}),a,null,[[0,15,20,23]])})))()},toggleRegister:function(){this.showRegister=!this.showRegister}}},y=w,_=Object(v["a"])(y,r,s,!1,null,null,null);a["default"]=_.exports}}]);