(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21eb64"],{d772:function(e,t,n){"use strict";n.r(t);var c=function(){var e=this,t=e._self._c;return t("div",[t("process-selector",{attrs:{"max-level":"phase","show-count":"ideas",section:e.section,list:{withStages:!0},detail:{withStagesFull:!0}},on:{setSection:e.setSection}})],1)},s=[],a=n("c7eb"),i=n("1da1"),r={mounted:function(){return Object(i["a"])(Object(a["a"])().mark((function e(){return Object(a["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},data:function(){return{section:"ideas"}},methods:{setSection:function(e){this.section=e},onSelectionChange:function(e,t){var n=this;return Object(i["a"])(Object(a["a"])().mark((function c(){return Object(a["a"])().wrap((function(c){while(1)switch(c.prev=c.next){case 0:if(c.prev=0,"process"!==e){c.next=4;break}return c.next=4,n.$store.dispatch("idea/findByProcess",{id:t.id});case 4:c.next=9;break;case 6:c.prev=6,c.t0=c["catch"](0),console.log(c.t0);case 9:case"end":return c.stop()}}),c,null,[[0,6]])})))()}}},o=r,u=n("2877"),l=Object(u["a"])(o,c,s,!1,null,null,null);t["default"]=l.exports}}]);