(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{9687:function(e,r,t){Promise.resolve().then(t.bind(t,3866))},3866:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return y}});var n=t(7437),u=t(3649),c=t.n(u);t(3385);var s=t(3046),a=t(3135),i=t(329),l=t(7820),d=t(8829);let o=(0,a.xC)({reducer:{general:l.Hr.reducer,[d.BG.reducerPath]:d.BG.reducer},middleware:e=>e().concat(d.BG.middleware)});(0,i.sj)(o.dispatch);var f=t(7272);function y(e){let{children:r}=e;return(0,n.jsx)("html",{lang:"en",children:(0,n.jsx)("body",{className:c().className,children:(0,n.jsx)(s.zt,{store:o,children:(0,n.jsx)(f.w,{children:r})})})})}},8829:function(e,r,t){"use strict";t.d(r,{BG:function(){return c},wn:function(){return a}});var n=t(5687),u=t(329);let c=(0,n.LC)({reducerPath:"userApi",baseQuery:(0,u.ni)({baseUrl:"https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/beats?key=AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw"}),endpoints:e=>({getBeats:e.query({query:()=>"beats"}),getMusicById:e.query({query:e=>{let{id:r}=e;return"users/".concat(r)}}),getInitialBeats:e.query({query:()=>"beats"})})}),{useGetBeatsQuery:s,useGetInitialBeatsQuery:a}=c;c.reducer},7820:function(e,r,t){"use strict";t.d(r,{H$:function(){return c},Hr:function(){return n},UI:function(){return u},gH:function(){return s}});let n=(0,t(3135).oM)({name:"general",initialState:{allMusic:[],musicPlay:{}},reducers:{addMusic:(e,r)=>{e.allMusic=r.payload},removeMusic:e=>{e.musicPlay={}},playMusic:(e,r)=>{let t=e.allMusic.find(e=>e.id==r.payload);e.musicPlay=t||{}}}}),{addMusic:u,playMusic:c,removeMusic:s}=n.actions;n.reducer},3385:function(){}},function(e){e.O(0,[59,967,374,971,938,744],function(){return e(e.s=9687)}),_N_E=e.O()}]);