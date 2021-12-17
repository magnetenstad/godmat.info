import{r as te}from"./singletons-12a22614.js";import{L as ne,M as ie,N as se,O as ae,P as W,Q as oe,R as re,T as le,U as ce,V as fe,W as de,S as ue,i as ge,s as _e,e as P,c as k,a as E,d as c,b as he,f as g,I as G,A as pe,t as b,g as y,H as I,h as q,J as me,k as z,l as X,n as H,K as be}from"./vendor-cc068a2e.js";const ye=te,Be=Ie;async function Ie(a,e){return ye.goto(a,e,[])}const ve={apiKey:"AIzaSyD9a_e4lH7FTnSoorBzFzVDl4CQgSLynmU",authDomain:"nam-data.firebaseapp.com",databaseURL:"https://nam-data-default-rtdb.europe-west1.firebasedatabase.app",projectId:"nam-data",storageBucket:"nam-data.appspot.com",messagingSenderId:"119525438884",appId:"1:119525438884:web:b8bcbe8fe0a83484a4bd31",measurementId:"G-Z5XCC9X469"};ne().length?ie():se(ve);const V=ae();var K;(function(a){async function e(n){const i=W(V,"foodRegister",n.getId());await oe(i,Object.assign(new Object,n)),console.log(`[DB] Wrote ${n.name}`)}a.register=e;async function s(n){const i=W(V,"foodRegister",n),r=await re(i);if(r.exists()){const h=Object.assign(new F,r.data());return console.log(`[DB] Read ${h.name}`),h}else console.log(`[DB] Could not read ${n}!`)}a.get=s;async function o(){const n=le(ce(V,"foodRegister")),i=await fe(n),r=[];return i.forEach(h=>{r.push(Object.assign(new F,h.data()))}),console.log("[DB] Read all!"),r}a.getAll=o})(K||(K={}));var Z;(function(a){a[a.Undefined=0]="Undefined",a[a.Meat=1]="Meat",a[a.Bread=2]="Bread",a[a.Dairy=3]="Dairy"})(Z||(Z={}));class F{constructor(e="Untitled Food",s=0,o=0,n="Empty description."){this._ingredients=[],this.name=e,this.description=n,this._category=s,this._basePrice=o,this._id=this.generateId()}getName(){return this.name}getId(){return this._id}getCategory(){return this._category}getDescription(){return this.description}setName(e){this.name=e}generateId(){return de()}async addIngredient(e){await e.hasIngredient(this)&&console.error("Cyclic ingredients are not allowed!"),this._ingredients.push(e.getId()),console.log(`Added ${e.name} to ${this.name} ingredients: ${this._ingredients}`)}async getIngredients(){let e=[];for(let s of this._ingredients)e.push(await K.get(s));return console.log(`Got ingredients ${JSON.stringify(e)} of ${this.name}`),e}getIngredientIds(){return console.log(`Got ingredient ids ${JSON.stringify(this._ingredients)} of ${this.name}`),[...this._ingredients]}async hasIngredient(e){for(let s of await this.getIngredients())if(s.getId()===e.getId())return console.log(`${this.name} has ingredient ${e.name}`),!0;return console.log(`${this.name} does not have ingredient ${e.name}`),!1}setBasePrice(e){this._basePrice=e}getBasePrice(){return this._basePrice}async getPrice(){let e=this._basePrice;return(await this.getIngredients()).forEach(async s=>{e+=await s.getPrice()}),console.log(`${this.name} has price ${e}`),e}}function Y(a,e,s){const o=a.slice();return o[7]=e[s],o}function we(a){let e,s;return{c(){e=P("h2"),s=b("Undefined food!")},l(o){e=k(o,"H2",{});var n=E(e);s=y(n,"Undefined food!"),n.forEach(c)},m(o,n){g(o,e,n),I(e,s)},p:G,d(o){o&&c(e)}}}function De(a){let e,s=a[0].getName()+"",o,n,i,r,h=a[0].getId()+"",U,S,_,T,v=a[0].getCategory()+"",D,O,p,N,A,j,w,m,B,C,R,M=a[2],d=[];for(let t=0;t<M.length;t+=1)d[t]=x(Y(a,M,t));let u=a[1]&&ee(a);return{c(){e=P("h2"),o=b(s),n=z(),i=P("p"),r=b("Id: "),U=b(h),S=z(),_=P("p"),T=b("Category: "),D=b(v),O=z(),p=P("p"),N=b("Price: "),A=b(a[3]),j=z(),w=P("p"),m=b("Ingredients:"),B=z();for(let t=0;t<d.length;t+=1)d[t].c();C=z(),u&&u.c(),R=X()},l(t){e=k(t,"H2",{});var l=E(e);o=y(l,s),l.forEach(c),n=H(t),i=k(t,"P",{});var f=E(i);r=y(f,"Id: "),U=y(f,h),f.forEach(c),S=H(t),_=k(t,"P",{});var $=E(_);T=y($,"Category: "),D=y($,v),$.forEach(c),O=H(t),p=k(t,"P",{});var J=E(p);N=y(J,"Price: "),A=y(J,a[3]),J.forEach(c),j=H(t),w=k(t,"P",{});var Q=E(w);m=y(Q,"Ingredients:"),Q.forEach(c),B=H(t);for(let L=0;L<d.length;L+=1)d[L].l(t);C=H(t),u&&u.l(t),R=X()},m(t,l){g(t,e,l),I(e,o),g(t,n,l),g(t,i,l),I(i,r),I(i,U),g(t,S,l),g(t,_,l),I(_,T),I(_,D),g(t,O,l),g(t,p,l),I(p,N),I(p,A),g(t,j,l),g(t,w,l),I(w,m),g(t,B,l);for(let f=0;f<d.length;f+=1)d[f].m(t,l);g(t,C,l),u&&u.m(t,l),g(t,R,l)},p(t,l){if(l&1&&s!==(s=t[0].getName()+"")&&q(o,s),l&1&&h!==(h=t[0].getId()+"")&&q(U,h),l&1&&v!==(v=t[0].getCategory()+"")&&q(D,v),l&8&&q(A,t[3]),l&4){M=t[2];let f;for(f=0;f<M.length;f+=1){const $=Y(t,M,f);d[f]?d[f].p($,l):(d[f]=x($),d[f].c(),d[f].m(C.parentNode,C))}for(;f<d.length;f+=1)d[f].d(1);d.length=M.length}t[1]?u?u.p(t,l):(u=ee(t),u.c(),u.m(R.parentNode,R)):u&&(u.d(1),u=null)},d(t){t&&c(e),t&&c(n),t&&c(i),t&&c(S),t&&c(_),t&&c(O),t&&c(p),t&&c(j),t&&c(w),t&&c(B),be(d,t),t&&c(C),u&&u.d(t),t&&c(R)}}}function x(a){let e,s=a[7].getName()+"",o;return{c(){e=P("p"),o=b(s)},l(n){e=k(n,"P",{});var i=E(e);o=y(i,s),i.forEach(c)},m(n,i){g(n,e,i),I(e,o)},p(n,i){i&4&&s!==(s=n[7].getName()+"")&&q(o,s)},d(n){n&&c(e)}}}function ee(a){let e,s,o,n;return{c(){e=P("button"),s=b("Delete")},l(i){e=k(i,"BUTTON",{});var r=E(e);s=y(r,"Delete"),r.forEach(c)},m(i,r){g(i,e,r),I(e,s),o||(n=me(e,"click",a[4]),o=!0)},p:G,d(i){i&&c(e),o=!1,n()}}}function Pe(a){let e;function s(i,r){return i[0]?De:we}let o=s(a),n=o(a);return{c(){e=P("div"),n.c(),this.h()},l(i){e=k(i,"DIV",{class:!0});var r=E(e);n.l(r),r.forEach(c),this.h()},h(){he(e,"class","svelte-ddcuyy")},m(i,r){g(i,e,r),n.m(e,null)},p(i,[r]){o===(o=s(i))&&n?n.p(i,r):(n.d(1),n=o(i),n&&(n.c(),n.m(e,null)))},i:G,o:G,d(i){i&&c(e),n.d()}}}function ke(a,e,s){var o=this&&this.__awaiter||function(_,T,v,D){function O(p){return p instanceof v?p:new v(function(N){N(p)})}return new(v||(v=Promise))(function(p,N){function A(m){try{w(D.next(m))}catch(B){N(B)}}function j(m){try{w(D.throw(m))}catch(B){N(B)}}function w(m){m.done?p(m.value):O(m.value).then(A,j)}w((D=D.apply(_,T||[])).next())})};let{food:n}=e,{onDestroy:i=void 0}=e,r=[],h=0;pe(()=>o(void 0,void 0,void 0,function*(){yield U()}));function U(){return o(this,void 0,void 0,function*(){s(2,r=yield n.getIngredients()),s(3,h=yield n.getPrice())})}const S=()=>i();return a.$$set=_=>{"food"in _&&s(0,n=_.food),"onDestroy"in _&&s(1,i=_.onDestroy)},[n,i,r,h,S]}class Ue extends ue{constructor(e){super();ge(this,e,ke,Pe,_e,{food:0,onDestroy:1})}}export{Ue as F,K as a,F as b,Be as g};
