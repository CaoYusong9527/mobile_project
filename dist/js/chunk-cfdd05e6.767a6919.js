(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cfdd05e6"],{"3aaf":function(t,e,s){"use strict";s("48ac")},"48ac":function(t,e,s){},"5b57":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("van-nav-bar",{attrs:{fixed:"","left-arrow":"",title:"小智同学"},on:{"click-left":function(e){return t.$router.back()}}}),s("div",{ref:"refList",staticClass:"chat-list"},t._l(t.list,(function(e,n){return s("div",{key:n,staticClass:"chat-item",class:"xz"===e.name?"left":"right"},["xz"===e.name?[s("van-image",{attrs:{fit:"cover",round:"",src:"https://img.yzcdn.cn/vant/cat.jpeg"}}),s("div",{staticClass:"chat-pao"},[t._v(t._s(e.msg))])]:[s("div",{staticClass:"chat-pao"},[t._v(t._s(e.msg))]),s("van-image",{attrs:{fit:"cover",round:"",src:t.user.photo}})]],2)})),0),s("div",{staticClass:"reply-container van-hairline--top"},[s("van-field",{attrs:{placeholder:"说点什么..."},model:{value:t.word,callback:function(e){t.word="string"===typeof e?e.trim():e},expression:"word"}},[s("span",{staticStyle:{"font-size":"12px",color:"#999"},attrs:{slot:"button"},on:{click:function(e){return t.send()}},slot:"button"},[t._v("提交")])])],1)],1)},r=[],i=(s("96cf"),s("1da1")),a=s("c24f"),c={name:"UserChat",data:function(){return{word:"",user:{},list:[],isOpen:!1,ws:null,timeId:null}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.timeId=setInterval((function(){}),1e3),e.next=3,t.loadUserProfile();case 3:t.openWS();case 4:case"end":return e.stop()}}),e)})))()},destroyed:function(){this.ws.close(),clearInterval(this.timeId)},methods:{openWS:function(){var t=this;this.ws=new WebSocket("wss://echo.websocket.org"),this.ws.onopen=function(){t.isOpen=!0,t.list.push({name:"xz",msg:"你好, 我是小智, 我准备就绪了",timestamp:+new Date})},this.ws.onmessage=function(e){t.list.push({name:"xz",msg:"小智拍了拍你的狗头, 说:"+e.data,timestamp:+new Date}),t.$nextTick((function(){t.$refs.refList.scrollTop=t.$refs.refList.scrollHeight}))},this.ws.onclose=function(){t.isOpen=!1}},send:function(){var t=this;""!==this.word&&(this.ws.send(this.word),this.list.push({name:"me",msg:this.word,timestamp:+new Date}),this.word="",this.$nextTick((function(){t.$refs.refList.scrollTop=t.$refs.refList.scrollHeight})))},loadUserProfile:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(a["b"])();case 2:s=e.sent,t.user=s.data.data;case 5:case"end":return e.stop()}}),e)})))()}}},o=c,l=(s("3aaf"),s("2877")),u=Object(l["a"])(o,n,r,!1,null,"222bf731",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-cfdd05e6.767a6919.js.map