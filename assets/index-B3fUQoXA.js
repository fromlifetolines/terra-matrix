var hc=Object.defineProperty;var fc=(i,t,e)=>t in i?hc(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var ht=(i,t,e)=>fc(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jr="174",li={ROTATE:0,DOLLY:1,PAN:2},si={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pc=0,vo=1,mc=2,Rs=1,yc=2,cn=3,Rn=0,Ee=1,We=2,bn=0,zn=1,kn=2,Mo=3,xo=4,gc=5,Bn=100,_c=101,Sc=102,vc=103,Mc=104,xc=200,Ec=201,Tc=202,bc=203,or=204,sr=205,Ac=206,Rc=207,wc=208,Cc=209,Nc=210,Pc=211,Lc=212,Dc=213,Ic=214,cr=0,lr=1,ur=2,hi=3,dr=4,hr=5,fr=6,pr=7,ws=0,Uc=1,Fc=2,An=0,Oc=1,Bc=2,Gc=3,Cs=4,zc=5,kc=6,Hc=7,Ns=300,fi=301,pi=302,mr=303,yr=304,Ma=306,gr=1e3,ln=1001,_r=1002,Ke=1003,Vc=1004,Bi=1005,Ye=1006,wa=1007,Tn=1008,fn=1009,Ps=1010,Ls=1011,wi=1012,Zr=1013,Hn=1014,un=1015,Ni=1016,$r=1017,Jr=1018,mi=1020,Ds=35902,Is=1021,Us=1022,qe=1023,Fs=1024,Os=1025,ui=1026,yi=1027,Bs=1028,Qr=1029,Gs=1030,to=1031,eo=1033,ua=33776,da=33777,ha=33778,fa=33779,Sr=35840,vr=35841,Mr=35842,xr=35843,Er=36196,Tr=37492,br=37496,Ar=37808,Rr=37809,wr=37810,Cr=37811,Nr=37812,Pr=37813,Lr=37814,Dr=37815,Ir=37816,Ur=37817,Fr=37818,Or=37819,Br=37820,Gr=37821,pa=36492,zr=36494,kr=36495,zs=36283,Hr=36284,Vr=36285,Wr=36286,Wc=3200,Xc=3201,ks=0,Yc=1,xn="",Ue="srgb",gi="srgb-linear",ga="linear",jt="srgb",qn=7680,Eo=519,qc=512,Kc=513,jc=514,Hs=515,Zc=516,$c=517,Jc=518,Qc=519,To=35044,bo="300 es",dn=2e3,_a=2001;class Wn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const a=n[t];if(a!==void 0){const r=a.indexOf(e);r!==-1&&a.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const a=n.slice(0);for(let r=0,o=a.length;r<o;r++)a[r].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ma=Math.PI/180,Xr=180/Math.PI;function Pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function Ut(i,t,e){return Math.max(t,Math.min(e,i))}function tl(i,t){return(i%t+t)%t}function Ca(i,t,e){return(1-e)*i+e*t}function Mi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const el={DEG2RAD:ma};class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6],this.y=a[1]*e+a[4]*n+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),a=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*a+t.x,this.y=r*a+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pt{constructor(t,e,n,a,r,o,s,c,l){Pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,o,s,c,l)}set(t,e,n,a,r,o,s,c,l){const u=this.elements;return u[0]=t,u[1]=a,u[2]=s,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,o=n[0],s=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],m=n[5],y=n[8],_=a[0],p=a[3],d=a[6],T=a[1],E=a[4],M=a[7],N=a[2],A=a[5],R=a[8];return r[0]=o*_+s*T+c*N,r[3]=o*p+s*E+c*A,r[6]=o*d+s*M+c*R,r[1]=l*_+u*T+f*N,r[4]=l*p+u*E+f*A,r[7]=l*d+u*M+f*R,r[2]=h*_+m*T+y*N,r[5]=h*p+m*E+y*A,r[8]=h*d+m*M+y*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*s*l-n*r*u+n*s*c+a*r*l-a*o*c}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],f=u*o-s*l,h=s*c-u*r,m=l*r-o*c,y=e*f+n*h+a*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/y;return t[0]=f*_,t[1]=(a*l-u*n)*_,t[2]=(s*n-a*o)*_,t[3]=h*_,t[4]=(u*e-a*c)*_,t[5]=(a*r-s*e)*_,t[6]=m*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,a,r,o,s){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*s)+o+t,-a*l,a*c,-a*(-l*o+c*s)+s+e,0,0,1),this}scale(t,e){return this.premultiply(Na.makeScale(t,e)),this}rotate(t){return this.premultiply(Na.makeRotation(-t)),this}translate(t,e){return this.premultiply(Na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<9;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Na=new Pt;function Vs(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ci(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nl(){const i=Ci("canvas");return i.style.display="block",i}const Ao={};function Fn(i){i in Ao||(Ao[i]=!0,console.warn(i))}function il(i,t,e){return new Promise(function(n,a){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function al(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rl(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ro=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wo=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ol(){const i={enabled:!0,workingColorSpace:gi,spaces:{},convert:function(a,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===jt&&(a.r=hn(a.r),a.g=hn(a.g),a.b=hn(a.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(a.applyMatrix3(this.spaces[r].toXYZ),a.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(a.r=di(a.r),a.g=di(a.g),a.b=di(a.b))),a},fromWorkingColorSpace:function(a,r){return this.convert(a,this.workingColorSpace,r)},toWorkingColorSpace:function(a,r){return this.convert(a,r,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===xn?ga:this.spaces[a].transfer},getLuminanceCoefficients:function(a,r=this.workingColorSpace){return a.fromArray(this.spaces[r].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,r,o){return a.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gi]:{primaries:t,whitePoint:n,transfer:ga,toXYZ:Ro,fromXYZ:wo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:jt,toXYZ:Ro,fromXYZ:wo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),i}const Wt=ol();function hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Kn;class sl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Kn===void 0&&(Kn=Ci("canvas")),Kn.width=t.width,Kn.height=t.height;const n=Kn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Kn}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ci("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const a=n.getImageData(0,0,t.width,t.height),r=a.data;for(let o=0;o<r.length;o++)r[o]=hn(r[o]/255)*255;return n.putImageData(a,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hn(e[n]/255)*255):e[n]=hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let cl=0;class no{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cl++}),this.uuid=Pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let o=0,s=a.length;o<s;o++)a[o].isDataTexture?r.push(Pa(a[o].image)):r.push(Pa(a[o]))}else r=Pa(a);n.url=r}return e||(t.images[this.uuid]=n),n}}function Pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ll=0;class ve extends Wn{constructor(t=ve.DEFAULT_IMAGE,e=ve.DEFAULT_MAPPING,n=ln,a=ln,r=Ye,o=Tn,s=qe,c=fn,l=ve.DEFAULT_ANISOTROPY,u=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ll++}),this.uuid=Pi(),this.name="",this.source=new no(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ns)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gr:t.x=t.x-Math.floor(t.x);break;case ln:t.x=t.x<0?0:1;break;case _r:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gr:t.y=t.y-Math.floor(t.y);break;case ln:t.y=t.y<0?0:1;break;case _r:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ve.DEFAULT_IMAGE=null;ve.DEFAULT_MAPPING=Ns;ve.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,a=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,a){return this.x=t,this.y=e,this.z=n,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*a+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*a+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*a+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*a+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,a,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],m=c[5],y=c[9],_=c[2],p=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(y-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(y+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,M=(m+1)/2,N=(d+1)/2,A=(u+h)/4,R=(f+_)/4,P=(y+p)/4;return E>M&&E>N?E<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(E),a=A/n,r=R/n):M>N?M<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(M),n=A/a,r=P/a):N<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(N),n=R/r,a=P/r),this.set(n,a,r,e),this}let T=Math.sqrt((p-y)*(p-y)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(p-y)/T,this.y=(f-_)/T,this.z=(h-u)/T,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this.w=Ut(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this.w=Ut(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ul extends Wn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const a={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ye,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ve(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let s=0;s<o;s++)this.textures[s]=r.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=e,this.textures[a].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const a=Object.assign({},t.textures[e].image);this.textures[e].source=new no(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vn extends ul{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ws extends ve{constructor(t=null,e=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class dl extends ve{constructor(t=null,e=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:a},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(t=0,e=0,n=0,a=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=a}static slerpFlat(t,e,n,a,r,o,s){let c=n[a+0],l=n[a+1],u=n[a+2],f=n[a+3];const h=r[o+0],m=r[o+1],y=r[o+2],_=r[o+3];if(s===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f;return}if(s===1){t[e+0]=h,t[e+1]=m,t[e+2]=y,t[e+3]=_;return}if(f!==_||c!==h||l!==m||u!==y){let p=1-s;const d=c*h+l*m+u*y+f*_,T=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const N=Math.sqrt(E),A=Math.atan2(N,d*T);p=Math.sin(p*A)/N,s=Math.sin(s*A)/N}const M=s*T;if(c=c*p+h*M,l=l*p+m*M,u=u*p+y*M,f=f*p+_*M,p===1-s){const N=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=N,l*=N,u*=N,f*=N}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,a,r,o){const s=n[a],c=n[a+1],l=n[a+2],u=n[a+3],f=r[o],h=r[o+1],m=r[o+2],y=r[o+3];return t[e]=s*y+u*f+c*m-l*h,t[e+1]=c*y+u*h+l*f-s*m,t[e+2]=l*y+u*m+s*h-c*f,t[e+3]=u*y-s*f-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,a){return this._x=t,this._y=e,this._z=n,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,a=t._y,r=t._z,o=t._order,s=Math.cos,c=Math.sin,l=s(n/2),u=s(a/2),f=s(r/2),h=c(n/2),m=c(a/2),y=c(r/2);switch(o){case"XYZ":this._x=h*u*f+l*m*y,this._y=l*m*f-h*u*y,this._z=l*u*y+h*m*f,this._w=l*u*f-h*m*y;break;case"YXZ":this._x=h*u*f+l*m*y,this._y=l*m*f-h*u*y,this._z=l*u*y-h*m*f,this._w=l*u*f+h*m*y;break;case"ZXY":this._x=h*u*f-l*m*y,this._y=l*m*f+h*u*y,this._z=l*u*y+h*m*f,this._w=l*u*f-h*m*y;break;case"ZYX":this._x=h*u*f-l*m*y,this._y=l*m*f+h*u*y,this._z=l*u*y-h*m*f,this._w=l*u*f+h*m*y;break;case"YZX":this._x=h*u*f+l*m*y,this._y=l*m*f+h*u*y,this._z=l*u*y-h*m*f,this._w=l*u*f-h*m*y;break;case"XZY":this._x=h*u*f-l*m*y,this._y=l*m*f-h*u*y,this._z=l*u*y+h*m*f,this._w=l*u*f+h*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,a=Math.sin(n);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],a=e[4],r=e[8],o=e[1],s=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+s+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(o-a)*m}else if(n>s&&n>f){const m=2*Math.sqrt(1+n-s-f);this._w=(u-c)/m,this._x=.25*m,this._y=(a+o)/m,this._z=(r+l)/m}else if(s>f){const m=2*Math.sqrt(1+s-n-f);this._w=(r-l)/m,this._x=(a+o)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-n-s);this._w=(o-a)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ut(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const a=Math.min(1,e/n);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,a=t._y,r=t._z,o=t._w,s=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*s+a*l-r*c,this._y=a*u+o*c+r*s-n*l,this._z=r*u+o*l+n*c-a*s,this._w=o*u-n*s-a*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,a=this._y,r=this._z,o=this._w;let s=o*t._w+n*t._x+a*t._y+r*t._z;if(s<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,s=-s):this.copy(t),s>=1)return this._w=o,this._x=n,this._y=a,this._z=r,this;const c=1-s*s;if(c<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*a+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,s),f=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=a*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),a=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Co.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Co.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*a,this.y=r[1]*e+r[4]*n+r[7]*a,this.z=r[2]*e+r[5]*n+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,a=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*a+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*a+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*a+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*a+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,a=this.z,r=t.x,o=t.y,s=t.z,c=t.w,l=2*(o*a-s*n),u=2*(s*e-r*a),f=2*(r*n-o*e);return this.x=e+c*l+o*f-s*u,this.y=n+c*u+s*l-r*f,this.z=a+c*f+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,a=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*a,this.y=r[1]*e+r[5]*n+r[9]*a,this.z=r[2]*e+r[6]*n+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ut(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,a=t.y,r=t.z,o=e.x,s=e.y,c=e.z;return this.x=a*c-r*s,this.y=r*o-n*c,this.z=n*s-a*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return La.copy(this).projectOnVector(t),this.sub(La)}reflect(t){return this.sub(La.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ut(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,a=this.z-t.z;return e*e+n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const a=Math.sin(e)*t;return this.x=a*Math.sin(n),this.y=Math.cos(e)*t,this.z=a*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=a,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const La=new D,Co=new pn;class Li{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,s=r.count;o<s;o++)t.isMesh===!0?t.getVertexPosition(o,ke):ke.fromBufferAttribute(r,o),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gi.copy(n.boundingBox)),Gi.applyMatrix4(t.matrixWorld),this.union(Gi)}const a=t.children;for(let r=0,o=a.length;r<o;r++)this.expandByObject(a[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xi),zi.subVectors(this.max,xi),jn.subVectors(t.a,xi),Zn.subVectors(t.b,xi),$n.subVectors(t.c,xi),mn.subVectors(Zn,jn),yn.subVectors($n,Zn),Nn.subVectors(jn,$n);let e=[0,-mn.z,mn.y,0,-yn.z,yn.y,0,-Nn.z,Nn.y,mn.z,0,-mn.x,yn.z,0,-yn.x,Nn.z,0,-Nn.x,-mn.y,mn.x,0,-yn.y,yn.x,0,-Nn.y,Nn.x,0];return!Da(e,jn,Zn,$n,zi)||(e=[1,0,0,0,1,0,0,0,1],!Da(e,jn,Zn,$n,zi))?!1:(ki.crossVectors(mn,yn),e=[ki.x,ki.y,ki.z],Da(e,jn,Zn,$n,zi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new D,new D,new D,new D,new D,new D,new D,new D],ke=new D,Gi=new Li,jn=new D,Zn=new D,$n=new D,mn=new D,yn=new D,Nn=new D,xi=new D,zi=new D,ki=new D,Pn=new D;function Da(i,t,e,n,a){for(let r=0,o=i.length-3;r<=o;r+=3){Pn.fromArray(i,r);const s=a.x*Math.abs(Pn.x)+a.y*Math.abs(Pn.y)+a.z*Math.abs(Pn.z),c=t.dot(Pn),l=e.dot(Pn),u=n.dot(Pn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>s)return!1}return!0}const hl=new Li,Ei=new D,Ia=new D;class Di{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hl.setFromPoints(t).getCenter(n);let a=0;for(let r=0,o=t.length;r<o;r++)a=Math.max(a,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ei.subVectors(t,this.center);const e=Ei.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),a=(n-this.radius)*.5;this.center.addScaledVector(Ei,a/n),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ia.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ei.copy(t.center).add(Ia)),this.expandByPoint(Ei.copy(t.center).sub(Ia))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new D,Ua=new D,Hi=new D,gn=new D,Fa=new D,Vi=new D,Oa=new D;class Ii{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,n,a){Ua.copy(t).add(e).multiplyScalar(.5),Hi.copy(e).sub(t).normalize(),gn.copy(this.origin).sub(Ua);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Hi),s=gn.dot(this.direction),c=-gn.dot(Hi),l=gn.lengthSq(),u=Math.abs(1-o*o);let f,h,m,y;if(u>0)if(f=o*c-s,h=o*s-c,y=r*u,f>=0)if(h>=-y)if(h<=y){const _=1/u;f*=_,h*=_,m=f*(f+o*h+2*s)+h*(o*f+h+2*c)+l}else h=r,f=Math.max(0,-(o*h+s)),m=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(o*h+s)),m=-f*f+h*(h+2*c)+l;else h<=-y?(f=Math.max(0,-(-o*r+s)),h=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l):h<=y?(f=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(f=Math.max(0,-(o*r+s)),h=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l);else h=o>0?-r:r,f=Math.max(0,-(o*h+s)),m=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),a&&a.copy(Ua).addScaledVector(Hi,h),m}intersectSphere(t,e){an.subVectors(t.center,this.origin);const n=an.dot(this.direction),a=an.dot(an)-n*n,r=t.radius*t.radius;if(a>r)return null;const o=Math.sqrt(r-a),s=n-o,c=n+o;return c<0?null:s<0?this.at(c,e):this.at(s,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,a,r,o,s,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,a=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,a=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>a||((r>n||isNaN(n))&&(n=r),(o<a||isNaN(a))&&(a=o),f>=0?(s=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(s=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||s>a)||((s>n||n!==n)&&(n=s),(c<a||a!==a)&&(a=c),a<0)?null:this.at(n>=0?n:a,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,n,a,r){Fa.subVectors(e,t),Vi.subVectors(n,t),Oa.crossVectors(Fa,Vi);let o=this.direction.dot(Oa),s;if(o>0){if(a)return null;s=1}else if(o<0)s=-1,o=-o;else return null;gn.subVectors(this.origin,t);const c=s*this.direction.dot(Vi.crossVectors(gn,Vi));if(c<0)return null;const l=s*this.direction.dot(Fa.cross(gn));if(l<0||c+l>o)return null;const u=-s*gn.dot(Oa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,a,r,o,s,c,l,u,f,h,m,y,_,p){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,a,r,o,s,c,l,u,f,h,m,y,_,p)}set(t,e,n,a,r,o,s,c,l,u,f,h,m,y,_,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=a,d[1]=r,d[5]=o,d[9]=s,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=m,d[7]=y,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,a=1/Jn.setFromMatrixColumn(t,0).length(),r=1/Jn.setFromMatrixColumn(t,1).length(),o=1/Jn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*a,e[1]=n[1]*a,e[2]=n[2]*a,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,a=t.y,r=t.z,o=Math.cos(n),s=Math.sin(n),c=Math.cos(a),l=Math.sin(a),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,m=o*f,y=s*u,_=s*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=m+y*l,e[5]=h-_*l,e[9]=-s*c,e[2]=_-h*l,e[6]=y+m*l,e[10]=o*c}else if(t.order==="YXZ"){const h=c*u,m=c*f,y=l*u,_=l*f;e[0]=h+_*s,e[4]=y*s-m,e[8]=o*l,e[1]=o*f,e[5]=o*u,e[9]=-s,e[2]=m*s-y,e[6]=_+h*s,e[10]=o*c}else if(t.order==="ZXY"){const h=c*u,m=c*f,y=l*u,_=l*f;e[0]=h-_*s,e[4]=-o*f,e[8]=y+m*s,e[1]=m+y*s,e[5]=o*u,e[9]=_-h*s,e[2]=-o*l,e[6]=s,e[10]=o*c}else if(t.order==="ZYX"){const h=o*u,m=o*f,y=s*u,_=s*f;e[0]=c*u,e[4]=y*l-m,e[8]=h*l+_,e[1]=c*f,e[5]=_*l+h,e[9]=m*l-y,e[2]=-l,e[6]=s*c,e[10]=o*c}else if(t.order==="YZX"){const h=o*c,m=o*l,y=s*c,_=s*l;e[0]=c*u,e[4]=_-h*f,e[8]=y*f+m,e[1]=f,e[5]=o*u,e[9]=-s*u,e[2]=-l*u,e[6]=m*f+y,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*c,m=o*l,y=s*c,_=s*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+_,e[5]=o*u,e[9]=m*f-y,e[2]=y*f-m,e[6]=s*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fl,t,pl)}lookAt(t,e,n){const a=this.elements;return Ce.subVectors(t,e),Ce.lengthSq()===0&&(Ce.z=1),Ce.normalize(),_n.crossVectors(n,Ce),_n.lengthSq()===0&&(Math.abs(n.z)===1?Ce.x+=1e-4:Ce.z+=1e-4,Ce.normalize(),_n.crossVectors(n,Ce)),_n.normalize(),Wi.crossVectors(Ce,_n),a[0]=_n.x,a[4]=Wi.x,a[8]=Ce.x,a[1]=_n.y,a[5]=Wi.y,a[9]=Ce.y,a[2]=_n.z,a[6]=Wi.z,a[10]=Ce.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,a=e.elements,r=this.elements,o=n[0],s=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],m=n[13],y=n[2],_=n[6],p=n[10],d=n[14],T=n[3],E=n[7],M=n[11],N=n[15],A=a[0],R=a[4],P=a[8],x=a[12],S=a[1],C=a[5],z=a[9],G=a[13],W=a[2],j=a[6],V=a[10],$=a[14],H=a[3],at=a[7],ut=a[11],St=a[15];return r[0]=o*A+s*S+c*W+l*H,r[4]=o*R+s*C+c*j+l*at,r[8]=o*P+s*z+c*V+l*ut,r[12]=o*x+s*G+c*$+l*St,r[1]=u*A+f*S+h*W+m*H,r[5]=u*R+f*C+h*j+m*at,r[9]=u*P+f*z+h*V+m*ut,r[13]=u*x+f*G+h*$+m*St,r[2]=y*A+_*S+p*W+d*H,r[6]=y*R+_*C+p*j+d*at,r[10]=y*P+_*z+p*V+d*ut,r[14]=y*x+_*G+p*$+d*St,r[3]=T*A+E*S+M*W+N*H,r[7]=T*R+E*C+M*j+N*at,r[11]=T*P+E*z+M*V+N*ut,r[15]=T*x+E*G+M*$+N*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],a=t[8],r=t[12],o=t[1],s=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],m=t[14],y=t[3],_=t[7],p=t[11],d=t[15];return y*(+r*c*f-a*l*f-r*s*h+n*l*h+a*s*m-n*c*m)+_*(+e*c*m-e*l*h+r*o*h-a*o*m+a*l*u-r*c*u)+p*(+e*l*f-e*s*m-r*o*f+n*o*m+r*s*u-n*l*u)+d*(-a*s*u-e*c*f+e*s*h+a*o*f-n*o*h+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=e,a[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],a=t[2],r=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],m=t[11],y=t[12],_=t[13],p=t[14],d=t[15],T=f*p*l-_*h*l+_*c*m-s*p*m-f*c*d+s*h*d,E=y*h*l-u*p*l-y*c*m+o*p*m+u*c*d-o*h*d,M=u*_*l-y*f*l+y*s*m-o*_*m-u*s*d+o*f*d,N=y*f*c-u*_*c-y*s*h+o*_*h+u*s*p-o*f*p,A=e*T+n*E+a*M+r*N;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=T*R,t[1]=(_*h*r-f*p*r-_*a*m+n*p*m+f*a*d-n*h*d)*R,t[2]=(s*p*r-_*c*r+_*a*l-n*p*l-s*a*d+n*c*d)*R,t[3]=(f*c*r-s*h*r-f*a*l+n*h*l+s*a*m-n*c*m)*R,t[4]=E*R,t[5]=(u*p*r-y*h*r+y*a*m-e*p*m-u*a*d+e*h*d)*R,t[6]=(y*c*r-o*p*r-y*a*l+e*p*l+o*a*d-e*c*d)*R,t[7]=(o*h*r-u*c*r+u*a*l-e*h*l-o*a*m+e*c*m)*R,t[8]=M*R,t[9]=(y*f*r-u*_*r-y*n*m+e*_*m+u*n*d-e*f*d)*R,t[10]=(o*_*r-y*s*r+y*n*l-e*_*l-o*n*d+e*s*d)*R,t[11]=(u*s*r-o*f*r-u*n*l+e*f*l+o*n*m-e*s*m)*R,t[12]=N*R,t[13]=(u*_*a-y*f*a+y*n*h-e*_*h-u*n*p+e*f*p)*R,t[14]=(y*s*a-o*_*a-y*n*c+e*_*c+o*n*p-e*s*p)*R,t[15]=(o*f*a-u*s*a+u*n*c-e*f*c-o*n*h+e*s*h)*R,this}scale(t){const e=this.elements,n=t.x,a=t.y,r=t.z;return e[0]*=n,e[4]*=a,e[8]*=r,e[1]*=n,e[5]*=a,e[9]*=r,e[2]*=n,e[6]*=a,e[10]*=r,e[3]*=n,e[7]*=a,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,a))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),a=Math.sin(e),r=1-n,o=t.x,s=t.y,c=t.z,l=r*o,u=r*s;return this.set(l*o+n,l*s-a*c,l*c+a*s,0,l*s+a*c,u*s+n,u*c-a*o,0,l*c-a*s,u*c+a*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,a,r,o){return this.set(1,n,r,0,t,1,o,0,e,a,1,0,0,0,0,1),this}compose(t,e,n){const a=this.elements,r=e._x,o=e._y,s=e._z,c=e._w,l=r+r,u=o+o,f=s+s,h=r*l,m=r*u,y=r*f,_=o*u,p=o*f,d=s*f,T=c*l,E=c*u,M=c*f,N=n.x,A=n.y,R=n.z;return a[0]=(1-(_+d))*N,a[1]=(m+M)*N,a[2]=(y-E)*N,a[3]=0,a[4]=(m-M)*A,a[5]=(1-(h+d))*A,a[6]=(p+T)*A,a[7]=0,a[8]=(y+E)*R,a[9]=(p-T)*R,a[10]=(1-(h+_))*R,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,e,n){const a=this.elements;let r=Jn.set(a[0],a[1],a[2]).length();const o=Jn.set(a[4],a[5],a[6]).length(),s=Jn.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),t.x=a[12],t.y=a[13],t.z=a[14],He.copy(this);const l=1/r,u=1/o,f=1/s;return He.elements[0]*=l,He.elements[1]*=l,He.elements[2]*=l,He.elements[4]*=u,He.elements[5]*=u,He.elements[6]*=u,He.elements[8]*=f,He.elements[9]*=f,He.elements[10]*=f,e.setFromRotationMatrix(He),n.x=r,n.y=o,n.z=s,this}makePerspective(t,e,n,a,r,o,s=dn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-a),f=(e+t)/(e-t),h=(n+a)/(n-a);let m,y;if(s===dn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(s===_a)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,a,r,o,s=dn){const c=this.elements,l=1/(e-t),u=1/(n-a),f=1/(o-r),h=(e+t)*l,m=(n+a)*u;let y,_;if(s===dn)y=(o+r)*f,_=-2*f;else if(s===_a)y=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let a=0;a<16;a++)if(e[a]!==n[a])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Jn=new D,He=new ne,fl=new D(0,0,0),pl=new D(1,1,1),_n=new D,Wi=new D,Ce=new D,No=new ne,Po=new pn;class Qe{constructor(t=0,e=0,n=0,a=Qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,a=this._order){return this._x=t,this._y=e,this._z=n,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const a=t.elements,r=a[0],o=a[4],s=a[8],c=a[1],l=a[5],u=a[9],f=a[2],h=a[6],m=a[10];switch(e){case"XYZ":this._y=Math.asin(Ut(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(s,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ut(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(s,m));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(s,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return No.makeRotationFromQuaternion(t),this.setFromRotationMatrix(No,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Po.setFromEuler(this),this.setFromQuaternion(Po,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qe.DEFAULT_ORDER="XYZ";class io{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ml=0;const Lo=new D,Qn=new pn,rn=new ne,Xi=new D,Ti=new D,yl=new D,gl=new pn,Do=new D(1,0,0),Io=new D(0,1,0),Uo=new D(0,0,1),Fo={type:"added"},_l={type:"removed"},ti={type:"childadded",child:null},Ba={type:"childremoved",child:null};class Te extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ml++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new D,e=new Qe,n=new pn,a=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ne},normalMatrix:{value:new Pt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(t,e){return Qn.setFromAxisAngle(t,e),this.quaternion.premultiply(Qn),this}rotateX(t){return this.rotateOnAxis(Do,t)}rotateY(t){return this.rotateOnAxis(Io,t)}rotateZ(t){return this.rotateOnAxis(Uo,t)}translateOnAxis(t,e){return Lo.copy(t).applyQuaternion(this.quaternion),this.position.add(Lo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Do,t)}translateY(t){return this.translateOnAxis(Io,t)}translateZ(t){return this.translateOnAxis(Uo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xi.copy(t):Xi.set(t,e,n);const a=this.parent;this.updateWorldMatrix(!0,!1),Ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ti,Xi,this.up):rn.lookAt(Xi,Ti,this.up),this.quaternion.setFromRotationMatrix(rn),a&&(rn.extractRotation(a.matrixWorld),Qn.setFromRotationMatrix(rn),this.quaternion.premultiply(Qn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Fo),ti.child=t,this.dispatchEvent(ti),ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_l),Ba.child=t,this.dispatchEvent(Ba),Ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Fo),ti.child=t,this.dispatchEvent(ti),ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,a=this.children.length;n<a;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,t,yl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ti,gl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,a=e.length;n<a;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(s,c){return s[c.uuid]===void 0&&(s[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const c=s.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let c=0,l=this.material.length;c<l;c++)s.push(r(t.materials,this.material[c]));a.material=s}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let s=0;s<this.children.length;s++)a.children.push(this.children[s].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let s=0;s<this.animations.length;s++){const c=this.animations[s];a.animations.push(r(t.animations,c))}}if(e){const s=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),m=o(t.animations),y=o(t.nodes);s.length>0&&(n.geometries=s),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),y.length>0&&(n.nodes=y)}return n.object=a,n;function o(s){const c=[];for(const l in s){const u=s[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const a=t.children[n];this.add(a.clone())}return this}}Te.DEFAULT_UP=new D(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ve=new D,on=new D,Ga=new D,sn=new D,ei=new D,ni=new D,Oo=new D,za=new D,ka=new D,Ha=new D,Va=new oe,Wa=new oe,Xa=new oe;class Xe{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,a){a.subVectors(n,e),Ve.subVectors(t,e),a.cross(Ve);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,e,n,a,r){Ve.subVectors(a,e),on.subVectors(n,e),Ga.subVectors(t,e);const o=Ve.dot(Ve),s=Ve.dot(on),c=Ve.dot(Ga),l=on.dot(on),u=on.dot(Ga),f=o*l-s*s;if(f===0)return r.set(0,0,0),null;const h=1/f,m=(l*c-s*u)*h,y=(o*u-s*c)*h;return r.set(1-m-y,y,m)}static containsPoint(t,e,n,a){return this.getBarycoord(t,e,n,a,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(t,e,n,a,r,o,s,c){return this.getBarycoord(t,e,n,a,sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,sn.x),c.addScaledVector(o,sn.y),c.addScaledVector(s,sn.z),c)}static getInterpolatedAttribute(t,e,n,a,r,o){return Va.setScalar(0),Wa.setScalar(0),Xa.setScalar(0),Va.fromBufferAttribute(t,e),Wa.fromBufferAttribute(t,n),Xa.fromBufferAttribute(t,a),o.setScalar(0),o.addScaledVector(Va,r.x),o.addScaledVector(Wa,r.y),o.addScaledVector(Xa,r.z),o}static isFrontFacing(t,e,n,a){return Ve.subVectors(n,e),on.subVectors(t,e),Ve.cross(on).dot(a)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,a){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,e,n,a){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ve.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Ve.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,a,r){return Xe.getInterpolation(t,this.a,this.b,this.c,e,n,a,r)}containsPoint(t){return Xe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,a=this.b,r=this.c;let o,s;ei.subVectors(a,n),ni.subVectors(r,n),za.subVectors(t,n);const c=ei.dot(za),l=ni.dot(za);if(c<=0&&l<=0)return e.copy(n);ka.subVectors(t,a);const u=ei.dot(ka),f=ni.dot(ka);if(u>=0&&f<=u)return e.copy(a);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(ei,o);Ha.subVectors(t,r);const m=ei.dot(Ha),y=ni.dot(Ha);if(y>=0&&m<=y)return e.copy(r);const _=m*l-c*y;if(_<=0&&l>=0&&y<=0)return s=l/(l-y),e.copy(n).addScaledVector(ni,s);const p=u*y-m*f;if(p<=0&&f-u>=0&&m-y>=0)return Oo.subVectors(r,a),s=(f-u)/(f-u+(m-y)),e.copy(a).addScaledVector(Oo,s);const d=1/(p+_+h);return o=_*d,s=h*d,e.copy(n).addScaledVector(ei,o).addScaledVector(ni,s)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Xs={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},Yi={h:0,s:0,l:0};function Ya(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,a=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.toWorkingColorSpace(this,a),this}setHSL(t,e,n,a=Wt.workingColorSpace){if(t=tl(t,1),e=Ut(e,0,1),n=Ut(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ya(o,r,t+1/3),this.g=Ya(o,r,t),this.b=Ya(o,r,t-1/3)}return Wt.toWorkingColorSpace(this,a),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=a[1],s=a[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=a[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const n=Xs[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hn(t.r),this.g=hn(t.g),this.b=hn(t.b),this}copyLinearToSRGB(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return Wt.fromWorkingColorSpace(Se.copy(this),t),Math.round(Ut(Se.r*255,0,255))*65536+Math.round(Ut(Se.g*255,0,255))*256+Math.round(Ut(Se.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(Se.copy(this),e);const n=Se.r,a=Se.g,r=Se.b,o=Math.max(n,a,r),s=Math.min(n,a,r);let c,l;const u=(s+o)/2;if(s===o)c=0,l=0;else{const f=o-s;switch(l=u<=.5?f/(o+s):f/(2-o-s),o){case n:c=(a-r)/f+(a<r?6:0);break;case a:c=(r-n)/f+2;break;case r:c=(n-a)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Ue){Wt.fromWorkingColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,a=Se.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(a*255)})`}offsetHSL(t,e,n){return this.getHSL(Sn),this.setHSL(Sn.h+t,Sn.s+e,Sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Sn),t.getHSL(Yi);const n=Ca(Sn.h,Yi.h,e),a=Ca(Sn.s,Yi.s,e),r=Ca(Sn.l,Yi.l,e);return this.setHSL(n,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,a=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*a,this.g=r[1]*e+r[4]*n+r[7]*a,this.b=r[2]*e+r[5]*n+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Ht;Ht.NAMES=Xs;let Sl=0;class Xn extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sl++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=zn,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=or,this.blendDst=sr,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qn,this.stencilZFail=qn,this.stencilZPass=qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const a=this[e];if(a===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(n):a&&a.isVector3&&n&&n.isVector3?a.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zn&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==or&&(n.blendSrc=this.blendSrc),this.blendDst!==sr&&(n.blendDst=this.blendDst),this.blendEquation!==Bn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function a(r){const o=[];for(const s in r){const c=r[s];delete c.metadata,o.push(c)}return o}if(e){const r=a(t.textures),o=a(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const a=e.length;n=new Array(a);for(let r=0;r!==a;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class je extends Xn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=ws,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ue=new D,qi=new wt;let vl=0;class Be{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vl++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=To,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=e.array[n+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qi.fromBufferAttribute(this,e),qi.applyMatrix3(t),this.setXY(e,qi.x,qi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,a){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),a=Ae(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this}setXYZW(t,e,n,a,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),a=Ae(a,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==To&&(t.usage=this.usage),t}}class Ys extends Be{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qs extends Be{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends Be{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ml=0;const Ie=new ne,qa=new Te,ii=new D,Ne=new Li,bi=new Li,pe=new D;class ye extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ml++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vs(t)?qs:Ys)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Pt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ie.makeRotationFromQuaternion(t),this.applyMatrix4(Ie),this}rotateX(t){return Ie.makeRotationX(t),this.applyMatrix4(Ie),this}rotateY(t){return Ie.makeRotationY(t),this.applyMatrix4(Ie),this}rotateZ(t){return Ie.makeRotationZ(t),this.applyMatrix4(Ie),this}translate(t,e,n){return Ie.makeTranslation(t,e,n),this.applyMatrix4(Ie),this}scale(t,e,n){return Ie.makeScale(t,e,n),this.applyMatrix4(Ie),this}lookAt(t){return qa.lookAt(t),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ii).negate(),this.translate(ii.x,ii.y,ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let a=0,r=t.length;a<r;a++){const o=t[a];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ce(n,3))}else{const n=Math.min(t.length,e.count);for(let a=0;a<n;a++){const r=t[a];e.setXYZ(a,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,a=e.length;n<a;n++){const r=e[n];Ne.setFromBufferAttribute(r),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const s=e[r];bi.setFromBufferAttribute(s),this.morphTargetsRelative?(pe.addVectors(Ne.min,bi.min),Ne.expandByPoint(pe),pe.addVectors(Ne.max,bi.max),Ne.expandByPoint(pe)):(Ne.expandByPoint(bi.min),Ne.expandByPoint(bi.max))}Ne.getCenter(n);let a=0;for(let r=0,o=t.count;r<o;r++)pe.fromBufferAttribute(t,r),a=Math.max(a,n.distanceToSquared(pe));if(e)for(let r=0,o=e.length;r<o;r++){const s=e[r],c=this.morphTargetsRelative;for(let l=0,u=s.count;l<u;l++)pe.fromBufferAttribute(s,l),c&&(ii.fromBufferAttribute(t,l),pe.add(ii)),a=Math.max(a,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,a=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),s=[],c=[];for(let P=0;P<n.count;P++)s[P]=new D,c[P]=new D;const l=new D,u=new D,f=new D,h=new wt,m=new wt,y=new wt,_=new D,p=new D;function d(P,x,S){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,x),f.fromBufferAttribute(n,S),h.fromBufferAttribute(r,P),m.fromBufferAttribute(r,x),y.fromBufferAttribute(r,S),u.sub(l),f.sub(l),m.sub(h),y.sub(h);const C=1/(m.x*y.y-y.x*m.y);isFinite(C)&&(_.copy(u).multiplyScalar(y.y).addScaledVector(f,-m.y).multiplyScalar(C),p.copy(f).multiplyScalar(m.x).addScaledVector(u,-y.x).multiplyScalar(C),s[P].add(_),s[x].add(_),s[S].add(_),c[P].add(p),c[x].add(p),c[S].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,x=T.length;P<x;++P){const S=T[P],C=S.start,z=S.count;for(let G=C,W=C+z;G<W;G+=3)d(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const E=new D,M=new D,N=new D,A=new D;function R(P){N.fromBufferAttribute(a,P),A.copy(N);const x=s[P];E.copy(x),E.sub(N.multiplyScalar(N.dot(x))).normalize(),M.crossVectors(A,x);const C=M.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,C)}for(let P=0,x=T.length;P<x;++P){const S=T[P],C=S.start,z=S.count;for(let G=C,W=C+z;G<W;G+=3)R(t.getX(G+0)),R(t.getX(G+1)),R(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const a=new D,r=new D,o=new D,s=new D,c=new D,l=new D,u=new D,f=new D;if(t)for(let h=0,m=t.count;h<m;h+=3){const y=t.getX(h+0),_=t.getX(h+1),p=t.getX(h+2);a.fromBufferAttribute(e,y),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),u.subVectors(o,r),f.subVectors(a,r),u.cross(f),s.fromBufferAttribute(n,y),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),s.add(u),c.add(u),l.add(u),n.setXYZ(y,s.x,s.y,s.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)a.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(a,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(s,c){const l=s.array,u=s.itemSize,f=s.normalized,h=new l.constructor(c.length*u);let m=0,y=0;for(let _=0,p=c.length;_<p;_++){s.isInterleavedBufferAttribute?m=c[_]*s.data.stride+s.offset:m=c[_]*u;for(let d=0;d<u;d++)h[y++]=l[m++]}return new Be(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,a=this.attributes;for(const s in a){const c=a[s],l=t(c,n);e.setAttribute(s,l)}const r=this.morphAttributes;for(const s in r){const c=[],l=r[s];for(let u=0,f=l.length;u<f;u++){const h=l[u],m=t(h,n);c.push(m)}e.morphAttributes[s]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,c=o.length;s<c;s++){const l=o[s];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const a={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const m=l[f];u.push(m.toJSON(t.data))}u.length>0&&(a[c]=u,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(t.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const a=t.attributes;for(const l in a){const u=a[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const s=t.boundingBox;s!==null&&(this.boundingBox=s.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bo=new ne,Ln=new Ii,Ki=new Di,Go=new D,ji=new D,Zi=new D,$i=new D,Ka=new D,Ji=new D,zo=new D,Qi=new D;class se extends Te{constructor(t=new ye,e=new je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const a=e[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=a.length;r<o;r++){const s=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}getVertexPosition(t,e){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(a,t);const s=this.morphTargetInfluences;if(r&&s){Ji.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=s[c],f=r[c];u!==0&&(Ka.fromBufferAttribute(f,t),o?Ji.addScaledVector(Ka,u):Ji.addScaledVector(Ka.sub(e),u))}e.add(Ji)}return e}raycast(t,e){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ki.copy(n.boundingSphere),Ki.applyMatrix4(r),Ln.copy(t.ray).recast(t.near),!(Ki.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(Ki,Go)===null||Ln.origin.distanceToSquared(Go)>(t.far-t.near)**2))&&(Bo.copy(r).invert(),Ln.copy(t.ray).applyMatrix4(Bo),!(n.boundingBox!==null&&Ln.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ln)))}_computeIntersections(t,e,n){let a;const r=this.geometry,o=this.material,s=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(s!==null)if(Array.isArray(o))for(let y=0,_=h.length;y<_;y++){const p=h[y],d=o[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(s.count,Math.min(p.start+p.count,m.start+m.count));for(let M=T,N=E;M<N;M+=3){const A=s.getX(M),R=s.getX(M+1),P=s.getX(M+2);a=ta(this,d,t,n,l,u,f,A,R,P),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const y=Math.max(0,m.start),_=Math.min(s.count,m.start+m.count);for(let p=y,d=_;p<d;p+=3){const T=s.getX(p),E=s.getX(p+1),M=s.getX(p+2);a=ta(this,o,t,n,l,u,f,T,E,M),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}else if(c!==void 0)if(Array.isArray(o))for(let y=0,_=h.length;y<_;y++){const p=h[y],d=o[p.materialIndex],T=Math.max(p.start,m.start),E=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let M=T,N=E;M<N;M+=3){const A=M,R=M+1,P=M+2;a=ta(this,d,t,n,l,u,f,A,R,P),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=p.materialIndex,e.push(a))}}else{const y=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=y,d=_;p<d;p+=3){const T=p,E=p+1,M=p+2;a=ta(this,o,t,n,l,u,f,T,E,M),a&&(a.faceIndex=Math.floor(p/3),e.push(a))}}}}function xl(i,t,e,n,a,r,o,s){let c;if(t.side===Ee?c=n.intersectTriangle(o,r,a,!0,s):c=n.intersectTriangle(a,r,o,t.side===Rn,s),c===null)return null;Qi.copy(s),Qi.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Qi);return l<e.near||l>e.far?null:{distance:l,point:Qi.clone(),object:i}}function ta(i,t,e,n,a,r,o,s,c,l){i.getVertexPosition(s,ji),i.getVertexPosition(c,Zi),i.getVertexPosition(l,$i);const u=xl(i,t,e,n,ji,Zi,$i,zo);if(u){const f=new D;Xe.getBarycoord(zo,ji,Zi,$i,f),a&&(u.uv=Xe.getInterpolatedAttribute(a,s,c,l,f,new wt)),r&&(u.uv1=Xe.getInterpolatedAttribute(r,s,c,l,f,new wt)),o&&(u.normal=Xe.getInterpolatedAttribute(o,s,c,l,f,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:s,b:c,c:l,normal:new D,materialIndex:0};Xe.getNormal(ji,Zi,$i,h.normal),u.face=h,u.barycoord=f}return u}class Ui extends ye{constructor(t=1,e=1,n=1,a=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:a,heightSegments:r,depthSegments:o};const s=this;a=Math.floor(a),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,m=0;y("z","y","x",-1,-1,n,e,t,o,r,0),y("z","y","x",1,-1,n,e,-t,o,r,1),y("x","z","y",1,1,t,n,e,a,o,2),y("x","z","y",1,-1,t,n,-e,a,o,3),y("x","y","z",1,-1,t,e,n,a,r,4),y("x","y","z",-1,-1,t,e,-n,a,r,5),this.setIndex(c),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(f,2));function y(_,p,d,T,E,M,N,A,R,P,x){const S=M/R,C=N/P,z=M/2,G=N/2,W=A/2,j=R+1,V=P+1;let $=0,H=0;const at=new D;for(let ut=0;ut<V;ut++){const St=ut*C-G;for(let It=0;It<j;It++){const $t=It*S-z;at[_]=$t*T,at[p]=St*E,at[d]=W,l.push(at.x,at.y,at.z),at[_]=0,at[p]=0,at[d]=A>0?1:-1,u.push(at.x,at.y,at.z),f.push(It/R),f.push(1-ut/P),$+=1}}for(let ut=0;ut<P;ut++)for(let St=0;St<R;St++){const It=h+St+j*ut,$t=h+St+j*(ut+1),Y=h+(St+1)+j*(ut+1),tt=h+(St+1)+j*ut;c.push(It,$t,tt),c.push($t,Y,tt),H+=6}s.addGroup(m,H,x),m+=H,h+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ui(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _i(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const a=i[e][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=a.clone():Array.isArray(a)?t[e][n]=a.slice():t[e][n]=a}}return t}function xe(i){const t={};for(let e=0;e<i.length;e++){const n=_i(i[e]);for(const a in n)t[a]=n[a]}return t}function El(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ks(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Tl={clone:_i,merge:xe};var bl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Al=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ze extends Xn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bl,this.fragmentShader=Al,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_i(t.uniforms),this.uniformsGroups=El(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const a in this.uniforms){const o=this.uniforms[a].value;o&&o.isTexture?e.uniforms[a]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[a]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[a]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[a]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[a]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[a]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[a]={type:"m4",value:o.toArray()}:e.uniforms[a]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class js extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new D,ko=new wt,Ho=new wt;class Fe extends js{constructor(t=50,e=1,n=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=a,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ma*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(vn.x,vn.y).multiplyScalar(-t/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vn.x,vn.y).multiplyScalar(-t/vn.z)}getViewSize(t,e){return this.getViewBounds(t,ko,Ho),e.subVectors(Ho,ko)}setViewOffset(t,e,n,a,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ma*.5*this.fov)/this.zoom,n=2*e,a=this.aspect*n,r=-.5*a;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*a/c,e-=o.offsetY*n/l,a*=o.width/c,n*=o.height/l}const s=this.filmOffset;s!==0&&(r+=t*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,ri=1;class Rl extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Fe(ai,ri,t,e);a.layers=this.layers,this.add(a);const r=new Fe(ai,ri,t,e);r.layers=this.layers,this.add(r);const o=new Fe(ai,ri,t,e);o.layers=this.layers,this.add(o);const s=new Fe(ai,ri,t,e);s.layers=this.layers,this.add(s);const c=new Fe(ai,ri,t,e);c.layers=this.layers,this.add(c);const l=new Fe(ai,ri,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,a,r,o,s,c]=e;for(const l of e)this.remove(l);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===_a)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,s,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,a),t.render(e,r),t.setRenderTarget(n,1,a),t.render(e,o),t.setRenderTarget(n,2,a),t.render(e,s),t.setRenderTarget(n,3,a),t.render(e,c),t.setRenderTarget(n,4,a),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,a),t.render(e,u),t.setRenderTarget(f,h,m),t.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class Zs extends ve{constructor(t,e,n,a,r,o,s,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:fi,super(t,e,n,a,r,o,s,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wl extends Vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},a=[n,n,n,n,n,n];this.texture=new Zs(a,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ye}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ui(5,5,5),r=new Ze({name:"CubemapFromEquirect",uniforms:_i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ee,blending:bn});r.uniforms.tEquirect.value=e;const o=new se(a,r),s=e.minFilter;return e.minFilter===Tn&&(e.minFilter=Ye),new Rl(1,10,this).update(t,o),e.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,a){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,a);t.setRenderTarget(r)}}class Oe extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cl={type:"move"};class ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let a=null,r=null,o=null;const s=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),d=this._getHandJoint(l,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,y=.005;l.inputState.pinching&&h>m+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));s!==null&&(a=e.getPose(t.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(Cl)))}return s!==null&&(s.visible=a!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Nl extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Za=new D,Pl=new D,Ll=new Pt;class Mn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,a){return this.normal.set(t,e,n),this.constant=a,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const a=Za.subVectors(n,e).cross(Pl.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Za),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ll.getNormalMatrix(t),a=this.coplanarPoint(Za).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dn=new Di,ea=new D;class $s{constructor(t=new Mn,e=new Mn,n=new Mn,a=new Mn,r=new Mn,o=new Mn){this.planes=[t,e,n,a,r,o]}set(t,e,n,a,r,o){const s=this.planes;return s[0].copy(t),s[1].copy(e),s[2].copy(n),s[3].copy(a),s[4].copy(r),s[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn){const n=this.planes,a=t.elements,r=a[0],o=a[1],s=a[2],c=a[3],l=a[4],u=a[5],f=a[6],h=a[7],m=a[8],y=a[9],_=a[10],p=a[11],d=a[12],T=a[13],E=a[14],M=a[15];if(n[0].setComponents(c-r,h-l,p-m,M-d).normalize(),n[1].setComponents(c+r,h+l,p+m,M+d).normalize(),n[2].setComponents(c+o,h+u,p+y,M+T).normalize(),n[3].setComponents(c-o,h-u,p-y,M-T).normalize(),n[4].setComponents(c-s,h-f,p-_,M-E).normalize(),e===dn)n[5].setComponents(c+s,h+f,p+_,M+E).normalize();else if(e===_a)n[5].setComponents(s,f,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Dn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Dn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Dn)}intersectsSprite(t){return Dn.center.set(0,0,0),Dn.radius=.7071067811865476,Dn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Dn)}intersectsSphere(t){const e=this.planes,n=t.center,a=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const a=e[n];if(ea.x=a.normal.x>0?t.max.x:t.min.x,ea.y=a.normal.y>0?t.max.y:t.min.y,ea.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(ea)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xa extends Xn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Sa=new D,va=new D,Vo=new ne,Ai=new Ii,na=new Di,$a=new D,Wo=new D;class ao extends Te{constructor(t=new ye,e=new xa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let a=1,r=e.count;a<r;a++)Sa.fromBufferAttribute(e,a-1),va.fromBufferAttribute(e,a),n[a]=n[a-1],n[a]+=Sa.distanceTo(va);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,a=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(a),na.radius+=r,t.ray.intersectsSphere(na)===!1)return;Vo.copy(a).invert(),Ai.copy(t.ray).applyMatrix4(Vo);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=s*s,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const m=Math.max(0,o.start),y=Math.min(u.count,o.start+o.count);for(let _=m,p=y-1;_<p;_+=l){const d=u.getX(_),T=u.getX(_+1),E=ia(this,t,Ai,c,d,T,_);E&&e.push(E)}if(this.isLineLoop){const _=u.getX(y-1),p=u.getX(m),d=ia(this,t,Ai,c,_,p,y-1);d&&e.push(d)}}else{const m=Math.max(0,o.start),y=Math.min(h.count,o.start+o.count);for(let _=m,p=y-1;_<p;_+=l){const d=ia(this,t,Ai,c,_,_+1,_);d&&e.push(d)}if(this.isLineLoop){const _=ia(this,t,Ai,c,y-1,m,y-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const a=e[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=a.length;r<o;r++){const s=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}}function ia(i,t,e,n,a,r,o){const s=i.geometry.attributes.position;if(Sa.fromBufferAttribute(s,a),va.fromBufferAttribute(s,r),e.distanceSqToSegment(Sa,va,$a,Wo)>n)return;$a.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($a);if(!(l<t.near||l>t.far))return{distance:l,point:Wo.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}class Js extends Xn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Xo=new ne,Yr=new Ii,aa=new Di,ra=new D;class Dl extends Te{constructor(t=new ye,e=new Js){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,a=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(a),aa.radius+=r,t.ray.intersectsSphere(aa)===!1)return;Xo.copy(a).invert(),Yr.copy(t.ray).applyMatrix4(Xo);const s=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=s*s,l=n.index,f=n.attributes.position;if(l!==null){const h=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let y=h,_=m;y<_;y++){const p=l.getX(y);ra.fromBufferAttribute(f,p),Yo(ra,p,c,a,t,e,this)}}else{const h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let y=h,_=m;y<_;y++)ra.fromBufferAttribute(f,y),Yo(ra,y,c,a,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const a=e[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=a.length;r<o;r++){const s=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}}function Yo(i,t,e,n,a,r,o){const s=Yr.distanceSqToPoint(i);if(s<e){const c=new D;Yr.closestPointToPoint(i,c),c.applyMatrix4(n);const l=a.ray.origin.distanceTo(c);if(l<a.near||l>a.far)return;r.push({distance:l,distanceToRay:Math.sqrt(s),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Il extends ve{constructor(t,e,n,a,r,o,s,c,l){super(t,e,n,a,r,o,s,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Qs extends ve{constructor(t,e,n,a,r,o,s,c,l,u=ui){if(u!==ui&&u!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ui&&(n=Hn),n===void 0&&u===yi&&(n=mi),super(null,a,r,o,s,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=s!==void 0?s:Ke,this.minFilter=c!==void 0?c:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new no(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ro extends ye{constructor(t=1,e=1,n=1,a=32,r=1,o=!1,s=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:a,heightSegments:r,openEnded:o,thetaStart:s,thetaLength:c};const l=this;a=Math.floor(a),r=Math.floor(r);const u=[],f=[],h=[],m=[];let y=0;const _=[],p=n/2;let d=0;T(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new ce(f,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(m,2));function T(){const M=new D,N=new D;let A=0;const R=(e-t)/n;for(let P=0;P<=r;P++){const x=[],S=P/r,C=S*(e-t)+t;for(let z=0;z<=a;z++){const G=z/a,W=G*c+s,j=Math.sin(W),V=Math.cos(W);N.x=C*j,N.y=-S*n+p,N.z=C*V,f.push(N.x,N.y,N.z),M.set(j,R,V).normalize(),h.push(M.x,M.y,M.z),m.push(G,1-S),x.push(y++)}_.push(x)}for(let P=0;P<a;P++)for(let x=0;x<r;x++){const S=_[x][P],C=_[x+1][P],z=_[x+1][P+1],G=_[x][P+1];(t>0||x!==0)&&(u.push(S,C,G),A+=3),(e>0||x!==r-1)&&(u.push(C,z,G),A+=3)}l.addGroup(d,A,0),d+=A}function E(M){const N=y,A=new wt,R=new D;let P=0;const x=M===!0?t:e,S=M===!0?1:-1;for(let z=1;z<=a;z++)f.push(0,p*S,0),h.push(0,S,0),m.push(.5,.5),y++;const C=y;for(let z=0;z<=a;z++){const W=z/a*c+s,j=Math.cos(W),V=Math.sin(W);R.x=x*V,R.y=p*S,R.z=x*j,f.push(R.x,R.y,R.z),h.push(0,S,0),A.x=j*.5+.5,A.y=V*.5*S+.5,m.push(A.x,A.y),y++}for(let z=0;z<a;z++){const G=N+z,W=C+z;M===!0?u.push(W,W+1,G):u.push(W+1,W,G),P+=3}l.addGroup(d,P,M===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ro(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oo extends ro{constructor(t=1,e=1,n=32,a=1,r=!1,o=0,s=Math.PI*2){super(0,t,e,n,a,r,o,s),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:s}}static fromJSON(t){return new oo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class so extends ye{constructor(t=[],e=[],n=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:a};const r=[],o=[];s(a),l(n),u(),this.setAttribute("position",new ce(r,3)),this.setAttribute("normal",new ce(r.slice(),3)),this.setAttribute("uv",new ce(o,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function s(T){const E=new D,M=new D,N=new D;for(let A=0;A<e.length;A+=3)m(e[A+0],E),m(e[A+1],M),m(e[A+2],N),c(E,M,N,T)}function c(T,E,M,N){const A=N+1,R=[];for(let P=0;P<=A;P++){R[P]=[];const x=T.clone().lerp(M,P/A),S=E.clone().lerp(M,P/A),C=A-P;for(let z=0;z<=C;z++)z===0&&P===A?R[P][z]=x:R[P][z]=x.clone().lerp(S,z/C)}for(let P=0;P<A;P++)for(let x=0;x<2*(A-P)-1;x++){const S=Math.floor(x/2);x%2===0?(h(R[P][S+1]),h(R[P+1][S]),h(R[P][S])):(h(R[P][S+1]),h(R[P+1][S+1]),h(R[P+1][S]))}}function l(T){const E=new D;for(let M=0;M<r.length;M+=3)E.x=r[M+0],E.y=r[M+1],E.z=r[M+2],E.normalize().multiplyScalar(T),r[M+0]=E.x,r[M+1]=E.y,r[M+2]=E.z}function u(){const T=new D;for(let E=0;E<r.length;E+=3){T.x=r[E+0],T.y=r[E+1],T.z=r[E+2];const M=p(T)/2/Math.PI+.5,N=d(T)/Math.PI+.5;o.push(M,1-N)}y(),f()}function f(){for(let T=0;T<o.length;T+=6){const E=o[T+0],M=o[T+2],N=o[T+4],A=Math.max(E,M,N),R=Math.min(E,M,N);A>.9&&R<.1&&(E<.2&&(o[T+0]+=1),M<.2&&(o[T+2]+=1),N<.2&&(o[T+4]+=1))}}function h(T){r.push(T.x,T.y,T.z)}function m(T,E){const M=T*3;E.x=t[M+0],E.y=t[M+1],E.z=t[M+2]}function y(){const T=new D,E=new D,M=new D,N=new D,A=new wt,R=new wt,P=new wt;for(let x=0,S=0;x<r.length;x+=9,S+=6){T.set(r[x+0],r[x+1],r[x+2]),E.set(r[x+3],r[x+4],r[x+5]),M.set(r[x+6],r[x+7],r[x+8]),A.set(o[S+0],o[S+1]),R.set(o[S+2],o[S+3]),P.set(o[S+4],o[S+5]),N.copy(T).add(E).add(M).divideScalar(3);const C=p(N);_(A,S+0,T,C),_(R,S+2,E,C),_(P,S+4,M,C)}}function _(T,E,M,N){N<0&&T.x===1&&(o[E]=T.x-1),M.x===0&&M.z===0&&(o[E]=N/2/Math.PI+.5)}function p(T){return Math.atan2(T.z,-T.x)}function d(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new so(t.vertices,t.indices,t.radius,t.details)}}class co extends so{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],a=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,a,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new co(t.radius,t.detail)}}class Ea extends ye{constructor(t=1,e=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:a};const r=t/2,o=e/2,s=Math.floor(n),c=Math.floor(a),l=s+1,u=c+1,f=t/s,h=e/c,m=[],y=[],_=[],p=[];for(let d=0;d<u;d++){const T=d*h-o;for(let E=0;E<l;E++){const M=E*f-r;y.push(M,-T,0),_.push(0,0,1),p.push(E/s),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let T=0;T<s;T++){const E=T+l*d,M=T+l*(d+1),N=T+1+l*(d+1),A=T+1+l*d;m.push(E,M,A),m.push(M,N,A)}this.setIndex(m),this.setAttribute("position",new ce(y,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ta extends ye{constructor(t=.5,e=1,n=32,a=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:a,thetaStart:r,thetaLength:o},n=Math.max(3,n),a=Math.max(1,a);const s=[],c=[],l=[],u=[];let f=t;const h=(e-t)/a,m=new D,y=new wt;for(let _=0;_<=a;_++){for(let p=0;p<=n;p++){const d=r+p/n*o;m.x=f*Math.cos(d),m.y=f*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),y.x=(m.x/e+1)/2,y.y=(m.y/e+1)/2,u.push(y.x,y.y)}f+=h}for(let _=0;_<a;_++){const p=_*(n+1);for(let d=0;d<n;d++){const T=d+p,E=T,M=T+n+1,N=T+n+2,A=T+1;s.push(E,M,A),s.push(M,N,A)}}this.setIndex(s),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Je extends ye{constructor(t=1,e=32,n=16,a=0,r=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:a,phiLength:r,thetaStart:o,thetaLength:s},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+s,Math.PI);let l=0;const u=[],f=new D,h=new D,m=[],y=[],_=[],p=[];for(let d=0;d<=n;d++){const T=[],E=d/n;let M=0;d===0&&o===0?M=.5/e:d===n&&c===Math.PI&&(M=-.5/e);for(let N=0;N<=e;N++){const A=N/e;f.x=-t*Math.cos(a+A*r)*Math.sin(o+E*s),f.y=t*Math.cos(o+E*s),f.z=t*Math.sin(a+A*r)*Math.sin(o+E*s),y.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),p.push(A+M,1-E),T.push(l++)}u.push(T)}for(let d=0;d<n;d++)for(let T=0;T<e;T++){const E=u[d][T+1],M=u[d][T],N=u[d+1][T],A=u[d+1][T+1];(d!==0||o>0)&&m.push(E,M,A),(d!==n-1||c<Math.PI)&&m.push(M,N,A)}this.setIndex(m),this.setAttribute("position",new ce(y,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ul extends Xn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ks,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fl extends Xn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ol extends Xn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const qo={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Bl{constructor(t,e,n){const a=this;let r=!1,o=0,s=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){s++,r===!1&&a.onStart!==void 0&&a.onStart(u,o,s),r=!0},this.itemEnd=function(u){o++,a.onProgress!==void 0&&a.onProgress(u,o,s),o===s&&(r=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const m=l[f],y=l[f+1];if(m.global&&(m.lastIndex=0),m.test(u))return y}return null}}}const Gl=new Bl;class lo{constructor(t){this.manager=t!==void 0?t:Gl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(a,r){n.load(t,a,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}lo.DEFAULT_MATERIAL_NAME="__DEFAULT";class zl extends lo{constructor(t){super(t)}load(t,e,n,a){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=qo.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const s=Ci("img");function c(){u(),qo.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(f){u(),a&&a(f),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){s.removeEventListener("load",c,!1),s.removeEventListener("error",l,!1)}return s.addEventListener("load",c,!1),s.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),r.manager.itemStart(t),s.src=t,s}}class kl extends lo{constructor(t){super(t)}load(t,e,n,a){const r=new ve,o=new zl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(s){r.image=s,r.needsUpdate=!0,e!==void 0&&e(r)},n,a),r}}class Hl extends js{constructor(t=-1,e=1,n=1,a=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=a,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,a,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-t,o=n+t,s=a+e,c=a-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,s-=u*this.view.offsetY,c=s-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,s,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Vl extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class Wl{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ko(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ko();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ko(){return performance.now()}const jo=new ne;class Xl{constructor(t,e,n=0,a=1/0){this.ray=new Ii(t,e),this.near=n,this.far=a,this.camera=null,this.layers=new io,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return jo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jo),this}intersectObject(t,e=!0,n=[]){return qr(t,this,n,e),n.sort(Zo),n}intersectObjects(t,e=!0,n=[]){for(let a=0,r=t.length;a<r;a++)qr(t[a],this,n,e);return n.sort(Zo),n}}function Zo(i,t){return i.distance-t.distance}function qr(i,t,e,n){let a=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(a=!1),a===!0&&n===!0){const r=i.children;for(let o=0,s=r.length;o<s;o++)qr(r[o],t,e,!0)}}class $o{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ut(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Yl extends Wn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Jo(i,t,e,n){const a=ql(n);switch(e){case Is:return i*t;case Fs:return i*t;case Os:return i*t*2;case Bs:return i*t/a.components*a.byteLength;case Qr:return i*t/a.components*a.byteLength;case Gs:return i*t*2/a.components*a.byteLength;case to:return i*t*2/a.components*a.byteLength;case Us:return i*t*3/a.components*a.byteLength;case qe:return i*t*4/a.components*a.byteLength;case eo:return i*t*4/a.components*a.byteLength;case ua:case da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ha:case fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vr:case xr:return Math.max(i,16)*Math.max(t,8)/4;case Sr:case Mr:return Math.max(i,8)*Math.max(t,8)/2;case Er:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Rr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case wr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Cr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Nr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Pr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Lr:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Dr:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ir:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ur:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Fr:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Or:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Br:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Gr:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case pa:case zr:case kr:return Math.ceil(i/4)*Math.ceil(t/4)*16;case zs:case Hr:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Vr:case Wr:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ql(i){switch(i){case fn:case Ps:return{byteLength:1,components:1};case wi:case Ls:case Ni:return{byteLength:2,components:1};case $r:case Jr:return{byteLength:2,components:4};case Hn:case Zr:case un:return{byteLength:4,components:1};case Ds:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jr);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function tc(){let i=null,t=!1,e=null,n=null;function a(r,o){e(r,o),n=i.requestAnimationFrame(a)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(a),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kl(i){const t=new WeakMap;function e(s,c){const l=s.array,u=s.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),s.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)s.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:f}}function n(s,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,s),f.length===0)i.bufferSubData(l,0,u);else{f.sort((m,y)=>m.start-y.start);let h=0;for(let m=1;m<f.length;m++){const y=f[h],_=f[m];_.start<=y.start+y.count+1?y.count=Math.max(y.count,_.start+_.count-y.start):(++h,f[h]=_)}f.length=h+1;for(let m=0,y=f.length;m<y;m++){const _=f[m];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(s){return s.isInterleavedBufferAttribute&&(s=s.data),t.get(s)}function r(s){s.isInterleavedBufferAttribute&&(s=s.data);const c=t.get(s);c&&(i.deleteBuffer(c.buffer),t.delete(s))}function o(s,c){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const u=t.get(s);(!u||u.version<s.version)&&t.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const l=t.get(s);if(l===void 0)t.set(s,e(s,c));else if(l.version<s.version){if(l.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,s,c),l.version=s.version}}return{get:a,remove:r,update:o}}var jl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zl=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$l=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ql=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ru=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,su=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_u=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Su=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Mu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Eu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Au=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ru=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Du=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Iu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ou=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ku=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ku=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ju=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$u=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ju=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,td=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ed=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ad=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,od=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ld=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ud=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_d=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Md=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ed=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Td=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ad=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Pd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ld=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Dd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Id=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ud=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Od=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$d=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,th=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,eh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ih=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ah=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ch=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ph=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_h=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Sh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Eh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Th=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ah=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dt={alphahash_fragment:jl,alphahash_pars_fragment:Zl,alphamap_fragment:$l,alphamap_pars_fragment:Jl,alphatest_fragment:Ql,alphatest_pars_fragment:tu,aomap_fragment:eu,aomap_pars_fragment:nu,batching_pars_vertex:iu,batching_vertex:au,begin_vertex:ru,beginnormal_vertex:ou,bsdfs:su,iridescence_fragment:cu,bumpmap_pars_fragment:lu,clipping_planes_fragment:uu,clipping_planes_pars_fragment:du,clipping_planes_pars_vertex:hu,clipping_planes_vertex:fu,color_fragment:pu,color_pars_fragment:mu,color_pars_vertex:yu,color_vertex:gu,common:_u,cube_uv_reflection_fragment:Su,defaultnormal_vertex:vu,displacementmap_pars_vertex:Mu,displacementmap_vertex:xu,emissivemap_fragment:Eu,emissivemap_pars_fragment:Tu,colorspace_fragment:bu,colorspace_pars_fragment:Au,envmap_fragment:Ru,envmap_common_pars_fragment:wu,envmap_pars_fragment:Cu,envmap_pars_vertex:Nu,envmap_physical_pars_fragment:ku,envmap_vertex:Pu,fog_vertex:Lu,fog_pars_vertex:Du,fog_fragment:Iu,fog_pars_fragment:Uu,gradientmap_pars_fragment:Fu,lightmap_pars_fragment:Ou,lights_lambert_fragment:Bu,lights_lambert_pars_fragment:Gu,lights_pars_begin:zu,lights_toon_fragment:Hu,lights_toon_pars_fragment:Vu,lights_phong_fragment:Wu,lights_phong_pars_fragment:Xu,lights_physical_fragment:Yu,lights_physical_pars_fragment:qu,lights_fragment_begin:Ku,lights_fragment_maps:ju,lights_fragment_end:Zu,logdepthbuf_fragment:$u,logdepthbuf_pars_fragment:Ju,logdepthbuf_pars_vertex:Qu,logdepthbuf_vertex:td,map_fragment:ed,map_pars_fragment:nd,map_particle_fragment:id,map_particle_pars_fragment:ad,metalnessmap_fragment:rd,metalnessmap_pars_fragment:od,morphinstance_vertex:sd,morphcolor_vertex:cd,morphnormal_vertex:ld,morphtarget_pars_vertex:ud,morphtarget_vertex:dd,normal_fragment_begin:hd,normal_fragment_maps:fd,normal_pars_fragment:pd,normal_pars_vertex:md,normal_vertex:yd,normalmap_pars_fragment:gd,clearcoat_normal_fragment_begin:_d,clearcoat_normal_fragment_maps:Sd,clearcoat_pars_fragment:vd,iridescence_pars_fragment:Md,opaque_fragment:xd,packing:Ed,premultiplied_alpha_fragment:Td,project_vertex:bd,dithering_fragment:Ad,dithering_pars_fragment:Rd,roughnessmap_fragment:wd,roughnessmap_pars_fragment:Cd,shadowmap_pars_fragment:Nd,shadowmap_pars_vertex:Pd,shadowmap_vertex:Ld,shadowmask_pars_fragment:Dd,skinbase_vertex:Id,skinning_pars_vertex:Ud,skinning_vertex:Fd,skinnormal_vertex:Od,specularmap_fragment:Bd,specularmap_pars_fragment:Gd,tonemapping_fragment:zd,tonemapping_pars_fragment:kd,transmission_fragment:Hd,transmission_pars_fragment:Vd,uv_pars_fragment:Wd,uv_pars_vertex:Xd,uv_vertex:Yd,worldpos_vertex:qd,background_vert:Kd,background_frag:jd,backgroundCube_vert:Zd,backgroundCube_frag:$d,cube_vert:Jd,cube_frag:Qd,depth_vert:th,depth_frag:eh,distanceRGBA_vert:nh,distanceRGBA_frag:ih,equirect_vert:ah,equirect_frag:rh,linedashed_vert:oh,linedashed_frag:sh,meshbasic_vert:ch,meshbasic_frag:lh,meshlambert_vert:uh,meshlambert_frag:dh,meshmatcap_vert:hh,meshmatcap_frag:fh,meshnormal_vert:ph,meshnormal_frag:mh,meshphong_vert:yh,meshphong_frag:gh,meshphysical_vert:_h,meshphysical_frag:Sh,meshtoon_vert:vh,meshtoon_frag:Mh,points_vert:xh,points_frag:Eh,shadow_vert:Th,shadow_frag:bh,sprite_vert:Ah,sprite_frag:Rh},et={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},$e={basic:{uniforms:xe([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:xe([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:xe([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:xe([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:xe([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:xe([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:xe([et.points,et.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:xe([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:xe([et.common,et.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:xe([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:xe([et.sprite,et.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:xe([et.common,et.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:xe([et.lights,et.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};$e.physical={uniforms:xe([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const oa={r:0,b:0,g:0},In=new Qe,wh=new ne;function Ch(i,t,e,n,a,r,o){const s=new Ht(0);let c=r===!0?0:1,l,u,f=null,h=0,m=null;function y(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const N=y(E);N===null?d(s,c):N&&N.isColor&&(d(N,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,M){const N=y(M);N&&(N.isCubeTexture||N.mapping===Ma)?(u===void 0&&(u=new se(new Ui(1,1,1),new Ze({name:"BackgroundCubeMaterial",uniforms:_i($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Ee,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),In.copy(M.backgroundRotation),In.x*=-1,In.y*=-1,In.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(In.y*=-1,In.z*=-1),u.material.uniforms.envMap.value=N,u.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(wh.makeRotationFromEuler(In)),u.material.toneMapped=Wt.getTransfer(N.colorSpace)!==jt,(f!==N||h!==N.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,f=N,h=N.version,m=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):N&&N.isTexture&&(l===void 0&&(l=new se(new Ea(2,2),new Ze({name:"BackgroundMaterial",uniforms:_i($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(l)),l.material.uniforms.t2D.value=N,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(N.colorSpace)!==jt,N.matrixAutoUpdate===!0&&N.updateMatrix(),l.material.uniforms.uvTransform.value.copy(N.matrix),(f!==N||h!==N.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,f=N,h=N.version,m=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function d(E,M){E.getRGB(oa,Ks(i)),n.buffers.color.setClear(oa.r,oa.g,oa.b,M,o)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(E,M=1){s.set(E),c=M,d(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,d(s,c)},render:_,addToRenderList:p,dispose:T}}function Nh(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},a=h(null);let r=a,o=!1;function s(S,C,z,G,W){let j=!1;const V=f(G,z,C);r!==V&&(r=V,l(r.object)),j=m(S,G,z,W),j&&y(S,G,z,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,M(S,C,z,G),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,C,z){const G=z.wireframe===!0;let W=n[S.id];W===void 0&&(W={},n[S.id]=W);let j=W[C.id];j===void 0&&(j={},W[C.id]=j);let V=j[G];return V===void 0&&(V=h(c()),j[G]=V),V}function h(S){const C=[],z=[],G=[];for(let W=0;W<e;W++)C[W]=0,z[W]=0,G[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:G,object:S,attributes:{},index:null}}function m(S,C,z,G){const W=r.attributes,j=C.attributes;let V=0;const $=z.getAttributes();for(const H in $)if($[H].location>=0){const ut=W[H];let St=j[H];if(St===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(St=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(St=S.instanceColor)),ut===void 0||ut.attribute!==St||St&&ut.data!==St.data)return!0;V++}return r.attributesNum!==V||r.index!==G}function y(S,C,z,G){const W={},j=C.attributes;let V=0;const $=z.getAttributes();for(const H in $)if($[H].location>=0){let ut=j[H];ut===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ut=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ut=S.instanceColor));const St={};St.attribute=ut,ut&&ut.data&&(St.data=ut.data),W[H]=St,V++}r.attributes=W,r.attributesNum=V,r.index=G}function _(){const S=r.newAttributes;for(let C=0,z=S.length;C<z;C++)S[C]=0}function p(S){d(S,0)}function d(S,C){const z=r.newAttributes,G=r.enabledAttributes,W=r.attributeDivisors;z[S]=1,G[S]===0&&(i.enableVertexAttribArray(S),G[S]=1),W[S]!==C&&(i.vertexAttribDivisor(S,C),W[S]=C)}function T(){const S=r.newAttributes,C=r.enabledAttributes;for(let z=0,G=C.length;z<G;z++)C[z]!==S[z]&&(i.disableVertexAttribArray(z),C[z]=0)}function E(S,C,z,G,W,j,V){V===!0?i.vertexAttribIPointer(S,C,z,W,j):i.vertexAttribPointer(S,C,z,G,W,j)}function M(S,C,z,G){_();const W=G.attributes,j=z.getAttributes(),V=C.defaultAttributeValues;for(const $ in j){const H=j[$];if(H.location>=0){let at=W[$];if(at===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(at=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(at=S.instanceColor)),at!==void 0){const ut=at.normalized,St=at.itemSize,It=t.get(at);if(It===void 0)continue;const $t=It.buffer,Y=It.type,tt=It.bytesPerElement,yt=Y===i.INT||Y===i.UNSIGNED_INT||at.gpuType===Zr;if(at.isInterleavedBufferAttribute){const rt=at.data,Et=rt.stride,Xt=at.offset;if(rt.isInstancedInterleavedBuffer){for(let bt=0;bt<H.locationSize;bt++)d(H.location+bt,rt.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let bt=0;bt<H.locationSize;bt++)p(H.location+bt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let bt=0;bt<H.locationSize;bt++)E(H.location+bt,St/H.locationSize,Y,ut,Et*tt,(Xt+St/H.locationSize*bt)*tt,yt)}else{if(at.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)d(H.location+rt,at.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let rt=0;rt<H.locationSize;rt++)p(H.location+rt);i.bindBuffer(i.ARRAY_BUFFER,$t);for(let rt=0;rt<H.locationSize;rt++)E(H.location+rt,St/H.locationSize,Y,ut,St*tt,St/H.locationSize*rt*tt,yt)}}else if(V!==void 0){const ut=V[$];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(H.location,ut);break;case 3:i.vertexAttrib3fv(H.location,ut);break;case 4:i.vertexAttrib4fv(H.location,ut);break;default:i.vertexAttrib1fv(H.location,ut)}}}}T()}function N(){P();for(const S in n){const C=n[S];for(const z in C){const G=C[z];for(const W in G)u(G[W].object),delete G[W];delete C[z]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const z in C){const G=C[z];for(const W in G)u(G[W].object),delete G[W];delete C[z]}delete n[S.id]}function R(S){for(const C in n){const z=n[C];if(z[S.id]===void 0)continue;const G=z[S.id];for(const W in G)u(G[W].object),delete G[W];delete z[S.id]}}function P(){x(),o=!0,r!==a&&(r=a,l(r.object))}function x(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:s,reset:P,resetDefaultState:x,dispose:N,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:T}}function Ph(i,t,e){let n;function a(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),e.update(u,n,f))}function s(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let m=0;for(let y=0;y<f;y++)m+=u[y];e.update(m,n,1)}function c(l,u,f,h){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<l.length;y++)o(l[y],u[y],h[y]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let y=0;for(let _=0;_<f;_++)y+=u[_]*h[_];e.update(y,n,1)}}this.setMode=a,this.render=r,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Lh(i,t,e,n){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");a=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(R){return!(R!==qe&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(R){const P=R===Ni&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==un&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=y>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:m,maxVertexTextures:y,maxTextureSize:_,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:N,maxSamples:A}}function Dh(i){const t=this;let e=null,n=0,a=!1,r=!1;const o=new Mn,s=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||n!==0||a;return a=h,n=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,m){const y=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,d=i.get(f);if(!a||y===null||y.length===0||r&&!p)r?u(null):l();else{const T=r?0:n,E=T*4;let M=d.clippingState||null;c.value=M,M=u(y,h,E,m);for(let N=0;N!==E;++N)M[N]=e[N];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,m,y){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=c.value,y!==!0||p===null){const d=m+_*4,T=h.matrixWorldInverse;s.getNormalMatrix(T),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,M=m;E!==_;++E,M+=4)o.copy(f[E]).applyMatrix4(T,s),o.normal.toArray(p,M),p[M+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Ih(i){let t=new WeakMap;function e(o,s){return s===mr?o.mapping=fi:s===yr&&(o.mapping=pi),o}function n(o){if(o&&o.isTexture){const s=o.mapping;if(s===mr||s===yr)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new wl(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",a),e(l.texture,o.mapping)}else return null}}return o}function a(o){const s=o.target;s.removeEventListener("dispose",a);const c=t.get(s);c!==void 0&&(t.delete(s),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ci=4,Qo=[.125,.215,.35,.446,.526,.582],Gn=20,Ja=new Hl,ts=new Ht;let Qa=null,tr=0,er=0,nr=!1;const On=(1+Math.sqrt(5))/2,oi=1/On,es=[new D(-On,oi,0),new D(On,oi,0),new D(-oi,0,On),new D(oi,0,On),new D(0,On,-oi),new D(0,On,oi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Uh=new D;class ns{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,a=100,r={}){const{size:o=256,position:s=Uh}=r;Qa=this._renderer.getRenderTarget(),tr=this._renderer.getActiveCubeFace(),er=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,a,c,s),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=as(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qa,tr,er),this._renderer.xr.enabled=nr,t.scissorTest=!1,sa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fi||t.mapping===pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qa=this._renderer.getRenderTarget(),tr=this._renderer.getActiveCubeFace(),er=this._renderer.getActiveMipmapLevel(),nr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ye,minFilter:Ye,generateMipmaps:!1,type:Ni,format:qe,colorSpace:gi,depthBuffer:!1},a=is(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=is(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fh(r)),this._blurMaterial=Oh(r,t,e)}return a}_compileMaterial(t){const e=new se(this._lodPlanes[0],t);this._renderer.compile(e,Ja)}_sceneToCubeUV(t,e,n,a,r){const c=new Fe(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(ts),f.toneMapping=An,f.autoClear=!1;const y=new je({name:"PMREM.Background",side:Ee,depthWrite:!1,depthTest:!1}),_=new se(new Ui,y);let p=!1;const d=t.background;d?d.isColor&&(y.color.copy(d),t.background=null,p=!0):(y.color.copy(ts),p=!0);for(let T=0;T<6;T++){const E=T%3;E===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):E===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const M=this._cubeSize;sa(a,E*M,T>2?M:0,M,M),f.setRenderTarget(a),p&&f.render(_,c),f.render(t,c)}_.geometry.dispose(),_.material.dispose(),f.toneMapping=m,f.autoClear=h,t.background=d}_textureToCubeUV(t,e){const n=this._renderer,a=t.mapping===fi||t.mapping===pi;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=rs()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=as());const r=a?this._cubemapMaterial:this._equirectMaterial,o=new se(this._lodPlanes[0],r),s=r.uniforms;s.envMap.value=t;const c=this._cubeSize;sa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ja)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=es[(a-r-1)%es.length];this._blur(t,r-1,r,o,s)}e.autoClear=n}_blur(t,e,n,a,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,a,"latitudinal",r),this._halfBlur(o,t,n,n,a,"longitudinal",r)}_halfBlur(t,e,n,a,r,o,s){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new se(this._lodPlanes[a],l),h=l.uniforms,m=this._sizeLods[n]-1,y=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Gn-1),_=r/y,p=isFinite(r)?1+Math.floor(u*_):Gn;p>Gn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Gn}`);const d=[];let T=0;for(let R=0;R<Gn;++R){const P=R/_,x=Math.exp(-P*P/2);d.push(x),R===0?T+=x:R<p&&(T+=2*x)}for(let R=0;R<d.length;R++)d[R]=d[R]/T;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=d,h.latitudinal.value=o==="latitudinal",s&&(h.poleAxis.value=s);const{_lodMax:E}=this;h.dTheta.value=y,h.mipInt.value=E-n;const M=this._sizeLods[a],N=3*M*(a>E-ci?a-E+ci:0),A=4*(this._cubeSize-M);sa(e,N,A,3*M,2*M),c.setRenderTarget(e),c.render(f,Ja)}}function Fh(i){const t=[],e=[],n=[];let a=i;const r=i-ci+1+Qo.length;for(let o=0;o<r;o++){const s=Math.pow(2,a);e.push(s);let c=1/s;o>i-ci?c=Qo[o-i+ci-1]:o===0&&(c=0),n.push(c);const l=1/(s-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,y=6,_=3,p=2,d=1,T=new Float32Array(_*y*m),E=new Float32Array(p*y*m),M=new Float32Array(d*y*m);for(let A=0;A<m;A++){const R=A%3*2/3-1,P=A>2?0:-1,x=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];T.set(x,_*y*A),E.set(h,p*y*A);const S=[A,A,A,A,A,A];M.set(S,d*y*A)}const N=new ye;N.setAttribute("position",new Be(T,_)),N.setAttribute("uv",new Be(E,p)),N.setAttribute("faceIndex",new Be(M,d)),t.push(N),a>ci&&a--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function is(i,t,e){const n=new Vn(i,t,e);return n.texture.mapping=Ma,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sa(i,t,e,n,a){i.viewport.set(t,e,n,a),i.scissor.set(t,e,n,a)}function Oh(i,t,e){const n=new Float32Array(Gn),a=new D(0,1,0);return new Ze({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:uo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function as(){return new Ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function rs(){return new Ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function uo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Bh(i){let t=new WeakMap,e=null;function n(s){if(s&&s.isTexture){const c=s.mapping,l=c===mr||c===yr,u=c===fi||c===pi;if(l||u){let f=t.get(s);const h=f!==void 0?f.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==h)return e===null&&(e=new ns(i)),f=l?e.fromEquirectangular(s,f):e.fromCubemap(s,f),f.texture.pmremVersion=s.pmremVersion,t.set(s,f),f.texture;if(f!==void 0)return f.texture;{const m=s.image;return l&&m&&m.height>0||u&&m&&a(m)?(e===null&&(e=new ns(i)),f=l?e.fromEquirectangular(s):e.fromCubemap(s),f.texture.pmremVersion=s.pmremVersion,t.set(s,f),s.addEventListener("dispose",r),f.texture):null}}}return s}function a(s){let c=0;const l=6;for(let u=0;u<l;u++)s[u]!==void 0&&c++;return c===l}function r(s){const c=s.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Gh(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let a;switch(n){case"WEBGL_depth_texture":a=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=i.getExtension(n)}return t[n]=a,a}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const a=e(n);return a===null&&Fn("THREE.WebGLRenderer: "+n+" extension not supported."),a}}}function zh(i,t,e,n){const a={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const y in h.attributes)t.remove(h.attributes[y]);h.removeEventListener("dispose",o),delete a[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function s(f,h){return a[h.id]===!0||(h.addEventListener("dispose",o),a[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const m in h)t.update(h[m],i.ARRAY_BUFFER)}function l(f){const h=[],m=f.index,y=f.attributes.position;let _=0;if(m!==null){const T=m.array;_=m.version;for(let E=0,M=T.length;E<M;E+=3){const N=T[E+0],A=T[E+1],R=T[E+2];h.push(N,A,A,R,R,N)}}else if(y!==void 0){const T=y.array;_=y.version;for(let E=0,M=T.length/3-1;E<M;E+=3){const N=E+0,A=E+1,R=E+2;h.push(N,A,A,R,R,N)}}else return;const p=new(Vs(h)?qs:Ys)(h,1);p.version=_;const d=r.get(f);d&&t.remove(d),r.set(f,p)}function u(f){const h=r.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:s,update:c,getWireframeAttribute:u}}function kh(i,t,e){let n;function a(h){n=h}let r,o;function s(h){r=h.type,o=h.bytesPerElement}function c(h,m){i.drawElements(n,m,r,h*o),e.update(m,n,1)}function l(h,m,y){y!==0&&(i.drawElementsInstanced(n,m,r,h*o,y),e.update(m,n,y))}function u(h,m,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,h,0,y);let p=0;for(let d=0;d<y;d++)p+=m[d];e.update(p,n,1)}function f(h,m,y,_){if(y===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<h.length;d++)l(h[d]/o,m[d],_[d]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,h,0,_,0,y);let d=0;for(let T=0;T<y;T++)d+=m[T]*_[T];e.update(d,n,1)}}this.setMode=a,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Hh(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,s){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=s*(r/3);break;case i.LINES:e.lines+=s*(r/2);break;case i.LINE_STRIP:e.lines+=s*(r-1);break;case i.LINE_LOOP:e.lines+=s*r;break;case i.POINTS:e.points+=s*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function a(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:a,update:n}}function Vh(i,t,e){const n=new WeakMap,a=new oe;function r(o,s,c){const l=o.morphTargetInfluences,u=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(s);if(h===void 0||h.count!==f){let S=function(){P.dispose(),n.delete(s),s.removeEventListener("dispose",S)};var m=S;h!==void 0&&h.texture.dispose();const y=s.morphAttributes.position!==void 0,_=s.morphAttributes.normal!==void 0,p=s.morphAttributes.color!==void 0,d=s.morphAttributes.position||[],T=s.morphAttributes.normal||[],E=s.morphAttributes.color||[];let M=0;y===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let N=s.attributes.position.count*M,A=1;N>t.maxTextureSize&&(A=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const R=new Float32Array(N*A*4*f),P=new Ws(R,N,A,f);P.type=un,P.needsUpdate=!0;const x=M*4;for(let C=0;C<f;C++){const z=d[C],G=T[C],W=E[C],j=N*A*4*C;for(let V=0;V<z.count;V++){const $=V*x;y===!0&&(a.fromBufferAttribute(z,V),R[j+$+0]=a.x,R[j+$+1]=a.y,R[j+$+2]=a.z,R[j+$+3]=0),_===!0&&(a.fromBufferAttribute(G,V),R[j+$+4]=a.x,R[j+$+5]=a.y,R[j+$+6]=a.z,R[j+$+7]=0),p===!0&&(a.fromBufferAttribute(W,V),R[j+$+8]=a.x,R[j+$+9]=a.y,R[j+$+10]=a.z,R[j+$+11]=W.itemSize===4?a.w:1)}}h={count:f,texture:P,size:new wt(N,A)},n.set(s,h),s.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let y=0;for(let p=0;p<l.length;p++)y+=l[p];const _=s.morphTargetsRelative?1:1-y;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Wh(i,t,e,n){let a=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,f=t.get(c,u);if(a.get(f)!==l&&(t.update(f),a.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",s)===!1&&c.addEventListener("dispose",s),a.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),a.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;a.get(h)!==l&&(h.update(),a.set(h,l))}return f}function o(){a=new WeakMap}function s(c){const l=c.target;l.removeEventListener("dispose",s),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const ec=new ve,os=new Qs(1,1),nc=new Ws,ic=new dl,ac=new Zs,ss=[],cs=[],ls=new Float32Array(16),us=new Float32Array(9),ds=new Float32Array(4);function Si(i,t,e){const n=i[0];if(n<=0||n>0)return i;const a=t*e;let r=ss[a];if(r===void 0&&(r=new Float32Array(a),ss[a]=r),t!==0){n.toArray(r,0);for(let o=1,s=0;o!==t;++o)s+=e,i[o].toArray(r,s)}return r}function he(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ba(i,t){let e=cs[t];e===void 0&&(e=new Int32Array(t),cs[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Xh(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Yh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2fv(this.addr,t),fe(e,t)}}function qh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;i.uniform3fv(this.addr,t),fe(e,t)}}function Kh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4fv(this.addr,t),fe(e,t)}}function jh(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fe(e,t)}else{if(he(e,n))return;ds.set(n),i.uniformMatrix2fv(this.addr,!1,ds),fe(e,n)}}function Zh(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fe(e,t)}else{if(he(e,n))return;us.set(n),i.uniformMatrix3fv(this.addr,!1,us),fe(e,n)}}function $h(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fe(e,t)}else{if(he(e,n))return;ls.set(n),i.uniformMatrix4fv(this.addr,!1,ls),fe(e,n)}}function Jh(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Qh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2iv(this.addr,t),fe(e,t)}}function tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3iv(this.addr,t),fe(e,t)}}function ef(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4iv(this.addr,t),fe(e,t)}}function nf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function af(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2uiv(this.addr,t),fe(e,t)}}function rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3uiv(this.addr,t),fe(e,t)}}function of(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4uiv(this.addr,t),fe(e,t)}}function sf(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a);let r;this.type===i.SAMPLER_2D_SHADOW?(os.compareFunction=Hs,r=os):r=ec,e.setTexture2D(t||r,a)}function cf(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture3D(t||ic,a)}function lf(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTextureCube(t||ac,a)}function uf(i,t,e){const n=this.cache,a=e.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),e.setTexture2DArray(t||nc,a)}function df(i){switch(i){case 5126:return Xh;case 35664:return Yh;case 35665:return qh;case 35666:return Kh;case 35674:return jh;case 35675:return Zh;case 35676:return $h;case 5124:case 35670:return Jh;case 35667:case 35671:return Qh;case 35668:case 35672:return tf;case 35669:case 35673:return ef;case 5125:return nf;case 36294:return af;case 36295:return rf;case 36296:return of;case 35678:case 36198:case 36298:case 36306:case 35682:return sf;case 35679:case 36299:case 36307:return cf;case 35680:case 36300:case 36308:case 36293:return lf;case 36289:case 36303:case 36311:case 36292:return uf}}function hf(i,t){i.uniform1fv(this.addr,t)}function ff(i,t){const e=Si(t,this.size,2);i.uniform2fv(this.addr,e)}function pf(i,t){const e=Si(t,this.size,3);i.uniform3fv(this.addr,e)}function mf(i,t){const e=Si(t,this.size,4);i.uniform4fv(this.addr,e)}function yf(i,t){const e=Si(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function gf(i,t){const e=Si(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function _f(i,t){const e=Si(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Sf(i,t){i.uniform1iv(this.addr,t)}function vf(i,t){i.uniform2iv(this.addr,t)}function Mf(i,t){i.uniform3iv(this.addr,t)}function xf(i,t){i.uniform4iv(this.addr,t)}function Ef(i,t){i.uniform1uiv(this.addr,t)}function Tf(i,t){i.uniform2uiv(this.addr,t)}function bf(i,t){i.uniform3uiv(this.addr,t)}function Af(i,t){i.uniform4uiv(this.addr,t)}function Rf(i,t,e){const n=this.cache,a=t.length,r=ba(e,a);he(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==a;++o)e.setTexture2D(t[o]||ec,r[o])}function wf(i,t,e){const n=this.cache,a=t.length,r=ba(e,a);he(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==a;++o)e.setTexture3D(t[o]||ic,r[o])}function Cf(i,t,e){const n=this.cache,a=t.length,r=ba(e,a);he(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==a;++o)e.setTextureCube(t[o]||ac,r[o])}function Nf(i,t,e){const n=this.cache,a=t.length,r=ba(e,a);he(n,r)||(i.uniform1iv(this.addr,r),fe(n,r));for(let o=0;o!==a;++o)e.setTexture2DArray(t[o]||nc,r[o])}function Pf(i){switch(i){case 5126:return hf;case 35664:return ff;case 35665:return pf;case 35666:return mf;case 35674:return yf;case 35675:return gf;case 35676:return _f;case 5124:case 35670:return Sf;case 35667:case 35671:return vf;case 35668:case 35672:return Mf;case 35669:case 35673:return xf;case 5125:return Ef;case 36294:return Tf;case 36295:return bf;case 36296:return Af;case 35678:case 36198:case 36298:case 36306:case 35682:return Rf;case 35679:case 36299:case 36307:return wf;case 35680:case 36300:case 36308:case 36293:return Cf;case 36289:case 36303:case 36311:case 36292:return Nf}}class Lf{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=df(e.type)}}class Df{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Pf(e.type)}}class If{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const a=this.seq;for(let r=0,o=a.length;r!==o;++r){const s=a[r];s.setValue(t,e[s.id],n)}}}const ir=/(\w+)(\])?(\[|\.)?/g;function hs(i,t){i.seq.push(t),i.map[t.id]=t}function Uf(i,t,e){const n=i.name,a=n.length;for(ir.lastIndex=0;;){const r=ir.exec(n),o=ir.lastIndex;let s=r[1];const c=r[2]==="]",l=r[3];if(c&&(s=s|0),l===void 0||l==="["&&o+2===a){hs(e,l===void 0?new Lf(s,i,t):new Df(s,i,t));break}else{let f=e.map[s];f===void 0&&(f=new If(s),hs(e,f)),e=f}}}class ya{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const r=t.getActiveUniform(e,a),o=t.getUniformLocation(e,r.name);Uf(r,o,this)}}setValue(t,e,n,a){const r=this.map[e];r!==void 0&&r.setValue(t,n,a)}setOptional(t,e,n){const a=e[n];a!==void 0&&this.setValue(t,n,a)}static upload(t,e,n,a){for(let r=0,o=e.length;r!==o;++r){const s=e[r],c=n[s.id];c.needsUpdate!==!1&&s.setValue(t,c.value,a)}}static seqWithValue(t,e){const n=[];for(let a=0,r=t.length;a!==r;++a){const o=t[a];o.id in e&&n.push(o)}return n}}function fs(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ff=37297;let Of=0;function Bf(i,t){const e=i.split(`
`),n=[],a=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=a;o<r;o++){const s=o+1;n.push(`${s===t?">":" "} ${s}: ${e[o]}`)}return n.join(`
`)}const ps=new Pt;function Gf(i){Wt._getMatrix(ps,Wt.workingColorSpace,i);const t=`mat3( ${ps.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case ga:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ms(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),a=i.getShaderInfoLog(t).trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+a+`

`+Bf(i.getShaderSource(t),o)}else return a}function zf(i,t){const e=Gf(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function kf(i,t){let e;switch(t){case Oc:e="Linear";break;case Bc:e="Reinhard";break;case Gc:e="Cineon";break;case Cs:e="ACESFilmic";break;case kc:e="AgX";break;case Hc:e="Neutral";break;case zc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ca=new D;function Hf(){Wt.getLuminanceCoefficients(ca);const i=ca.x.toFixed(4),t=ca.y.toFixed(4),e=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ri).join(`
`)}function Wf(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Xf(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=i.getActiveAttrib(t,a),o=r.name;let s=1;r.type===i.FLOAT_MAT2&&(s=2),r.type===i.FLOAT_MAT3&&(s=3),r.type===i.FLOAT_MAT4&&(s=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:s}}return e}function Ri(i){return i!==""}function ys(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gs(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Yf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kr(i){return i.replace(Yf,Kf)}const qf=new Map;function Kf(i,t){let e=Dt[t];if(e===void 0){const n=qf.get(t);if(n!==void 0)e=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Kr(e)}const jf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _s(i){return i.replace(jf,Zf)}function Zf(i,t,e,n){let a="";for(let r=parseInt(t);r<parseInt(e);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Ss(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $f(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Rs?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===yc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===cn&&(t="SHADOWMAP_TYPE_VSM"),t}function Jf(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fi:case pi:t="ENVMAP_TYPE_CUBE";break;case Ma:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qf(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case pi:t="ENVMAP_MODE_REFRACTION";break}return t}function tp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ws:t="ENVMAP_BLENDING_MULTIPLY";break;case Uc:t="ENVMAP_BLENDING_MIX";break;case Fc:t="ENVMAP_BLENDING_ADD";break}return t}function ep(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function np(i,t,e,n){const a=i.getContext(),r=e.defines;let o=e.vertexShader,s=e.fragmentShader;const c=$f(e),l=Jf(e),u=Qf(e),f=tp(e),h=ep(e),m=Vf(e),y=Wf(r),_=a.createProgram();let p,d,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(Ri).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(Ri).join(`
`),d.length>0&&(d+=`
`)):(p=[Ss(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ri).join(`
`),d=[Ss(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Dt.tonemapping_pars_fragment:"",e.toneMapping!==An?kf("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,zf("linearToOutputTexel",e.outputColorSpace),Hf(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ri).join(`
`)),o=Kr(o),o=ys(o,e),o=gs(o,e),s=Kr(s),s=ys(s,e),s=gs(s,e),o=_s(o),s=_s(s),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=T+p+o,M=T+d+s,N=fs(a,a.VERTEX_SHADER,E),A=fs(a,a.FRAGMENT_SHADER,M);a.attachShader(_,N),a.attachShader(_,A),e.index0AttributeName!==void 0?a.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&a.bindAttribLocation(_,0,"position"),a.linkProgram(_);function R(C){if(i.debug.checkShaderErrors){const z=a.getProgramInfoLog(_).trim(),G=a.getShaderInfoLog(N).trim(),W=a.getShaderInfoLog(A).trim();let j=!0,V=!0;if(a.getProgramParameter(_,a.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,_,N,A);else{const $=ms(a,N,"vertex"),H=ms(a,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(_,a.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+$+`
`+H)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(G===""||W==="")&&(V=!1);V&&(C.diagnostics={runnable:j,programLog:z,vertexShader:{log:G,prefix:p},fragmentShader:{log:W,prefix:d}})}a.deleteShader(N),a.deleteShader(A),P=new ya(a,_),x=Xf(a,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let x;this.getAttributes=function(){return x===void 0&&R(this),x};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=a.getProgramParameter(_,Ff)),S},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Of++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=A,this}let ip=0;class ap{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,a=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new rp(t),e.set(t,n)),n}}class rp{constructor(t){this.id=ip++,this.code=t,this.usedTimes=0}}function op(i,t,e,n,a,r,o){const s=new io,c=new ap,l=new Set,u=[],f=a.logarithmicDepthBuffer,h=a.vertexTextures;let m=a.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,S,C,z,G){const W=z.fog,j=G.geometry,V=x.isMeshStandardMaterial?z.environment:null,$=(x.isMeshStandardMaterial?e:t).get(x.envMap||V),H=$&&$.mapping===Ma?$.image.height:null,at=y[x.type];x.precision!==null&&(m=a.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const ut=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,St=ut!==void 0?ut.length:0;let It=0;j.morphAttributes.position!==void 0&&(It=1),j.morphAttributes.normal!==void 0&&(It=2),j.morphAttributes.color!==void 0&&(It=3);let $t,Y,tt,yt;if(at){const Kt=$e[at];$t=Kt.vertexShader,Y=Kt.fragmentShader}else $t=x.vertexShader,Y=x.fragmentShader,c.update(x),tt=c.getVertexShaderID(x),yt=c.getFragmentShaderID(x);const rt=i.getRenderTarget(),Et=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,bt=G.isBatchedMesh===!0,re=!!x.map,ee=!!x.matcap,Ft=!!$,w=!!x.aoMap,Pe=!!x.lightMap,Ot=!!x.bumpMap,Bt=!!x.normalMap,vt=!!x.displacementMap,Qt=!!x.emissiveMap,_t=!!x.metalnessMap,b=!!x.roughnessMap,g=x.anisotropy>0,F=x.clearcoat>0,q=x.dispersion>0,Z=x.iridescence>0,X=x.sheen>0,gt=x.transmission>0,ot=g&&!!x.anisotropyMap,dt=F&&!!x.clearcoatMap,zt=F&&!!x.clearcoatNormalMap,Q=F&&!!x.clearcoatRoughnessMap,ft=Z&&!!x.iridescenceMap,Tt=Z&&!!x.iridescenceThicknessMap,At=X&&!!x.sheenColorMap,pt=X&&!!x.sheenRoughnessMap,Gt=!!x.specularMap,Lt=!!x.specularColorMap,Jt=!!x.specularIntensityMap,L=gt&&!!x.transmissionMap,nt=gt&&!!x.thicknessMap,k=!!x.gradientMap,K=!!x.alphaMap,ct=x.alphaTest>0,st=!!x.alphaHash,Nt=!!x.extensions;let ie=An;x.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ie=i.toneMapping);const ge={shaderID:at,shaderType:x.type,shaderName:x.name,vertexShader:$t,fragmentShader:Y,defines:x.defines,customVertexShaderID:tt,customFragmentShaderID:yt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,batching:bt,batchingColor:bt&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:gi,alphaToCoverage:!!x.alphaToCoverage,map:re,matcap:ee,envMap:Ft,envMapMode:Ft&&$.mapping,envMapCubeUVHeight:H,aoMap:w,lightMap:Pe,bumpMap:Ot,normalMap:Bt,displacementMap:h&&vt,emissiveMap:Qt,normalMapObjectSpace:Bt&&x.normalMapType===Yc,normalMapTangentSpace:Bt&&x.normalMapType===ks,metalnessMap:_t,roughnessMap:b,anisotropy:g,anisotropyMap:ot,clearcoat:F,clearcoatMap:dt,clearcoatNormalMap:zt,clearcoatRoughnessMap:Q,dispersion:q,iridescence:Z,iridescenceMap:ft,iridescenceThicknessMap:Tt,sheen:X,sheenColorMap:At,sheenRoughnessMap:pt,specularMap:Gt,specularColorMap:Lt,specularIntensityMap:Jt,transmission:gt,transmissionMap:L,thicknessMap:nt,gradientMap:k,opaque:x.transparent===!1&&x.blending===zn&&x.alphaToCoverage===!1,alphaMap:K,alphaTest:ct,alphaHash:st,combine:x.combine,mapUv:re&&_(x.map.channel),aoMapUv:w&&_(x.aoMap.channel),lightMapUv:Pe&&_(x.lightMap.channel),bumpMapUv:Ot&&_(x.bumpMap.channel),normalMapUv:Bt&&_(x.normalMap.channel),displacementMapUv:vt&&_(x.displacementMap.channel),emissiveMapUv:Qt&&_(x.emissiveMap.channel),metalnessMapUv:_t&&_(x.metalnessMap.channel),roughnessMapUv:b&&_(x.roughnessMap.channel),anisotropyMapUv:ot&&_(x.anisotropyMap.channel),clearcoatMapUv:dt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:zt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:At&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:pt&&_(x.sheenRoughnessMap.channel),specularMapUv:Gt&&_(x.specularMap.channel),specularColorMapUv:Lt&&_(x.specularColorMap.channel),specularIntensityMapUv:Jt&&_(x.specularIntensityMap.channel),transmissionMapUv:L&&_(x.transmissionMap.channel),thicknessMapUv:nt&&_(x.thicknessMap.channel),alphaMapUv:K&&_(x.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Bt||g),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!j.attributes.uv&&(re||K),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Et,skinning:G.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:It,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ie,decodeVideoTexture:re&&x.map.isVideoTexture===!0&&Wt.getTransfer(x.map.colorSpace)===jt,decodeVideoTextureEmissive:Qt&&x.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(x.emissiveMap.colorSpace)===jt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===We,flipSided:x.side===Ee,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Nt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&x.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function d(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)S.push(C),S.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(T(S,x),E(S,x),S.push(i.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function T(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function E(x,S){s.disableAll(),S.supportsVertexTextures&&s.enable(0),S.instancing&&s.enable(1),S.instancingColor&&s.enable(2),S.instancingMorph&&s.enable(3),S.matcap&&s.enable(4),S.envMap&&s.enable(5),S.normalMapObjectSpace&&s.enable(6),S.normalMapTangentSpace&&s.enable(7),S.clearcoat&&s.enable(8),S.iridescence&&s.enable(9),S.alphaTest&&s.enable(10),S.vertexColors&&s.enable(11),S.vertexAlphas&&s.enable(12),S.vertexUv1s&&s.enable(13),S.vertexUv2s&&s.enable(14),S.vertexUv3s&&s.enable(15),S.vertexTangents&&s.enable(16),S.anisotropy&&s.enable(17),S.alphaHash&&s.enable(18),S.batching&&s.enable(19),S.dispersion&&s.enable(20),S.batchingColor&&s.enable(21),x.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reverseDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),x.push(s.mask)}function M(x){const S=y[x.type];let C;if(S){const z=$e[S];C=Tl.clone(z.uniforms)}else C=x.uniforms;return C}function N(x,S){let C;for(let z=0,G=u.length;z<G;z++){const W=u[z];if(W.cacheKey===S){C=W,++C.usedTimes;break}}return C===void 0&&(C=new np(i,S,x,r),u.push(C)),C}function A(x){if(--x.usedTimes===0){const S=u.indexOf(x);u[S]=u[u.length-1],u.pop(),x.destroy()}}function R(x){c.remove(x)}function P(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:M,acquireProgram:N,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:P}}function sp(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let s=i.get(o);return s===void 0&&(s={},i.set(o,s)),s}function n(o){i.delete(o)}function a(o,s,c){i.get(o)[s]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:a,dispose:r}}function cp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function vs(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ms(){const i=[];let t=0;const e=[],n=[],a=[];function r(){t=0,e.length=0,n.length=0,a.length=0}function o(f,h,m,y,_,p){let d=i[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:m,groupOrder:y,renderOrder:f.renderOrder,z:_,group:p},i[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=m,d.groupOrder=y,d.renderOrder=f.renderOrder,d.z=_,d.group=p),t++,d}function s(f,h,m,y,_,p){const d=o(f,h,m,y,_,p);m.transmission>0?n.push(d):m.transparent===!0?a.push(d):e.push(d)}function c(f,h,m,y,_,p){const d=o(f,h,m,y,_,p);m.transmission>0?n.unshift(d):m.transparent===!0?a.unshift(d):e.unshift(d)}function l(f,h){e.length>1&&e.sort(f||cp),n.length>1&&n.sort(h||vs),a.length>1&&a.sort(h||vs)}function u(){for(let f=t,h=i.length;f<h;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:a,init:r,push:s,unshift:c,finish:u,sort:l}}function lp(){let i=new WeakMap;function t(n,a){const r=i.get(n);let o;return r===void 0?(o=new Ms,i.set(n,[o])):a>=r.length?(o=new Ms,r.push(o)):o=r[a],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function up(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Ht};break;case"SpotLight":e={position:new D,direction:new D,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function dp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let hp=0;function fp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function pp(i){const t=new up,e=dp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const a=new D,r=new ne,o=new ne;function s(l){let u=0,f=0,h=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let m=0,y=0,_=0,p=0,d=0,T=0,E=0,M=0,N=0,A=0,R=0;l.sort(fp);for(let x=0,S=l.length;x<S;x++){const C=l[x],z=C.color,G=C.intensity,W=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=z.r*G,f+=z.g*G,h+=z.b*G;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],G);R++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const $=C.shadow,H=e.get(C);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.directionalShadow[m]=H,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=C.shadow.matrix,T++}n.directional[m]=V,m++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(z).multiplyScalar(G),V.distance=W,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[_]=V;const $=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,$.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[_]=$.matrix,C.castShadow){const H=e.get(C);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=j,M++}_++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(z).multiplyScalar(G),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=V,p++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const $=C.shadow,H=e.get(C);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,H.shadowCameraNear=$.camera.near,H.shadowCameraFar=$.camera.far,n.pointShadow[y]=H,n.pointShadowMap[y]=j,n.pointShadowMatrix[y]=C.shadow.matrix,E++}n.point[y]=V,y++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(G),V.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[d]=V,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=et.LTC_FLOAT_1,n.rectAreaLTC2=et.LTC_FLOAT_2):(n.rectAreaLTC1=et.LTC_HALF_1,n.rectAreaLTC2=et.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const P=n.hash;(P.directionalLength!==m||P.pointLength!==y||P.spotLength!==_||P.rectAreaLength!==p||P.hemiLength!==d||P.numDirectionalShadows!==T||P.numPointShadows!==E||P.numSpotShadows!==M||P.numSpotMaps!==N||P.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=y,n.hemi.length=d,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+N-A,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,P.directionalLength=m,P.pointLength=y,P.spotLength=_,P.rectAreaLength=p,P.hemiLength=d,P.numDirectionalShadows=T,P.numPointShadows=E,P.numSpotShadows=M,P.numSpotMaps=N,P.numLightProbes=R,n.version=hp++)}function c(l,u){let f=0,h=0,m=0,y=0,_=0;const p=u.matrixWorldInverse;for(let d=0,T=l.length;d<T;d++){const E=l[d];if(E.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(p),f++}else if(E.isSpotLight){const M=n.spot[m];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const M=n.rectArea[y];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),o.identity(),r.copy(E.matrixWorld),r.premultiply(p),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),y++}else if(E.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),_++}}}return{setup:s,setupView:c,state:n}}function xs(i){const t=new pp(i),e=[],n=[];function a(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function s(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:l,setupLights:s,setupLightsView:c,pushLight:r,pushShadow:o}}function mp(i){let t=new WeakMap;function e(a,r=0){const o=t.get(a);let s;return o===void 0?(s=new xs(i),t.set(a,[s])):r>=o.length?(s=new xs(i),o.push(s)):s=o[r],s}function n(){t=new WeakMap}return{get:e,dispose:n}}const yp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _p(i,t,e){let n=new $s;const a=new wt,r=new wt,o=new oe,s=new Fl({depthPacking:Xc}),c=new Ol,l={},u=e.maxTextureSize,f={[Rn]:Ee,[Ee]:Rn,[We]:We},h=new Ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:yp,fragmentShader:gp}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const y=new ye;y.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new se(y,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rs;let d=this.type;this.render=function(A,R,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const x=i.getRenderTarget(),S=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),z=i.state;z.setBlending(bn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const G=d!==cn&&this.type===cn,W=d===cn&&this.type!==cn;for(let j=0,V=A.length;j<V;j++){const $=A[j],H=$.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;a.copy(H.mapSize);const at=H.getFrameExtents();if(a.multiply(at),r.copy(H.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(r.x=Math.floor(u/at.x),a.x=r.x*at.x,H.mapSize.x=r.x),a.y>u&&(r.y=Math.floor(u/at.y),a.y=r.y*at.y,H.mapSize.y=r.y)),H.map===null||G===!0||W===!0){const St=this.type!==cn?{minFilter:Ke,magFilter:Ke}:{};H.map!==null&&H.map.dispose(),H.map=new Vn(a.x,a.y,St),H.map.texture.name=$.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ut=H.getViewportCount();for(let St=0;St<ut;St++){const It=H.getViewport(St);o.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),z.viewport(o),H.updateMatrices($,St),n=H.getFrustum(),M(R,P,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===cn&&T(H,P),H.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(x,S,C)};function T(A,R){const P=t.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Vn(a.x,a.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,P,h,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,P,m,_,null)}function E(A,R,P,x){let S=null;const C=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)S=C;else if(S=P.isPointLight===!0?c:s,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const z=S.uuid,G=R.uuid;let W=l[z];W===void 0&&(W={},l[z]=W);let j=W[G];j===void 0&&(j=S.clone(),W[G]=j,R.addEventListener("dispose",N)),S=j}if(S.visible=R.visible,S.wireframe=R.wireframe,x===cn?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:f[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const z=i.properties.get(S);z.light=P}return S}function M(A,R,P,x,S){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===cn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const G=t.update(A),W=A.material;if(Array.isArray(W)){const j=G.groups;for(let V=0,$=j.length;V<$;V++){const H=j[V],at=W[H.materialIndex];if(at&&at.visible){const ut=E(A,at,x,S);A.onBeforeShadow(i,A,R,P,G,ut,H),i.renderBufferDirect(P,null,G,ut,A,H),A.onAfterShadow(i,A,R,P,G,ut,H)}}}else if(W.visible){const j=E(A,W,x,S);A.onBeforeShadow(i,A,R,P,G,j,null),i.renderBufferDirect(P,null,G,j,A,null),A.onAfterShadow(i,A,R,P,G,j,null)}}const z=A.children;for(let G=0,W=z.length;G<W;G++)M(z[G],R,P,x,S)}function N(A){A.target.removeEventListener("dispose",N);for(const P in l){const x=l[P],S=A.target.uuid;S in x&&(x[S].dispose(),delete x[S])}}}const Sp={[cr]:lr,[ur]:fr,[dr]:pr,[hi]:hr,[lr]:cr,[fr]:ur,[pr]:dr,[hr]:hi};function vp(i,t){function e(){let L=!1;const nt=new oe;let k=null;const K=new oe(0,0,0,0);return{setMask:function(ct){k!==ct&&!L&&(i.colorMask(ct,ct,ct,ct),k=ct)},setLocked:function(ct){L=ct},setClear:function(ct,st,Nt,ie,ge){ge===!0&&(ct*=ie,st*=ie,Nt*=ie),nt.set(ct,st,Nt,ie),K.equals(nt)===!1&&(i.clearColor(ct,st,Nt,ie),K.copy(nt))},reset:function(){L=!1,k=null,K.set(-1,0,0,0)}}}function n(){let L=!1,nt=!1,k=null,K=null,ct=null;return{setReversed:function(st){if(nt!==st){const Nt=t.get("EXT_clip_control");nt?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT);const ie=ct;ct=null,this.setClear(ie)}nt=st},getReversed:function(){return nt},setTest:function(st){st?rt(i.DEPTH_TEST):Et(i.DEPTH_TEST)},setMask:function(st){k!==st&&!L&&(i.depthMask(st),k=st)},setFunc:function(st){if(nt&&(st=Sp[st]),K!==st){switch(st){case cr:i.depthFunc(i.NEVER);break;case lr:i.depthFunc(i.ALWAYS);break;case ur:i.depthFunc(i.LESS);break;case hi:i.depthFunc(i.LEQUAL);break;case dr:i.depthFunc(i.EQUAL);break;case hr:i.depthFunc(i.GEQUAL);break;case fr:i.depthFunc(i.GREATER);break;case pr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=st}},setLocked:function(st){L=st},setClear:function(st){ct!==st&&(nt&&(st=1-st),i.clearDepth(st),ct=st)},reset:function(){L=!1,k=null,K=null,ct=null,nt=!1}}}function a(){let L=!1,nt=null,k=null,K=null,ct=null,st=null,Nt=null,ie=null,ge=null;return{setTest:function(Kt){L||(Kt?rt(i.STENCIL_TEST):Et(i.STENCIL_TEST))},setMask:function(Kt){nt!==Kt&&!L&&(i.stencilMask(Kt),nt=Kt)},setFunc:function(Kt,Ge,en){(k!==Kt||K!==Ge||ct!==en)&&(i.stencilFunc(Kt,Ge,en),k=Kt,K=Ge,ct=en)},setOp:function(Kt,Ge,en){(st!==Kt||Nt!==Ge||ie!==en)&&(i.stencilOp(Kt,Ge,en),st=Kt,Nt=Ge,ie=en)},setLocked:function(Kt){L=Kt},setClear:function(Kt){ge!==Kt&&(i.clearStencil(Kt),ge=Kt)},reset:function(){L=!1,nt=null,k=null,K=null,ct=null,st=null,Nt=null,ie=null,ge=null}}}const r=new e,o=new n,s=new a,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,m=[],y=null,_=!1,p=null,d=null,T=null,E=null,M=null,N=null,A=null,R=new Ht(0,0,0),P=0,x=!1,S=null,C=null,z=null,G=null,W=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,$=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=$>=2);let at=null,ut={};const St=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),$t=new oe().fromArray(St),Y=new oe().fromArray(It);function tt(L,nt,k,K){const ct=new Uint8Array(4),st=i.createTexture();i.bindTexture(L,st),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Nt=0;Nt<k;Nt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(nt+Nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return st}const yt={};yt[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),s.setClear(0),rt(i.DEPTH_TEST),o.setFunc(hi),Ot(!1),Bt(vo),rt(i.CULL_FACE),w(bn);function rt(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function Et(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Xt(L,nt){return f[L]!==nt?(i.bindFramebuffer(L,nt),f[L]=nt,L===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=nt),L===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function bt(L,nt){let k=m,K=!1;if(L){k=h.get(nt),k===void 0&&(k=[],h.set(nt,k));const ct=L.textures;if(k.length!==ct.length||k[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Nt=ct.length;st<Nt;st++)k[st]=i.COLOR_ATTACHMENT0+st;k.length=ct.length,K=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,K=!0);K&&i.drawBuffers(k)}function re(L){return y!==L?(i.useProgram(L),y=L,!0):!1}const ee={[Bn]:i.FUNC_ADD,[_c]:i.FUNC_SUBTRACT,[Sc]:i.FUNC_REVERSE_SUBTRACT};ee[vc]=i.MIN,ee[Mc]=i.MAX;const Ft={[xc]:i.ZERO,[Ec]:i.ONE,[Tc]:i.SRC_COLOR,[or]:i.SRC_ALPHA,[Nc]:i.SRC_ALPHA_SATURATE,[wc]:i.DST_COLOR,[Ac]:i.DST_ALPHA,[bc]:i.ONE_MINUS_SRC_COLOR,[sr]:i.ONE_MINUS_SRC_ALPHA,[Cc]:i.ONE_MINUS_DST_COLOR,[Rc]:i.ONE_MINUS_DST_ALPHA,[Pc]:i.CONSTANT_COLOR,[Lc]:i.ONE_MINUS_CONSTANT_COLOR,[Dc]:i.CONSTANT_ALPHA,[Ic]:i.ONE_MINUS_CONSTANT_ALPHA};function w(L,nt,k,K,ct,st,Nt,ie,ge,Kt){if(L===bn){_===!0&&(Et(i.BLEND),_=!1);return}if(_===!1&&(rt(i.BLEND),_=!0),L!==gc){if(L!==p||Kt!==x){if((d!==Bn||M!==Bn)&&(i.blendEquation(i.FUNC_ADD),d=Bn,M=Bn),Kt)switch(L){case zn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kn:i.blendFunc(i.ONE,i.ONE);break;case Mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case zn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,E=null,N=null,A=null,R.set(0,0,0),P=0,p=L,x=Kt}return}ct=ct||nt,st=st||k,Nt=Nt||K,(nt!==d||ct!==M)&&(i.blendEquationSeparate(ee[nt],ee[ct]),d=nt,M=ct),(k!==T||K!==E||st!==N||Nt!==A)&&(i.blendFuncSeparate(Ft[k],Ft[K],Ft[st],Ft[Nt]),T=k,E=K,N=st,A=Nt),(ie.equals(R)===!1||ge!==P)&&(i.blendColor(ie.r,ie.g,ie.b,ge),R.copy(ie),P=ge),p=L,x=!1}function Pe(L,nt){L.side===We?Et(i.CULL_FACE):rt(i.CULL_FACE);let k=L.side===Ee;nt&&(k=!k),Ot(k),L.blending===zn&&L.transparent===!1?w(bn):w(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const K=L.stencilWrite;s.setTest(K),K&&(s.setMask(L.stencilWriteMask),s.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),s.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Qt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):Et(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(L){S!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),S=L)}function Bt(L){L!==pc?(rt(i.CULL_FACE),L!==C&&(L===vo?i.cullFace(i.BACK):L===mc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Et(i.CULL_FACE),C=L}function vt(L){L!==z&&(V&&i.lineWidth(L),z=L)}function Qt(L,nt,k){L?(rt(i.POLYGON_OFFSET_FILL),(G!==nt||W!==k)&&(i.polygonOffset(nt,k),G=nt,W=k)):Et(i.POLYGON_OFFSET_FILL)}function _t(L){L?rt(i.SCISSOR_TEST):Et(i.SCISSOR_TEST)}function b(L){L===void 0&&(L=i.TEXTURE0+j-1),at!==L&&(i.activeTexture(L),at=L)}function g(L,nt,k){k===void 0&&(at===null?k=i.TEXTURE0+j-1:k=at);let K=ut[k];K===void 0&&(K={type:void 0,texture:void 0},ut[k]=K),(K.type!==L||K.texture!==nt)&&(at!==k&&(i.activeTexture(k),at=k),i.bindTexture(L,nt||yt[L]),K.type=L,K.texture=nt)}function F(){const L=ut[at];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function q(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function dt(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function zt(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function At(L){$t.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),$t.copy(L))}function pt(L){Y.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function Gt(L,nt){let k=l.get(nt);k===void 0&&(k=new WeakMap,l.set(nt,k));let K=k.get(L);K===void 0&&(K=i.getUniformBlockIndex(nt,L.name),k.set(L,K))}function Lt(L,nt){const K=l.get(nt).get(L);c.get(nt)!==K&&(i.uniformBlockBinding(nt,K,L.__bindingPointIndex),c.set(nt,K))}function Jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},at=null,ut={},f={},h=new WeakMap,m=[],y=null,_=!1,p=null,d=null,T=null,E=null,M=null,N=null,A=null,R=new Ht(0,0,0),P=0,x=!1,S=null,C=null,z=null,G=null,W=null,$t.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),s.reset()}return{buffers:{color:r,depth:o,stencil:s},enable:rt,disable:Et,bindFramebuffer:Xt,drawBuffers:bt,useProgram:re,setBlending:w,setMaterial:Pe,setFlipSided:Ot,setCullFace:Bt,setLineWidth:vt,setPolygonOffset:Qt,setScissorTest:_t,activeTexture:b,bindTexture:g,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:Z,texImage2D:ft,texImage3D:Tt,updateUBOMapping:Gt,uniformBlockBinding:Lt,texStorage2D:zt,texStorage3D:Q,texSubImage2D:X,texSubImage3D:gt,compressedTexSubImage2D:ot,compressedTexSubImage3D:dt,scissor:At,viewport:pt,reset:Jt}}function Mp(i,t,e,n,a,r,o){const s=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new wt,u=new WeakMap;let f;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(b,g){return m?new OffscreenCanvas(b,g):Ci("canvas")}function _(b,g,F){let q=1;const Z=_t(b);if((Z.width>F||Z.height>F)&&(q=F/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(q*Z.width),gt=Math.floor(q*Z.height);f===void 0&&(f=y(X,gt));const ot=g?y(X,gt):f;return ot.width=X,ot.height=gt,ot.getContext("2d").drawImage(b,0,0,X,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+X+"x"+gt+")."),ot}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function p(b){return b.generateMipmaps}function d(b){i.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(b,g,F,q,Z=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=g;if(g===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),g===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),g===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),g===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),g===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),g===i.RGBA){const gt=Z?ga:Wt.getTransfer(q);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=gt===jt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(b,g){let F;return b?g===null||g===Hn||g===mi?F=i.DEPTH24_STENCIL8:g===un?F=i.DEPTH32F_STENCIL8:g===wi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Hn||g===mi?F=i.DEPTH_COMPONENT24:g===un?F=i.DEPTH_COMPONENT32F:g===wi&&(F=i.DEPTH_COMPONENT16),F}function N(b,g){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ke&&b.minFilter!==Ye?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function A(b){const g=b.target;g.removeEventListener("dispose",A),P(g),g.isVideoTexture&&u.delete(g)}function R(b){const g=b.target;g.removeEventListener("dispose",R),S(g)}function P(b){const g=n.get(b);if(g.__webglInit===void 0)return;const F=b.source,q=h.get(F);if(q){const Z=q[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&x(b),Object.keys(q).length===0&&h.delete(F)}n.remove(b)}function x(b){const g=n.get(b);i.deleteTexture(g.__webglTexture);const F=b.source,q=h.get(F);delete q[g.__cacheKey],o.memory.textures--}function S(b){const g=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let Z=0;Z<g.__webglFramebuffer[q].length;Z++)i.deleteFramebuffer(g.__webglFramebuffer[q][Z]);else i.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)i.deleteFramebuffer(g.__webglFramebuffer[q]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const F=b.textures;for(let q=0,Z=F.length;q<Z;q++){const X=n.get(F[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(F[q])}n.remove(b)}let C=0;function z(){C=0}function G(){const b=C;return b>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),C+=1,b}function W(b){const g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function j(b,g){const F=n.get(b);if(b.isVideoTexture&&vt(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){const q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,b,g);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+g)}function V(b,g){const F=n.get(b);if(b.version>0&&F.__version!==b.version){Y(F,b,g);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+g)}function $(b,g){const F=n.get(b);if(b.version>0&&F.__version!==b.version){Y(F,b,g);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+g)}function H(b,g){const F=n.get(b);if(b.version>0&&F.__version!==b.version){tt(F,b,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+g)}const at={[gr]:i.REPEAT,[ln]:i.CLAMP_TO_EDGE,[_r]:i.MIRRORED_REPEAT},ut={[Ke]:i.NEAREST,[Vc]:i.NEAREST_MIPMAP_NEAREST,[Bi]:i.NEAREST_MIPMAP_LINEAR,[Ye]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[Tn]:i.LINEAR_MIPMAP_LINEAR},St={[qc]:i.NEVER,[Qc]:i.ALWAYS,[Kc]:i.LESS,[Hs]:i.LEQUAL,[jc]:i.EQUAL,[Jc]:i.GEQUAL,[Zc]:i.GREATER,[$c]:i.NOTEQUAL};function It(b,g){if(g.type===un&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Ye||g.magFilter===wa||g.magFilter===Bi||g.magFilter===Tn||g.minFilter===Ye||g.minFilter===wa||g.minFilter===Bi||g.minFilter===Tn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,at[g.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,at[g.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,at[g.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ut[g.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ut[g.minFilter]),g.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,St[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ke||g.minFilter!==Bi&&g.minFilter!==Tn||g.type===un&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,a.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function $t(b,g){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",A));const q=g.source;let Z=h.get(q);Z===void 0&&(Z={},h.set(q,Z));const X=W(g);if(X!==b.__cacheKey){Z[X]===void 0&&(Z[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[X].usedTimes++;const gt=Z[b.__cacheKey];gt!==void 0&&(Z[b.__cacheKey].usedTimes--,gt.usedTimes===0&&x(g)),b.__cacheKey=X,b.__webglTexture=Z[X].texture}return F}function Y(b,g,F){let q=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=i.TEXTURE_3D);const Z=$t(b,g),X=g.source;e.bindTexture(q,b.__webglTexture,i.TEXTURE0+F);const gt=n.get(X);if(X.version!==gt.__version||Z===!0){e.activeTexture(i.TEXTURE0+F);const ot=Wt.getPrimaries(Wt.workingColorSpace),dt=g.colorSpace===xn?null:Wt.getPrimaries(g.colorSpace),zt=g.colorSpace===xn||ot===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let Q=_(g.image,!1,a.maxTextureSize);Q=Qt(g,Q);const ft=r.convert(g.format,g.colorSpace),Tt=r.convert(g.type);let At=E(g.internalFormat,ft,Tt,g.colorSpace,g.isVideoTexture);It(q,g);let pt;const Gt=g.mipmaps,Lt=g.isVideoTexture!==!0,Jt=gt.__version===void 0||Z===!0,L=X.dataReady,nt=N(g,Q);if(g.isDepthTexture)At=M(g.format===yi,g.type),Jt&&(Lt?e.texStorage2D(i.TEXTURE_2D,1,At,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,At,Q.width,Q.height,0,ft,Tt,null));else if(g.isDataTexture)if(Gt.length>0){Lt&&Jt&&e.texStorage2D(i.TEXTURE_2D,nt,At,Gt[0].width,Gt[0].height);for(let k=0,K=Gt.length;k<K;k++)pt=Gt[k],Lt?L&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(i.TEXTURE_2D,k,At,pt.width,pt.height,0,ft,Tt,pt.data);g.generateMipmaps=!1}else Lt?(Jt&&e.texStorage2D(i.TEXTURE_2D,nt,At,Q.width,Q.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,ft,Tt,Q.data)):e.texImage2D(i.TEXTURE_2D,0,At,Q.width,Q.height,0,ft,Tt,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Lt&&Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,nt,At,Gt[0].width,Gt[0].height,Q.depth);for(let k=0,K=Gt.length;k<K;k++)if(pt=Gt[k],g.format!==qe)if(ft!==null)if(Lt){if(L)if(g.layerUpdates.size>0){const ct=Jo(pt.width,pt.height,g.format,g.type);for(const st of g.layerUpdates){const Nt=pt.data.subarray(st*ct/pt.data.BYTES_PER_ELEMENT,(st+1)*ct/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,st,pt.width,pt.height,1,ft,Nt)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,pt.width,pt.height,Q.depth,ft,pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,k,At,pt.width,pt.height,Q.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,pt.width,pt.height,Q.depth,ft,Tt,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,k,At,pt.width,pt.height,Q.depth,0,ft,Tt,pt.data)}else{Lt&&Jt&&e.texStorage2D(i.TEXTURE_2D,nt,At,Gt[0].width,Gt[0].height);for(let k=0,K=Gt.length;k<K;k++)pt=Gt[k],g.format!==qe?ft!==null?Lt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,k,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,k,At,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?L&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,pt.width,pt.height,ft,Tt,pt.data):e.texImage2D(i.TEXTURE_2D,k,At,pt.width,pt.height,0,ft,Tt,pt.data)}else if(g.isDataArrayTexture)if(Lt){if(Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,nt,At,Q.width,Q.height,Q.depth),L)if(g.layerUpdates.size>0){const k=Jo(Q.width,Q.height,g.format,g.type);for(const K of g.layerUpdates){const ct=Q.data.subarray(K*k/Q.data.BYTES_PER_ELEMENT,(K+1)*k/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,Q.width,Q.height,1,ft,Tt,ct)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ft,Tt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,At,Q.width,Q.height,Q.depth,0,ft,Tt,Q.data);else if(g.isData3DTexture)Lt?(Jt&&e.texStorage3D(i.TEXTURE_3D,nt,At,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ft,Tt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,At,Q.width,Q.height,Q.depth,0,ft,Tt,Q.data);else if(g.isFramebufferTexture){if(Jt)if(Lt)e.texStorage2D(i.TEXTURE_2D,nt,At,Q.width,Q.height);else{let k=Q.width,K=Q.height;for(let ct=0;ct<nt;ct++)e.texImage2D(i.TEXTURE_2D,ct,At,k,K,0,ft,Tt,null),k>>=1,K>>=1}}else if(Gt.length>0){if(Lt&&Jt){const k=_t(Gt[0]);e.texStorage2D(i.TEXTURE_2D,nt,At,k.width,k.height)}for(let k=0,K=Gt.length;k<K;k++)pt=Gt[k],Lt?L&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,ft,Tt,pt):e.texImage2D(i.TEXTURE_2D,k,At,ft,Tt,pt);g.generateMipmaps=!1}else if(Lt){if(Jt){const k=_t(Q);e.texStorage2D(i.TEXTURE_2D,nt,At,k.width,k.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,Tt,Q)}else e.texImage2D(i.TEXTURE_2D,0,At,ft,Tt,Q);p(g)&&d(q),gt.__version=X.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function tt(b,g,F){if(g.image.length!==6)return;const q=$t(b,g),Z=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const X=n.get(Z);if(Z.version!==X.__version||q===!0){e.activeTexture(i.TEXTURE0+F);const gt=Wt.getPrimaries(Wt.workingColorSpace),ot=g.colorSpace===xn?null:Wt.getPrimaries(g.colorSpace),dt=g.colorSpace===xn||gt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const zt=g.isCompressedTexture||g.image[0].isCompressedTexture,Q=g.image[0]&&g.image[0].isDataTexture,ft=[];for(let K=0;K<6;K++)!zt&&!Q?ft[K]=_(g.image[K],!0,a.maxCubemapSize):ft[K]=Q?g.image[K].image:g.image[K],ft[K]=Qt(g,ft[K]);const Tt=ft[0],At=r.convert(g.format,g.colorSpace),pt=r.convert(g.type),Gt=E(g.internalFormat,At,pt,g.colorSpace),Lt=g.isVideoTexture!==!0,Jt=X.__version===void 0||q===!0,L=Z.dataReady;let nt=N(g,Tt);It(i.TEXTURE_CUBE_MAP,g);let k;if(zt){Lt&&Jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,nt,Gt,Tt.width,Tt.height);for(let K=0;K<6;K++){k=ft[K].mipmaps;for(let ct=0;ct<k.length;ct++){const st=k[ct];g.format!==qe?At!==null?Lt?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,0,0,st.width,st.height,At,st.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,Gt,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,0,0,st.width,st.height,At,pt,st.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct,Gt,st.width,st.height,0,At,pt,st.data)}}}else{if(k=g.mipmaps,Lt&&Jt){k.length>0&&nt++;const K=_t(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,nt,Gt,K.width,K.height)}for(let K=0;K<6;K++)if(Q){Lt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ft[K].width,ft[K].height,At,pt,ft[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Gt,ft[K].width,ft[K].height,0,At,pt,ft[K].data);for(let ct=0;ct<k.length;ct++){const Nt=k[ct].image[K].image;Lt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,0,0,Nt.width,Nt.height,At,pt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,Gt,Nt.width,Nt.height,0,At,pt,Nt.data)}}else{Lt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,At,pt,ft[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Gt,At,pt,ft[K]);for(let ct=0;ct<k.length;ct++){const st=k[ct];Lt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,0,0,At,pt,st.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ct+1,Gt,At,pt,st.image[K])}}}p(g)&&d(i.TEXTURE_CUBE_MAP),X.__version=Z.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function yt(b,g,F,q,Z,X){const gt=r.convert(F.format,F.colorSpace),ot=r.convert(F.type),dt=E(F.internalFormat,gt,ot,F.colorSpace),zt=n.get(g),Q=n.get(F);if(Q.__renderTarget=g,!zt.__hasExternalTextures){const ft=Math.max(1,g.width>>X),Tt=Math.max(1,g.height>>X);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,X,dt,ft,Tt,g.depth,0,gt,ot,null):e.texImage2D(Z,X,dt,ft,Tt,0,gt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),Bt(g)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Z,Q.__webglTexture,0,Ot(g)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Z,Q.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(b,g,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),g.depthBuffer){const q=g.depthTexture,Z=q&&q.isDepthTexture?q.type:null,X=M(g.stencilBuffer,Z),gt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=Ot(g);Bt(g)?s.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,X,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,X,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,X,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,b)}else{const q=g.textures;for(let Z=0;Z<q.length;Z++){const X=q[Z],gt=r.convert(X.format,X.colorSpace),ot=r.convert(X.type),dt=E(X.internalFormat,gt,ot,X.colorSpace),zt=Ot(g);F&&Bt(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,dt,g.width,g.height):Bt(g)?s.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,dt,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,dt,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Et(b,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(g.depthTexture);q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),j(g.depthTexture,0);const Z=q.__webglTexture,X=Ot(g);if(g.depthTexture.format===ui)Bt(g)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(g.depthTexture.format===yi)Bt(g)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Xt(b){const g=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),q){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=q}if(b.depthTexture&&!g.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Et(g.__webglFramebuffer,b)}else if(F){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]===void 0)g.__webglDepthbuffer[q]=i.createRenderbuffer(),rt(g.__webglDepthbuffer[q],b,!1);else{const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,X)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),rt(g.__webglDepthbuffer,b,!1);else{const q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,Z)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function bt(b,g,F){const q=n.get(b);g!==void 0&&yt(q.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Xt(b)}function re(b){const g=b.texture,F=n.get(b),q=n.get(g);b.addEventListener("dispose",R);const Z=b.textures,X=b.isWebGLCubeRenderTarget===!0,gt=Z.length>1;if(gt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=g.version,o.memory.textures++),X){F.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[ot]=[];for(let dt=0;dt<g.mipmaps.length;dt++)F.__webglFramebuffer[ot][dt]=i.createFramebuffer()}else F.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let ot=0;ot<g.mipmaps.length;ot++)F.__webglFramebuffer[ot]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(gt)for(let ot=0,dt=Z.length;ot<dt;ot++){const zt=n.get(Z[ot]);zt.__webglTexture===void 0&&(zt.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&Bt(b)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ot=0;ot<Z.length;ot++){const dt=Z[ot];F.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ot]);const zt=r.convert(dt.format,dt.colorSpace),Q=r.convert(dt.type),ft=E(dt.internalFormat,zt,Q,dt.colorSpace,b.isXRRenderTarget===!0),Tt=Ot(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,ft,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,F.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),It(i.TEXTURE_CUBE_MAP,g);for(let ot=0;ot<6;ot++)if(g.mipmaps&&g.mipmaps.length>0)for(let dt=0;dt<g.mipmaps.length;dt++)yt(F.__webglFramebuffer[ot][dt],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,dt);else yt(F.__webglFramebuffer[ot],b,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(g)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let ot=0,dt=Z.length;ot<dt;ot++){const zt=Z[ot],Q=n.get(zt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),It(i.TEXTURE_2D,zt),yt(F.__webglFramebuffer,b,zt,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,0),p(zt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ot=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,q.__webglTexture),It(ot,g),g.mipmaps&&g.mipmaps.length>0)for(let dt=0;dt<g.mipmaps.length;dt++)yt(F.__webglFramebuffer[dt],b,g,i.COLOR_ATTACHMENT0,ot,dt);else yt(F.__webglFramebuffer,b,g,i.COLOR_ATTACHMENT0,ot,0);p(g)&&d(ot),e.unbindTexture()}b.depthBuffer&&Xt(b)}function ee(b){const g=b.textures;for(let F=0,q=g.length;F<q;F++){const Z=g[F];if(p(Z)){const X=T(b),gt=n.get(Z).__webglTexture;e.bindTexture(X,gt),d(X),e.unbindTexture()}}}const Ft=[],w=[];function Pe(b){if(b.samples>0){if(Bt(b)===!1){const g=b.textures,F=b.width,q=b.height;let Z=i.COLOR_BUFFER_BIT;const X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(b),ot=g.length>1;if(ot)for(let dt=0;dt<g.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let dt=0;dt<g.length;dt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const zt=n.get(g[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,zt,0)}i.blitFramebuffer(0,0,F,q,0,0,F,q,Z,i.NEAREST),c===!0&&(Ft.length=0,w.length=0,Ft.push(i.COLOR_ATTACHMENT0+dt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Ft.push(X),w.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ft))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let dt=0;dt<g.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const zt=n.get(g[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const g=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ot(b){return Math.min(a.maxSamples,b.samples)}function Bt(b){const g=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function vt(b){const g=o.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function Qt(b,g){const F=b.colorSpace,q=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==gi&&F!==xn&&(Wt.getTransfer(F)===jt?(q!==qe||Z!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),g}function _t(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=z,this.setTexture2D=j,this.setTexture2DArray=V,this.setTexture3D=$,this.setTextureCube=H,this.rebindTextures=bt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Bt}function xp(i,t){function e(n,a=xn){let r;const o=Wt.getTransfer(a);if(n===fn)return i.UNSIGNED_BYTE;if(n===$r)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ds)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ps)return i.BYTE;if(n===Ls)return i.SHORT;if(n===wi)return i.UNSIGNED_SHORT;if(n===Zr)return i.INT;if(n===Hn)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===Ni)return i.HALF_FLOAT;if(n===Is)return i.ALPHA;if(n===Us)return i.RGB;if(n===qe)return i.RGBA;if(n===Fs)return i.LUMINANCE;if(n===Os)return i.LUMINANCE_ALPHA;if(n===ui)return i.DEPTH_COMPONENT;if(n===yi)return i.DEPTH_STENCIL;if(n===Bs)return i.RED;if(n===Qr)return i.RED_INTEGER;if(n===Gs)return i.RG;if(n===to)return i.RG_INTEGER;if(n===eo)return i.RGBA_INTEGER;if(n===ua||n===da||n===ha||n===fa)if(o===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sr||n===vr||n===Mr||n===xr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Er||n===Tr||n===br)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Er||n===Tr)return o===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===br)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ar||n===Rr||n===wr||n===Cr||n===Nr||n===Pr||n===Lr||n===Dr||n===Ir||n===Ur||n===Fr||n===Or||n===Br||n===Gr)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ar)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Cr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ir)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ur)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Or)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Br)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gr)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pa||n===zr||n===kr)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===pa)return o===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zs||n===Hr||n===Vr||n===Wr)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===pa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Hr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Ep=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Tp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const a=new ve,r=t.properties.get(a);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ze({vertexShader:Ep,fragmentShader:Tp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new Ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ap extends Wn{constructor(t,e){super();const n=this;let a=null,r=1,o=null,s="local-floor",c=1,l=null,u=null,f=null,h=null,m=null,y=null;const _=new bp,p=e.getContextAttributes();let d=null,T=null;const E=[],M=[],N=new wt;let A=null;const R=new Fe;R.viewport=new oe;const P=new Fe;P.viewport=new oe;const x=[R,P],S=new Vl;let C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=E[Y];return tt===void 0&&(tt=new ja,E[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=E[Y];return tt===void 0&&(tt=new ja,E[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=E[Y];return tt===void 0&&(tt=new ja,E[Y]=tt),tt.getHandSpace()};function G(Y){const tt=M.indexOf(Y.inputSource);if(tt===-1)return;const yt=E[tt];yt!==void 0&&(yt.update(Y.inputSource,Y.frame,l||o),yt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",j);for(let Y=0;Y<E.length;Y++){const tt=M[Y];tt!==null&&(M[Y]=null,E[Y].disconnect(tt))}C=null,z=null,_.reset(),t.setRenderTarget(d),m=null,h=null,f=null,a=null,T=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f},this.getFrame=function(){return y},this.getSession=function(){return a},this.setSession=async function(Y){if(a=Y,a!==null){if(d=t.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",W),a.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(N),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,rt=null,Et=null;p.depth&&(Et=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=p.stencil?yi:ui,rt=p.stencil?mi:Hn);const Xt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};f=new XRWebGLBinding(a,e),h=f.createProjectionLayer(Xt),a.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),T=new Vn(h.textureWidth,h.textureHeight,{format:qe,type:fn,depthTexture:new Qs(h.textureWidth,h.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const yt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,e,yt),a.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Vn(m.framebufferWidth,m.framebufferHeight,{format:qe,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await a.requestReferenceSpace(s),$t.setContext(a),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(Y){for(let tt=0;tt<Y.removed.length;tt++){const yt=Y.removed[tt],rt=M.indexOf(yt);rt>=0&&(M[rt]=null,E[rt].disconnect(yt))}for(let tt=0;tt<Y.added.length;tt++){const yt=Y.added[tt];let rt=M.indexOf(yt);if(rt===-1){for(let Xt=0;Xt<E.length;Xt++)if(Xt>=M.length){M.push(yt),rt=Xt;break}else if(M[Xt]===null){M[Xt]=yt,rt=Xt;break}if(rt===-1)break}const Et=E[rt];Et&&Et.connect(yt)}}const V=new D,$=new D;function H(Y,tt,yt){V.setFromMatrixPosition(tt.matrixWorld),$.setFromMatrixPosition(yt.matrixWorld);const rt=V.distanceTo($),Et=tt.projectionMatrix.elements,Xt=yt.projectionMatrix.elements,bt=Et[14]/(Et[10]-1),re=Et[14]/(Et[10]+1),ee=(Et[9]+1)/Et[5],Ft=(Et[9]-1)/Et[5],w=(Et[8]-1)/Et[0],Pe=(Xt[8]+1)/Xt[0],Ot=bt*w,Bt=bt*Pe,vt=rt/(-w+Pe),Qt=vt*-w;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Qt),Y.translateZ(vt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Et[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const _t=bt+vt,b=re+vt,g=Ot-Qt,F=Bt+(rt-Qt),q=ee*re/b*_t,Z=Ft*re/b*_t;Y.projectionMatrix.makePerspective(g,F,q,Z,_t,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function at(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(a===null)return;let tt=Y.near,yt=Y.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(yt=_.depthFar)),S.near=P.near=R.near=tt,S.far=P.far=R.far=yt,(C!==S.near||z!==S.far)&&(a.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,z=S.far),R.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,S.layers.mask=R.layers.mask|P.layers.mask;const rt=Y.parent,Et=S.cameras;at(S,rt);for(let Xt=0;Xt<Et.length;Xt++)at(Et[Xt],rt);Et.length===2?H(S,R,P):S.projectionMatrix.copy(R.projectionMatrix),ut(Y,S,rt)};function ut(Y,tt,yt){yt===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(yt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Xr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(Y){c=Y,h!==null&&(h.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let St=null;function It(Y,tt){if(u=tt.getViewerPose(l||o),y=tt,u!==null){const yt=u.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let rt=!1;yt.length!==S.cameras.length&&(S.cameras.length=0,rt=!0);for(let bt=0;bt<yt.length;bt++){const re=yt[bt];let ee=null;if(m!==null)ee=m.getViewport(re);else{const w=f.getViewSubImage(h,re);ee=w.viewport,bt===0&&(t.setRenderTargetTextures(T,w.colorTexture,h.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(T))}let Ft=x[bt];Ft===void 0&&(Ft=new Fe,Ft.layers.enable(bt),Ft.viewport=new oe,x[bt]=Ft),Ft.matrix.fromArray(re.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(re.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(ee.x,ee.y,ee.width,ee.height),bt===0&&(S.matrix.copy(Ft.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),rt===!0&&S.cameras.push(Ft)}const Et=a.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&f){const bt=f.getDepthInformation(yt[0]);bt&&bt.isValid&&bt.texture&&_.init(t,bt,a.renderState)}}for(let yt=0;yt<E.length;yt++){const rt=M[yt],Et=E[yt];rt!==null&&Et!==void 0&&Et.update(rt,tt,l||o)}St&&St(Y,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),y=null}const $t=new tc;$t.setAnimationLoop(It),this.setAnimationLoop=function(Y){St=Y},this.dispose=function(){}}}const Un=new Qe,Rp=new ne;function wp(i,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Ks(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function a(p,d,T,E,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),f(p,d)):d.isMeshPhongMaterial?(r(p,d),u(p,d)):d.isMeshStandardMaterial?(r(p,d),h(p,d),d.isMeshPhysicalMaterial&&m(p,d,M)):d.isMeshMatcapMaterial?(r(p,d),y(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&s(p,d)):d.isPointsMaterial?c(p,d,T,E):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Ee&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Ee&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const T=t.get(d),E=T.envMap,M=T.envMapRotation;E&&(p.envMap.value=E,Un.copy(M),Un.x*=-1,Un.y*=-1,Un.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),p.envMapRotation.value.setFromMatrix4(Rp.makeRotationFromEuler(Un)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function s(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,T,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*T,p.scale.value=E*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,T){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ee&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function y(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const T=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function Cp(i,t,e,n){let a={},r={},o=[];const s=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,E){const M=E.program;n.uniformBlockBinding(T,M)}function l(T,E){let M=a[T.id];M===void 0&&(y(T),M=u(T),a[T.id]=M,T.addEventListener("dispose",p));const N=E.program;n.updateUBOMapping(T,N);const A=t.render.frame;r[T.id]!==A&&(h(T),r[T.id]=A)}function u(T){const E=f();T.__bindingPointIndex=E;const M=i.createBuffer(),N=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,N,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function f(){for(let T=0;T<s;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const E=a[T.id],M=T.uniforms,N=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,R=M.length;A<R;A++){const P=Array.isArray(M[A])?M[A]:[M[A]];for(let x=0,S=P.length;x<S;x++){const C=P[x];if(m(C,A,x,N)===!0){const z=C.__offset,G=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let j=0;j<G.length;j++){const V=G[j],$=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,z+W,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,W),W+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,E,M,N){const A=T.value,R=E+"_"+M;if(N[R]===void 0)return typeof A=="number"||typeof A=="boolean"?N[R]=A:N[R]=A.clone(),!0;{const P=N[R];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return N[R]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function y(T){const E=T.uniforms;let M=0;const N=16;for(let R=0,P=E.length;R<P;R++){const x=Array.isArray(E[R])?E[R]:[E[R]];for(let S=0,C=x.length;S<C;S++){const z=x[S],G=Array.isArray(z.value)?z.value:[z.value];for(let W=0,j=G.length;W<j;W++){const V=G[W],$=_(V),H=M%N,at=H%$.boundary,ut=H+at;M+=at,ut!==0&&N-ut<$.storage&&(M+=N-ut),z.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=M,M+=$.storage}}}const A=M%N;return A>0&&(M+=N-A),T.__size=M,T.__cache={},this}function _(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function p(T){const E=T.target;E.removeEventListener("dispose",p);const M=o.indexOf(E.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(a[E.id]),delete a[E.id],delete r[E.id]}function d(){for(const T in a)i.deleteBuffer(a[T]);o=[],a={},r={}}return{bind:c,update:l,dispose:d}}class Np{constructor(t={}){const{canvas:e=nl(),context:n=null,depth:a=!0,stencil:r=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const y=new Uint32Array(4),_=new Int32Array(4);let p=null,d=null;const T=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=An,this.toneMappingExposure=1;const M=this;let N=!1,A=0,R=0,P=null,x=-1,S=null;const C=new oe,z=new oe;let G=null;const W=new Ht(0);let j=0,V=e.width,$=e.height,H=1,at=null,ut=null;const St=new oe(0,0,V,$),It=new oe(0,0,V,$);let $t=!1;const Y=new $s;let tt=!1,yt=!1;this.transmissionResolutionScale=1;const rt=new ne,Et=new ne,Xt=new D,bt=new oe,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ee=!1;function Ft(){return P===null?H:1}let w=n;function Pe(v,I){return e.getContext(v,I)}try{const v={alpha:!0,depth:a,stencil:r,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${jr}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",st,!1),w===null){const I="webgl2";if(w=Pe(I,v),w===null)throw Pe(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ot,Bt,vt,Qt,_t,b,g,F,q,Z,X,gt,ot,dt,zt,Q,ft,Tt,At,pt,Gt,Lt,Jt,L;function nt(){Ot=new Gh(w),Ot.init(),Lt=new xp(w,Ot),Bt=new Lh(w,Ot,t,Lt),vt=new vp(w,Ot),Bt.reverseDepthBuffer&&h&&vt.buffers.depth.setReversed(!0),Qt=new Hh(w),_t=new sp,b=new Mp(w,Ot,vt,_t,Bt,Lt,Qt),g=new Ih(M),F=new Bh(M),q=new Kl(w),Jt=new Nh(w,q),Z=new zh(w,q,Qt,Jt),X=new Wh(w,Z,q,Qt),At=new Vh(w,Bt,b),Q=new Dh(_t),gt=new op(M,g,F,Ot,Bt,Jt,Q),ot=new wp(M,_t),dt=new lp,zt=new mp(Ot),Tt=new Ch(M,g,F,vt,X,m,c),ft=new _p(M,X,Bt),L=new Cp(w,Qt,Bt,vt),pt=new Ph(w,Ot,Qt),Gt=new kh(w,Ot,Qt),Qt.programs=gt.programs,M.capabilities=Bt,M.extensions=Ot,M.properties=_t,M.renderLists=dt,M.shadowMap=ft,M.state=vt,M.info=Qt}nt();const k=new Ap(M,w);this.xr=k,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const v=Ot.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ot.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(v){v!==void 0&&(H=v,this.setSize(V,$,!1))},this.getSize=function(v){return v.set(V,$)},this.setSize=function(v,I,O=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=v,$=I,e.width=Math.floor(v*H),e.height=Math.floor(I*H),O===!0&&(e.style.width=v+"px",e.style.height=I+"px"),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(V*H,$*H).floor()},this.setDrawingBufferSize=function(v,I,O){V=v,$=I,H=O,e.width=Math.floor(v*O),e.height=Math.floor(I*O),this.setViewport(0,0,v,I)},this.getCurrentViewport=function(v){return v.copy(C)},this.getViewport=function(v){return v.copy(St)},this.setViewport=function(v,I,O,B){v.isVector4?St.set(v.x,v.y,v.z,v.w):St.set(v,I,O,B),vt.viewport(C.copy(St).multiplyScalar(H).round())},this.getScissor=function(v){return v.copy(It)},this.setScissor=function(v,I,O,B){v.isVector4?It.set(v.x,v.y,v.z,v.w):It.set(v,I,O,B),vt.scissor(z.copy(It).multiplyScalar(H).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(v){vt.setScissorTest($t=v)},this.setOpaqueSort=function(v){at=v},this.setTransparentSort=function(v){ut=v},this.getClearColor=function(v){return v.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor(...arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,O=!0){let B=0;if(v){let U=!1;if(P!==null){const J=P.texture.format;U=J===eo||J===to||J===Qr}if(U){const J=P.texture.type,it=J===fn||J===Hn||J===wi||J===mi||J===$r||J===Jr,lt=Tt.getClearColor(),mt=Tt.getClearAlpha(),Rt=lt.r,Ct=lt.g,Mt=lt.b;it?(y[0]=Rt,y[1]=Ct,y[2]=Mt,y[3]=mt,w.clearBufferuiv(w.COLOR,0,y)):(_[0]=Rt,_[1]=Ct,_[2]=Mt,_[3]=mt,w.clearBufferiv(w.COLOR,0,_))}else B|=w.COLOR_BUFFER_BIT}I&&(B|=w.DEPTH_BUFFER_BIT),O&&(B|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",st,!1),Tt.dispose(),dt.dispose(),zt.dispose(),_t.dispose(),g.dispose(),F.dispose(),X.dispose(),Jt.dispose(),L.dispose(),gt.dispose(),k.dispose(),k.removeEventListener("sessionstart",fo),k.removeEventListener("sessionend",po),wn.stop()};function K(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const v=Qt.autoReset,I=ft.enabled,O=ft.autoUpdate,B=ft.needsUpdate,U=ft.type;nt(),Qt.autoReset=v,ft.enabled=I,ft.autoUpdate=O,ft.needsUpdate=B,ft.type=U}function st(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Nt(v){const I=v.target;I.removeEventListener("dispose",Nt),ie(I)}function ie(v){ge(v),_t.remove(v)}function ge(v){const I=_t.get(v).programs;I!==void 0&&(I.forEach(function(O){gt.releaseProgram(O)}),v.isShaderMaterial&&gt.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,O,B,U,J){I===null&&(I=re);const it=U.isMesh&&U.matrixWorld.determinant()<0,lt=oc(v,I,O,B,U);vt.setMaterial(B,it);let mt=O.index,Rt=1;if(B.wireframe===!0){if(mt=Z.getWireframeAttribute(O),mt===void 0)return;Rt=2}const Ct=O.drawRange,Mt=O.attributes.position;let kt=Ct.start*Rt,Yt=(Ct.start+Ct.count)*Rt;J!==null&&(kt=Math.max(kt,J.start*Rt),Yt=Math.min(Yt,(J.start+J.count)*Rt)),mt!==null?(kt=Math.max(kt,0),Yt=Math.min(Yt,mt.count)):Mt!=null&&(kt=Math.max(kt,0),Yt=Math.min(Yt,Mt.count));const le=Yt-kt;if(le<0||le===1/0)return;Jt.setup(U,B,lt,O,mt);let ae,Vt=pt;if(mt!==null&&(ae=q.get(mt),Vt=Gt,Vt.setIndex(ae)),U.isMesh)B.wireframe===!0?(vt.setLineWidth(B.wireframeLinewidth*Ft()),Vt.setMode(w.LINES)):Vt.setMode(w.TRIANGLES);else if(U.isLine){let xt=B.linewidth;xt===void 0&&(xt=1),vt.setLineWidth(xt*Ft()),U.isLineSegments?Vt.setMode(w.LINES):U.isLineLoop?Vt.setMode(w.LINE_LOOP):Vt.setMode(w.LINE_STRIP)}else U.isPoints?Vt.setMode(w.POINTS):U.isSprite&&Vt.setMode(w.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Fn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Vt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))Vt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const xt=U._multiDrawStarts,me=U._multiDrawCounts,qt=U._multiDrawCount,ze=mt?q.get(mt).bytesPerElement:1,Yn=_t.get(B).currentProgram.getUniforms();for(let we=0;we<qt;we++)Yn.setValue(w,"_gl_DrawID",we),Vt.render(xt[we]/ze,me[we])}else if(U.isInstancedMesh)Vt.renderInstances(kt,le,U.count);else if(O.isInstancedBufferGeometry){const xt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,me=Math.min(O.instanceCount,xt);Vt.renderInstances(kt,le,me)}else Vt.render(kt,le)};function Kt(v,I,O){v.transparent===!0&&v.side===We&&v.forceSinglePass===!1?(v.side=Ee,v.needsUpdate=!0,Oi(v,I,O),v.side=Rn,v.needsUpdate=!0,Oi(v,I,O),v.side=We):Oi(v,I,O)}this.compile=function(v,I,O=null){O===null&&(O=v),d=zt.get(O),d.init(I),E.push(d),O.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),v!==O&&v.traverseVisible(function(U){U.isLight&&U.layers.test(I.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const B=new Set;return v.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const J=U.material;if(J)if(Array.isArray(J))for(let it=0;it<J.length;it++){const lt=J[it];Kt(lt,O,U),B.add(lt)}else Kt(J,O,U),B.add(J)}),d=E.pop(),B},this.compileAsync=function(v,I,O=null){const B=this.compile(v,I,O);return new Promise(U=>{function J(){if(B.forEach(function(it){_t.get(it).currentProgram.isReady()&&B.delete(it)}),B.size===0){U(v);return}setTimeout(J,10)}Ot.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let Ge=null;function en(v){Ge&&Ge(v)}function fo(){wn.stop()}function po(){wn.start()}const wn=new tc;wn.setAnimationLoop(en),typeof self<"u"&&wn.setContext(self),this.setAnimationLoop=function(v){Ge=v,k.setAnimationLoop(v),v===null?wn.stop():wn.start()},k.addEventListener("sessionstart",fo),k.addEventListener("sessionend",po),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(I),I=k.getCamera()),v.isScene===!0&&v.onBeforeRender(M,v,I,P),d=zt.get(v,E.length),d.init(I),E.push(d),Et.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Y.setFromProjectionMatrix(Et),yt=this.localClippingEnabled,tt=Q.init(this.clippingPlanes,yt),p=dt.get(v,T.length),p.init(),T.push(p),k.enabled===!0&&k.isPresenting===!0){const J=M.xr.getDepthSensingMesh();J!==null&&Aa(J,I,-1/0,M.sortObjects)}Aa(v,I,0,M.sortObjects),p.finish(),M.sortObjects===!0&&p.sort(at,ut),ee=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,ee&&Tt.addToRenderList(p,v),this.info.render.frame++,tt===!0&&Q.beginShadows();const O=d.state.shadowsArray;ft.render(O,v,I),tt===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=p.opaque,U=p.transmissive;if(d.setupLights(),I.isArrayCamera){const J=I.cameras;if(U.length>0)for(let it=0,lt=J.length;it<lt;it++){const mt=J[it];yo(B,U,v,mt)}ee&&Tt.render(v);for(let it=0,lt=J.length;it<lt;it++){const mt=J[it];mo(p,v,mt,mt.viewport)}}else U.length>0&&yo(B,U,v,I),ee&&Tt.render(v),mo(p,v,I);P!==null&&R===0&&(b.updateMultisampleRenderTarget(P),b.updateRenderTargetMipmap(P)),v.isScene===!0&&v.onAfterRender(M,v,I),Jt.resetDefaultState(),x=-1,S=null,E.pop(),E.length>0?(d=E[E.length-1],tt===!0&&Q.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,T.pop(),T.length>0?p=T[T.length-1]:p=null};function Aa(v,I,O,B){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)O=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)d.pushLight(v),v.castShadow&&d.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Y.intersectsSprite(v)){B&&bt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Et);const it=X.update(v),lt=v.material;lt.visible&&p.push(v,it,lt,O,bt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Y.intersectsObject(v))){const it=X.update(v),lt=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),bt.copy(v.boundingSphere.center)):(it.boundingSphere===null&&it.computeBoundingSphere(),bt.copy(it.boundingSphere.center)),bt.applyMatrix4(v.matrixWorld).applyMatrix4(Et)),Array.isArray(lt)){const mt=it.groups;for(let Rt=0,Ct=mt.length;Rt<Ct;Rt++){const Mt=mt[Rt],kt=lt[Mt.materialIndex];kt&&kt.visible&&p.push(v,it,kt,O,bt.z,Mt)}}else lt.visible&&p.push(v,it,lt,O,bt.z,null)}}const J=v.children;for(let it=0,lt=J.length;it<lt;it++)Aa(J[it],I,O,B)}function mo(v,I,O,B){const U=v.opaque,J=v.transmissive,it=v.transparent;d.setupLightsView(O),tt===!0&&Q.setGlobalState(M.clippingPlanes,O),B&&vt.viewport(C.copy(B)),U.length>0&&Fi(U,I,O),J.length>0&&Fi(J,I,O),it.length>0&&Fi(it,I,O),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function yo(v,I,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[B.id]===void 0&&(d.state.transmissionRenderTarget[B.id]=new Vn(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?Ni:fn,minFilter:Tn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const J=d.state.transmissionRenderTarget[B.id],it=B.viewport||C;J.setSize(it.z*M.transmissionResolutionScale,it.w*M.transmissionResolutionScale);const lt=M.getRenderTarget();M.setRenderTarget(J),M.getClearColor(W),j=M.getClearAlpha(),j<1&&M.setClearColor(16777215,.5),M.clear(),ee&&Tt.render(O);const mt=M.toneMapping;M.toneMapping=An;const Rt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),d.setupLightsView(B),tt===!0&&Q.setGlobalState(M.clippingPlanes,B),Fi(v,O,B),b.updateMultisampleRenderTarget(J),b.updateRenderTargetMipmap(J),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let Mt=0,kt=I.length;Mt<kt;Mt++){const Yt=I[Mt],le=Yt.object,ae=Yt.geometry,Vt=Yt.material,xt=Yt.group;if(Vt.side===We&&le.layers.test(B.layers)){const me=Vt.side;Vt.side=Ee,Vt.needsUpdate=!0,go(le,O,B,ae,Vt,xt),Vt.side=me,Vt.needsUpdate=!0,Ct=!0}}Ct===!0&&(b.updateMultisampleRenderTarget(J),b.updateRenderTargetMipmap(J))}M.setRenderTarget(lt),M.setClearColor(W,j),Rt!==void 0&&(B.viewport=Rt),M.toneMapping=mt}function Fi(v,I,O){const B=I.isScene===!0?I.overrideMaterial:null;for(let U=0,J=v.length;U<J;U++){const it=v[U],lt=it.object,mt=it.geometry,Rt=B===null?it.material:B,Ct=it.group;lt.layers.test(O.layers)&&go(lt,I,O,mt,Rt,Ct)}}function go(v,I,O,B,U,J){v.onBeforeRender(M,I,O,B,U,J),v.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),U.onBeforeRender(M,I,O,B,v,J),U.transparent===!0&&U.side===We&&U.forceSinglePass===!1?(U.side=Ee,U.needsUpdate=!0,M.renderBufferDirect(O,I,B,U,v,J),U.side=Rn,U.needsUpdate=!0,M.renderBufferDirect(O,I,B,U,v,J),U.side=We):M.renderBufferDirect(O,I,B,U,v,J),v.onAfterRender(M,I,O,B,U,J)}function Oi(v,I,O){I.isScene!==!0&&(I=re);const B=_t.get(v),U=d.state.lights,J=d.state.shadowsArray,it=U.state.version,lt=gt.getParameters(v,U.state,J,I,O),mt=gt.getProgramCacheKey(lt);let Rt=B.programs;B.environment=v.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(v.isMeshStandardMaterial?F:g).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Rt===void 0&&(v.addEventListener("dispose",Nt),Rt=new Map,B.programs=Rt);let Ct=Rt.get(mt);if(Ct!==void 0){if(B.currentProgram===Ct&&B.lightsStateVersion===it)return So(v,lt),Ct}else lt.uniforms=gt.getUniforms(v),v.onBeforeCompile(lt,M),Ct=gt.acquireProgram(lt,mt),Rt.set(mt,Ct),B.uniforms=lt.uniforms;const Mt=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Mt.clippingPlanes=Q.uniform),So(v,lt),B.needsLights=cc(v),B.lightsStateVersion=it,B.needsLights&&(Mt.ambientLightColor.value=U.state.ambient,Mt.lightProbe.value=U.state.probe,Mt.directionalLights.value=U.state.directional,Mt.directionalLightShadows.value=U.state.directionalShadow,Mt.spotLights.value=U.state.spot,Mt.spotLightShadows.value=U.state.spotShadow,Mt.rectAreaLights.value=U.state.rectArea,Mt.ltc_1.value=U.state.rectAreaLTC1,Mt.ltc_2.value=U.state.rectAreaLTC2,Mt.pointLights.value=U.state.point,Mt.pointLightShadows.value=U.state.pointShadow,Mt.hemisphereLights.value=U.state.hemi,Mt.directionalShadowMap.value=U.state.directionalShadowMap,Mt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Mt.spotShadowMap.value=U.state.spotShadowMap,Mt.spotLightMatrix.value=U.state.spotLightMatrix,Mt.spotLightMap.value=U.state.spotLightMap,Mt.pointShadowMap.value=U.state.pointShadowMap,Mt.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Ct,B.uniformsList=null,Ct}function _o(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=ya.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function So(v,I){const O=_t.get(v);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function oc(v,I,O,B,U){I.isScene!==!0&&(I=re),b.resetTextureUnits();const J=I.fog,it=B.isMeshStandardMaterial?I.environment:null,lt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:gi,mt=(B.isMeshStandardMaterial?F:g).get(B.envMap||it),Rt=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ct=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Mt=!!O.morphAttributes.position,kt=!!O.morphAttributes.normal,Yt=!!O.morphAttributes.color;let le=An;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(le=M.toneMapping);const ae=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Vt=ae!==void 0?ae.length:0,xt=_t.get(B),me=d.state.lights;if(tt===!0&&(yt===!0||v!==S)){const Me=v===S&&B.id===x;Q.setState(B,v,Me)}let qt=!1;B.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==me.state.version||xt.outputColorSpace!==lt||U.isBatchedMesh&&xt.batching===!1||!U.isBatchedMesh&&xt.batching===!0||U.isBatchedMesh&&xt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&xt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&xt.instancing===!1||!U.isInstancedMesh&&xt.instancing===!0||U.isSkinnedMesh&&xt.skinning===!1||!U.isSkinnedMesh&&xt.skinning===!0||U.isInstancedMesh&&xt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&xt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&xt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&xt.instancingMorph===!1&&U.morphTexture!==null||xt.envMap!==mt||B.fog===!0&&xt.fog!==J||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Q.numPlanes||xt.numIntersection!==Q.numIntersection)||xt.vertexAlphas!==Rt||xt.vertexTangents!==Ct||xt.morphTargets!==Mt||xt.morphNormals!==kt||xt.morphColors!==Yt||xt.toneMapping!==le||xt.morphTargetsCount!==Vt)&&(qt=!0):(qt=!0,xt.__version=B.version);let ze=xt.currentProgram;qt===!0&&(ze=Oi(B,I,U));let Yn=!1,we=!1,vi=!1;const te=ze.getUniforms(),Le=xt.uniforms;if(vt.useProgram(ze.program)&&(Yn=!0,we=!0,vi=!0),B.id!==x&&(x=B.id,we=!0),Yn||S!==v){vt.buffers.depth.getReversed()?(rt.copy(v.projectionMatrix),al(rt),rl(rt),te.setValue(w,"projectionMatrix",rt)):te.setValue(w,"projectionMatrix",v.projectionMatrix),te.setValue(w,"viewMatrix",v.matrixWorldInverse);const be=te.map.cameraPosition;be!==void 0&&be.setValue(w,Xt.setFromMatrixPosition(v.matrixWorld)),Bt.logarithmicDepthBuffer&&te.setValue(w,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&te.setValue(w,"isOrthographic",v.isOrthographicCamera===!0),S!==v&&(S=v,we=!0,vi=!0)}if(U.isSkinnedMesh){te.setOptional(w,U,"bindMatrix"),te.setOptional(w,U,"bindMatrixInverse");const Me=U.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),te.setValue(w,"boneTexture",Me.boneTexture,b))}U.isBatchedMesh&&(te.setOptional(w,U,"batchingTexture"),te.setValue(w,"batchingTexture",U._matricesTexture,b),te.setOptional(w,U,"batchingIdTexture"),te.setValue(w,"batchingIdTexture",U._indirectTexture,b),te.setOptional(w,U,"batchingColorTexture"),U._colorsTexture!==null&&te.setValue(w,"batchingColorTexture",U._colorsTexture,b));const De=O.morphAttributes;if((De.position!==void 0||De.normal!==void 0||De.color!==void 0)&&At.update(U,O,ze),(we||xt.receiveShadow!==U.receiveShadow)&&(xt.receiveShadow=U.receiveShadow,te.setValue(w,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Le.envMap.value=mt,Le.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(Le.envMapIntensity.value=I.environmentIntensity),we&&(te.setValue(w,"toneMappingExposure",M.toneMappingExposure),xt.needsLights&&sc(Le,vi),J&&B.fog===!0&&ot.refreshFogUniforms(Le,J),ot.refreshMaterialUniforms(Le,B,H,$,d.state.transmissionRenderTarget[v.id]),ya.upload(w,_o(xt),Le,b)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ya.upload(w,_o(xt),Le,b),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&te.setValue(w,"center",U.center),te.setValue(w,"modelViewMatrix",U.modelViewMatrix),te.setValue(w,"normalMatrix",U.normalMatrix),te.setValue(w,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Me=B.uniformsGroups;for(let be=0,Ra=Me.length;be<Ra;be++){const Cn=Me[be];L.update(Cn,ze),L.bind(Cn,ze)}}return ze}function sc(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function cc(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(v,I,O){_t.get(v.texture).__webglTexture=I,_t.get(v.depthTexture).__webglTexture=O;const B=_t.get(v);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,I){const O=_t.get(v);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0};const lc=w.createFramebuffer();this.setRenderTarget=function(v,I=0,O=0){P=v,A=I,R=O;let B=!0,U=null,J=!1,it=!1;if(v){const mt=_t.get(v);if(mt.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(w.FRAMEBUFFER,null),B=!1;else if(mt.__webglFramebuffer===void 0)b.setupRenderTarget(v);else if(mt.__hasExternalTextures)b.rebindTextures(v,_t.get(v.texture).__webglTexture,_t.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Mt=v.depthTexture;if(mt.__boundDepthTexture!==Mt){if(Mt!==null&&_t.has(Mt)&&(v.width!==Mt.image.width||v.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(v)}}const Rt=v.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(it=!0);const Ct=_t.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ct[I])?U=Ct[I][O]:U=Ct[I],J=!0):v.samples>0&&b.useMultisampledRTT(v)===!1?U=_t.get(v).__webglMultisampledFramebuffer:Array.isArray(Ct)?U=Ct[O]:U=Ct,C.copy(v.viewport),z.copy(v.scissor),G=v.scissorTest}else C.copy(St).multiplyScalar(H).floor(),z.copy(It).multiplyScalar(H).floor(),G=$t;if(O!==0&&(U=lc),vt.bindFramebuffer(w.FRAMEBUFFER,U)&&B&&vt.drawBuffers(v,U),vt.viewport(C),vt.scissor(z),vt.setScissorTest(G),J){const mt=_t.get(v.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+I,mt.__webglTexture,O)}else if(it){const mt=_t.get(v.texture),Rt=I;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,mt.__webglTexture,O,Rt)}else if(v!==null&&O!==0){const mt=_t.get(v.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,mt.__webglTexture,O)}x=-1},this.readRenderTargetPixels=function(v,I,O,B,U,J,it){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let lt=_t.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&it!==void 0&&(lt=lt[it]),lt){vt.bindFramebuffer(w.FRAMEBUFFER,lt);try{const mt=v.texture,Rt=mt.format,Ct=mt.type;if(!Bt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-B&&O>=0&&O<=v.height-U&&w.readPixels(I,O,B,U,Lt.convert(Rt),Lt.convert(Ct),J)}finally{const mt=P!==null?_t.get(P).__webglFramebuffer:null;vt.bindFramebuffer(w.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(v,I,O,B,U,J,it){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let lt=_t.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&it!==void 0&&(lt=lt[it]),lt){const mt=v.texture,Rt=mt.format,Ct=mt.type;if(!Bt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=v.width-B&&O>=0&&O<=v.height-U){vt.bindFramebuffer(w.FRAMEBUFFER,lt);const Mt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Mt),w.bufferData(w.PIXEL_PACK_BUFFER,J.byteLength,w.STREAM_READ),w.readPixels(I,O,B,U,Lt.convert(Rt),Lt.convert(Ct),0);const kt=P!==null?_t.get(P).__webglFramebuffer:null;vt.bindFramebuffer(w.FRAMEBUFFER,kt);const Yt=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await il(w,Yt,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Mt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,J),w.deleteBuffer(Mt),w.deleteSync(Yt),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,I=null,O=0){v.isTexture!==!0&&(Fn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,v=arguments[1]);const B=Math.pow(2,-O),U=Math.floor(v.image.width*B),J=Math.floor(v.image.height*B),it=I!==null?I.x:0,lt=I!==null?I.y:0;b.setTexture2D(v,0),w.copyTexSubImage2D(w.TEXTURE_2D,O,0,0,it,lt,U,J),vt.unbindTexture()};const uc=w.createFramebuffer(),dc=w.createFramebuffer();this.copyTextureToTexture=function(v,I,O=null,B=null,U=0,J=null){v.isTexture!==!0&&(Fn("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,v=arguments[1],I=arguments[2],J=arguments[3]||0,O=null),J===null&&(U!==0?(Fn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=U,U=0):J=0);let it,lt,mt,Rt,Ct,Mt,kt,Yt,le;const ae=v.isCompressedTexture?v.mipmaps[J]:v.image;if(O!==null)it=O.max.x-O.min.x,lt=O.max.y-O.min.y,mt=O.isBox3?O.max.z-O.min.z:1,Rt=O.min.x,Ct=O.min.y,Mt=O.isBox3?O.min.z:0;else{const De=Math.pow(2,-U);it=Math.floor(ae.width*De),lt=Math.floor(ae.height*De),v.isDataArrayTexture?mt=ae.depth:v.isData3DTexture?mt=Math.floor(ae.depth*De):mt=1,Rt=0,Ct=0,Mt=0}B!==null?(kt=B.x,Yt=B.y,le=B.z):(kt=0,Yt=0,le=0);const Vt=Lt.convert(I.format),xt=Lt.convert(I.type);let me;I.isData3DTexture?(b.setTexture3D(I,0),me=w.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(b.setTexture2DArray(I,0),me=w.TEXTURE_2D_ARRAY):(b.setTexture2D(I,0),me=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const qt=w.getParameter(w.UNPACK_ROW_LENGTH),ze=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Yn=w.getParameter(w.UNPACK_SKIP_PIXELS),we=w.getParameter(w.UNPACK_SKIP_ROWS),vi=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ae.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ae.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Rt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ct),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Mt);const te=v.isDataArrayTexture||v.isData3DTexture,Le=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){const De=_t.get(v),Me=_t.get(I),be=_t.get(De.__renderTarget),Ra=_t.get(Me.__renderTarget);vt.bindFramebuffer(w.READ_FRAMEBUFFER,be.__webglFramebuffer),vt.bindFramebuffer(w.DRAW_FRAMEBUFFER,Ra.__webglFramebuffer);for(let Cn=0;Cn<mt;Cn++)te&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,_t.get(v).__webglTexture,U,Mt+Cn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,_t.get(I).__webglTexture,J,le+Cn)),w.blitFramebuffer(Rt,Ct,it,lt,kt,Yt,it,lt,w.DEPTH_BUFFER_BIT,w.NEAREST);vt.bindFramebuffer(w.READ_FRAMEBUFFER,null),vt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(U!==0||v.isRenderTargetTexture||_t.has(v)){const De=_t.get(v),Me=_t.get(I);vt.bindFramebuffer(w.READ_FRAMEBUFFER,uc),vt.bindFramebuffer(w.DRAW_FRAMEBUFFER,dc);for(let be=0;be<mt;be++)te?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,De.__webglTexture,U,Mt+be):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,De.__webglTexture,U),Le?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Me.__webglTexture,J,le+be):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Me.__webglTexture,J),U!==0?w.blitFramebuffer(Rt,Ct,it,lt,kt,Yt,it,lt,w.COLOR_BUFFER_BIT,w.NEAREST):Le?w.copyTexSubImage3D(me,J,kt,Yt,le+be,Rt,Ct,it,lt):w.copyTexSubImage2D(me,J,kt,Yt,Rt,Ct,it,lt);vt.bindFramebuffer(w.READ_FRAMEBUFFER,null),vt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Le?v.isDataTexture||v.isData3DTexture?w.texSubImage3D(me,J,kt,Yt,le,it,lt,mt,Vt,xt,ae.data):I.isCompressedArrayTexture?w.compressedTexSubImage3D(me,J,kt,Yt,le,it,lt,mt,Vt,ae.data):w.texSubImage3D(me,J,kt,Yt,le,it,lt,mt,Vt,xt,ae):v.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,J,kt,Yt,it,lt,Vt,xt,ae.data):v.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,J,kt,Yt,ae.width,ae.height,Vt,ae.data):w.texSubImage2D(w.TEXTURE_2D,J,kt,Yt,it,lt,Vt,xt,ae);w.pixelStorei(w.UNPACK_ROW_LENGTH,qt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ze),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Yn),w.pixelStorei(w.UNPACK_SKIP_ROWS,we),w.pixelStorei(w.UNPACK_SKIP_IMAGES,vi),J===0&&I.generateMipmaps&&w.generateMipmap(me),vt.unbindTexture()},this.copyTextureToTexture3D=function(v,I,O=null,B=null,U=0){return v.isTexture!==!0&&(Fn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,B=arguments[1]||null,v=arguments[2],I=arguments[3],U=arguments[4]||0),Fn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,I,O,B,U)},this.initRenderTarget=function(v){_t.get(v).__webglFramebuffer===void 0&&b.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?b.setTextureCube(v,0):v.isData3DTexture?b.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?b.setTexture2DArray(v,0):b.setTexture2D(v,0),vt.unbindTexture()},this.resetState=function(){A=0,R=0,P=null,vt.reset(),Jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}const Es={type:"change"},ho={type:"start"},rc={type:"end"},la=new Ii,Ts=new Mn,Pp=Math.cos(70*el.DEG2RAD),de=new D,Re=2*Math.PI,Zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ar=1e-6;class Lp extends Yl{constructor(t,e=null){super(t,e),this.state=Zt.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:li.ROTATE,MIDDLE:li.DOLLY,RIGHT:li.PAN},this.touches={ONE:si.ROTATE,TWO:si.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new pn,this._lastTargetPosition=new D,this._quat=new pn().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $o,this._sphericalDelta=new $o,this._scale=1,this._panOffset=new D,this._rotateStart=new wt,this._rotateEnd=new wt,this._rotateDelta=new wt,this._panStart=new wt,this._panEnd=new wt,this._panDelta=new wt,this._dollyStart=new wt,this._dollyEnd=new wt,this._dollyDelta=new wt,this._dollyDirection=new D,this._mouse=new wt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ip.bind(this),this._onPointerDown=Dp.bind(this),this._onPointerUp=Up.bind(this),this._onContextMenu=Hp.bind(this),this._onMouseWheel=Bp.bind(this),this._onKeyDown=Gp.bind(this),this._onTouchStart=zp.bind(this),this._onTouchMove=kp.bind(this),this._onMouseDown=Fp.bind(this),this._onMouseMove=Op.bind(this),this._interceptControlDown=Vp.bind(this),this._interceptControlUp=Wp.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Es),this.update(),this.state=Zt.NONE}update(t=null){const e=this.object.position;de.copy(e).sub(this.target),de.applyQuaternion(this._quat),this._spherical.setFromVector3(de),this.autoRotate&&this.state===Zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(n)&&isFinite(a)&&(n<-Math.PI?n+=Re:n>Math.PI&&(n-=Re),a<-Math.PI?a+=Re:a>Math.PI&&(a-=Re),n<=a?this._spherical.theta=Math.max(n,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+a)/2?Math.max(n,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(de.setFromSpherical(this._spherical),de.applyQuaternion(this._quatInverse),e.copy(this.target).add(de),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const s=de.length();o=this._clampDistance(s*this._scale);const c=s-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const s=new D(this._mouse.x,this._mouse.y,0);s.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(s),this.object.updateMatrixWorld(),o=de.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(la.origin.copy(this.object.position),la.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(la.direction))<Pp?this.object.lookAt(this.target):(Ts.setFromNormalAndCoplanarPoint(this.object.up,this.target),la.intersectPlane(Ts,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ar||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ar||this._lastTargetPosition.distanceToSquared(this.target)>ar?(this.dispatchEvent(Es),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Re/60*this.autoRotateSpeed*t:Re/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){de.setFromMatrixColumn(e,0),de.multiplyScalar(-t),this._panOffset.add(de)}_panUp(t,e){this.screenSpacePanning===!0?de.setFromMatrixColumn(e,1):(de.setFromMatrixColumn(e,0),de.crossVectors(this.object.up,de)),de.multiplyScalar(t),this._panOffset.add(de)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;de.copy(a).sub(this.target);let r=de.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),a=t-n.left,r=e-n.top,o=n.width,s=n.height;this._mouse.x=a/o*2-1,this._mouse.y=-(r/s)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Re*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),a=.5*(t.pageY+e.y);this._rotateStart.set(n,a)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),a=.5*(t.pageY+e.y);this._panStart.set(n,a)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,a=t.pageY-e.y,r=Math.sqrt(n*n+a*a);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(a,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),a=.5*(t.pageY+e.y);this._panEnd.set(n,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,a=t.pageY-e.y,r=Math.sqrt(n*n+a*a);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,s=(t.pageY+e.y)*.5;this._updateZoomParameters(o,s)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new wt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Dp(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Ip(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Up(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rc),this.state=Zt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Fp(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case li.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Zt.DOLLY;break;case li.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}break;case li.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(ho)}function Op(i){switch(this.state){case Zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Bp(i){this.enabled===!1||this.enableZoom===!1||this.state!==Zt.NONE||(i.preventDefault(),this.dispatchEvent(ho),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(rc))}function Gp(i){this.enabled!==!1&&this._handleKeyDown(i)}function zp(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case si.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Zt.TOUCH_ROTATE;break;case si.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Zt.TOUCH_PAN;break;default:this.state=Zt.NONE}break;case 2:switch(this.touches.TWO){case si.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Zt.TOUCH_DOLLY_PAN;break;case si.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Zt.TOUCH_DOLLY_ROTATE;break;default:this.state=Zt.NONE}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(ho)}function kp(i){switch(this._trackPointer(i),this.state){case Zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Zt.NONE}}function Hp(i){this.enabled!==!1&&i.preventDefault()}function Vp(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Wp(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Xp(i){const t={uDayMap:{value:i.day},uNightMap:{value:i.night},uNormalMap:{value:i.normal},uSpecularMap:{value:i.specular},uSunDirection:{value:new D(1,0,0)},uTime:{value:0}},e=`
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,n=`
    uniform sampler2D uDayMap;
    uniform sampler2D uNightMap;
    uniform sampler2D uNormalMap;
    uniform sampler2D uSpecularMap;
    uniform vec3 uSunDirection;
    uniform float uTime;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;

    void main() {
      // Base normal on sphere
      vec3 N0 = normalize(vWorldNormal);
      
      // Spherical tangent frame
      vec3 up = vec3(0.0, 1.0, 0.0);
      vec3 tangent = normalize(cross(up, N0));
      if (length(tangent) < 0.001) tangent = vec3(1.0, 0.0, 0.0);
      vec3 bitangent = cross(N0, tangent);

      // Controlled terrain normal map: strength strictly pressed to 0.16 for smooth satellite relief
      vec3 normalTex = (texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0);
      float normalStrength = 0.16;
      vec3 N = normalize(N0 + (tangent * normalTex.x + bitangent * normalTex.y) * normalStrength);

      vec3 L = normalize(uSunDirection);
      vec3 V = normalize(cameraPosition - vWorldPosition);

      // Light angle calculations
      float NdotL = dot(N, L);
      float N0dotL = dot(N0, L);

      // Day / Night factor: Strictly 0.0 on dark hemisphere
      float dayFactor = smoothstep(-0.01, 0.07, NdotL);

      // Sample textures
      vec3 dayColor = texture2D(uDayMap, vUv).rgb;
      vec3 nightColor = texture2D(uNightMap, vUv).rgb;
      float specMask = texture2D(uSpecularMap, vUv).r;

      // Daylight surface illumination
      float diffuse = max(NdotL, 0.0);
      vec3 dayLit = dayColor * (diffuse * 0.95 + 0.05);

      // Clean night hemisphere: ONLY pure dark surface + golden NASA Black Marble city lights
      // Zero blue or purple bleed on night land
      vec3 nightLit = nightColor * 2.1 * (1.0 - dayFactor);

      // Subtle natural amber/warm golden glow along the terminator line (strictly warm amber, no purple)
      float amberBand = smoothstep(-0.03, 0.02, N0dotL) * (1.0 - smoothstep(0.02, 0.10, N0dotL));
      vec3 amberGlow = vec3(1.0, 0.65, 0.28) * amberBand * 0.4;

      // Ocean specular reflection strictly in daytime, sharply extinction on land
      vec3 R = reflect(-L, N);
      float specAngle = max(dot(R, V), 0.0);
      float spec = pow(specAngle, 38.0) * specMask * smoothstep(0.03, 0.15, NdotL);
      vec3 specularColor = vec3(0.95, 0.98, 1.0) * spec * 1.6;

      // Daytime atmosphere limb glow (strictly facing sunlit hemisphere)
      float rim = 1.0 - max(dot(N0, V), 0.0);
      float dayRim = pow(rim, 4.0) * max(N0dotL, 0.0) * 0.75;
      vec3 rimColor = vec3(0.2, 0.6, 1.0) * dayRim;

      // Final composite
      vec3 finalColor = mix(nightLit, dayLit, dayFactor) + amberGlow + specularColor + rimColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;return new Ze({uniforms:t,vertexShader:e,fragmentShader:n})}function Yp(i){const t=`
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,e=`
    uniform sampler2D uCloudMap;
    uniform vec3 uSunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;

    void main() {
      vec4 tex = texture2D(uCloudMap, vUv);
      float cloudDensity = (tex.r + tex.g + tex.b) / 3.0;

      if (cloudDensity < 0.05) discard;

      vec3 N = normalize(vWorldNormal);
      vec3 L = normalize(uSunDirection);
      float NdotL = dot(N, L);

      // Sunlit illumination on clouds
      float sunLight = max(NdotL, 0.0) * 0.9 + 0.1;
      vec3 cloudColor = vec3(0.94, 0.96, 1.0) * sunLight;

      // Day clouds are crisp (opacity ~0.45); on night side clouds become semi-transparent
      float dayFactor = smoothstep(-0.05, 0.1, NdotL);
      float alpha = cloudDensity * 0.45 * (dayFactor * 0.85 + 0.15);

      gl_FragColor = vec4(cloudColor, alpha);
    }
  `;return new Ze({uniforms:{uCloudMap:{value:i},uSunDirection:{value:new D(1,0,0)}},vertexShader:t,fragmentShader:e,transparent:!0,depthWrite:!1,blending:zn})}function qp(){const i=`
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,t=`
    uniform vec3 uSunDirection;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 V = normalize(cameraPosition - vWorldPosition);
      vec3 N = normalize(vNormal);
      vec3 L = normalize(uSunDirection);

      // Limb fresnel
      float rim = 1.0 - max(dot(N, V), 0.0);
      float intensity = pow(rim, 4.2);

      // Only glow on sun-illuminated limb, dark side remains pure space
      float sunFacing = smoothstep(-0.1, 0.3, dot(N, L));
      vec3 glowColor = vec3(0.25, 0.65, 1.0);

      gl_FragColor = vec4(glowColor, intensity * sunFacing * 0.85);
    }
  `;return new Ze({uniforms:{uSunDirection:{value:new D(1,0,0)}},vertexShader:i,fragmentShader:t,blending:kn,side:Ee,transparent:!0,depthWrite:!1})}function Kp(i=new Date){const t=new Date(Date.UTC(i.getUTCFullYear(),0,1)),n=(i.getTime()-t.getTime())/(1e3*60*60*24),a=-23.44*(Math.PI/180)*Math.cos(2*Math.PI/365.25*(n+10)),o=(12-(i.getUTCHours()+i.getUTCMinutes()/60+i.getUTCSeconds()/3600))*15,s=Math.PI/2-a,c=(o+180)*(Math.PI/180),l=-(Math.sin(s)*Math.cos(c)),u=Math.sin(s)*Math.sin(c),f=Math.cos(s);return new D(l,f,u).normalize()}function tn(i,t,e){const n=(90-i)*(Math.PI/180),a=(t+180)*(Math.PI/180),r=-(e*Math.sin(n)*Math.cos(a)),o=e*Math.sin(n)*Math.sin(a),s=e*Math.cos(n);return new D(r,s,o)}function jp(i,t,e,n,a,r){const o=tn(i,t,r),s=tn(e,n,r),c=[];for(let l=0;l<=a;l++){const u=l/a,f=new D().copy(o).lerp(s,u).normalize().multiplyScalar(r);c.push(f)}return c}const Zp=[{id:"marea",name:"MAREA",points:[[-76.1,36.8],[-72.4,37.4],[-50.4,37.9],[-23.4,44.7],[-9.9,46.6],[-4.5,44.7],[-2.9,43.3]],major:!0,rfsYear:2018,owners:["Meta","Microsoft","Telxius"],landingPoints:[{country:"ES",countryName:"Spain",city:"Bilbao",lat:43.27,lon:-2.95},{country:"US",countryName:"United States",city:"Virginia Beach",lat:36.76,lon:-76.06}],countriesServed:[{country:"ES",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"grace_hopper",name:"Grace Hopper",points:[[-72.9,40.8],[-61.2,38.7],[-23.4,46],[-8.1,49.7],[-9.9,46.9],[-2.9,43.3]],major:!0,rfsYear:2022,owners:["Google"],landingPoints:[{country:"ES",countryName:"Spain",city:"Bilbao",lat:43.27,lon:-2.95},{country:"GB",countryName:"United Kingdom",city:"Bude",lat:50.83,lon:-4.54},{country:"US",countryName:"United States",city:"Bellport",lat:40.76,lon:-72.94}],countriesServed:[{country:"ES",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"havfrueaec_2",name:"Havfrue/AEC-2",points:[[8.3,55.8],[-9.7,53.8],[8,58.2],[-74.1,40.2]],major:!0,rfsYear:2020,owners:["Bulk Infrastructure","EXA Infrastructure","Google","Meta"],landingPoints:[{country:"DK",countryName:"Denmark",city:"Blaabjerg",lat:55.75,lon:8.33},{country:"IE",countryName:"Ireland",city:"Lecanvey",lat:53.77,lon:-9.7},{country:"NO",countryName:"Norway",city:"Kristiansand",lat:58.15,lon:8},{country:"US",countryName:"United States",city:"Wall Township",lat:40.15,lon:-74.06}],countriesServed:[{country:"DK",capacityShare:.25,isRedundant:!0},{country:"IE",capacityShare:.25,isRedundant:!0},{country:"NO",capacityShare:.25,isRedundant:!0},{country:"US",capacityShare:.25,isRedundant:!0}]},{id:"dunant",name:"Dunant",points:[[-2,46.7],[-5.4,46.6],[-16.2,45.3],[-39.6,39.7],[-61.2,37.6],[-74.7,36.7],[-76.1,36.8]],major:!0,rfsYear:2021,owners:["Google"],landingPoints:[{country:"FR",countryName:"France",city:"Saint-Hilaire-de-Riez",lat:46.69,lon:-1.97},{country:"US",countryName:"United States",city:"Virginia Beach",lat:36.76,lon:-76.06}],countriesServed:[{country:"FR",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"amitie",name:"Amitie",points:[[-71,42.5],[-50.4,43.6],[-16.2,50.2],[-3.1,45.1],[-7.2,50.9],[-4.5,50.8]],major:!0,rfsYear:2023,owners:["EXA Infrastructure","Meta","Microsoft","Orange","Vodafone"],landingPoints:[{country:"FR",countryName:"France",city:"Le Porge",lat:44.89,lon:-1.21},{country:"GB",countryName:"United Kingdom",city:"Bude",lat:50.83,lon:-4.54},{country:"US",countryName:"United States",city:"Lynn",lat:42.46,lon:-70.95}],countriesServed:[{country:"FR",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"atlantic_crossing_1_ac_1",name:"Atlantic Crossing-1 (AC-1)",points:[[8.4,54.9],[4.7,52.5],[-5.7,50.1],[-72.9,40.8]],major:!0,rfsYear:1998,owners:["Colt"],landingPoints:[{country:"DE",countryName:"Germany",city:"Sylt",lat:54.9,lon:8.38},{country:"NL",countryName:"Netherlands",city:"Beverwijk",lat:52.49,lon:4.66},{country:"GB",countryName:"United Kingdom",city:"Whitesands Bay",lat:50.08,lon:-5.7},{country:"US",countryName:"United States",city:"Brookhaven",lat:40.77,lon:-72.91}],countriesServed:[{country:"DE",capacityShare:.25,isRedundant:!0},{country:"NL",capacityShare:.25,isRedundant:!0},{country:"GB",capacityShare:.25,isRedundant:!0},{country:"US",capacityShare:.25,isRedundant:!0}]},{id:"apollo",name:"Apollo",points:[[-74,40.1],[-50.4,38.5],[-5.4,49.1],[-71.1,40.2],[-39.6,45],[-8.1,50.5],[-4.5,50.8]],major:!0,rfsYear:2003,owners:["Vodafone"],landingPoints:[{country:"FR",countryName:"France",city:"Lannion",lat:48.73,lon:-3.46},{country:"GB",countryName:"United Kingdom",city:"Bude",lat:50.83,lon:-4.54},{country:"US",countryName:"United States",city:"Manasquan",lat:40.12,lon:-74.05},{country:"US",countryName:"United States",city:"Shirley",lat:40.8,lon:-72.87}],countriesServed:[{country:"FR",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"nuvem",name:"Nuvem",points:[[-64.7,32.4],[-25.9,38.3],[-10.3,38.1],[-25.7,37.7],[-64.5,32.1],[-26.2,37.6]],major:!0,rfsYear:2026,owners:["Google"],landingPoints:[{country:"BM",countryName:"Bermuda",city:"Annie's Bay",lat:32.36,lon:-64.66},{country:"PT",countryName:"Portugal",city:"Sines",lat:37.96,lon:-8.87},{country:"PT",countryName:"Portugal",city:"São Miguel",lat:37.74,lon:-25.68},{country:"US",countryName:"United States",city:"Myrtle Beach",lat:33.69,lon:-78.88}],countriesServed:[{country:"BM",capacityShare:.3,isRedundant:!0},{country:"PT",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"flag_atlantic_1_fa_1",name:"FLAG Atlantic-1 (FA-1)",points:[[-2.8,48.5],[-5.7,50.1],[-73.7,40.6],[-73.3,40.9]],major:!0,rfsYear:2001,owners:["FLAG"],landingPoints:[{country:"FR",countryName:"France",city:"Plerin",lat:48.53,lon:-2.77},{country:"GB",countryName:"United Kingdom",city:"Skewjack",lat:50.06,lon:-5.68},{country:"US",countryName:"United States",city:"Island Park",lat:40.6,lon:-73.66},{country:"US",countryName:"United States",city:"Northport",lat:40.91,lon:-73.34}],countriesServed:[{country:"FR",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"tata_tgn_atlantic_south",name:"Tata TGN-Atlantic South",points:[[-3,51.2],[-5.4,51.2],[-10.8,50.3],[-23.4,49.6],[-50.4,42.6],[-68.4,40.7],[-74.1,40.2]],major:!0,rfsYear:2001,owners:["Tata Communications"],landingPoints:[{country:"GB",countryName:"United Kingdom",city:"Highbridge",lat:51.22,lon:-2.98},{country:"US",countryName:"United States",city:"Wall Township",lat:40.15,lon:-74.06}],countriesServed:[{country:"GB",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"tata_tgn_western_europe",name:"Tata TGN-Western Europe",points:[[-2.9,43.3],[-7,48.1],[-4,51.3],[-5.4,51.1],[-15.3,44.7],[-10.8,38.7],[-9.1,38.6]],major:!0,rfsYear:2002,owners:["Tata Communications"],landingPoints:[{country:"PT",countryName:"Portugal",city:"Seixal",lat:38.64,lon:-9.11},{country:"ES",countryName:"Spain",city:"Bilbao",lat:43.27,lon:-2.95},{country:"GB",countryName:"United Kingdom",city:"Highbridge",lat:51.22,lon:-2.98}],countriesServed:[{country:"PT",capacityShare:.3,isRedundant:!0},{country:"ES",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0}]},{id:"faster",name:"FASTER",points:[[136.9,34.3],[149.4,37.6],[140.4,34.4],[-129.6,43.7],[135,30.3],[121.5,25.2]],major:!0,rfsYear:2016,owners:["China Mobile","China Telecom","Google","KDDI","Singtel","TIME dotCom"],landingPoints:[{country:"JP",countryName:"Japan",city:"Chikura",lat:34.98,lon:139.95},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"TW",countryName:"Taiwan",city:"Tanshui",lat:25.18,lon:121.46},{country:"US",countryName:"United States",city:"Bandon",lat:43.12,lon:-124.41}],countriesServed:[{country:"JP",capacityShare:.3,isRedundant:!0},{country:"TW",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"southern_cross_cable_network_sccn",name:"Southern Cross Cable Network (SCCN)",points:[[174.8,-36.8],[178.9,-18],[-168.3,-10.2],[-123,45.5],[-160,18.7],[-158.1,21.4]],major:!0,rfsYear:2e3,owners:["Southern Cross Cable Network"],landingPoints:[{country:"AU",countryName:"Australia",city:"Alexandria",lat:-33.91,lon:151.2},{country:"AU",countryName:"Australia",city:"Brookvale",lat:-33.76,lon:151.27},{country:"FJ",countryName:"Fiji",city:"Suva",lat:-18.12,lon:178.44},{country:"NZ",countryName:"New Zealand",city:"Takapuna",lat:-36.79,lon:174.77},{country:"NZ",countryName:"New Zealand",city:"Whenuapai",lat:-36.79,lon:174.62},{country:"US",countryName:"United States",city:"Hillsboro",lat:45.52,lon:-122.99},{country:"US",countryName:"United States",city:"Kahe Point",lat:21.35,lon:-158.13},{country:"US",countryName:"United States",city:"Morro Bay",lat:35.37,lon:-120.85},{country:"US",countryName:"United States",city:"Spencer Beach",lat:20.02,lon:-155.82}],countriesServed:[{country:"AU",capacityShare:.25,isRedundant:!0},{country:"FJ",capacityShare:.25,isRedundant:!0},{country:"NZ",capacityShare:.25,isRedundant:!0},{country:"US",capacityShare:.25,isRedundant:!0}]},{id:"curie",name:"Curie",points:[[-71.6,-33],[-85.5,-6.6],[-98.1,12.6],[-118.8,27.8],[-118.4,33.9],[-79.4,7.3],[-79.6,9]],major:!0,rfsYear:2020,owners:["Google"],landingPoints:[{country:"CL",countryName:"Chile",city:"Valparaíso",lat:-33.05,lon:-71.62},{country:"PA",countryName:"Panama",city:"Balboa",lat:8.95,lon:-79.57},{country:"US",countryName:"United States",city:"El Segundo",lat:33.92,lon:-118.42}],countriesServed:[{country:"CL",capacityShare:.3,isRedundant:!0},{country:"PA",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"trans_pacific_express_tpe_cable_system",name:"Trans-Pacific Express (TPE) Cable System",points:[[-123.9,45.6],[121.9,31.8],[125.3,27.6],[132.7,30.7],[120.8,35.4],[149.4,37.9],[180,46.6]],major:!0,rfsYear:2008,owners:["AT&T","China Telecom","China Unicom","Chunghwa Telecom","KT","NTT","Verizon"],landingPoints:[{country:"CN",countryName:"China",city:"Chongming",lat:31.62,lon:121.4},{country:"CN",countryName:"China",city:"Qingdao",lat:36.09,lon:120.34},{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"KR",countryName:"South Korea",city:"Geoje",lat:34.89,lon:128.62},{country:"TW",countryName:"Taiwan",city:"Tanshui",lat:25.18,lon:121.46},{country:"US",countryName:"United States",city:"Nedonna Beach",lat:45.64,lon:-123.94}],countriesServed:[{country:"CN",capacityShare:.2,isRedundant:!0},{country:"JP",capacityShare:.2,isRedundant:!0},{country:"KR",capacityShare:.2,isRedundant:!0},{country:"TW",capacityShare:.2,isRedundant:!0},{country:"US",capacityShare:.2,isRedundant:!0}]},{id:"new_cross_pacific_ncp_cable_system",name:"New Cross Pacific (NCP) Cable System",points:[[-124,45.2],[143.1,34.7],[122.2,30.9],[128.2,31.7],[131.4,29.1],[121.3,31.1],[121.4,31.6]],major:!0,rfsYear:2018,owners:["China Mobile","China Telecom","China Unicom","Chunghwa Telecom","KT","Microsoft","Softbank"],landingPoints:[{country:"CN",countryName:"China",city:"Chongming",lat:31.62,lon:121.4},{country:"CN",countryName:"China",city:"Lingang",lat:30.94,lon:121.9},{country:"CN",countryName:"China",city:"Nanhui",lat:30.86,lon:121.93},{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"KR",countryName:"South Korea",city:"Busan",lat:35.17,lon:129},{country:"TW",countryName:"Taiwan",city:"Toucheng",lat:24.86,lon:121.8},{country:"US",countryName:"United States",city:"Pacific City",lat:45.2,lon:-123.96}],countriesServed:[{country:"CN",capacityShare:.2,isRedundant:!0},{country:"JP",capacityShare:.2,isRedundant:!0},{country:"KR",capacityShare:.2,isRedundant:!0},{country:"TW",capacityShare:.2,isRedundant:!0},{country:"US",capacityShare:.2,isRedundant:!0}]},{id:"pacific_light_cable_network_plcn",name:"Pacific Light Cable Network (PLCN)",points:[[126,21],[121.9,15.8],[122.2,24.8],[138.6,25.8],[-120.6,33.6],[-180,43.4]],major:!0,rfsYear:2022,owners:["Google","Meta"],landingPoints:[{country:"PH",countryName:"Philippines",city:"Baler",lat:15.76,lon:121.56},{country:"TW",countryName:"Taiwan",city:"Toucheng",lat:24.86,lon:121.8},{country:"US",countryName:"United States",city:"El Segundo",lat:33.92,lon:-118.42}],countriesServed:[{country:"PH",capacityShare:.3,isRedundant:!0},{country:"TW",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"jupiter",name:"JUPITER",points:[[-118.4,33.9],[180,44.1],[140.4,34.7],[142,34.4],[124.6,15.2],[-138.5,41.4]],major:!0,rfsYear:2020,owners:["Amazon Web Services","Meta","NTT","PCCW","PLDT","Softbank"],landingPoints:[{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"PH",countryName:"Philippines",city:"Daet",lat:14.12,lon:122.95},{country:"US",countryName:"United States",city:"Cloverdale",lat:45.23,lon:-123.96},{country:"US",countryName:"United States",city:"Hermosa Beach",lat:33.86,lon:-118.4}],countriesServed:[{country:"JP",capacityShare:.3,isRedundant:!0},{country:"PH",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"unity",name:"Unity",points:[[140,35],[141.3,34.9],[160.2,41.4],[-118.4,33.8],[-129.6,37.9],[-180,44.7]],major:!0,rfsYear:2010,owners:["Bharti Airtel","Google","KDDI","Singtel","TIME dotCom","Telstra"],landingPoints:[{country:"JP",countryName:"Japan",city:"Chikura",lat:34.98,lon:139.95},{country:"US",countryName:"United States",city:"Redondo Beach",lat:33.84,lon:-118.39}],countriesServed:[{country:"JP",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"pacific_crossing_1_pc_1",name:"Pacific Crossing-1 (PC-1)",points:[[140.6,36.4],[136.9,34.3],[-120.6,35.1],[-122.3,47.9]],major:!0,rfsYear:1999,owners:["Pacific Crossing"],landingPoints:[{country:"JP",countryName:"Japan",city:"Ajigaura",lat:36.38,lon:140.61},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"US",countryName:"United States",city:"Grover Beach",lat:35.12,lon:-120.62},{country:"US",countryName:"United States",city:"Harbour Pointe",lat:47.89,lon:-122.3}],countriesServed:[{country:"JP",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"topaz",name:"Topaz",points:[[138.6,33.2],[120.9,22.3],[-151.2,49.6],[142.2,36.9],[140.8,33.9],[-123.1,49.3]],major:!0,rfsYear:2023,owners:["Google"],landingPoints:[{country:"CA",countryName:"Canada",city:"Port Alberni",lat:49.23,lon:-124.81},{country:"CA",countryName:"Canada",city:"Vancouver",lat:49.26,lon:-123.11},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"JP",countryName:"Japan",city:"Takahagi",lat:36.71,lon:140.72},{country:"TW",countryName:"Taiwan",city:"Dawu",lat:22.34,lon:120.89}],countriesServed:[{country:"CA",capacityShare:.3,isRedundant:!0},{country:"JP",capacityShare:.3,isRedundant:!0},{country:"TW",capacityShare:.3,isRedundant:!0}]},{id:"echo",name:"Echo",points:[[180,26.3],[143.5,13.4],[123.7,-6.5],[104.8,1.2],[133.6,7.7],[-163.8,33.3],[-180,26.3]],major:!0,rfsYear:2025,owners:["Google","Meta"],landingPoints:[{country:"GU",countryName:"Guam",city:"Agat",lat:13.39,lon:144.66},{country:"GU",countryName:"Guam",city:"Piti",lat:13.46,lon:144.69},{country:"ID",countryName:"Indonesia",city:"Tanjung Pakis",lat:-5.98,lon:107.12},{country:"PW",countryName:"Palau",city:"Ngeremlengui",lat:7.53,lon:134.56},{country:"SG",countryName:"Singapore",city:"Changi North",lat:1.39,lon:103.99},{country:"US",countryName:"United States",city:"Eureka",lat:40.8,lon:-124.16}],countriesServed:[{country:"GU",capacityShare:.2,isRedundant:!0},{country:"ID",capacityShare:.2,isRedundant:!0},{country:"PW",capacityShare:.2,isRedundant:!0},{country:"SG",capacityShare:.2,isRedundant:!0},{country:"US",capacityShare:.2,isRedundant:!0}]},{id:"southern_cross_next",name:"Southern Cross NEXT",points:[[151.2,-33.9],[180,-18.9],[-175.5,-14.6],[-138.6,23.3],[-171.4,-9.3],[179.3,-18.9],[179.5,-19.3]],major:!0,rfsYear:2022,owners:["Southern Cross Cable Network"],landingPoints:[{country:"AU",countryName:"Australia",city:"Alexandria",lat:-33.91,lon:151.2},{country:"FJ",countryName:"Fiji",city:"Savusavu",lat:-16.81,lon:179.35},{country:"FJ",countryName:"Fiji",city:"Suva",lat:-18.12,lon:178.44},{country:"KI",countryName:"Kiribati",city:"Tabwakea",lat:1.87,lon:-157.43},{country:"NZ",countryName:"New Zealand",city:"Takapuna",lat:-36.79,lon:174.77},{country:"TK",countryName:"Tokelau",city:"Nukunonu",lat:-9.17,lon:-171.81},{country:"US",countryName:"United States",city:"Hermosa Beach",lat:33.86,lon:-118.4}],countriesServed:[{country:"AU",capacityShare:.17,isRedundant:!0},{country:"FJ",capacityShare:.17,isRedundant:!0},{country:"KI",capacityShare:.17,isRedundant:!0},{country:"NZ",capacityShare:.17,isRedundant:!0},{country:"TK",capacityShare:.17,isRedundant:!0},{country:"US",capacityShare:.17,isRedundant:!0}]},{id:"hawaiki",name:"Hawaiki",points:[[174.6,-36.1],[151.2,-33.9],[-173.7,-11.9],[-153,25.3],[-173.7,-11.9],[165.6,-34.1],[-174,-18.6]],major:!0,rfsYear:2018,owners:["BW Digital"],landingPoints:[{country:"AS",countryName:"American Samoa",city:"Pago Pago",lat:-14.28,lon:-170.7},{country:"AU",countryName:"Australia",city:"Sydney",lat:-33.87,lon:151.21},{country:"NZ",countryName:"New Zealand",city:"Mangawhai",lat:-36.13,lon:174.57},{country:"TO",countryName:"Tonga",city:"Neiafu",lat:-18.65,lon:-173.98},{country:"US",countryName:"United States",city:"Hillsboro",lat:45.52,lon:-122.99},{country:"US",countryName:"United States",city:"Kapolei",lat:21.34,lon:-158.06}],countriesServed:[{country:"AS",capacityShare:.2,isRedundant:!0},{country:"AU",capacityShare:.2,isRedundant:!0},{country:"NZ",capacityShare:.2,isRedundant:!0},{country:"TO",capacityShare:.2,isRedundant:!0},{country:"US",capacityShare:.2,isRedundant:!0}]},{id:"seamewe_6",name:"SeaMeWe-6",points:[[50.6,26.2],[92,21.4],[43.2,11.6],[32.3,31.3],[33.1,28.4],[5.4,43.3],[80.2,13.1],[72.9,19.1],[101.4,2.8],[73.5,4.2],[58.4,23.6],[67,24.9],[51.5,25.3],[38.1,24.1],[103.7,1.3],[80.5,5.9],[54.4,24.4]],major:!0,rfsYear:2027,owners:["Bahrain Telecommunications Company (Batelco)","Bangladesh Submarine Cable Company Limited (BSCCL)","Bharti Airtel","China Unicom","Dhiraagu","Djibouti Telecom","Microsoft","Mobily","Orange","PCCW","Singtel","Sri Lanka Telecom","Telecom Egypt","Telekom Malaysia","Telin","Transworld"],landingPoints:[{country:"BH",countryName:"Bahrain",city:"Manama",lat:26.23,lon:50.58},{country:"BD",countryName:"Bangladesh",city:"Cox’s Bazar",lat:21.43,lon:91.99},{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"EG",countryName:"Egypt",city:"Port Said",lat:31.26,lon:32.28},{country:"EG",countryName:"Egypt",city:"Ras Ghareb",lat:28.37,lon:33.08},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"IN",countryName:"India",city:"Chennai",lat:13.06,lon:80.24},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"MY",countryName:"Malaysia",city:"Morib",lat:2.75,lon:101.44},{country:"MV",countryName:"Maldives",city:"Hulhumale",lat:4.21,lon:73.54},{country:"OM",countryName:"Oman",city:"Muscat",lat:23.58,lon:58.41},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"QA",countryName:"Qatar",city:"Doha",lat:25.29,lon:51.52},{country:"SA",countryName:"Saudi Arabia",city:"Yanbu",lat:24.07,lon:38.11},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"LK",countryName:"Sri Lanka",city:"Matara",lat:5.94,lon:80.54},{country:"AE",countryName:"United Arab Emirates",city:"Abu Dhabi",lat:24.44,lon:54.42}],countriesServed:[{country:"BH",capacityShare:.07,isRedundant:!0},{country:"BD",capacityShare:.07,isRedundant:!0},{country:"DJ",capacityShare:.07,isRedundant:!0},{country:"EG",capacityShare:.07,isRedundant:!0},{country:"FR",capacityShare:.07,isRedundant:!0},{country:"IN",capacityShare:.07,isRedundant:!0},{country:"MY",capacityShare:.07,isRedundant:!0},{country:"MV",capacityShare:.07,isRedundant:!0},{country:"OM",capacityShare:.07,isRedundant:!0},{country:"PK",capacityShare:.07,isRedundant:!0},{country:"QA",capacityShare:.07,isRedundant:!0},{country:"SA",capacityShare:.07,isRedundant:!0},{country:"SG",capacityShare:.07,isRedundant:!0},{country:"LK",capacityShare:.07,isRedundant:!0},{country:"AE",capacityShare:.07,isRedundant:!0}]},{id:"seamewe_4",name:"SeaMeWe-4",points:[[7.8,36.9],[92,21.4],[29.9,31.2],[32.5,30],[5.4,43.3],[80.2,13.1],[72.9,19.1],[13.4,38.1],[102.2,2.3],[67,24.9],[39.2,21.5],[103.7,1.3],[79.9,6.9],[100.1,6.6],[9.9,37.3],[56.3,25.1]],major:!0,rfsYear:2005,owners:["Algerie Telecom","Bangladesh Submarine Cable Company Limited (BSCCL)","Bharti Airtel","National Telecom","Orange","Pakistan Telecommunications Company Ltd.","Singtel","Sparkle","Sri Lanka Telecom","Tata Communications","Telecom Egypt","Telekom Malaysia","Tunisia Telecom","Verizon","center3","e&"],landingPoints:[{country:"DZ",countryName:"Algeria",city:"Annaba",lat:36.9,lon:7.76},{country:"BD",countryName:"Bangladesh",city:"Cox’s Bazar",lat:21.43,lon:91.99},{country:"EG",countryName:"Egypt",city:"Alexandria",lat:31.19,lon:29.89},{country:"EG",countryName:"Egypt",city:"Suez",lat:29.97,lon:32.53},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"IN",countryName:"India",city:"Chennai",lat:13.06,lon:80.24},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IT",countryName:"Italy",city:"Palermo",lat:38.12,lon:13.36},{country:"MY",countryName:"Malaysia",city:"Melaka",lat:2.27,lon:102.22},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"LK",countryName:"Sri Lanka",city:"Colombo",lat:6.93,lon:79.87},{country:"TH",countryName:"Thailand",city:"Satun",lat:6.61,lon:100.07},{country:"TN",countryName:"Tunisia",city:"Bizerte",lat:37.28,lon:9.87},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33}],countriesServed:[{country:"DZ",capacityShare:.07,isRedundant:!0},{country:"BD",capacityShare:.07,isRedundant:!0},{country:"EG",capacityShare:.07,isRedundant:!0},{country:"FR",capacityShare:.07,isRedundant:!0},{country:"IN",capacityShare:.07,isRedundant:!0},{country:"IT",capacityShare:.07,isRedundant:!0},{country:"MY",capacityShare:.07,isRedundant:!0},{country:"PK",capacityShare:.07,isRedundant:!0},{country:"SA",capacityShare:.07,isRedundant:!0},{country:"SG",capacityShare:.07,isRedundant:!0},{country:"LK",capacityShare:.07,isRedundant:!0},{country:"TH",capacityShare:.07,isRedundant:!0},{country:"TN",capacityShare:.07,isRedundant:!0},{country:"AE",capacityShare:.07,isRedundant:!0}]},{id:"seamewe_5",name:"SeaMeWe-5",points:[[90.1,21.8],[43.2,11.6],[29.7,31.1],[32.7,29.1],[5.9,43.1],[101.5,1.7],[98.7,3.8],[15.1,37.5],[102.2,2.3],[94.4,16.9],[59.4,22.7],[67,24.9],[38.1,24.1],[103.7,1.3],[80.5,5.9],[28.3,36.9],[56.3,25.1],[43,14.8]],major:!0,rfsYear:2016,owners:["Bangladesh Submarine Cable Company Limited (BSCCL)","China Mobile","China Telecom","China Unicom","Djibouti Telecom","Myanmar Post and Telecommunication (MPT)","Ooredoo","Orange","Singtel","Sparkle","Sri Lanka Telecom","TeleYemen","Telecom Egypt","Telekom Malaysia","Telkom Indonesia","Transworld","center3","du"],landingPoints:[{country:"BD",countryName:"Bangladesh",city:"Kuakata",lat:21.82,lon:90.12},{country:"DJ",countryName:"Djibouti",city:"Haramous",lat:11.57,lon:43.16},{country:"EG",countryName:"Egypt",city:"Abu Talat",lat:31.07,lon:29.7},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"FR",countryName:"France",city:"Toulon",lat:43.13,lon:5.93},{country:"ID",countryName:"Indonesia",city:"Dumai",lat:1.67,lon:101.45},{country:"ID",countryName:"Indonesia",city:"Medan",lat:3.75,lon:98.68},{country:"IT",countryName:"Italy",city:"Catania",lat:37.51,lon:15.07},{country:"MY",countryName:"Malaysia",city:"Melaka",lat:2.27,lon:102.22},{country:"MM",countryName:"Myanmar",city:"Ngwe Saung",lat:16.86,lon:94.39},{country:"OM",countryName:"Oman",city:"Qalhat",lat:22.7,lon:59.37},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"SA",countryName:"Saudi Arabia",city:"Yanbu",lat:24.07,lon:38.11},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"LK",countryName:"Sri Lanka",city:"Matara",lat:5.94,lon:80.54},{country:"TR",countryName:"Turkey",city:"Marmaris",lat:36.86,lon:28.25},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33},{country:"YE",countryName:"Yemen",city:"Al Hudaydah",lat:14.8,lon:42.95}],countriesServed:[{country:"BD",capacityShare:.06,isRedundant:!0},{country:"DJ",capacityShare:.06,isRedundant:!0},{country:"EG",capacityShare:.06,isRedundant:!0},{country:"FR",capacityShare:.06,isRedundant:!0},{country:"ID",capacityShare:.06,isRedundant:!0},{country:"IT",capacityShare:.06,isRedundant:!0},{country:"MY",capacityShare:.06,isRedundant:!0},{country:"MM",capacityShare:.06,isRedundant:!0},{country:"OM",capacityShare:.06,isRedundant:!0},{country:"PK",capacityShare:.06,isRedundant:!0},{country:"SA",capacityShare:.06,isRedundant:!0},{country:"SG",capacityShare:.06,isRedundant:!0},{country:"LK",capacityShare:.06,isRedundant:!0},{country:"TR",capacityShare:.06,isRedundant:!0},{country:"AE",capacityShare:.06,isRedundant:!0},{country:"YE",capacityShare:.06,isRedundant:!0}]},{id:"asia_africa_europe_1_aae_1",name:"Asia Africa Europe-1 (AAE-1)",points:[[103.5,10.6],[114.3,22.2],[43.2,11.6],[29.7,31.1],[32.7,29.1],[5.4,43.3],[24,35.5],[72.9,19.1],[16.9,41.1],[100.4,5.4],[94.4,16.9],[58.6,23.6],[67,24.9],[51.5,25.3],[39.2,21.5],[100.1,6.6],[100.6,7.2],[56.3,25.1],[107.1,10.3],[45,12.8]],major:!0,rfsYear:2017,owners:["China Unicom","Djibouti Telecom","Hyalroute","Metfone","Mobily","National Telecom","OTEGLOBE","Ooredoo","PCCW","Pakistan Telecommunications Company Ltd.","Reliance Jio Infocomm","Retelit","TIME dotCom","TeleYemen","Telecom Egypt","VNPT International","Viettel Corporation","Zain Omantel International","e&"],landingPoints:[{country:"KH",countryName:"Cambodia",city:"Sihanoukville",lat:10.63,lon:103.51},{country:"CN",countryName:"China",city:"Cape D’Aguilar",lat:22.21,lon:114.26},{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"EG",countryName:"Egypt",city:"Abu Talat",lat:31.07,lon:29.7},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"GR",countryName:"Greece",city:"Chania",lat:35.51,lon:24.01},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IT",countryName:"Italy",city:"Bari",lat:41.13,lon:16.87},{country:"MY",countryName:"Malaysia",city:"Penang",lat:5.37,lon:100.41},{country:"MM",countryName:"Myanmar",city:"Ngwe Saung",lat:16.86,lon:94.39},{country:"OM",countryName:"Oman",city:"Al Bustan",lat:23.58,lon:58.61},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"QA",countryName:"Qatar",city:"Doha",lat:25.29,lon:51.52},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"TH",countryName:"Thailand",city:"Satun",lat:6.61,lon:100.07},{country:"TH",countryName:"Thailand",city:"Songkhla",lat:7.2,lon:100.6},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33},{country:"VN",countryName:"Vietnam",city:"Vung Tau",lat:10.34,lon:107.08},{country:"YE",countryName:"Yemen",city:"Aden",lat:12.8,lon:45.03}],countriesServed:[{country:"KH",capacityShare:.06,isRedundant:!0},{country:"CN",capacityShare:.06,isRedundant:!0},{country:"DJ",capacityShare:.06,isRedundant:!0},{country:"EG",capacityShare:.06,isRedundant:!0},{country:"FR",capacityShare:.06,isRedundant:!0},{country:"GR",capacityShare:.06,isRedundant:!0},{country:"IN",capacityShare:.06,isRedundant:!0},{country:"IT",capacityShare:.06,isRedundant:!0},{country:"MY",capacityShare:.06,isRedundant:!0},{country:"MM",capacityShare:.06,isRedundant:!0},{country:"OM",capacityShare:.06,isRedundant:!0},{country:"PK",capacityShare:.06,isRedundant:!0},{country:"QA",capacityShare:.06,isRedundant:!0},{country:"SA",capacityShare:.06,isRedundant:!0},{country:"TH",capacityShare:.06,isRedundant:!0},{country:"AE",capacityShare:.06,isRedundant:!0},{country:"VN",capacityShare:.06,isRedundant:!0},{country:"YE",capacityShare:.06,isRedundant:!0}]},{id:"imewe",name:"IMEWE",points:[[38.1,22.1],[38.1,22.1],[62.1,19.1],[16.7,34.7],[16.7,34.7],[31.4,31.1],[29.9,31.2]],major:!0,rfsYear:2010,owners:["Bharti Airtel","Ogero","Orange","Pakistan Telecommunications Company Ltd.","Sparkle","Tata Communications","Telecom Egypt","center3","e&"],landingPoints:[{country:"EG",countryName:"Egypt",city:"Alexandria",lat:31.19,lon:29.89},{country:"EG",countryName:"Egypt",city:"Suez",lat:29.97,lon:32.53},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IT",countryName:"Italy",city:"Catania",lat:37.51,lon:15.07},{country:"LB",countryName:"Lebanon",city:"Tripoli",lat:34.44,lon:35.86},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33}],countriesServed:[{country:"EG",capacityShare:.13,isRedundant:!0},{country:"FR",capacityShare:.13,isRedundant:!0},{country:"IN",capacityShare:.13,isRedundant:!0},{country:"IT",capacityShare:.13,isRedundant:!0},{country:"LB",capacityShare:.13,isRedundant:!0},{country:"PK",capacityShare:.13,isRedundant:!0},{country:"SA",capacityShare:.13,isRedundant:!0},{country:"AE",capacityShare:.13,isRedundant:!0}]},{id:"europe_india_gateway_eig",name:"Europe India Gateway (EIG)",points:[[56.3,25.1],[9,38],[16.7,33.2],[-13.5,44.1],[43.4,12.6],[32.7,29.1]],major:!0,rfsYear:2011,owners:["AT&T","Altice Portugal","BT","Bayobab","Bharat Sanchar Nigam Ltd. (BSNL)","Bharti Airtel","Djibouti Telecom","Gibtelecom","Kalaam Telecom","Libya International Telecommunications Company","Telecom Egypt","Telkom South Africa","Verizon","Vodafone","Zain Omantel International","center3","du"],landingPoints:[{country:"DJ",countryName:"Djibouti",city:"Haramous",lat:11.57,lon:43.16},{country:"EG",countryName:"Egypt",city:"Abu Talat",lat:31.07,lon:29.7},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"GI",countryName:"Gibraltar",city:"Gibraltar",lat:36.16,lon:-5.35},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"LY",countryName:"Libya",city:"Tripoli",lat:32.88,lon:13.19},{country:"MC",countryName:"Monaco",city:"Monaco",lat:43.73,lon:7.42},{country:"OM",countryName:"Oman",city:"Barka",lat:23.68,lon:57.89},{country:"PT",countryName:"Portugal",city:"Sesimbra",lat:38.44,lon:-9.1},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33},{country:"GB",countryName:"United Kingdom",city:"Bude",lat:50.83,lon:-4.54}],countriesServed:[{country:"DJ",capacityShare:.09,isRedundant:!0},{country:"EG",capacityShare:.09,isRedundant:!0},{country:"GI",capacityShare:.09,isRedundant:!0},{country:"IN",capacityShare:.09,isRedundant:!0},{country:"LY",capacityShare:.09,isRedundant:!0},{country:"MC",capacityShare:.09,isRedundant:!0},{country:"OM",capacityShare:.09,isRedundant:!0},{country:"PT",capacityShare:.09,isRedundant:!0},{country:"SA",capacityShare:.09,isRedundant:!0},{country:"AE",capacityShare:.09,isRedundant:!0},{country:"GB",capacityShare:.09,isRedundant:!0}]},{id:"peace_cable",name:"PEACE Cable",points:[[9.5,37.5],[29.7,31.1],[41.7,14.8],[32.5,34.8],[95.5,5.9],[63.2,23.9],[56.3,25.1]],major:!0,rfsYear:2022,owners:["Peace Cable International Network Co. Ltd."],landingPoints:[{country:"CY",countryName:"Cyprus",city:"Yeroskipos",lat:34.77,lon:32.47},{country:"EG",countryName:"Egypt",city:"Abu Talat",lat:31.07,lon:29.7},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"MV",countryName:"Maldives",city:"Kulhudhufushi",lat:6.62,lon:73.07},{country:"MT",countryName:"Malta",city:"Mellieha",lat:35.95,lon:14.35},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"SC",countryName:"Seychelles",city:"Victoria",lat:-4.62,lon:55.45},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"SO",countryName:"Somalia",city:"Berbera",lat:10.44,lon:45.01},{country:"TN",countryName:"Tunisia",city:"Bizerte",lat:37.28,lon:9.87},{country:"AE",countryName:"United Arab Emirates",city:"Kalba",lat:25.05,lon:56.34}],countriesServed:[{country:"CY",capacityShare:.08,isRedundant:!0},{country:"EG",capacityShare:.08,isRedundant:!0},{country:"FR",capacityShare:.08,isRedundant:!0},{country:"KE",capacityShare:.08,isRedundant:!0},{country:"MV",capacityShare:.08,isRedundant:!0},{country:"MT",capacityShare:.08,isRedundant:!0},{country:"PK",capacityShare:.08,isRedundant:!0},{country:"SA",capacityShare:.08,isRedundant:!0},{country:"SC",capacityShare:.08,isRedundant:!0},{country:"SG",capacityShare:.08,isRedundant:!0},{country:"SO",capacityShare:.08,isRedundant:!0},{country:"TN",capacityShare:.08,isRedundant:!0},{country:"AE",capacityShare:.08,isRedundant:!0}]},{id:"seacomtata_tgn_eurasia",name:"SEACOM/Tata TGN-Eurasia",points:[[38.1,22.1],[42.8,-15.2],[42.3,-4.4],[70.2,19.2],[43.1,13.1],[33.5,28.2],[32.6,29.1]],major:!0,rfsYear:2009,owners:["SEACOM","Tata Communications"],landingPoints:[{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"MZ",countryName:"Mozambique",city:"Maputo",lat:-25.97,lon:32.58},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"ZA",countryName:"South Africa",city:"Mtunzini",lat:-28.95,lon:31.76},{country:"TZ",countryName:"Tanzania",city:"Dar Es Salaam",lat:-6.82,lon:39.27}],countriesServed:[{country:"DJ",capacityShare:.13,isRedundant:!0},{country:"EG",capacityShare:.13,isRedundant:!0},{country:"IN",capacityShare:.13,isRedundant:!0},{country:"KE",capacityShare:.13,isRedundant:!0},{country:"MZ",capacityShare:.13,isRedundant:!0},{country:"SA",capacityShare:.13,isRedundant:!0},{country:"ZA",capacityShare:.13,isRedundant:!0},{country:"TZ",capacityShare:.13,isRedundant:!0}]},{id:"te_northtgn_eurasiaseacomalexandrosmedex",name:"TE North/TGN-Eurasia/SEACOM/Alexandros/Medex",points:[[5.4,43.3],[10.3,37.9],[12.7,35.4],[25.2,33.1],[32.4,33.2],[7.8,36.9]],major:!0,rfsYear:2011,owners:["Algerie Telecom","Cyta","PCCW","SEACOM","Tata Communications","Telecom Egypt"],landingPoints:[{country:"DZ",countryName:"Algeria",city:"Annaba",lat:36.9,lon:7.76},{country:"CY",countryName:"Cyprus",city:"Pentaskhinos",lat:34.83,lon:33.6},{country:"EG",countryName:"Egypt",city:"Abu Talat",lat:31.07,lon:29.7},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37}],countriesServed:[{country:"DZ",capacityShare:.25,isRedundant:!0},{country:"CY",capacityShare:.25,isRedundant:!0},{country:"EG",capacityShare:.25,isRedundant:!0},{country:"FR",capacityShare:.25,isRedundant:!0}]},{id:"2africa",name:"2Africa",points:[[44.6,11.2],[58.2,23.9],[0,-6.5],[52.7,12.9],[13.2,36],[24.8,35.1]],major:!0,rfsYear:2024,owners:["Bayobab","China Mobile","Meta","Orange","Telecom Egypt","Vodafone","WIOCC","center3"],landingPoints:[{country:"AO",countryName:"Angola",city:"Luanda",lat:-8.81,lon:13.23},{country:"BH",countryName:"Bahrain",city:"Manama",lat:26.23,lon:50.58},{country:"KM",countryName:"Comoros",city:"Moroni",lat:-11.7,lon:43.24},{country:"CD",countryName:"Congo, Dem. Rep.",city:"Muanda",lat:-5.93,lon:12.35},{country:"CG",countryName:"Congo, Rep.",city:"Pointe-Noire",lat:-4.78,lon:11.86},{country:"CI",countryName:"Côte d'Ivoire",city:"Abidjan",lat:5.32,lon:-4.03},{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"EG",countryName:"Egypt",city:"Port Said",lat:31.26,lon:32.28},{country:"EG",countryName:"Egypt",city:"Ras Ghareb",lat:28.37,lon:33.08},{country:"EG",countryName:"Egypt",city:"Suez",lat:29.97,lon:32.53},{country:"EG",countryName:"Egypt",city:"Zafarana",lat:29.12,lon:32.65},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"GA",countryName:"Gabon",city:"Libreville",lat:.39,lon:9.45},{country:"GH",countryName:"Ghana",city:"Accra",lat:5.56,lon:-.2},{country:"GR",countryName:"Greece",city:"Tympaki",lat:35.07,lon:24.77},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IQ",countryName:"Iraq",city:"Al Faw",lat:29.92,lon:48.53},{country:"IT",countryName:"Italy",city:"Genoa",lat:44.41,lon:8.94},{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"KE",countryName:"Kenya",city:"Mtwapa",lat:-3.95,lon:39.75},{country:"KW",countryName:"Kuwait",city:"Kuwait City",lat:29.37,lon:47.97},{country:"MG",countryName:"Madagascar",city:"Mahajanga",lat:-15.71,lon:46.32},{country:"MZ",countryName:"Mozambique",city:"Maputo",lat:-25.97,lon:32.58},{country:"MZ",countryName:"Mozambique",city:"Nacala",lat:-14.57,lon:40.69},{country:"NG",countryName:"Nigeria",city:"Kwa Ibo",lat:4.54,lon:8},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"OM",countryName:"Oman",city:"Barka",lat:23.68,lon:57.89},{country:"OM",countryName:"Oman",city:"Salalah",lat:17.1,lon:54.15},{country:"PK",countryName:"Pakistan",city:"Karachi",lat:24.89,lon:67.03},{country:"PT",countryName:"Portugal",city:"Carcavelos",lat:38.69,lon:-9.33},{country:"QA",countryName:"Qatar",city:"Doha",lat:25.29,lon:51.52},{country:"SA",countryName:"Saudi Arabia",city:"Al Khobar",lat:26.29,lon:50.21},{country:"SA",countryName:"Saudi Arabia",city:"Duba",lat:27.35,lon:35.7},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"SA",countryName:"Saudi Arabia",city:"Yanbu",lat:24.07,lon:38.11},{country:"SN",countryName:"Senegal",city:"Dakar",lat:14.69,lon:-17.45},{country:"SC",countryName:"Seychelles",city:"Carana",lat:-4.57,lon:55.45},{country:"SO",countryName:"Somalia",city:"Berbera",lat:10.44,lon:45.01},{country:"SO",countryName:"Somalia",city:"Mogadishu",lat:2.04,lon:45.34},{country:"ZA",countryName:"South Africa",city:"Amanzimtoti",lat:-30.06,lon:30.88},{country:"ZA",countryName:"South Africa",city:"Duynefontein",lat:-33.69,lon:18.45},{country:"ZA",countryName:"South Africa",city:"Gqeberha",lat:-33.96,lon:25.62},{country:"ZA",countryName:"South Africa",city:"Yzerfontein",lat:-33.35,lon:18.16},{country:"ES",countryName:"Spain",city:"Barcelona",lat:41.39,lon:2.17},{country:"ES",countryName:"Spain",city:"Gran Canaria",lat:27.96,lon:-15.6},{country:"SD",countryName:"Sudan",city:"Port Sudan",lat:19.62,lon:37.22},{country:"TZ",countryName:"Tanzania",city:"Dar Es Salaam",lat:-6.82,lon:39.27},{country:"AE",countryName:"United Arab Emirates",city:"Abu Dhabi",lat:24.44,lon:54.42},{country:"AE",countryName:"United Arab Emirates",city:"Kalba",lat:25.05,lon:56.34},{country:"GB",countryName:"United Kingdom",city:"Bude",lat:50.83,lon:-4.54}],countriesServed:[{country:"AO",capacityShare:.03,isRedundant:!0},{country:"BH",capacityShare:.03,isRedundant:!0},{country:"KM",capacityShare:.03,isRedundant:!0},{country:"CD",capacityShare:.03,isRedundant:!0},{country:"CG",capacityShare:.03,isRedundant:!0},{country:"CI",capacityShare:.03,isRedundant:!0},{country:"DJ",capacityShare:.03,isRedundant:!0},{country:"EG",capacityShare:.03,isRedundant:!0},{country:"FR",capacityShare:.03,isRedundant:!0},{country:"GA",capacityShare:.03,isRedundant:!0},{country:"GH",capacityShare:.03,isRedundant:!0},{country:"GR",capacityShare:.03,isRedundant:!0},{country:"IN",capacityShare:.03,isRedundant:!0},{country:"IQ",capacityShare:.03,isRedundant:!0},{country:"IT",capacityShare:.03,isRedundant:!0},{country:"KE",capacityShare:.03,isRedundant:!0},{country:"KW",capacityShare:.03,isRedundant:!0},{country:"MG",capacityShare:.03,isRedundant:!0},{country:"MZ",capacityShare:.03,isRedundant:!0},{country:"NG",capacityShare:.03,isRedundant:!0},{country:"OM",capacityShare:.03,isRedundant:!0},{country:"PK",capacityShare:.03,isRedundant:!0},{country:"PT",capacityShare:.03,isRedundant:!0},{country:"QA",capacityShare:.03,isRedundant:!0},{country:"SA",capacityShare:.03,isRedundant:!0},{country:"SN",capacityShare:.03,isRedundant:!0},{country:"SC",capacityShare:.03,isRedundant:!0},{country:"SO",capacityShare:.03,isRedundant:!0},{country:"ZA",capacityShare:.03,isRedundant:!0},{country:"ES",capacityShare:.03,isRedundant:!0},{country:"SD",capacityShare:.03,isRedundant:!0},{country:"TZ",capacityShare:.03,isRedundant:!0},{country:"AE",capacityShare:.03,isRedundant:!0},{country:"GB",capacityShare:.03,isRedundant:!0}]},{id:"west_africa_cable_system_wacs",name:"West Africa Cable System (WACS)",points:[[-16.2,27.8],[-.2,5.6],[-20.2,15.2],[8.6,-18],[8.1,2.4],[13.1,-22.9],[9.9,-23.5]],major:!0,rfsYear:2012,owners:["Altice Portugal","Angola Cables","Bayobab","Broadband Infraco","Camtel","Cape Verde Telecom","Congo Telecom","Liquid Intelligent Technologies","Office Congolais de Poste et Télécommunication","PCCW","Tata Communications","Telecom Namibia","Telkom South Africa","Togo Telecom","Vodacom DRC","Vodafone","Vodafone Espana","Vodafone Ghana"],landingPoints:[{country:"AO",countryName:"Angola",city:"Sangano",lat:-9.49,lon:13.2},{country:"CM",countryName:"Cameroon",city:"Limbe",lat:4.01,lon:9.21},{country:"CV",countryName:"Cape Verde",city:"Praia",lat:14.92,lon:-23.52},{country:"CD",countryName:"Congo, Dem. Rep.",city:"Muanda",lat:-5.93,lon:12.35},{country:"CG",countryName:"Congo, Rep.",city:"Pointe-Noire",lat:-4.78,lon:11.86},{country:"CI",countryName:"Côte d'Ivoire",city:"Abidjan",lat:5.32,lon:-4.03},{country:"GH",countryName:"Ghana",city:"Accra",lat:5.56,lon:-.2},{country:"NA",countryName:"Namibia",city:"Swakopmund",lat:-22.68,lon:14.53},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"PT",countryName:"Portugal",city:"Seixal",lat:38.64,lon:-9.11},{country:"ZA",countryName:"South Africa",city:"Yzerfontein",lat:-33.35,lon:18.16},{country:"ES",countryName:"Spain",city:"El Goro",lat:27.96,lon:-15.4},{country:"TG",countryName:"Togo",city:"Lome",lat:6.13,lon:1.23}],countriesServed:[{country:"AO",capacityShare:.08,isRedundant:!0},{country:"CM",capacityShare:.08,isRedundant:!0},{country:"CV",capacityShare:.08,isRedundant:!0},{country:"CD",capacityShare:.08,isRedundant:!0},{country:"CG",capacityShare:.08,isRedundant:!0},{country:"CI",capacityShare:.08,isRedundant:!0},{country:"GH",capacityShare:.08,isRedundant:!0},{country:"NA",capacityShare:.08,isRedundant:!0},{country:"NG",capacityShare:.08,isRedundant:!0},{country:"PT",capacityShare:.08,isRedundant:!0},{country:"ZA",capacityShare:.08,isRedundant:!0},{country:"ES",capacityShare:.08,isRedundant:!0},{country:"TG",capacityShare:.08,isRedundant:!0}]},{id:"eastern_africa_submarine_system_eassy",name:"Eastern Africa Submarine System (EASSy)",points:[[43.2,11.6],[43.1,12.8],[54.5,5.5],[42.1,-11.9],[42.3,-4.2],[51.3,1.5],[45.3,2]],major:!0,rfsYear:2010,owners:["BT","Bayobab","Bharti Airtel","Botswana Fibre Networks","Comores Telecom","Djibouti Telecom","Liquid Intelligent Technologies","Mauritius Telecom","Orange","Sudatel","Tanzania Telecommunication Corporation","Telkom Kenya","Telkom South Africa","Telma (Telecom Malagasy)","Vodacom DRC","WIOCC","Zambia Telecom","center3","e&"],landingPoints:[{country:"KM",countryName:"Comoros",city:"Moroni",lat:-11.7,lon:43.24},{country:"DJ",countryName:"Djibouti",city:"Haramous",lat:11.57,lon:43.16},{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"MG",countryName:"Madagascar",city:"Toliara",lat:-23.35,lon:43.66},{country:"MZ",countryName:"Mozambique",city:"Maputo",lat:-25.97,lon:32.58},{country:"SO",countryName:"Somalia",city:"Mogadishu",lat:2.04,lon:45.34},{country:"ZA",countryName:"South Africa",city:"Mtunzini",lat:-28.95,lon:31.76},{country:"SD",countryName:"Sudan",city:"Port Sudan",lat:19.62,lon:37.22},{country:"TZ",countryName:"Tanzania",city:"Dar Es Salaam",lat:-6.82,lon:39.27}],countriesServed:[{country:"KM",capacityShare:.11,isRedundant:!0},{country:"DJ",capacityShare:.11,isRedundant:!0},{country:"KE",capacityShare:.11,isRedundant:!0},{country:"MG",capacityShare:.11,isRedundant:!0},{country:"MZ",capacityShare:.11,isRedundant:!0},{country:"SO",capacityShare:.11,isRedundant:!0},{country:"ZA",capacityShare:.11,isRedundant:!0},{country:"SD",capacityShare:.11,isRedundant:!0},{country:"TZ",capacityShare:.11,isRedundant:!0}]},{id:"equiano",name:"Equiano",points:[[1.6,.8],[-19.1,27.8],[18.4,-33.7],[7.7,-6.6],[3.6,4.2],[1.2,6.1]],major:!0,rfsYear:2023,owners:["Google"],landingPoints:[{country:"NA",countryName:"Namibia",city:"Swakopmund",lat:-22.68,lon:14.53},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"PT",countryName:"Portugal",city:"Sesimbra",lat:38.44,lon:-9.1},{country:"SH",countryName:"Saint Helena, Ascension and Tristan da Cunha",city:"Rupert's Bay",lat:-15.92,lon:-5.71},{country:"ZA",countryName:"South Africa",city:"Melkbosstrand",lat:-33.73,lon:18.45},{country:"TG",countryName:"Togo",city:"Lome",lat:6.13,lon:1.23}],countriesServed:[{country:"NA",capacityShare:.17,isRedundant:!0},{country:"NG",capacityShare:.17,isRedundant:!0},{country:"PT",capacityShare:.17,isRedundant:!0},{country:"SH",capacityShare:.17,isRedundant:!0},{country:"ZA",capacityShare:.17,isRedundant:!0},{country:"TG",capacityShare:.17,isRedundant:!0}]},{id:"africa_coast_to_europe_ace",name:"Africa Coast to Europe (ACE)",points:[[-16.5,28.1],[-4.4,3.3],[-7.6,46.9],[-15.7,7.7],[9.8,1.9],[-17.1,12.2],[-15.8,11.8]],major:!0,rfsYear:2012,owners:["Bayobab","Cable Consortium of Liberia","Canalink","Dolphin Telecom","GUILAB","Gambia Submarine Cable Company","International Mauritania Telecom","Orange","Orange Cameroun","Orange Cote d’Ivoire","Orange Mali","Republic of Cameroon","Republic of Equatorial Guinea","Republic of Gabon","Republic of Guinea Bissau","SBIN (Société Béninoise des Infrastructures Numériques du Bénin)","STP Cabo","Sierra Leone Cable Company","Sonatel","Zamani Telecom"],landingPoints:[{country:"BJ",countryName:"Benin",city:"Cotonou",lat:6.36,lon:2.44},{country:"CI",countryName:"Côte d'Ivoire",city:"Abidjan",lat:5.32,lon:-4.03},{country:"GQ",countryName:"Equatorial Guinea",city:"Bata",lat:1.86,lon:9.77},{country:"FR",countryName:"France",city:"Penmarch",lat:47.81,lon:-4.34},{country:"GA",countryName:"Gabon",city:"Libreville",lat:.39,lon:9.45},{country:"GM",countryName:"Gambia",city:"Banjul",lat:13.46,lon:-16.58},{country:"GH",countryName:"Ghana",city:"Accra",lat:5.56,lon:-.2},{country:"GN",countryName:"Guinea",city:"Conakry",lat:9.51,lon:-13.7},{country:"GW",countryName:"Guinea-Bissau",city:"Suro",lat:11.77,lon:-15.79},{country:"LR",countryName:"Liberia",city:"Monrovia",lat:6.3,lon:-10.8},{country:"MR",countryName:"Mauritania",city:"Nouakchott",lat:18.08,lon:-15.98},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"PT",countryName:"Portugal",city:"Carcavelos",lat:38.69,lon:-9.33},{country:"ST",countryName:"Sao Tome and Principe",city:"Sao Tome",lat:.33,lon:6.73},{country:"SN",countryName:"Senegal",city:"Dakar",lat:14.69,lon:-17.45},{country:"SL",countryName:"Sierra Leone",city:"Freetown",lat:8.49,lon:-13.24},{country:"ZA",countryName:"South Africa",city:"Duynefontein",lat:-33.69,lon:18.45},{country:"ES",countryName:"Spain",city:"Granadilla de Abona",lat:28.06,lon:-16.52}],countriesServed:[{country:"BJ",capacityShare:.06,isRedundant:!0},{country:"CI",capacityShare:.06,isRedundant:!0},{country:"GQ",capacityShare:.06,isRedundant:!0},{country:"FR",capacityShare:.06,isRedundant:!0},{country:"GA",capacityShare:.06,isRedundant:!0},{country:"GM",capacityShare:.06,isRedundant:!0},{country:"GH",capacityShare:.06,isRedundant:!0},{country:"GN",capacityShare:.06,isRedundant:!0},{country:"GW",capacityShare:.06,isRedundant:!0},{country:"LR",capacityShare:.06,isRedundant:!0},{country:"MR",capacityShare:.06,isRedundant:!0},{country:"NG",capacityShare:.06,isRedundant:!0},{country:"PT",capacityShare:.06,isRedundant:!0},{country:"ST",capacityShare:.06,isRedundant:!0},{country:"SN",capacityShare:.06,isRedundant:!0},{country:"SL",capacityShare:.06,isRedundant:!0},{country:"ZA",capacityShare:.06,isRedundant:!0},{country:"ES",capacityShare:.06,isRedundant:!0}]},{id:"mainone",name:"MainOne",points:[[-9.1,38.6],[-14.4,29],[-19.8,11.7],[1.6,1.9],[0,.8],[-4,2.4],[-4,5.3]],major:!0,rfsYear:2010,owners:["MainOne - An Equinix Company"],landingPoints:[{country:"CI",countryName:"Côte d'Ivoire",city:"Abidjan",lat:5.32,lon:-4.03},{country:"GH",countryName:"Ghana",city:"Accra",lat:5.56,lon:-.2},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"PT",countryName:"Portugal",city:"Seixal",lat:38.64,lon:-9.11},{country:"SN",countryName:"Senegal",city:"Dakar",lat:14.69,lon:-17.45}],countriesServed:[{country:"CI",capacityShare:.2,isRedundant:!0},{country:"GH",capacityShare:.2,isRedundant:!0},{country:"NG",capacityShare:.2,isRedundant:!0},{country:"PT",capacityShare:.2,isRedundant:!0},{country:"SN",capacityShare:.2,isRedundant:!0}]},{id:"safe",name:"SAFE",points:[[18.4,-33.7],[45.5,-28.7],[57.6,-20.7],[58.3,-20.6],[90,-.8],[77.4,.6],[33.3,-30.3]],major:!0,rfsYear:2002,owners:["AT&T","Angola Telecom","BICS","Camtel","China Telecom","Chunghwa Telecom","Cogent","Ghana Telecommunications Company","KPN","Liquid Intelligent Technologies","Maroc Telecom","Mauritius Telecom","NATCOM (Nigeria)","OPT","Orange","Orange Cote d’Ivoire","PCCW","Singtel","Sonatel","Sparkle","Tata Communications","Telecom Namibia","Telefonica","Telekom Malaysia","Telkom South Africa","Telstra","Verizon","Vodafone"],landingPoints:[{country:"IN",countryName:"India",city:"Kochi",lat:9.94,lon:76.27},{country:"MY",countryName:"Malaysia",city:"Penang",lat:5.37,lon:100.41},{country:"MU",countryName:"Mauritius",city:"Baie Jacotet",lat:-20.47,lon:57.49},{country:"RE",countryName:"Réunion",city:"Saint Paul",lat:-21,lon:55.28},{country:"ZA",countryName:"South Africa",city:"Melkbosstrand",lat:-33.73,lon:18.45},{country:"ZA",countryName:"South Africa",city:"Mtunzini",lat:-28.95,lon:31.76}],countriesServed:[{country:"IN",capacityShare:.2,isRedundant:!0},{country:"MY",capacityShare:.2,isRedundant:!0},{country:"MU",capacityShare:.2,isRedundant:!0},{country:"RE",capacityShare:.2,isRedundant:!0},{country:"ZA",capacityShare:.2,isRedundant:!0}]},{id:"sat_3wasc",name:"SAT-3/WASC",points:[[-9.1,38.4],[-13.5,3.7],[8.1,-4.8],[-3.9,3.3],[11.7,-9.5],[-10.3,33.9],[-6.4,36.7]],major:!0,rfsYear:2002,owners:["AT&T","Altice Portugal","Angola Telecom","BICS","BT","Camtel","China Telecom","Chunghwa Telecom","Cogent","Cyta","Deutsche Telekom","Ghana Telecommunications Company","KPN","KT","Liquid Intelligent Technologies","Maroc Telecom","Mauritius Telecom","NATCOM (Nigeria)","OPT","Orange","Orange Cote d’Ivoire","PCCW","SBIN (La Société Béninoise d’Infrastructures Numériques)","Singtel","Sparkle","Tata Communications","Telecom Namibia","Telekom Malaysia","Telkom South Africa","Telstra","Telxius","Verizon","Vodafone"],landingPoints:[{country:"AO",countryName:"Angola",city:"Cacuaco",lat:-8.78,lon:13.37},{country:"BJ",countryName:"Benin",city:"Cotonou",lat:6.36,lon:2.44},{country:"CM",countryName:"Cameroon",city:"Douala",lat:4.05,lon:9.71},{country:"CI",countryName:"Côte d'Ivoire",city:"Abidjan",lat:5.32,lon:-4.03},{country:"GA",countryName:"Gabon",city:"Libreville",lat:.39,lon:9.45},{country:"GH",countryName:"Ghana",city:"Accra",lat:5.56,lon:-.2},{country:"NG",countryName:"Nigeria",city:"Lagos",lat:6.44,lon:3.42},{country:"PT",countryName:"Portugal",city:"Sesimbra",lat:38.44,lon:-9.1},{country:"SN",countryName:"Senegal",city:"Dakar",lat:14.69,lon:-17.45},{country:"ZA",countryName:"South Africa",city:"Melkbosstrand",lat:-33.73,lon:18.45},{country:"ES",countryName:"Spain",city:"Alta Vista",lat:28,lon:-15.7},{country:"ES",countryName:"Spain",city:"Chipiona",lat:36.73,lon:-6.43}],countriesServed:[{country:"AO",capacityShare:.09,isRedundant:!0},{country:"BJ",capacityShare:.09,isRedundant:!0},{country:"CM",capacityShare:.09,isRedundant:!0},{country:"CI",capacityShare:.09,isRedundant:!0},{country:"GA",capacityShare:.09,isRedundant:!0},{country:"GH",capacityShare:.09,isRedundant:!0},{country:"NG",capacityShare:.09,isRedundant:!0},{country:"PT",capacityShare:.09,isRedundant:!0},{country:"SN",capacityShare:.09,isRedundant:!0},{country:"ZA",capacityShare:.09,isRedundant:!0},{country:"ES",capacityShare:.09,isRedundant:!0}]},{id:"the_east_african_marine_system_teams",name:"The East African Marine System (TEAMS)",points:[[39.7,-4.1],[46.6,-2.4],[56.3,5.5],[62.1,15.7],[63,22.5],[58.5,24.7],[56.3,25.1]],major:!0,rfsYear:2009,owners:["TEAMS Ltd.","e&"],landingPoints:[{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33}],countriesServed:[{country:"KE",capacityShare:.3,isRedundant:!0},{country:"AE",capacityShare:.3,isRedundant:!0}]},{id:"lower_indian_ocean_network_lion",name:"Lower Indian Ocean Network (LION)",points:[[57.5,-20.1],[56.7,-20.2],[55.8,-20.5],[55.6,-20.6],[55.5,-20.9],[55.4,-20.6],[52.2,-18.9],[49.4,-18.1]],major:!0,rfsYear:2009,owners:["Mauritius Telecom","Orange","Orange Madagascar"],landingPoints:[{country:"MG",countryName:"Madagascar",city:"Toamasina",lat:-18.15,lon:49.4},{country:"MU",countryName:"Mauritius",city:"Terre Rouge",lat:-20.08,lon:57.51},{country:"RE",countryName:"Réunion",city:"Sainte Marie",lat:-20.9,lon:55.55}],countriesServed:[{country:"MG",capacityShare:.3,isRedundant:!0},{country:"MU",capacityShare:.3,isRedundant:!0},{country:"RE",capacityShare:.3,isRedundant:!0}]},{id:"djibouti_africa_regional_express_1_dare_1",name:"Djibouti Africa Regional Express 1 (DARE 1)",points:[[43.2,11.6],[39.7,-4],[46.3,-15.7],[43.7,-23.3],[34.9,-19.8],[32.6,-26],[40.7,-14.6],[49.2,11.3],[45.3,2],[31.8,-28.9],[39.3,-6.8],[40.2,-10.3]],major:!0,rfsYear:2021,owners:["Djibouti Telecom","Hormuud Telecom Somalia","Somtel International","Telkom Kenya"],landingPoints:[{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"KE",countryName:"Kenya",city:"Mombasa",lat:-4.05,lon:39.67},{country:"MG",countryName:"Madagascar",city:"Mahajanga",lat:-15.71,lon:46.32},{country:"MG",countryName:"Madagascar",city:"Toliara",lat:-23.35,lon:43.66},{country:"MZ",countryName:"Mozambique",city:"Beira",lat:-19.82,lon:34.85},{country:"MZ",countryName:"Mozambique",city:"Maputo",lat:-25.97,lon:32.58},{country:"MZ",countryName:"Mozambique",city:"Nacala",lat:-14.57,lon:40.69},{country:"SO",countryName:"Somalia",city:"Bosaso",lat:11.28,lon:49.19},{country:"SO",countryName:"Somalia",city:"Mogadishu",lat:2.04,lon:45.34},{country:"ZA",countryName:"South Africa",city:"Mtunzini",lat:-28.95,lon:31.76},{country:"TZ",countryName:"Tanzania",city:"Dar Es Salaam",lat:-6.82,lon:39.27},{country:"TZ",countryName:"Tanzania",city:"Mtwara",lat:-10.26,lon:40.18}],countriesServed:[{country:"DJ",capacityShare:.14,isRedundant:!0},{country:"KE",capacityShare:.14,isRedundant:!0},{country:"MG",capacityShare:.14,isRedundant:!0},{country:"MZ",capacityShare:.14,isRedundant:!0},{country:"SO",capacityShare:.14,isRedundant:!0},{country:"ZA",capacityShare:.14,isRedundant:!0},{country:"TZ",capacityShare:.14,isRedundant:!0}]},{id:"south_america_1_sam_1",name:"South America-1 (SAm-1)",points:[[-56.7,-36.5],[-38.5,-3.7],[-43.2,-22.9],[-38.5,-13],[-46.3,-24],[-70.3,-18.5],[-71.6,-33],[-74.8,10.9],[-68.4,18.6],[-80.9,-2.3],[-88.6,15.7],[-90.8,13.9],[-76.9,-12.3],[-81,-4.1],[-80.1,26.4],[-66.1,18.5]],major:!0,rfsYear:2001,owners:["Telxius"],landingPoints:[{country:"AR",countryName:"Argentina",city:"Las Toninas",lat:-36.47,lon:-56.7},{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"BR",countryName:"Brazil",city:"Rio de Janeiro",lat:-22.9,lon:-43.21},{country:"BR",countryName:"Brazil",city:"Salvador",lat:-12.97,lon:-38.5},{country:"BR",countryName:"Brazil",city:"Santos",lat:-23.96,lon:-46.33},{country:"CL",countryName:"Chile",city:"Arica",lat:-18.47,lon:-70.31},{country:"CL",countryName:"Chile",city:"Valparaíso",lat:-33.05,lon:-71.62},{country:"CO",countryName:"Colombia",city:"Barranquilla",lat:10.94,lon:-74.78},{country:"DO",countryName:"Dominican Republic",city:"Punta Cana",lat:18.62,lon:-68.44},{country:"EC",countryName:"Ecuador",city:"Punta Carnero",lat:-2.27,lon:-80.91},{country:"GT",countryName:"Guatemala",city:"Puerto Barrios",lat:15.73,lon:-88.6},{country:"GT",countryName:"Guatemala",city:"Puerto San Jose",lat:13.93,lon:-90.82},{country:"PE",countryName:"Peru",city:"Lurin",lat:-12.28,lon:-76.87},{country:"PE",countryName:"Peru",city:"Mancora",lat:-4.15,lon:-81.05},{country:"US",countryName:"United States",city:"Boca Raton",lat:26.35,lon:-80.09},{country:"US",countryName:"United States",city:"San Juan",lat:18.47,lon:-66.11}],countriesServed:[{country:"AR",capacityShare:.11,isRedundant:!0},{country:"BR",capacityShare:.11,isRedundant:!0},{country:"CL",capacityShare:.11,isRedundant:!0},{country:"CO",capacityShare:.11,isRedundant:!0},{country:"DO",capacityShare:.11,isRedundant:!0},{country:"EC",capacityShare:.11,isRedundant:!0},{country:"GT",capacityShare:.11,isRedundant:!0},{country:"PE",capacityShare:.11,isRedundant:!0},{country:"US",capacityShare:.11,isRedundant:!0}]},{id:"ellalink",name:"EllaLink",points:[[-35.1,.6],[-23.5,14.9],[-25.6,11.3],[-17.5,28.3],[-9.1,37.9],[-17,20.9]],major:!0,rfsYear:2021,owners:["EllaLink"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"CV",countryName:"Cape Verde",city:"Praia",lat:14.92,lon:-23.52},{country:"GF",countryName:"French Guiana",city:"Cayenne",lat:4.92,lon:-52.31},{country:"MR",countryName:"Mauritania",city:"Nouadhibou",lat:20.95,lon:-17.04},{country:"MA",countryName:"Morocco",city:"Casablanca",lat:33.61,lon:-7.63},{country:"PT",countryName:"Portugal",city:"Funchal",lat:32.65,lon:-16.91},{country:"PT",countryName:"Portugal",city:"Sines",lat:37.96,lon:-8.87}],countriesServed:[{country:"BR",capacityShare:.17,isRedundant:!0},{country:"CV",capacityShare:.17,isRedundant:!0},{country:"GF",capacityShare:.17,isRedundant:!0},{country:"MR",capacityShare:.17,isRedundant:!0},{country:"MA",capacityShare:.17,isRedundant:!0},{country:"PT",capacityShare:.17,isRedundant:!0}]},{id:"brusa",name:"BRUSA",points:[[-43.2,-22.9],[-31,-13.7],[-48.6,14.8],[-75.6,35.8],[-38.5,-3.7],[-66.1,18.5]],major:!0,rfsYear:2018,owners:["Telxius"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"BR",countryName:"Brazil",city:"Rio de Janeiro",lat:-22.9,lon:-43.21},{country:"US",countryName:"United States",city:"San Juan",lat:18.47,lon:-66.11},{country:"US",countryName:"United States",city:"Virginia Beach",lat:36.76,lon:-76.06}],countriesServed:[{country:"BR",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"monet",name:"Monet",points:[[-46.3,-24],[-31.9,-18],[-34.6,.6],[-69.3,25.8],[-78.7,27.3],[-36,-.8],[-38.5,-3.7]],major:!0,rfsYear:2017,owners:["Algar Telecom","Angola Cables","Antel Uruguay","Google"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"BR",countryName:"Brazil",city:"Santos",lat:-23.96,lon:-46.33},{country:"US",countryName:"United States",city:"Boca Raton",lat:26.35,lon:-80.09}],countriesServed:[{country:"BR",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"seabras_1",name:"Seabras-1",points:[[-46.4,-24],[-74.1,40.2]],major:!0,rfsYear:2017,owners:["Seaborn Networks","Sparkle"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Praia Grande",lat:-24.01,lon:-46.41},{country:"US",countryName:"United States",city:"Wall Township",lat:40.15,lon:-74.06}],countriesServed:[{country:"BR",capacityShare:.3,isRedundant:!0},{country:"US",capacityShare:.3,isRedundant:!0}]},{id:"firmina",name:"Firmina",points:[[-78.9,33.7],[-69.3,28.4],[-30.5,-3.8],[-39.6,-25.9],[-56.7,-36.5],[-45.2,-25.1],[-46.4,-24]],major:!0,rfsYear:2025,owners:["Google"],landingPoints:[{country:"AR",countryName:"Argentina",city:"Las Toninas",lat:-36.47,lon:-56.7},{country:"BR",countryName:"Brazil",city:"Praia Grande",lat:-24.01,lon:-46.41},{country:"US",countryName:"United States",city:"Myrtle Beach",lat:33.69,lon:-78.88},{country:"UY",countryName:"Uruguay",city:"Punta del Este",lat:-34.97,lon:-54.95}],countriesServed:[{country:"AR",capacityShare:.25,isRedundant:!0},{country:"BR",capacityShare:.25,isRedundant:!0},{country:"US",capacityShare:.25,isRedundant:!0},{country:"UY",capacityShare:.25,isRedundant:!0}]},{id:"south_atlantic_cable_system_sacs",name:"South Atlantic Cable System (SACS)",points:[[-38.5,-3.7],[-34.2,-2.6],[-19.8,-6.6],[7.2,-9.1],[12.6,-9.2],[13.2,-9.5]],major:!0,rfsYear:2018,owners:["Angola Cables"],landingPoints:[{country:"AO",countryName:"Angola",city:"Sangano",lat:-9.49,lon:13.2},{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54}],countriesServed:[{country:"AO",capacityShare:.3,isRedundant:!0},{country:"BR",capacityShare:.3,isRedundant:!0}]},{id:"south_atlantic_inter_link_sail",name:"South Atlantic Inter Link (SAIL)",points:[[-38.5,-3.7],[-34.2,-2.1],[-10.8,-2.8],[.5,-1.1],[8.1,2.5],[9.9,2.9]],major:!0,rfsYear:2020,owners:["Camtel","China Unicom"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"CM",countryName:"Cameroon",city:"Kribi",lat:2.93,lon:9.91}],countriesServed:[{country:"BR",capacityShare:.3,isRedundant:!0},{country:"CM",capacityShare:.3,isRedundant:!0}]},{id:"arcos",name:"ARCOS",points:[[-83.8,15.3],[-86.6,20.8],[-67,19.1],[-73.3,11.7],[-82.9,15],[-79.6,25.8],[-80.2,25.9]],major:!0,rfsYear:2001,owners:["AT&T","Alestra","Bahamas Telecommunications Company","Belize Telemedia","CANTV","Claro Dominicana (Codetel)","Enitel","Hondutel","ICE (Kolbi)","Internexa","Liberty Networks","Orbinet Overseas","RACSA","Telecomunicaciones Ultramarinas de Puerto Rico","Telepuerto San Isidro","Tigo Colombia","Tricom USA","United Telecommunication Services (UTS)","Verizon"],landingPoints:[{country:"BS",countryName:"Bahamas",city:"Cat Island",lat:24.4,lon:-75.53},{country:"BS",countryName:"Bahamas",city:"Crooked Island",lat:22.63,lon:-74.19},{country:"BS",countryName:"Bahamas",city:"Nassau",lat:25.07,lon:-77.34},{country:"BZ",countryName:"Belize",city:"Belize City",lat:17.5,lon:-88.18},{country:"CO",countryName:"Colombia",city:"Cartagena",lat:10.39,lon:-75.51},{country:"CO",countryName:"Colombia",city:"Riohacha",lat:11.48,lon:-72.95},{country:"CR",countryName:"Costa Rica",city:"Puerto Limon",lat:9.99,lon:-83.04},{country:"CW",countryName:"Curaçao",city:"Willemstad",lat:12.1,lon:-68.9},{country:"DO",countryName:"Dominican Republic",city:"Puerto Plata",lat:19.8,lon:-70.69},{country:"DO",countryName:"Dominican Republic",city:"Punta Cana",lat:18.62,lon:-68.44},{country:"GT",countryName:"Guatemala",city:"Puerto Barrios",lat:15.73,lon:-88.6},{country:"HN",countryName:"Honduras",city:"Puerto Cortes",lat:15.85,lon:-87.95},{country:"HN",countryName:"Honduras",city:"Puerto Lempira",lat:15.26,lon:-83.78},{country:"HN",countryName:"Honduras",city:"Trujillo",lat:15.92,lon:-85.95},{country:"MX",countryName:"Mexico",city:"Cancún",lat:21.1,lon:-86.77},{country:"MX",countryName:"Mexico",city:"Tulum",lat:20.21,lon:-87.46},{country:"NI",countryName:"Nicaragua",city:"Bluefields",lat:11.99,lon:-83.77},{country:"NI",countryName:"Nicaragua",city:"Puerto Cabezas",lat:14.02,lon:-83.39},{country:"PA",countryName:"Panama",city:"Maria Chiquita",lat:9.44,lon:-79.75},{country:"PA",countryName:"Panama",city:"Ustupo",lat:9.13,lon:-77.93},{country:"TC",countryName:"Turks and Caicos Islands",city:"Providenciales",lat:21.85,lon:-72.12},{country:"US",countryName:"United States",city:"Isla Verde",lat:18.44,lon:-66.02},{country:"US",countryName:"United States",city:"North Miami Beach",lat:25.93,lon:-80.16},{country:"VE",countryName:"Venezuela",city:"Punto Fijo",lat:11.71,lon:-70.2}],countriesServed:[{country:"BS",capacityShare:.07,isRedundant:!0},{country:"BZ",capacityShare:.07,isRedundant:!0},{country:"CO",capacityShare:.07,isRedundant:!0},{country:"CR",capacityShare:.07,isRedundant:!0},{country:"CW",capacityShare:.07,isRedundant:!0},{country:"DO",capacityShare:.07,isRedundant:!0},{country:"GT",capacityShare:.07,isRedundant:!0},{country:"HN",capacityShare:.07,isRedundant:!0},{country:"MX",capacityShare:.07,isRedundant:!0},{country:"NI",capacityShare:.07,isRedundant:!0},{country:"PA",capacityShare:.07,isRedundant:!0},{country:"TC",capacityShare:.07,isRedundant:!0},{country:"US",capacityShare:.07,isRedundant:!0},{country:"VE",capacityShare:.07,isRedundant:!0}]},{id:"america_movil_submarine_cable_system_1_amx_1",name:"America Movil Submarine Cable System-1 (AMX-1)",points:[[-38.5,-3.7],[-43.2,-22.9],[-38.5,-13],[-74.8,10.9],[-75.5,10.4],[-81.7,12.6],[-83,10],[-70.7,19.8],[-69.9,18.5],[-88.6,15.7],[-86.8,21.1],[-80.2,26],[-81.7,30.3],[-66.6,18],[-66.1,18.5]],major:!0,rfsYear:2014,owners:["América Móvil (Claro)"],landingPoints:[{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"BR",countryName:"Brazil",city:"Rio de Janeiro",lat:-22.9,lon:-43.21},{country:"BR",countryName:"Brazil",city:"Salvador",lat:-12.97,lon:-38.5},{country:"CO",countryName:"Colombia",city:"Barranquilla",lat:10.94,lon:-74.78},{country:"CO",countryName:"Colombia",city:"Cartagena",lat:10.39,lon:-75.51},{country:"CO",countryName:"Colombia",city:"Schooner Bight",lat:12.55,lon:-81.73},{country:"CR",countryName:"Costa Rica",city:"Puerto Limon",lat:9.99,lon:-83.04},{country:"DO",countryName:"Dominican Republic",city:"Puerto Plata",lat:19.8,lon:-70.69},{country:"DO",countryName:"Dominican Republic",city:"Santo Domingo",lat:18.49,lon:-69.94},{country:"GT",countryName:"Guatemala",city:"Puerto Barrios",lat:15.73,lon:-88.6},{country:"MX",countryName:"Mexico",city:"Cancún",lat:21.1,lon:-86.77},{country:"US",countryName:"United States",city:"Hollywood",lat:26.01,lon:-80.16},{country:"US",countryName:"United States",city:"Jacksonville",lat:30.33,lon:-81.66},{country:"US",countryName:"United States",city:"Ponce",lat:17.98,lon:-66.63},{country:"US",countryName:"United States",city:"San Juan",lat:18.47,lon:-66.11}],countriesServed:[{country:"BR",capacityShare:.14,isRedundant:!0},{country:"CO",capacityShare:.14,isRedundant:!0},{country:"CR",capacityShare:.14,isRedundant:!0},{country:"DO",capacityShare:.14,isRedundant:!0},{country:"GT",capacityShare:.14,isRedundant:!0},{country:"MX",capacityShare:.14,isRedundant:!0},{country:"US",capacityShare:.14,isRedundant:!0}]},{id:"globenet",name:"GlobeNet",points:[[-68.4,15.2],[-68.2,17.8],[-40.9,1.5],[-65.7,34.7],[-32.2,-5.5],[-32.5,-5.8],[-38.5,-3.7]],major:!0,rfsYear:2e3,owners:["V.tal"],landingPoints:[{country:"BM",countryName:"Bermuda",city:"St. David’s",lat:32.31,lon:-64.77},{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"BR",countryName:"Brazil",city:"Rio de Janeiro",lat:-22.9,lon:-43.21},{country:"CO",countryName:"Colombia",city:"Barranquilla",lat:10.94,lon:-74.78},{country:"US",countryName:"United States",city:"Boca Raton",lat:26.35,lon:-80.09},{country:"US",countryName:"United States",city:"Tuckerton",lat:39.6,lon:-74.34},{country:"VE",countryName:"Venezuela",city:"Maiquetia",lat:10.6,lon:-66.96}],countriesServed:[{country:"BM",capacityShare:.2,isRedundant:!0},{country:"BR",capacityShare:.2,isRedundant:!0},{country:"CO",capacityShare:.2,isRedundant:!0},{country:"US",capacityShare:.2,isRedundant:!0},{country:"VE",capacityShare:.2,isRedundant:!0}]},{id:"malbec",name:"Malbec",points:[[-48.6,-32.6],[-51.2,-30],[-46.3,-28],[-54,-35.8],[-46.4,-24],[-43.2,-22.9],[-45,-24.5],[-46.1,-25.1]],major:!0,rfsYear:2021,owners:["Meta","V.tal"],landingPoints:[{country:"AR",countryName:"Argentina",city:"Las Toninas",lat:-36.47,lon:-56.7},{country:"BR",countryName:"Brazil",city:"Porto Alegre",lat:-30.03,lon:-51.23},{country:"BR",countryName:"Brazil",city:"Praia Grande",lat:-24.01,lon:-46.41},{country:"BR",countryName:"Brazil",city:"Rio de Janeiro",lat:-22.9,lon:-43.21}],countriesServed:[{country:"AR",capacityShare:.3,isRedundant:!0},{country:"BR",capacityShare:.3,isRedundant:!0}]},{id:"asia_pacific_gateway_apg",name:"Asia Pacific Gateway (APG)",points:[[104,1.4],[120.1,20.4],[138.6,32.4],[108,6.9],[127.8,29.5],[121.8,24.9]],major:!0,rfsYear:2016,owners:["China Mobile","China Telecom","China Unicom","Chunghwa Telecom","KT","LG Uplus","Meta","NTT","National Telecom","Starhub","TIME dotCom","VNPT International","Viettel Corporation"],landingPoints:[{country:"CN",countryName:"China",city:"Chongming",lat:31.62,lon:121.4},{country:"CN",countryName:"China",city:"Nanhui",lat:30.86,lon:121.93},{country:"CN",countryName:"China",city:"Tseung Kwan O",lat:22.32,lon:114.26},{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"MY",countryName:"Malaysia",city:"Cherating",lat:4.13,lon:103.39},{country:"SG",countryName:"Singapore",city:"Changi South",lat:1.39,lon:103.99},{country:"KR",countryName:"South Korea",city:"Busan",lat:35.17,lon:129},{country:"TW",countryName:"Taiwan",city:"Toucheng",lat:24.86,lon:121.8},{country:"TH",countryName:"Thailand",city:"Songkhla",lat:7.2,lon:100.6},{country:"VN",countryName:"Vietnam",city:"Danang",lat:16.05,lon:108.21}],countriesServed:[{country:"CN",capacityShare:.13,isRedundant:!0},{country:"JP",capacityShare:.13,isRedundant:!0},{country:"MY",capacityShare:.13,isRedundant:!0},{country:"SG",capacityShare:.13,isRedundant:!0},{country:"KR",capacityShare:.13,isRedundant:!0},{country:"TW",capacityShare:.13,isRedundant:!0},{country:"TH",capacityShare:.13,isRedundant:!0},{country:"VN",capacityShare:.13,isRedundant:!0}]},{id:"indigo_west",name:"INDIGO-West",points:[[106.6,-5.2],[104.8,-7.5],[112.9,-30.3],[103.8,.8],[107,-2.1],[106.8,-6.2]],major:!0,rfsYear:2019,owners:["Australia’s Academic and Research Network (AARNET)","Google","Indosat Ooredoo","Singtel","Superloop","Telstra"],landingPoints:[{country:"AU",countryName:"Australia",city:"Perth",lat:-31.95,lon:115.86},{country:"ID",countryName:"Indonesia",city:"Jakarta",lat:-6.17,lon:106.83},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65}],countriesServed:[{country:"AU",capacityShare:.3,isRedundant:!0},{country:"ID",capacityShare:.3,isRedundant:!0},{country:"SG",capacityShare:.3,isRedundant:!0}]},{id:"southeast_asia_japan_cable_sjc",name:"Southeast Asia-Japan Cable (SJC)",points:[[114.6,4.7],[107.1,4.5],[120.1,20.2],[140.4,32.4],[114.3,21.6],[118.3,22.1],[120.1,20.2]],major:!0,rfsYear:2013,owners:["China Mobile","China Telecom","Chunghwa Telecom","Globe Telecom","Google","KDDI","National Telecom","Singtel","Telkom Indonesia","Unified National Networks (UNN)"],landingPoints:[{country:"BN",countryName:"Brunei",city:"Telisai",lat:4.7,lon:114.57},{country:"CN",countryName:"China",city:"Chung Hom Kok",lat:22.22,lon:114.2},{country:"CN",countryName:"China",city:"Shantou",lat:23.35,lon:116.68},{country:"JP",countryName:"Japan",city:"Chikura",lat:34.98,lon:139.95},{country:"PH",countryName:"Philippines",city:"Nasugbu",lat:14.09,lon:120.62},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65}],countriesServed:[{country:"BN",capacityShare:.2,isRedundant:!0},{country:"CN",capacityShare:.2,isRedundant:!0},{country:"JP",capacityShare:.2,isRedundant:!0},{country:"PH",capacityShare:.2,isRedundant:!0},{country:"SG",capacityShare:.2,isRedundant:!0}]},{id:"asia_america_gateway_aag_cable_system",name:"Asia-America Gateway (AAG) Cable System",points:[[107.1,10.3],[145.3,13.5],[117,18.3],[103.9,2.3],[108,6],[-122.4,34.9],[-120.8,35.4]],major:!0,rfsYear:2009,owners:["AT&T","BT","Bharti Airtel","Eastern Telecom","Ezecom","Globe Telecom","Indosat Ooredoo","National Telecom","PLDT","Saigon Postel Corporation","Spark New Zealand","Starhub","Telekom Malaysia","Telkom Indonesia","Telstra","Unified National Networks (UNN)","VNPT International","Viettel Corporation"],landingPoints:[{country:"BN",countryName:"Brunei",city:"Tungku",lat:4.93,lon:114.89},{country:"CN",countryName:"China",city:"Lantau Island",lat:22.27,lon:113.95},{country:"GU",countryName:"Guam",city:"Tanguisson Point",lat:13.54,lon:144.81},{country:"MY",countryName:"Malaysia",city:"Mersing",lat:2.3,lon:103.85},{country:"PH",countryName:"Philippines",city:"La Union",lat:16.58,lon:120.39},{country:"SG",countryName:"Singapore",city:"Changi North",lat:1.39,lon:103.99},{country:"TH",countryName:"Thailand",city:"Sriracha",lat:13.17,lon:100.93},{country:"US",countryName:"United States",city:"Keawaula",lat:21.55,lon:-158.24},{country:"US",countryName:"United States",city:"Morro Bay",lat:35.37,lon:-120.85},{country:"VN",countryName:"Vietnam",city:"Vung Tau",lat:10.34,lon:107.08}],countriesServed:[{country:"BN",capacityShare:.11,isRedundant:!0},{country:"CN",capacityShare:.11,isRedundant:!0},{country:"GU",capacityShare:.11,isRedundant:!0},{country:"MY",capacityShare:.11,isRedundant:!0},{country:"PH",capacityShare:.11,isRedundant:!0},{country:"SG",capacityShare:.11,isRedundant:!0},{country:"TH",capacityShare:.11,isRedundant:!0},{country:"US",capacityShare:.11,isRedundant:!0},{country:"VN",capacityShare:.11,isRedundant:!0}]},{id:"southeast_asia_japan_cable_2_sjc2",name:"Southeast Asia-Japan Cable 2 (SJC2)",points:[[104,1.4],[117,19.5],[138.6,32.1],[112.9,12.6],[129.4,30.9],[123.7,25.7],[121.5,25.2]],major:!0,rfsYear:2025,owners:["China Mobile","Chunghwa Telecom","DongHwa Telecom","KDDI","Meta","SK Broadband","Singtel","Telin","True Corporation","VNPT International"],landingPoints:[{country:"CN",countryName:"China",city:"Chung Hom Kok",lat:22.22,lon:114.2},{country:"CN",countryName:"China",city:"Lingang",lat:30.94,lon:121.9},{country:"JP",countryName:"Japan",city:"Chikura",lat:34.98,lon:139.95},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87},{country:"SG",countryName:"Singapore",city:"Changi South",lat:1.39,lon:103.99},{country:"KR",countryName:"South Korea",city:"Busan",lat:35.17,lon:129},{country:"TW",countryName:"Taiwan",city:"Fangshan",lat:22.25,lon:120.66},{country:"TW",countryName:"Taiwan",city:"Tanshui",lat:25.18,lon:121.46},{country:"TH",countryName:"Thailand",city:"Songkhla",lat:7.2,lon:100.6},{country:"VN",countryName:"Vietnam",city:"Quy Nhon",lat:13.78,lon:109.22}],countriesServed:[{country:"CN",capacityShare:.14,isRedundant:!0},{country:"JP",capacityShare:.14,isRedundant:!0},{country:"SG",capacityShare:.14,isRedundant:!0},{country:"KR",capacityShare:.14,isRedundant:!0},{country:"TW",capacityShare:.14,isRedundant:!0},{country:"TH",capacityShare:.14,isRedundant:!0},{country:"VN",capacityShare:.14,isRedundant:!0}]},{id:"asia_direct_cable_adc",name:"Asia Direct Cable (ADC)",points:[[140,35],[130.9,22.7],[110.9,7.7],[103.3,7.7],[109.2,13.8],[117,13.7],[121.1,13.8]],major:!0,rfsYear:2024,owners:["China Telecom","China Unicom","National Telecom","PLDT","Singtel","Softbank","Tata Communications","Viettel Corporation"],landingPoints:[{country:"CN",countryName:"China",city:"Chung Hom Kok",lat:22.22,lon:114.2},{country:"CN",countryName:"China",city:"Shantou",lat:23.35,lon:116.68},{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"PH",countryName:"Philippines",city:"Batangas",lat:13.77,lon:121.06},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"TH",countryName:"Thailand",city:"Sriracha",lat:13.17,lon:100.93},{country:"VN",countryName:"Vietnam",city:"Quy Nhon",lat:13.78,lon:109.22}],countriesServed:[{country:"CN",capacityShare:.17,isRedundant:!0},{country:"JP",capacityShare:.17,isRedundant:!0},{country:"PH",capacityShare:.17,isRedundant:!0},{country:"SG",capacityShare:.17,isRedundant:!0},{country:"TH",capacityShare:.17,isRedundant:!0},{country:"VN",capacityShare:.17,isRedundant:!0}]},{id:"bifrost",name:"Bifrost",points:[[144.6,13.9],[117.7,-1.5],[103.9,1],[124.8,1.5],[-117.1,32.4],[-138.6,40.4]],major:!0,rfsYear:2025,owners:["Keppel T&T","Meta","Telin"],landingPoints:[{country:"GU",countryName:"Guam",city:"Alupang",lat:13.49,lon:144.78},{country:"ID",countryName:"Indonesia",city:"Jakarta",lat:-6.17,lon:106.83},{country:"ID",countryName:"Indonesia",city:"Manado",lat:1.49,lon:124.84},{country:"MX",countryName:"Mexico",city:"Rosarito",lat:32.36,lon:-117.06},{country:"PH",countryName:"Philippines",city:"Davao",lat:7.08,lon:125.61},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"US",countryName:"United States",city:"Grover Beach",lat:35.12,lon:-120.62},{country:"US",countryName:"United States",city:"Winema",lat:45.15,lon:-123.97}],countriesServed:[{country:"GU",capacityShare:.17,isRedundant:!0},{country:"ID",capacityShare:.17,isRedundant:!0},{country:"MX",capacityShare:.17,isRedundant:!0},{country:"PH",capacityShare:.17,isRedundant:!0},{country:"SG",capacityShare:.17,isRedundant:!0},{country:"US",capacityShare:.17,isRedundant:!0}]},{id:"apricot",name:"Apricot",points:[[144.7,13.4],[141,33.9],[104,1.2],[117.7,-2.7],[125.5,16.2],[104.2,1],[104,1.1]],major:!0,rfsYear:2025,owners:["Chunghwa Telecom","Google","Meta","NTT","PLDT"],landingPoints:[{country:"GU",countryName:"Guam",city:"Agat",lat:13.39,lon:144.66},{country:"ID",countryName:"Indonesia",city:"Batam",lat:1.07,lon:104.02},{country:"ID",countryName:"Indonesia",city:"Tanjung Pakis",lat:-5.98,lon:107.12},{country:"JP",countryName:"Japan",city:"Minamiboso",lat:34.97,lon:139.96},{country:"PH",countryName:"Philippines",city:"Baler",lat:15.76,lon:121.56},{country:"PH",countryName:"Philippines",city:"Davao",lat:7.08,lon:125.61},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"TW",countryName:"Taiwan",city:"Toucheng",lat:24.86,lon:121.8}],countriesServed:[{country:"GU",capacityShare:.17,isRedundant:!0},{country:"ID",capacityShare:.17,isRedundant:!0},{country:"JP",capacityShare:.17,isRedundant:!0},{country:"PH",capacityShare:.17,isRedundant:!0},{country:"SG",capacityShare:.17,isRedundant:!0},{country:"TW",capacityShare:.17,isRedundant:!0}]},{id:"apcn_2",name:"APCN-2",points:[[121.4,31.6],[114,22.3],[116.7,23.4],[140,35],[140.8,36.8],[103.4,4.1],[121.1,13.8],[103.9,1.3],[129,35.2],[121.5,25.2]],major:!0,rfsYear:2001,owners:["AT&T","BT","China Telecom","China Unicom","Chunghwa Telecom","HKBN","KDDI","KT","LG Uplus","NTT","Orange","PCCW","PLDT","Singtel","Singtel Optus","Softbank","Starhub","Tata Communications","Telekom Malaysia","Telstra","Verizon","Vodafone"],landingPoints:[{country:"CN",countryName:"China",city:"Chongming",lat:31.62,lon:121.4},{country:"CN",countryName:"China",city:"Lantau Island",lat:22.27,lon:113.95},{country:"CN",countryName:"China",city:"Shantou",lat:23.35,lon:116.68},{country:"JP",countryName:"Japan",city:"Chikura",lat:34.98,lon:139.95},{country:"JP",countryName:"Japan",city:"Kitaibaraki",lat:36.8,lon:140.75},{country:"MY",countryName:"Malaysia",city:"Cherating",lat:4.13,lon:103.39},{country:"PH",countryName:"Philippines",city:"Batangas",lat:13.77,lon:121.06},{country:"SG",countryName:"Singapore",city:"Katong",lat:1.31,lon:103.9},{country:"KR",countryName:"South Korea",city:"Busan",lat:35.17,lon:129},{country:"TW",countryName:"Taiwan",city:"Tanshui",lat:25.18,lon:121.46}],countriesServed:[{country:"CN",capacityShare:.14,isRedundant:!0},{country:"JP",capacityShare:.14,isRedundant:!0},{country:"MY",capacityShare:.14,isRedundant:!0},{country:"PH",capacityShare:.14,isRedundant:!0},{country:"SG",capacityShare:.14,isRedundant:!0},{country:"KR",capacityShare:.14,isRedundant:!0},{country:"TW",capacityShare:.14,isRedundant:!0}]},{id:"australia_japan_cable_ajc",name:"Australia-Japan Cable (AJC)",points:[[140,35],[151.2,10],[158.4,-25.5],[147.1,13.9],[151.2,-33.8],[140.1,35],[140,35]],major:!0,rfsYear:2001,owners:["AT&T","NTT","Softbank","Telstra","Verizon"],landingPoints:[{country:"AU",countryName:"Australia",city:"Oxford Falls",lat:-33.74,lon:151.25},{country:"AU",countryName:"Australia",city:"Paddington",lat:-33.88,lon:151.23},{country:"GU",countryName:"Guam",city:"Tanguisson Point",lat:13.54,lon:144.81},{country:"GU",countryName:"Guam",city:"Tumon Bay",lat:13.51,lon:144.8},{country:"JP",countryName:"Japan",city:"Maruyama",lat:35.01,lon:139.98},{country:"JP",countryName:"Japan",city:"Shima",lat:34.34,lon:136.87}],countriesServed:[{country:"AU",capacityShare:.3,isRedundant:!0},{country:"GU",capacityShare:.3,isRedundant:!0},{country:"JP",capacityShare:.3,isRedundant:!0}]},{id:"australia_singapore_cable_asc",name:"Australia-Singapore Cable (ASC)",points:[[103.9,1.3],[105.3,.1],[106.5,-5.2],[105.3,-7.5],[112,-27.2],[105.9,-6.1],[105.7,-10.4]],major:!0,rfsYear:2018,owners:["Vocus Communications"],landingPoints:[{country:"AU",countryName:"Australia",city:"Perth",lat:-31.95,lon:115.86},{country:"CX",countryName:"Christmas Island",city:"Flying Fish Cove",lat:-10.44,lon:105.7},{country:"ID",countryName:"Indonesia",city:"Anyer",lat:-6.07,lon:105.88},{country:"SG",countryName:"Singapore",city:"Tanah Merah",lat:1.33,lon:103.95}],countriesServed:[{country:"AU",capacityShare:.25,isRedundant:!0},{country:"CX",capacityShare:.25,isRedundant:!0},{country:"ID",capacityShare:.25,isRedundant:!0},{country:"SG",capacityShare:.25,isRedundant:!0}]},{id:"japan_guam_australia_south_jga_s",name:"Japan-Guam-Australia South (JGA-S)",points:[[144.7,13.5],[149.4,10.9],[157.7,-3],[162,-13.7],[152.1,-33.5],[153.1,-26.7]],major:!0,rfsYear:2020,owners:["Australia’s Academic and Research Network (AARNET)","Google","Lightstorm Telecom"],landingPoints:[{country:"AU",countryName:"Australia",city:"Brookvale",lat:-33.76,lon:151.27},{country:"AU",countryName:"Australia",city:"Maroochydore",lat:-26.65,lon:153.09},{country:"GU",countryName:"Guam",city:"Piti",lat:13.46,lon:144.69}],countriesServed:[{country:"AU",capacityShare:.3,isRedundant:!0},{country:"GU",capacityShare:.3,isRedundant:!0}]},{id:"sea_us",name:"SEA-US",points:[[-118.4,33.9],[-158.4,22.1],[-180,18.3],[126,6],[144,13.1],[160.2,15.7],[180,18.3]],major:!0,rfsYear:2017,owners:["GTA TeleGuam","Globe Telecom","Hawaiian Telcom","Lightstorm Telecom","Telin"],landingPoints:[{country:"GU",countryName:"Guam",city:"Piti",lat:13.46,lon:144.69},{country:"ID",countryName:"Indonesia",city:"Kauditan",lat:1.38,lon:125.07},{country:"FM",countryName:"Micronesia",city:"Magachgil",lat:9.44,lon:138.06},{country:"PW",countryName:"Palau",city:"Ngeremlengui",lat:7.53,lon:134.56},{country:"PH",countryName:"Philippines",city:"Davao",lat:7.08,lon:125.61},{country:"US",countryName:"United States",city:"Hermosa Beach",lat:33.86,lon:-118.4},{country:"US",countryName:"United States",city:"Makaha",lat:21.46,lon:-158.22}],countriesServed:[{country:"GU",capacityShare:.17,isRedundant:!0},{country:"ID",capacityShare:.17,isRedundant:!0},{country:"FM",capacityShare:.17,isRedundant:!0},{country:"PW",capacityShare:.17,isRedundant:!0},{country:"PH",capacityShare:.17,isRedundant:!0},{country:"US",capacityShare:.17,isRedundant:!0}]},{id:"india_asia_xpress_iax",name:"India Asia Xpress (IAX)",points:[[81.1,16.2],[74.7,6.7],[95.4,6.2],[103.5,1.3],[101.4,2.6],[81.5,11.7],[80.2,13.1]],major:!0,rfsYear:2024,owners:["China Mobile","Reliance Jio Infocomm"],landingPoints:[{country:"IN",countryName:"India",city:"Chennai",lat:13.06,lon:80.24},{country:"IN",countryName:"India",city:"Digha",lat:21.62,lon:87.51},{country:"IN",countryName:"India",city:"Machilipatnam",lat:16.18,lon:81.14},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"MY",countryName:"Malaysia",city:"Morib",lat:2.75,lon:101.44},{country:"MV",countryName:"Maldives",city:"Hulhumale",lat:4.21,lon:73.54},{country:"SG",countryName:"Singapore",city:"Tuas",lat:1.34,lon:103.65},{country:"LK",countryName:"Sri Lanka",city:"Matara",lat:5.94,lon:80.54},{country:"TH",countryName:"Thailand",city:"Satun",lat:6.61,lon:100.07}],countriesServed:[{country:"IN",capacityShare:.17,isRedundant:!0},{country:"MY",capacityShare:.17,isRedundant:!0},{country:"MV",capacityShare:.17,isRedundant:!0},{country:"SG",capacityShare:.17,isRedundant:!0},{country:"LK",capacityShare:.17,isRedundant:!0},{country:"TH",capacityShare:.17,isRedundant:!0}]},{id:"raman",name:"Raman",points:[[72.9,19.1],[44.6,12.3],[39.5,20.4],[35.4,29.1],[55.4,15.9],[57.9,23.7]],major:!0,rfsYear:2026,owners:["Google","Sparkle","Zain Omantel International"],landingPoints:[{country:"DJ",countryName:"Djibouti",city:"Djibouti City",lat:11.59,lon:43.15},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"JO",countryName:"Jordan",city:"Aqaba",lat:29.58,lon:35.01},{country:"OM",countryName:"Oman",city:"Barka",lat:23.68,lon:57.89},{country:"OM",countryName:"Oman",city:"Salalah",lat:17.1,lon:54.15},{country:"SA",countryName:"Saudi Arabia",city:"Duba",lat:27.35,lon:35.7}],countriesServed:[{country:"DJ",capacityShare:.2,isRedundant:!0},{country:"IN",capacityShare:.2,isRedundant:!0},{country:"JO",capacityShare:.2,isRedundant:!0},{country:"OM",capacityShare:.2,isRedundant:!0},{country:"SA",capacityShare:.2,isRedundant:!0}]},{id:"farice_1",name:"FARICE-1",points:[[-6.9,62.2],[-14,65.3],[-3.3,58.6]],major:!0,rfsYear:2004,owners:["Farice"],landingPoints:[{country:"FO",countryName:"Faroe Islands",city:"Funningsfjordur",lat:62.24,lon:-6.93},{country:"IS",countryName:"Iceland",city:"Seydisfjordur",lat:65.25,lon:-14.02},{country:"GB",countryName:"United Kingdom",city:"Dunnet Bay",lat:58.62,lon:-3.35}],countriesServed:[{country:"FO",capacityShare:.3,isRedundant:!0},{country:"IS",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0}]},{id:"c_lion1",name:"C-Lion1",points:[[23.2,59.5],[24.9,60.2],[23.2,59.5],[20.3,57.6],[15.3,55.6],[12.6,54.7],[12.1,54.1]],major:!0,rfsYear:2016,owners:["Cinia Oy"],landingPoints:[{country:"FI",countryName:"Finland",city:"Hanko",lat:59.82,lon:22.97},{country:"FI",countryName:"Finland",city:"Helsinki",lat:60.17,lon:24.93},{country:"DE",countryName:"Germany",city:"Rostock",lat:54.08,lon:12.13}],countriesServed:[{country:"FI",capacityShare:.3,isRedundant:!0},{country:"DE",capacityShare:.3,isRedundant:!0}]},{id:"no_uk",name:"NO-UK",points:[[-1.6,55],[-.9,55.3],[.9,55.8],[2.5,56.5],[3.4,58.1],[4.1,58.6],[5.2,58.9],[5.5,59],[5.7,59]],major:!0,rfsYear:2021,owners:["NO-UK COM AS"],landingPoints:[{country:"NO",countryName:"Norway",city:"Stavanger",lat:58.97,lon:5.73},{country:"GB",countryName:"United Kingdom",city:"Newcastle",lat:54.98,lon:-1.62}],countriesServed:[{country:"NO",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0}]},{id:"havhingstennorth_sea_connect_nsc",name:"Havhingsten/North Sea Connect (NSC)",points:[[8.2,55.8],[7.7,55.5],[7.2,55.5],[5.4,55.5],[3.2,55.5],[-.9,55.1],[-1.6,55]],major:!0,rfsYear:2022,owners:["Bulk Infrastructure","EXA Infrastructure","Meta"],landingPoints:[{country:"DK",countryName:"Denmark",city:"Houstrup",lat:55.76,lon:8.19},{country:"GB",countryName:"United Kingdom",city:"Newcastle",lat:54.98,lon:-1.62}],countriesServed:[{country:"DK",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0}]},{id:"danice",name:"DANICE",points:[[-20.1,63.6],[-19.8,62.5],[-7.4,62.8],[2,61.2],[5.2,56.2],[7.7,55.7],[8.3,55.8]],major:!0,rfsYear:2009,owners:["Farice"],landingPoints:[{country:"DK",countryName:"Denmark",city:"Blaabjerg",lat:55.75,lon:8.33},{country:"IS",countryName:"Iceland",city:"Landeyjar",lat:63.64,lon:-20.14}],countriesServed:[{country:"DK",capacityShare:.3,isRedundant:!0},{country:"IS",capacityShare:.3,isRedundant:!0}]},{id:"greenland_connect",name:"Greenland Connect",points:[[-46,60.7],[-53.1,48.3],[-51.7,61.2],[-51.9,63.8],[-46.8,59.7],[-20.9,63.3],[-20.1,63.6]],major:!0,rfsYear:2009,owners:["Tusass A/S"],landingPoints:[{country:"CA",countryName:"Canada",city:"Milton",lat:48.21,lon:-53.96},{country:"GL",countryName:"Greenland",city:"Nuuk",lat:64.18,lon:-51.73},{country:"GL",countryName:"Greenland",city:"Qaqortoq",lat:60.72,lon:-46.04},{country:"IS",countryName:"Iceland",city:"Landeyjar",lat:63.64,lon:-20.14}],countriesServed:[{country:"CA",capacityShare:.3,isRedundant:!0},{country:"GL",capacityShare:.3,isRedundant:!0},{country:"IS",capacityShare:.3,isRedundant:!0}]},{id:"shefa_2",name:"SHEFA-2",points:[[-6.8,62],[-2.9,58.8],[-2.5,57.7],[-2.3,60.4],[-4.3,60.3],[-1.3,60],[-1.2,60]],major:!0,rfsYear:2008,owners:["Shefa"],landingPoints:[{country:"FO",countryName:"Faroe Islands",city:"Torshavn",lat:62.02,lon:-6.77},{country:"GB",countryName:"United Kingdom",city:"Ayre of Cara",lat:58.83,lon:-2.9},{country:"GB",countryName:"United Kingdom",city:"Banff",lat:57.67,lon:-2.52},{country:"GB",countryName:"United Kingdom",city:"BP Clair Ridge",lat:60.44,lon:-2.29},{country:"GB",countryName:"United Kingdom",city:"Glen Lyon",lat:60.33,lon:-4.33},{country:"GB",countryName:"United Kingdom",city:"Maywick",lat:60,lon:-1.32},{country:"GB",countryName:"United Kingdom",city:"Sandwick",lat:60,lon:-1.24}],countriesServed:[{country:"FO",capacityShare:.3,isRedundant:!0},{country:"GB",capacityShare:.3,isRedundant:!0}]},{id:"baltica",name:"Baltica",points:[[13.8,55.4],[14.4,55],[15,55],[15.4,54.6],[11.9,54.6],[13.5,54.9],[14.9,54.9],[15,55]],major:!0,rfsYear:1997,owners:["Arelion","Orange Polska","Slovak Telekom","TDC Group","Telenor","Ukrtelecom"],landingPoints:[{country:"DK",countryName:"Denmark",city:"Gedser",lat:54.58,lon:11.93},{country:"DK",countryName:"Denmark",city:"Pedersker",lat:55.03,lon:14.99},{country:"PL",countryName:"Poland",city:"Kołobrzeg",lat:54.17,lon:15.57},{country:"SE",countryName:"Sweden",city:"Ystad",lat:55.43,lon:13.83}],countriesServed:[{country:"DK",capacityShare:.3,isRedundant:!0},{country:"PL",capacityShare:.3,isRedundant:!0},{country:"SE",capacityShare:.3,isRedundant:!0}]},{id:"falcon",name:"FALCON",points:[[39.2,21.5],[52.9,26.6],[53.6,25.9],[52.7,15.2],[32.5,29.6],[43,14.8],[42.1,14.8]],major:!0,rfsYear:2006,owners:["FLAG"],landingPoints:[{country:"BH",countryName:"Bahrain",city:"Manama",lat:26.23,lon:50.58},{country:"EG",countryName:"Egypt",city:"Suez",lat:29.97,lon:32.53},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IN",countryName:"India",city:"Trivandrum",lat:8.8,lon:76.97},{country:"IR",countryName:"Iran",city:"Bandar Abbas",lat:27.19,lon:56.27},{country:"IR",countryName:"Iran",city:"Chabahar",lat:25.3,lon:60.63},{country:"IQ",countryName:"Iraq",city:"Al Faw",lat:29.92,lon:48.53},{country:"KW",countryName:"Kuwait",city:"Al Safat",lat:29.37,lon:47.98},{country:"MV",countryName:"Maldives",city:"Male",lat:4.17,lon:73.5},{country:"OM",countryName:"Oman",city:"Al Seeb",lat:23.68,lon:58.18},{country:"OM",countryName:"Oman",city:"Khasab",lat:26.18,lon:56.25},{country:"QA",countryName:"Qatar",city:"Doha",lat:25.29,lon:51.52},{country:"SA",countryName:"Saudi Arabia",city:"Al Khobar",lat:26.29,lon:50.21},{country:"SA",countryName:"Saudi Arabia",city:"Jeddah",lat:21.48,lon:39.18},{country:"LK",countryName:"Sri Lanka",city:"Colombo",lat:6.93,lon:79.87},{country:"SD",countryName:"Sudan",city:"Port Sudan",lat:19.62,lon:37.22},{country:"AE",countryName:"United Arab Emirates",city:"Dubai",lat:25.27,lon:55.31},{country:"YE",countryName:"Yemen",city:"Al Ghaydah",lat:16.21,lon:52.18},{country:"YE",countryName:"Yemen",city:"Al Hudaydah",lat:14.8,lon:42.95}],countriesServed:[{country:"BH",capacityShare:.07,isRedundant:!0},{country:"EG",capacityShare:.07,isRedundant:!0},{country:"IN",capacityShare:.07,isRedundant:!0},{country:"IR",capacityShare:.07,isRedundant:!0},{country:"IQ",capacityShare:.07,isRedundant:!0},{country:"KW",capacityShare:.07,isRedundant:!0},{country:"MV",capacityShare:.07,isRedundant:!0},{country:"OM",capacityShare:.07,isRedundant:!0},{country:"QA",capacityShare:.07,isRedundant:!0},{country:"SA",capacityShare:.07,isRedundant:!0},{country:"LK",capacityShare:.07,isRedundant:!0},{country:"SD",capacityShare:.07,isRedundant:!0},{country:"AE",capacityShare:.07,isRedundant:!0},{country:"YE",capacityShare:.07,isRedundant:!0}]},{id:"tata_tgn_gulf",name:"Tata TGN-Gulf",points:[[51.5,25.3],[55.3,25.3],[60.8,22.9],[56.9,25],[55.8,26.3],[50.5,27],[50.2,26.3]],major:!0,rfsYear:2012,owners:["Tata Communications"],landingPoints:[{country:"BH",countryName:"Bahrain",city:"Amwaj Island",lat:26.23,lon:50.58},{country:"OM",countryName:"Oman",city:"Qalhat",lat:22.7,lon:59.37},{country:"QA",countryName:"Qatar",city:"Al-Kheesa",lat:25.29,lon:51.52},{country:"SA",countryName:"Saudi Arabia",city:"Al Khobar",lat:26.29,lon:50.21},{country:"AE",countryName:"United Arab Emirates",city:"Dubai",lat:25.27,lon:55.31},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33}],countriesServed:[{country:"BH",capacityShare:.2,isRedundant:!0},{country:"OM",capacityShare:.2,isRedundant:!0},{country:"QA",capacityShare:.2,isRedundant:!0},{country:"SA",capacityShare:.2,isRedundant:!0},{country:"AE",capacityShare:.2,isRedundant:!0}]},{id:"fiber_optic_gulf_fog",name:"Fiber Optic Gulf (FOG)",points:[[48,29.4],[50.2,27.9],[52.7,26.6],[55.3,25.3],[51.5,25.3],[50.6,26.2]],major:!0,rfsYear:1998,owners:["Bahrain Telecommunications Company (Batelco)","Kuwait Ministry of Communications","Ooredoo","e&"],landingPoints:[{country:"BH",countryName:"Bahrain",city:"Manama",lat:26.23,lon:50.58},{country:"KW",countryName:"Kuwait",city:"Kuwait City",lat:29.37,lon:47.97},{country:"QA",countryName:"Qatar",city:"Doha",lat:25.29,lon:51.52},{country:"AE",countryName:"United Arab Emirates",city:"Dubai",lat:25.27,lon:55.31}],countriesServed:[{country:"BH",capacityShare:.25,isRedundant:!0},{country:"KW",capacityShare:.25,isRedundant:!0},{country:"QA",capacityShare:.25,isRedundant:!0},{country:"AE",capacityShare:.25,isRedundant:!0}]},{id:"omranepeg",name:"OMRAN/EPEG",points:[[57.9,23.7],[60.3,25.1],[57.8,25.2],[56.4,26.4],[56.6,25.8],[56.6,25.3],[57.9,23.7]],major:!0,rfsYear:2013,owners:["Vodafone","Zain Omantel International"],landingPoints:[{country:"IR",countryName:"Iran",city:"Chabahar",lat:25.3,lon:60.63},{country:"IR",countryName:"Iran",city:"Jask",lat:25.68,lon:57.8},{country:"OM",countryName:"Oman",city:"Barka",lat:23.68,lon:57.89},{country:"OM",countryName:"Oman",city:"Diba",lat:25.62,lon:56.26},{country:"OM",countryName:"Oman",city:"Khasab",lat:26.18,lon:56.25}],countriesServed:[{country:"IR",capacityShare:.3,isRedundant:!0},{country:"OM",capacityShare:.3,isRedundant:!0}]},{id:"gulf_bridge_international_cable_systemmiddle_east_north_africa_cable_system_gbicsmena",name:"Gulf Bridge International Cable System/Middle East North Africa Cable System (GBICS/MENA)",points:[[56.3,25.1],[50.2,26.5],[57.1,26.2],[48.8,29.5],[51.5,25.5],[49.2,28.9]],major:!0,rfsYear:2012,owners:["Gulf Bridge International"],landingPoints:[{country:"BH",countryName:"Bahrain",city:"Al Hidd",lat:26.24,lon:50.66},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"IR",countryName:"Iran",city:"Bushehr",lat:28.97,lon:50.84},{country:"IQ",countryName:"Iraq",city:"Al Faw",lat:29.92,lon:48.53},{country:"KW",countryName:"Kuwait",city:"Kuwait City",lat:29.37,lon:47.97},{country:"OM",countryName:"Oman",city:"Al Seeb",lat:23.68,lon:58.18},{country:"QA",countryName:"Qatar",city:"Al Daayen",lat:25.54,lon:51.45},{country:"SA",countryName:"Saudi Arabia",city:"Al Khobar",lat:26.29,lon:50.21},{country:"AE",countryName:"United Arab Emirates",city:"Fujairah",lat:25.12,lon:56.33}],countriesServed:[{country:"BH",capacityShare:.11,isRedundant:!0},{country:"IN",capacityShare:.11,isRedundant:!0},{country:"IR",capacityShare:.11,isRedundant:!0},{country:"IQ",capacityShare:.11,isRedundant:!0},{country:"KW",capacityShare:.11,isRedundant:!0},{country:"OM",capacityShare:.11,isRedundant:!0},{country:"QA",capacityShare:.11,isRedundant:!0},{country:"SA",capacityShare:.11,isRedundant:!0},{country:"AE",capacityShare:.11,isRedundant:!0}]},{id:"project_waterworth",name:"Project Waterworth",points:[[-78.9,33.7],[74.7,-5.5],[73.2,12.3],[72,13.5],[153.5,-12.5],[33.5,-32.1],[30.9,-30.1]],major:!0,owners:["Meta"],landingPoints:[{country:"AU",countryName:"Australia",city:"Darwin",lat:-12.47,lon:130.84},{country:"BR",countryName:"Brazil",city:"Fortaleza",lat:-3.72,lon:-38.54},{country:"IN",countryName:"India",city:"Chennai",lat:13.06,lon:80.24},{country:"IN",countryName:"India",city:"Mumbai",lat:19.08,lon:72.88},{country:"MY",countryName:"Malaysia",city:"Penang",lat:5.37,lon:100.41},{country:"ZA",countryName:"South Africa",city:"Amanzimtoti",lat:-30.06,lon:30.88},{country:"ZA",countryName:"South Africa",city:"Cape Town",lat:-33.92,lon:18.42},{country:"US",countryName:"United States",city:"Los Angeles",lat:34.05,lon:-118.25},{country:"US",countryName:"United States",city:"Myrtle Beach",lat:33.69,lon:-78.88}],countriesServed:[{country:"AU",capacityShare:.17,isRedundant:!0},{country:"BR",capacityShare:.17,isRedundant:!0},{country:"IN",capacityShare:.17,isRedundant:!0},{country:"MY",capacityShare:.17,isRedundant:!0},{country:"ZA",capacityShare:.17,isRedundant:!0},{country:"US",capacityShare:.17,isRedundant:!0}]},{id:"blue",name:"Blue",points:[[8.8,43.5],[15.3,38.5],[8.8,43.5],[9.6,41],[14.9,38.7],[14.9,38.7],[13.4,38.1]],major:!0,rfsYear:2023,owners:["Google","Sparkle","Zain Omantel International"],landingPoints:[{country:"CY",countryName:"Cyprus",city:"Yeroskipos",lat:34.77,lon:32.47},{country:"FR",countryName:"France",city:"Bastia",lat:42.7,lon:9.45},{country:"FR",countryName:"France",city:"Marseille",lat:43.29,lon:5.37},{country:"GR",countryName:"Greece",city:"Chania",lat:35.51,lon:24.01},{country:"IL",countryName:"Israel",city:"Tel Aviv",lat:32.04,lon:34.77},{country:"IT",countryName:"Italy",city:"Genoa",lat:44.41,lon:8.94},{country:"IT",countryName:"Italy",city:"Golfo Aranci",lat:41,lon:9.61},{country:"IT",countryName:"Italy",city:"Palermo",lat:38.12,lon:13.36},{country:"IT",countryName:"Italy",city:"Rome",lat:41.9,lon:12.5},{country:"JO",countryName:"Jordan",city:"Aqaba",lat:29.58,lon:35.01}],countriesServed:[{country:"CY",capacityShare:.17,isRedundant:!0},{country:"FR",capacityShare:.17,isRedundant:!0},{country:"GR",capacityShare:.17,isRedundant:!0},{country:"IL",capacityShare:.17,isRedundant:!0},{country:"IT",capacityShare:.17,isRedundant:!0},{country:"JO",capacityShare:.17,isRedundant:!0}]}];class $p{constructor(t){ht(this,"group");ht(this,"lineMaterial");ht(this,"pulseUniforms");this.group=new Oe,this.group.name="cables-layer",this.pulseUniforms={uTime:{value:0}},this.lineMaterial=new xa({color:6220500,transparent:!0,opacity:.45,blending:kn,depthWrite:!1}),this.buildCables(t)}buildCables(t){const e=t*1.0015;for(const n of Zp){if(!n.points||n.points.length<2)continue;const a=[];for(let s=0;s<n.points.length;s++){const[c,l]=n.points[s],u=tn(l,c,e);a.push(u.x,u.y,u.z)}const r=new ye;r.setAttribute("position",new ce(a,3));const o=new ao(r,this.lineMaterial);this.group.add(o)}}update(t){this.pulseUniforms.uTime.value+=t;const e=.4+.15*Math.sin(this.pulseUniforms.uTime.value*1.5);this.lineMaterial.opacity=e}setVisible(t){this.group.visible=t}}class Jp{constructor(t){ht(this,"group");ht(this,"earthRadius");ht(this,"ripples",[]);ht(this,"quakes",[]);ht(this,"ringGeometry");this.group=new Oe,this.group.name="earthquake-layer",this.earthRadius=t,this.ringGeometry=new Ta(.8,1,32),this.fetchLiveQuakes()}async fetchLiveQuakes(){try{const t=await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson");if(!t.ok)throw new Error(`USGS HTTP ${t.status}`);const e=await t.json(),n=[];for(const a of e.features||[]){const[r,o,s]=a.geometry.coordinates,c=a.properties.mag??3;n.push({id:a.id,mag:c,place:a.properties.place||"Unknown location",time:a.properties.time,lat:o,lon:r,depth:s})}this.quakes=n.slice(0,80),this.rebuildMeshes()}catch(t){console.warn("[EarthquakeLayer] USGS fetch failed, using fallback seismic data:",t),this.loadFallbackQuakes()}}loadFallbackQuakes(){this.quakes=[{id:"q1",mag:7.2,place:"Hualien Offshore, Taiwan",time:Date.now()-36e5,lat:23.85,lon:121.65,depth:15},{id:"q2",mag:6.8,place:"Noto Peninsula, Japan",time:Date.now()-72e5,lat:37.5,lon:137.2,depth:10},{id:"q3",mag:5.9,place:"Mindanao, Philippines",time:Date.now()-108e5,lat:8.2,lon:126.1,depth:25},{id:"q4",mag:6.3,place:"Tonga Islands Region",time:Date.now()-144e5,lat:-18.5,lon:-174.5,depth:40},{id:"q5",mag:5.4,place:"Northern Chile Offshore",time:Date.now()-18e6,lat:-23.1,lon:-70.8,depth:32},{id:"q6",mag:5.1,place:"Southern Alaska",time:Date.now()-216e5,lat:61.2,lon:-150.1,depth:45}],this.rebuildMeshes()}rebuildMeshes(){for(;this.group.children.length>0;){const e=this.group.children[0];this.group.remove(e)}this.ripples=[];const t=this.earthRadius*1.002;for(const e of this.quakes){const n=tn(e.lat,e.lon,t),a=n.clone().normalize();let r=16436245,o=1.2;e.mag>=6?(r=15680580,o=2.8):e.mag>=4.5&&(r=16347926,o=1.9);const s=new pn().setFromUnitVectors(new D(0,0,1),a),c=new Je(.25*(e.mag/4),16,16),l=new je({color:r}),u=new se(c,l);u.position.copy(n),u.userData={type:"earthquake",quake:e},this.group.add(u);const f=[];for(let h=0;h<2;h++){const m=new je({color:r,transparent:!0,opacity:.8,side:We,depthWrite:!1,blending:kn}),y=new se(this.ringGeometry,m);y.position.copy(n),y.quaternion.copy(s),y.userData={type:"earthquake",quake:e},this.group.add(y),f.push(y)}this.ripples.push({rings:f,maxScale:o*2.2,speed:.8+e.mag/10,phase:Math.random()})}}update(t){for(const e of this.ripples)e.phase=(e.phase+t*e.speed)%1,e.rings.forEach((n,a)=>{const r=(e.phase+a*.5)%1,o=.2+r*e.maxScale;n.scale.set(o,o,1);const s=n.material;s.opacity=Math.max(0,(1-r)*.85)})}setVisible(t){this.group.visible=t}}const En=[{id:"pts-news",name:"公視新聞台 PTS News 24H",city:"Taipei",country:"Taiwan",lat:25.033,lon:121.5654,videoId:"wM0g8EoUZ_E",category:"news"},{id:"cts-news",name:"華視新聞 CH52 CTS News Live",city:"Taipei",country:"Taiwan",lat:25.042,lon:121.556,videoId:"TL8MMGiF0hA",category:"news"},{id:"ctv-news",name:"中視新聞 CTV News Live 24H",city:"Taipei",country:"Taiwan",lat:25.056,lon:121.594,videoId:"bgkM3-83GvM",category:"news"},{id:"tokyo-shibuya",name:"東京澀谷 Tokyo Shibuya Crossing 4K Live",city:"Tokyo",country:"Japan",lat:35.6595,lon:139.7004,videoId:"8H3nRCFVR6Y",category:"cctv"},{id:"alishan-live",name:"阿里山二延平步道 4K 即時影像 Alishan 4K",city:"Chiayi",country:"Taiwan",lat:23.511,lon:120.704,videoId:"B6eki-0-w0g",category:"cctv"},{id:"taoyuan-airport",name:"桃園國際機場即時影像 Taoyuan Airport 4K",city:"Taoyuan",country:"Taiwan",lat:25.0797,lon:121.2342,videoId:"y3_x8el5ZJY",category:"traffic"},{id:"keelung-port",name:"基隆港海運即時監控 Keelung Port Live Cam",city:"Keelung",country:"Taiwan",lat:25.132,lon:121.745,videoId:"z_fY1pj1VBw",category:"port"},{id:"new-york-times-square",name:"紐約時代廣場 New York Times Square 4K",city:"New York",country:"USA",lat:40.758,lon:-73.9855,videoId:"4qyZLflp-sI",category:"cctv"},{id:"dw-news",name:"DW News 24/7 International",city:"Berlin",country:"Germany",lat:52.52,lon:13.405,videoId:"LuKwFajn37U",category:"news"},{id:"france-24",name:"France 24 English Live",city:"Paris",country:"France",lat:48.8566,lon:2.3522,videoId:"u9foWyMSETk",category:"news"},{id:"london-piccadilly",name:"倫敦皮卡迪利 London Piccadilly Circus",city:"London",country:"UK",lat:51.51,lon:-.134,videoId:"Lxqcg1qt0XU",category:"cctv"},{id:"kyiv-maidan",name:"烏克蘭基輔 Kyiv Maidan Live Feed",city:"Kyiv",country:"Ukraine",lat:50.4501,lon:30.5234,videoId:"-Q7FuPINDjA",category:"cctv"}],rr=[En[0],En[1],En[2],En[3],En[4]];class Qp{constructor(t){ht(this,"group");ht(this,"beacons",[]);ht(this,"pulseTime",0);ht(this,"onSelectPoint");this.group=new Oe,this.group.name="cctv-layer",this.buildBeacons(t)}buildBeacons(t){const e=t*1.004,n=new Ta(.4,.6,24);for(const a of En){const r=tn(a.lat,a.lon,e),o=r.clone().normalize(),s=new pn().setFromUnitVectors(new D(0,0,1),o),c=new Je(.35,16,16),l=new je({color:a.category==="port"?440020:1096065}),u=new se(c,l);u.position.copy(r),u.userData={type:"cctv",point:a},this.group.add(u);const f=new je({color:3462041,transparent:!0,opacity:.8,side:We,depthWrite:!1,blending:kn}),h=new se(n,f);h.position.copy(r),h.quaternion.copy(s),h.userData={type:"cctv",point:a},this.group.add(h),this.beacons.push({mesh:u,ring:h,point:a})}}update(t){this.pulseTime+=t;const e=1+(Math.sin(this.pulseTime*3)*.5+.5)*1.8,n=Math.max(0,1-(e-1)/1.8)*.75;for(const a of this.beacons)a.ring.scale.set(e,e,1),a.ring.material.opacity=n}setVisible(t){this.group.visible=t}}const tm=[{id:"taiwan-strait-air-defense",title:"Taiwan Strait ADIZ & Maritime Patrols",location:"Taiwan Strait",lat:24.1,lon:119.8,level:"ELEVATED",category:"geopolitical",summary:"Continuous situational tracking of naval and air activity along the median line.",updatedAt:"LIVE"},{id:"red-sea-security",title:"Red Sea & Bab-el-Mandeb Commercial Escort",location:"Bab-el-Mandeb Strait",lat:12.58,lon:43.33,level:"CRITICAL",category:"maritime",summary:"Operation Prosperity Guardian & EU Aspides maritime protection zone.",updatedAt:"LIVE"},{id:"eastern-europe-front",title:"Eastern European Theater Monitoring",location:"Dnieper Basin, Ukraine",lat:48.45,lon:35.04,level:"CRITICAL",category:"security",summary:"Satellite optical & synthetic aperture radar surveillance of conflict corridors.",updatedAt:"LIVE"},{id:"hormuz-monitoring",title:"Strait of Hormuz Tanker Transit Monitoring",location:"Strait of Hormuz",lat:26.56,lon:56.25,level:"ELEVATED",category:"maritime",summary:"AIS anomaly detection and international task force surveillance over oil lifelines.",updatedAt:"LIVE"},{id:"scs-second-thomas",title:"South China Sea Maritime Resupply Axis",location:"Spratly Islands",lat:9.75,lon:115.85,level:"ELEVATED",category:"geopolitical",summary:"Real-time positioning of coast guard patrols and territorial standoff points.",updatedAt:"LIVE"},{id:"korean-dmz",title:"Korean Peninsula DMZ & Ballistic Monitoring",location:"Panmunjom, DMZ",lat:37.95,lon:126.67,level:"MONITOR",category:"security",summary:"Early warning radar network integration across East Asian periphery.",updatedAt:"LIVE"}],em=[{id:"news-tpe",headline:"Taipei Command: Regional semiconductor & supply chain resilience status green",source:"CNA / PTS",city:"Taipei",lat:25.0375,lon:121.5637,time:"5m ago"},{id:"news-dc",headline:"Washington: National Security Council updates maritime navigation advisory",source:"Reuters",city:"Washington DC",lat:38.8951,lon:-77.0364,time:"12m ago"},{id:"news-tyo",headline:"Tokyo: Defense Ministry issues quarterly aerial reconnaissance assessment",source:"NHK / Kyodo",city:"Tokyo",lat:35.6895,lon:139.6917,time:"18m ago"},{id:"news-bru",headline:"Brussels: European Commission coordinates critical undersea infrastructure protection",source:"EU Observer",city:"Brussels",lat:50.8503,lon:4.3517,time:"25m ago"},{id:"news-lon",headline:"London: International Maritime Organization convenes on AIS spoofing countermeasures",source:"Sky News",city:"London",lat:51.5074,lon:-.1278,time:"32m ago"},{id:"news-manila",headline:"Manila: Coast Guard increases patrol frequency across western exclusive economic zone",source:"Inquirer",city:"Manila",lat:14.5995,lon:120.9842,time:"40m ago"}];class nm{constructor(t){ht(this,"group");ht(this,"markers",[]);ht(this,"pulseTime",0);this.group=new Oe,this.group.name="news-layer",this.buildMarkers(t)}buildMarkers(t){const e=t*1.004;for(const n of em){const a=tn(n.lat,n.lon,e),r=new Je(.3,16,16),o=new je({color:3718648}),s=new se(r,o);s.position.copy(a),s.userData={type:"news",item:n},this.group.add(s),this.markers.push({mesh:s,item:n})}}update(t){this.pulseTime+=t;const e=1+.3*Math.sin(this.pulseTime*4);for(const n of this.markers)n.mesh.scale.set(e,e,e)}setVisible(t){this.group.visible=t}}class im{constructor(t){ht(this,"group");ht(this,"markers",[]);ht(this,"pulseTime",0);this.group=new Oe,this.group.name="incidents-layer",this.buildIncidents(t)}buildIncidents(t){const e=t*1.005,n=new co(.45,0);for(const a of tm){const r=tn(a.lat,a.lon,e),o=a.level==="CRITICAL"?16007006:16096779,s=new je({color:o,wireframe:!0}),c=new se(n,s);c.position.copy(r),c.userData={type:"incident",incident:a},this.group.add(c),this.markers.push({mesh:c,incident:a})}}update(t){this.pulseTime+=t;const e=t*1.2;for(const n of this.markers)n.mesh.rotation.y+=e,n.mesh.rotation.x+=e*.5}setVisible(t){this.group.visible=t}}const am=[{id:"suez-med",name:"Suez Canal & Red Sea Route (Asia-Europe)",category:"maritime",type:"Critical Chokepoint",waypoints:[[1.3,103.8],[5.9,95.2],[12.6,43.3],[27.8,34.3],[29.9,32.5],[36.1,-5.3],[51.9,4.5]]},{id:"taiwan-strait",name:"Taiwan Strait Strategic Lane",category:"maritime",type:"High Volume Trade",waypoints:[[21.9,120.8],[23.5,119.5],[25.3,121.6],[31.2,121.5]]},{id:"malacca-strait",name:"Strait of Malacca Primary Lane",category:"maritime",type:"Energy & Container",waypoints:[[1.2,103.6],[2.2,102.2],[4.2,100.1],[5.8,97.5]]},{id:"hormuz-strait",name:"Strait of Hormuz Oil Corridor",category:"maritime",type:"Hydrocarbon Lifeline",waypoints:[[29.9,48.5],[26.5,56.2],[23.6,58.5],[15,65]]},{id:"panama-canal",name:"Panama Canal Transit (Pacific-Atlantic)",category:"maritime",type:"Global Chokepoint",waypoints:[[8.5,-79.9],[9,-79.6],[9.3,-79.9],[25,-78]]},{id:"trans-pacific-maritime",name:"Trans-Pacific Container Highway",category:"maritime",type:"Trans-Oceanic",waypoints:[[31.2,121.5],[35,140],[42,175],[33.7,-118.2]]}],rm=[{id:"nat-tracks-1",name:"North Atlantic Track (London - New York)",category:"aviation",type:"Intercontinental",waypoints:[[51.47,-.45],[55,-15],[54,-30],[51,-50],[44,-65],[40.64,-73.78]]},{id:"transpacific-air-1",name:"Transpacific Air Corridor (Tokyo - San Francisco)",category:"aviation",type:"Intercontinental",waypoints:[[35.77,140.39],[45,165],[50,-170],[45,-140],[37.62,-122.38]]},{id:"tpe-lax",name:"Taipei - Los Angeles Skyway",category:"aviation",type:"Intercontinental",waypoints:[[25.08,121.23],[38,150],[48,-165],[42,-135],[33.94,-118.41]]},{id:"euro-asia-airway",name:"Euro-Asian Skyway (Frankfurt - Singapore)",category:"aviation",type:"Long Haul Hub",waypoints:[[50.03,8.57],[41,28.9],[25.25,55.36],[13.69,100.75],[1.36,103.99]]},{id:"polar-airway",name:"Arctic Cross-Polar Corridor (Seoul - New York)",category:"aviation",type:"Polar Flight Track",waypoints:[[37.46,126.44],[52,140],[68,-165],[60,-100],[40.64,-73.78]]},{id:"tpe-nrt",name:"Taipei - Tokyo Express Skyway",category:"aviation",type:"Regional Trunk",waypoints:[[25.08,121.23],[28,125],[31.5,131],[35.77,140.39]]},{id:"tpe-sin",name:"Taipei - Singapore South China Skyway",category:"aviation",type:"Regional Trunk",waypoints:[[25.08,121.23],[20,117],[12,111],[4,106],[1.36,103.99]]},{id:"lhr-dxb",name:"London - Dubai Middle East Skyway",category:"aviation",type:"Intercontinental",waypoints:[[51.47,-.45],[46,14],[39,32],[30,48],[25.25,55.36]]},{id:"sin-syd",name:"Singapore - Sydney Kangaroo Route",category:"aviation",type:"Intercontinental",waypoints:[[1.36,103.99],[-8.7,115.2],[-20,128],[-28,140],[-33.94,151.17]]},{id:"lax-syd",name:"Transpacific South (Los Angeles - Sydney)",category:"aviation",type:"Trans-Oceanic",waypoints:[[33.94,-118.41],[15,-145],[-5,-170],[-20,175],[-33.94,151.17]]}];class om{constructor(t){ht(this,"group");ht(this,"lineMaterial");ht(this,"ships",[]);this.group=new Oe,this.group.name="maritime-layer",this.lineMaterial=new xa({color:1096065,transparent:!0,opacity:.5,depthWrite:!1}),this.buildRoutes(t)}buildRoutes(t){const e=t*1.002,n=new oo(.2,.6,8);n.rotateX(Math.PI/2);for(const a of am){const r=[];for(let c=0;c<a.waypoints.length-1;c++){const[l,u]=a.waypoints[c],[f,h]=a.waypoints[c+1],m=jp(l,u,f,h,12,e);r.push(...m)}const o=new ye().setFromPoints(r),s=new ao(o,this.lineMaterial);if(this.group.add(s),r.length>2){const c=new je({color:3462041}),l=new se(n,c);this.group.add(l),this.ships.push({mesh:l,curvePoints:r,progress:Math.random(),speed:.025+Math.random()*.02})}}}update(t){for(const e of this.ships){e.progress=(e.progress+t*e.speed)%1;const n=Math.floor(e.progress*(e.curvePoints.length-1)),a=Math.min(n+1,e.curvePoints.length-1),r=e.curvePoints[n],o=e.curvePoints[a],s=e.progress*(e.curvePoints.length-1)-n;e.mesh.position.lerpVectors(r,o,s),o.distanceTo(r)>.001&&e.mesh.lookAt(o)}}setVisible(t){this.group.visible=t}}class sm{constructor(t){ht(this,"group");ht(this,"lineMaterial");ht(this,"aircrafts",[]);this.group=new Oe,this.group.name="air-layer",this.lineMaterial=new xa({color:14870768,transparent:!0,opacity:.3,depthWrite:!1}),this.buildAirCorridors(t)}buildAirCorridors(t){const e=new Je(.32,12,12),n=new je({color:16777215}),a=new Je(.65,12,12),r=new je({color:9684477,transparent:!0,opacity:.65,blending:kn,depthWrite:!1});for(const o of rm){const s=[];for(let u=0;u<o.waypoints.length-1;u++){const[f,h]=o.waypoints[u],[m,y]=o.waypoints[u+1],_=tn(f,h,t),p=tn(m,y,t),d=24;for(let T=0;T<=d;T++){const E=T/d,M=1.008+Math.sin(E*Math.PI)*.038,N=new D().copy(_).lerp(p,E).normalize().multiplyScalar(t*M);s.push(N)}}const c=new ye().setFromPoints(s),l=new ao(c,this.lineMaterial);if(this.group.add(l),s.length>2){const u=o.type==="Intercontinental"?2:1;for(let f=0;f<u;f++){const h=new Oe,m=new se(e,n),y=new se(a,r);h.add(m),h.add(y),this.group.add(h),this.aircrafts.push({group:h,points:s,progress:(f*.5+Math.random()*.4)%1,speed:.025+Math.random()*.02})}}}}update(t){for(const e of this.aircrafts){e.progress=(e.progress+t*e.speed)%1;const n=Math.floor(e.progress*(e.points.length-1)),a=Math.min(n+1,e.points.length-1),r=e.points[n],o=e.points[a],s=e.progress*(e.points.length-1)-n;e.group.position.lerpVectors(r,o,s)}}setVisible(t){this.group.visible=t}}class cm{constructor(t){ht(this,"container");ht(this,"scene");ht(this,"camera");ht(this,"renderer");ht(this,"controls");ht(this,"earthMesh");ht(this,"earthMaterial");ht(this,"cloudsMesh");ht(this,"cloudsMaterial");ht(this,"atmosphereMesh");ht(this,"atmosphereMaterial");ht(this,"tooltipEl");ht(this,"cablesLayer");ht(this,"earthquakeLayer");ht(this,"cctvLayer");ht(this,"newsLayer");ht(this,"incidentsLayer");ht(this,"maritimeLayer");ht(this,"airLayer");ht(this,"raycaster",new Xl);ht(this,"mouse",new wt);ht(this,"earthRadius",100);ht(this,"isAnimating",!1);ht(this,"clock",new Wl);ht(this,"onSelectCctv");ht(this,"onSelectEarthquake");ht(this,"onSelectIncident");ht(this,"onSelectNews");ht(this,"layerStates",{cctv:!0,live_news:!0,earthquakes:!0,global_incidents:!0,day_night:!0,cables:!0,maritime:!0,sdk_air:!0});this.container=t;try{this.scene=new Nl,this.scene.background=new Ht(328967);const e=t.clientWidth/(t.clientHeight||1);this.camera=new Fe(45,e,.1,2e3),this.camera.position.set(0,30,260),this.renderer=new Np({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=Cs,this.renderer.toneMappingExposure=1.1,t.appendChild(this.renderer.domElement),this.controls=new Lp(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.rotateSpeed=.65,this.controls.minDistance=115,this.controls.maxDistance=500,this.controls.autoRotate=!0,this.controls.autoRotateSpeed=.25,this.initStars(),this.initEarth(),this.initLayers(),this.initEvents(),this.start()}catch(e){console.error("[GlobeScene] WebGL initialization failed, rendering tactical 2D fallback:",e),t.innerHTML=`
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;background:#050507;color:#9ca3af;font-family:'JetBrains Mono',monospace;text-align:center;padding:20px;box-sizing:border-box;">
          <div style="color:#10b981;font-size:16px;font-weight:700;margin-bottom:8px;letter-spacing:0.1em;">TERRA MATRIX // 2D TACTICAL MODE</div>
          <div style="font-size:12px;max-width:480px;line-height:1.6;color:#6b7280;">3D WebGL acceleration context unavailable or degraded in this browser environment. The Swiss Grid Live Video Matrix below is fully operational.</div>
        </div>
      `,this.cablesLayer={setVisible:()=>{}},this.earthquakeLayer={setVisible:()=>{}},this.cctvLayer={setVisible:()=>{}},this.newsLayer={setVisible:()=>{}},this.incidentsLayer={setVisible:()=>{}},this.maritimeLayer={setVisible:()=>{}},this.airLayer={setVisible:()=>{}}}}initStars(){const e=new ye,n=new Float32Array(1200*3),a=new Float32Array(1200*3);for(let s=0;s<1200;s++){const c=600+Math.random()*400,l=Math.random()*Math.PI*2,u=Math.acos(Math.random()*2-1);n[s*3]=c*Math.sin(u)*Math.cos(l),n[s*3+1]=c*Math.cos(u),n[s*3+2]=c*Math.sin(u)*Math.sin(l);const f=.4+Math.random()*.6;a[s*3]=f,a[s*3+1]=f*.95,a[s*3+2]=f*1.1}e.setAttribute("position",new Be(n,3)),e.setAttribute("color",new Be(a,3));const r=new Js({size:1.6,vertexColors:!0,transparent:!0,opacity:.75}),o=new Dl(e,r);this.scene.add(o)}createFallbackTexture(t="#1e293b"){const e=document.createElement("canvas");e.width=16,e.height=16;const n=e.getContext("2d");return n&&(n.fillStyle=t,n.fillRect(0,0,16,16)),new Il(e)}initEarth(){const t=u=>`${"/terra-matrix/".replace(/\/+$/,"")+"/"}${u.replace(/^\/+/,"")}`,e=new kl,n=(u,f)=>e.load(t(u),h=>{h.wrapS=ln,h.wrapT=ln,h.minFilter=Tn,h.magFilter=Ye,h.generateMipmaps=!0,this.renderer&&(h.anisotropy=this.renderer.capabilities.getMaxAnisotropy()),h.needsUpdate=!0},void 0,h=>{console.warn(`[GlobeScene] Failed to load texture ${u}, using fallback:`,h)}),a=n("earth-blue-marble.jpg"),r=n("earth_lights.png"),o=n("earth_normal.jpg"),s=n("earth_specular.jpg"),c=n("earth_clouds.png"),l=new Je(this.earthRadius,96,96);try{this.earthMaterial=Xp({day:a,night:r,normal:o,specular:s})}catch(u){console.warn("[GlobeScene] Custom EarthShader failed, using fallback StandardMaterial:",u),this.earthMaterial=new Ul({map:a,roughness:.8,metalness:.1})}this.earthMesh=new se(l,this.earthMaterial),this.scene.add(this.earthMesh);try{const u=new Je(this.earthRadius*1.005,96,96);this.cloudsMaterial=Yp(c),this.cloudsMesh=new se(u,this.cloudsMaterial),this.scene.add(this.cloudsMesh)}catch(u){console.warn("[GlobeScene] Cloud sphere layer failed to initialize:",u)}try{const u=new Je(this.earthRadius*1.018,64,64);this.atmosphereMaterial=qp(),this.atmosphereMesh=new se(u,this.atmosphereMaterial),this.scene.add(this.atmosphereMesh)}catch(u){console.warn("[GlobeScene] Atmosphere halo failed to initialize:",u)}}initLayers(){this.cablesLayer=new $p(this.earthRadius),this.scene.add(this.cablesLayer.group),this.earthquakeLayer=new Jp(this.earthRadius),this.scene.add(this.earthquakeLayer.group),this.cctvLayer=new Qp(this.earthRadius),this.scene.add(this.cctvLayer.group),this.newsLayer=new nm(this.earthRadius),this.scene.add(this.newsLayer.group),this.incidentsLayer=new im(this.earthRadius),this.scene.add(this.incidentsLayer.group),this.maritimeLayer=new om(this.earthRadius),this.scene.add(this.maritimeLayer.group),this.airLayer=new sm(this.earthRadius),this.scene.add(this.airLayer.group)}initEvents(){window.addEventListener("resize",this.onWindowResize.bind(this)),this.tooltipEl=document.createElement("div"),this.tooltipEl.className="globe-hud-tooltip",this.tooltipEl.style.display="none",document.body.appendChild(this.tooltipEl);const t=this.renderer.domElement;t.addEventListener("pointerdown",()=>{this.controls.autoRotate=!1}),t.addEventListener("pointermove",e=>{var o;const n=t.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const a=[...this.cctvLayer.group.children,...this.earthquakeLayer.group.children,...this.incidentsLayer.group.children,...this.newsLayer.group.children],r=this.raycaster.intersectObjects(a,!1);r.length>0&&((o=r[0].object.userData)!=null&&o.type)?(t.style.cursor="pointer",this.updateTooltip(r[0].object.userData,e.clientX,e.clientY)):(t.style.cursor="grab",this.hideTooltip())}),t.addEventListener("pointerleave",()=>{this.hideTooltip()}),t.addEventListener("click",e=>{var o,s,c,l,u,f,h,m;const n=t.getBoundingClientRect();this.mouse.x=(e.clientX-n.left)/n.width*2-1,this.mouse.y=-((e.clientY-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const a=[...this.cctvLayer.group.children,...this.earthquakeLayer.group.children,...this.incidentsLayer.group.children,...this.newsLayer.group.children],r=this.raycaster.intersectObjects(a,!1);if(r.length>0){const y=r[0].object;if(((o=y.userData)==null?void 0:o.type)==="cctv"){const _=y.userData.point;this.focusCoordinates(_.lat,_.lon),(s=this.onSelectCctv)==null||s.call(this,_)}else if(((c=y.userData)==null?void 0:c.type)==="earthquake"){const _=y.userData.quake;this.focusCoordinates(_.lat,_.lon),(l=this.onSelectEarthquake)==null||l.call(this,_)}else if(((u=y.userData)==null?void 0:u.type)==="incident"){const _=y.userData.incident;this.focusCoordinates(_.lat,_.lon),(f=this.onSelectIncident)==null||f.call(this,_)}else if(((h=y.userData)==null?void 0:h.type)==="news"){const _=y.userData.item;this.focusCoordinates(_.lat,_.lon),(m=this.onSelectNews)==null||m.call(this,_)}}})}updateTooltip(t,e,n){if(!this.tooltipEl||!t||!t.type){this.hideTooltip();return}let a="",r="",o="",s="";if(t.type==="earthquake"&&t.quake){const h=t.quake,m=Math.max(1,Math.floor((Date.now()-h.time)/6e4)),y=m<60?`${m} 分鐘前`:`${Math.floor(m/60)} 小時前`;a="USGS 地震",r=h.mag>=6?"badge-critical":h.mag>=4.5?"badge-elevated":"badge-monitor",o=`規模 M${h.mag.toFixed(1)} / 深度 ${h.depth.toFixed(0)}km / 地點：${h.place} / 時間：${y}`,s=`座標：${h.lat.toFixed(2)}°, ${h.lon.toFixed(2)}° (點擊聚焦視角)`}else if(t.type==="cctv"&&t.point){const h=t.point;a="即時監視攝影機",r="badge-cctv",o=`${h.name} (點擊連動視窗)`,s=`位置：${h.city}, ${h.country} | 類別：${h.category.toUpperCase()}`}else if(t.type==="incident"&&t.incident){const h=t.incident;a="全球地緣事件",r=h.level==="CRITICAL"?"badge-critical":"badge-elevated",o=`事件：${h.title} / 地點：${h.location}`,s=`情報層級：${h.level} | 座標：${h.lat.toFixed(2)}°, ${h.lon.toFixed(2)}°`}else if(t.type==="news"&&t.item){const h=t.item;a="即時全球新聞",r="badge-news",o=`焦點：${h.headline}`,s=`來源：${h.source} | 地點：${h.city} (${h.time}) | 點擊定位`}else{this.hideTooltip();return}this.tooltipEl.innerHTML=`
      <div class="hud-tooltip-header">
        <span class="hud-tooltip-badge ${r}">[${a}]</span>
      </div>
      <div class="hud-tooltip-title">${o}</div>
      <div class="hud-tooltip-detail">${s}</div>
    `;const c=15;let l=e+c,u=n+c;const f=340;l+f>window.innerWidth&&(l=Math.max(10,e-f-c)),u+80>window.innerHeight&&(u=Math.max(10,n-80-c)),this.tooltipEl.style.left=`${l}px`,this.tooltipEl.style.top=`${u}px`,this.tooltipEl.style.display="block"}hideTooltip(){this.tooltipEl&&(this.tooltipEl.style.display="none")}focusCoordinates(t,e,n=160){const a=tn(t,e,n),r=this.camera.position.clone(),o=1200,s=performance.now(),c=l=>{const u=l-s,f=Math.min(1,u/o),h=f<.5?4*f*f*f:1-Math.pow(-2*f+2,3)/2;this.camera.position.lerpVectors(r,a,h),this.controls.update(),f<1&&requestAnimationFrame(c)};requestAnimationFrame(c)}toggleLayer(t,e){const n=e!==void 0?e:!this.layerStates[t];switch(this.layerStates[t]=n,t){case"cctv":this.cctvLayer.setVisible(n);break;case"live_news":this.newsLayer.setVisible(n);break;case"earthquakes":this.earthquakeLayer.setVisible(n);break;case"global_incidents":this.incidentsLayer.setVisible(n);break;case"cables":this.cablesLayer.setVisible(n);break;case"maritime":this.maritimeLayer.setVisible(n);break;case"sdk_air":this.airLayer.setVisible(n);break}return n}getLayerStates(){return{...this.layerStates}}onWindowResize(){if(!this.container)return;const t=this.container.clientWidth,e=this.container.clientHeight;this.camera.aspect=t/(e||1),this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)}start(){if(this.isAnimating)return;this.isAnimating=!0;const t=()=>{if(!this.isAnimating)return;requestAnimationFrame(t);const e=this.clock.getDelta(),n=this.clock.getElapsedTime();if(this.controls.update(),this.earthMaterial&&this.earthMaterial.uniforms){let a;this.layerStates.day_night?a=Kp(new Date):a=this.camera.position.clone().normalize(),this.earthMaterial.uniforms.uSunDirection.value.copy(a),this.earthMaterial.uniforms.uTime.value=n,this.atmosphereMaterial&&this.atmosphereMaterial.uniforms&&this.atmosphereMaterial.uniforms.uSunDirection.value.copy(a),this.cloudsMaterial&&this.cloudsMaterial.uniforms&&this.cloudsMaterial.uniforms.uSunDirection.value.copy(a)}this.cloudsMesh&&(this.cloudsMesh.rotation.y+=e*.015),this.layerStates.cables&&this.cablesLayer.update(e),this.layerStates.earthquakes&&this.earthquakeLayer.update(e),this.layerStates.cctv&&this.cctvLayer.update(e),this.layerStates.live_news&&this.newsLayer.update(e),this.layerStates.global_incidents&&this.incidentsLayer.update(e),this.layerStates.maritime&&this.maritimeLayer.update(e),this.layerStates.sdk_air&&this.airLayer.update(e),this.renderer.render(this.scene,this.camera)};t()}setAutoRotate(t){this.controls.autoRotate=t}destroy(){this.isAnimating=!1,window.removeEventListener("resize",this.onWindowResize.bind(this)),this.tooltipEl&&this.tooltipEl.parentElement&&this.tooltipEl.parentElement.removeChild(this.tooltipEl),this.renderer.dispose(),this.renderer.domElement.parentElement&&this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)}}const bs="terra_matrix_channels_v3",As="terra_matrix_layout_v3";class lm{constructor(t){ht(this,"container");ht(this,"channels",[]);ht(this,"currentLayout","2x2");ht(this,"soloChannelId",null);ht(this,"fullscreenTileId",null);ht(this,"editingChannelId",null);ht(this,"onChannelFocus");this.container=t,this.loadState(),this.render()}loadState(){try{let t=localStorage.getItem(bs);if(t||(t=localStorage.getItem("terra_matrix_channels_v2")),t){let n=JSON.parse(t);n=n.filter(a=>a.id!=="sydney-harbour"&&a.videoId!=="7pcL-0Wo77U"&&a.videoId!=="xL0ch83RAK8"),n=n.map(a=>a.id==="ttv-news"?{id:"cts-news",name:"華視新聞 CH52 CTS News Live",videoId:"TL8MMGiF0hA",city:"Taipei",country:"Taiwan"}:a.id==="tokyo-shibuya"&&a.videoId!=="8H3nRCFVR6Y"?{...a,videoId:"8H3nRCFVR6Y"}:a),n.length<3?this.channels=rr.map(a=>({id:a.id,name:a.name,videoId:a.videoId,city:a.city,country:a.country})):this.channels=n}else this.channels=rr.map(n=>({id:n.id,name:n.name,videoId:n.videoId,city:n.city,country:n.country}));const e=localStorage.getItem(As)||localStorage.getItem("terra_matrix_layout_v2");e&&["1x1","1x2","2x2","2x3","2x4","3x3","auto"].includes(e)&&(this.currentLayout=e)}catch(t){console.warn("[StreamMatrix] Failed to load localStorage state, using defaults:",t),this.channels=rr.map(e=>({id:e.id,name:e.name,videoId:e.videoId,city:e.city,country:e.country}))}}saveState(){try{localStorage.setItem(bs,JSON.stringify(this.channels)),localStorage.setItem(As,this.currentLayout)}catch(t){console.warn("[StreamMatrix] Failed to save state:",t)}}setLayout(t){this.currentLayout=t,this.saveState(),this.render()}addChannel(t){this.channels.some(n=>n.videoId===t.videoId)||(this.channels.push(t),this.saveState(),this.render())}updateChannel(t,e,n){const a=this.channels.find(r=>r.id===t);a&&(a.name=e.trim()||a.name,a.videoId=n.trim()||a.videoId,this.editingChannelId=null,this.saveState(),this.render())}removeChannel(t){this.channels=this.channels.filter(e=>e.id!==t),this.soloChannelId===t&&(this.soloChannelId=null),this.fullscreenTileId===t&&(this.fullscreenTileId=null),this.editingChannelId===t&&(this.editingChannelId=null),this.saveState(),this.render()}toggleSoloAudio(t){this.soloChannelId===t?(this.soloChannelId=null,this.muteAllIframes()):(this.soloChannelId=t,this.channels.forEach(e=>{const n=document.getElementById(`iframe-${e.id}`);!n||!n.contentWindow||(e.id===t?(n.contentWindow.postMessage(JSON.stringify({event:"command",func:"unMute",args:""}),"*"),n.contentWindow.postMessage(JSON.stringify({event:"command",func:"setVolume",args:[100]}),"*")):n.contentWindow.postMessage(JSON.stringify({event:"command",func:"mute",args:""}),"*"))})),this.updateAudioButtonsUI()}muteAllIframes(){this.channels.forEach(t=>{const e=document.getElementById(`iframe-${t.id}`);e&&e.contentWindow&&e.contentWindow.postMessage(JSON.stringify({event:"command",func:"mute",args:""}),"*")})}updateAudioButtonsUI(){this.channels.forEach(t=>{const e=document.getElementById(`solo-btn-${t.id}`);if(e){const n=this.soloChannelId===t.id;e.classList.toggle("active-solo",n),e.title=n?"Audio: SOLO (Active)":"Audio: Muted (Click for Solo)",e.innerHTML=n?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>':'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'}})}toggleTileFullscreen(t){this.fullscreenTileId=this.fullscreenTileId===t?null:t,this.render()}openPopoutWindow(t){window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(t)}`,"_blank","noopener,noreferrer")}parseInputToVideoId(t){const e=t.trim();if(!e)return null;if(/^[a-zA-Z0-9_-]{11}$/.test(e))return e;try{const n=new URL(e.startsWith("http")?e:`https://${e}`);if(n.hostname.includes("youtube.com")){const a=n.searchParams.get("v");if(a&&/^[a-zA-Z0-9_-]{11}$/.test(a))return a;const r=n.pathname.split("/").filter(Boolean);if(r[0]==="live"&&r[1]||r[0]==="embed"&&r[1])return r[1]}else if(n.hostname.includes("youtu.be")){const a=n.pathname.slice(1);if(/^[a-zA-Z0-9_-]{11}$/.test(a))return a}}catch{}return null}render(){const t=this.fullscreenTileId?this.channels.filter(e=>e.id===this.fullscreenTileId):this.channels;this.container.innerHTML=`
      <div class="matrix-root ${this.fullscreenTileId?"has-fullscreen":""}">
        <!-- Matrix Header Bar -->
        <div class="matrix-header">
          <div class="matrix-title-group">
            <span class="matrix-badge">SWISS GRID</span>
            <span class="matrix-label">LIVE STREAM MATRIX</span>
            <span class="matrix-count">[${this.channels.length} FEEDS ACTIVE]</span>
          </div>

          <!-- Dual Input Add Bar -->
          <div class="matrix-quick-add">
            <input 
              type="text" 
              id="matrix-add-name" 
              class="matrix-input matrix-name-input" 
              placeholder="Channel Name..." 
            />
            <input 
              type="text" 
              id="matrix-add-input" 
              class="matrix-input matrix-url-input" 
              placeholder="YouTube URL or Video ID..." 
            />
            <button id="matrix-add-btn" class="matrix-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              + ADD FEED
            </button>
            <select id="matrix-preset-select" class="matrix-select" title="Preset Channels">
              <option value="" disabled selected>Presets...</option>
              ${En.map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}
            </select>
          </div>

          <!-- Expanded Layout Switcher (1x1, 1x2, 2x2, 2x3, 2x4, 3x3, AUTO) -->
          <div class="matrix-layout-presets">
            <button class="layout-btn ${this.currentLayout==="1x1"?"active":""}" data-layout="1x1" title="1×1 (Single Feed Full View)">1×1</button>
            <button class="layout-btn ${this.currentLayout==="1x2"?"active":""}" data-layout="1x2" title="1×2 (Dual Split Comparison)">1×2</button>
            <button class="layout-btn ${this.currentLayout==="2x2"?"active":""}" data-layout="2x2" title="2×2 (Standard 4 Quad)">2×2</button>
            <button class="layout-btn ${this.currentLayout==="2x3"?"active":""}" data-layout="2x3" title="2×3 (6 Feeds Matrix)">2×3</button>
            <button class="layout-btn ${this.currentLayout==="2x4"?"active":""}" data-layout="2x4" title="2×4 (8 Feeds Matrix)">2×4</button>
            <button class="layout-btn ${this.currentLayout==="3x3"?"active":""}" data-layout="3x3" title="3×3 (9 Feeds Matrix)">3×3</button>
            <button class="layout-btn ${this.currentLayout==="auto"?"active":""}" data-layout="auto" title="AUTO (Adaptive Fill)">AUTO</button>
          </div>
        </div>

        <!-- Scrollable Matrix Video Grid -->
        <div class="matrix-scroll-container">
          <div class="matrix-grid grid-${this.currentLayout} ${this.fullscreenTileId?"has-fullscreen-tile":""}">
            ${t.length===0?'<div class="matrix-empty">No active streams. Add a YouTube stream ID or select a preset above.</div>':t.map(e=>{const n=this.fullscreenTileId===e.id,a=this.soloChannelId===e.id,r=this.editingChannelId===e.id;return`
                <div class="matrix-tile ${n?"tile-fullscreen":""}" id="tile-${e.id}">
                  <!-- Tile Header -->
                  <div class="tile-bar">
                    <div class="tile-meta">
                      <span class="tile-live-indicator"><span class="dot"></span>LIVE</span>
                      <span class="tile-name" title="${e.name}">${e.name}</span>
                    </div>
                    <div class="tile-actions">
                      <!-- Edit Link Button -->
                      <button class="tile-btn edit-btn" data-id="${e.id}" title="Edit Name & Stream URL">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                      </button>
                      <!-- Popout Window Button -->
                      <button class="tile-btn popout-btn" data-videoid="${e.videoId}" title="Open Stream in New Tab (Popout)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </button>
                      <!-- Audio Solo Button -->
                      <button class="tile-btn solo-btn ${a?"active-solo":""}" id="solo-btn-${e.id}" data-id="${e.id}" title="${a?"Audio: SOLO (Active)":"Audio: Muted"}">
                        ${a?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>':'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'}
                      </button>
                      <!-- Fullscreen Button -->
                      <button class="tile-btn fullscreen-btn" data-id="${e.id}" title="Toggle Tile Fullscreen">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                      </button>
                      <!-- Delete Button -->
                      <button class="tile-btn remove-btn" data-id="${e.id}" title="Remove Tile">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </div>

                  <!-- In-Place Edit Overlay -->
                  ${r?`
                    <div class="tile-edit-overlay">
                      <div class="tile-edit-header">EDIT FEED PARAMETERS</div>
                      <input type="text" class="tile-edit-input" id="edit-name-${e.id}" value="${e.name}" placeholder="Feed Name..." />
                      <input type="text" class="tile-edit-input" id="edit-video-${e.id}" value="${e.videoId}" placeholder="YouTube URL or Video ID..." />
                      <div class="tile-edit-actions">
                        <button class="matrix-btn save-edit-btn" data-id="${e.id}">SAVE & RELOAD</button>
                        <button class="matrix-btn cancel-edit-btn" data-id="${e.id}" style="background:#111;color:#9ca3af;">CANCEL</button>
                      </div>
                    </div>
                  `:""}

                  <!-- Video IFrame -->
                  <div class="tile-frame-wrapper">
                    <iframe
                      id="iframe-${e.id}"
                      src="https://www.youtube-nocookie.com/embed/${e.videoId}?autoplay=1&mute=1&enablejsapi=1"
                      title="${e.name}"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){this.container.querySelectorAll(".layout-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.layout;c&&(this.fullscreenTileId=null,this.setLayout(c))})}),this.channels.forEach(o=>{const s=this.container.querySelector(`#solo-btn-${o.id}`);s&&s.addEventListener("click",()=>{this.toggleSoloAudio(o.id)})}),this.container.querySelectorAll(".fullscreen-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.id;c&&this.toggleTileFullscreen(c)})}),this.container.querySelectorAll(".popout-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.videoid;c&&this.openPopoutWindow(c)})}),this.container.querySelectorAll(".edit-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.id;c&&(this.editingChannelId=this.editingChannelId===c?null:c,this.render())})}),this.container.querySelectorAll(".save-edit-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.id;if(!c)return;const l=this.container.querySelector(`#edit-name-${c}`),u=this.container.querySelector(`#edit-video-${c}`);if(u&&l){const f=this.parseInputToVideoId(u.value);f?this.updateChannel(c,l.value,f):u.style.borderColor="#ef4444"}})}),this.container.querySelectorAll(".cancel-edit-btn").forEach(o=>{o.addEventListener("click",()=>{this.editingChannelId=null,this.render()})}),this.container.querySelectorAll(".remove-btn").forEach(o=>{o.addEventListener("click",s=>{const c=s.currentTarget.dataset.id;c&&this.removeChannel(c)})});const t=this.container.querySelector("#matrix-add-name"),e=this.container.querySelector("#matrix-add-input"),n=this.container.querySelector("#matrix-add-btn"),a=this.container.querySelector("#matrix-preset-select"),r=()=>{if(!e)return;const o=e.value.trim(),s=this.parseInputToVideoId(o),c=(t==null?void 0:t.value.trim())||`Feed ${s||o}`;if(s){const l={id:`ch-${Date.now()}`,name:c,videoId:s};this.addChannel(l),e.value="",t&&(t.value="")}else e.classList.add("input-error"),setTimeout(()=>e.classList.remove("input-error"),1500)};n&&n.addEventListener("click",r),e&&e.addEventListener("keydown",o=>{o.key==="Enter"&&r()}),a&&a.addEventListener("change",()=>{const o=a.value,s=En.find(c=>c.id===o);s&&(this.addChannel({id:s.id,name:s.name,videoId:s.videoId,city:s.city,country:s.country}),a.selectedIndex=0)})}}class um{constructor(){ht(this,"globeScene");ht(this,"streamMatrix");ht(this,"infoCardEl",null);try{this.initLayout()}catch(t){console.error("[TerraMatrixApp] Layout initialization failed:",t)}try{this.initGlobe()}catch(t){console.error("[TerraMatrixApp] Globe initialization failed:",t)}try{this.initMatrix()}catch(t){console.error("[TerraMatrixApp] Matrix initialization failed:",t)}try{this.initClock(),this.initHeaderActions()}catch(t){console.error("[TerraMatrixApp] Header actions initialization failed:",t)}}initLayout(){const t=document.getElementById("app");t&&(t.innerHTML=`
      <!-- Top Tactical Header -->
      <header class="terra-header">
        <div class="header-left">
          <div class="brand-badge">
            <span class="status-dot-emerald"></span>
            DEFCON 5 // STANDBY
          </div>
          <div class="brand-title">TERRA MATRIX</div>
          <div class="brand-subtitle">// SITUATION INTELLIGENCE COMMAND</div>
        </div>

        <div class="header-center">
          <div class="header-metric">
            <span>SEISMIC:</span>
            <span class="metric-val" id="header-quake-count">USGS LIVE</span>
          </div>
          <div class="header-metric">
            <span>CABLES:</span>
            <span class="metric-val">420+ GLOBAL</span>
          </div>
          <div class="header-metric">
            <span>INTEL FEEDS:</span>
            <span class="metric-val" style="color: var(--accent-emerald);">ACTIVE</span>
          </div>
        </div>

        <div class="header-right">
          <button id="btn-auto-rotate" class="header-btn" title="Toggle Earth Auto-Rotation">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            AUTO ROTATE
          </button>
          <button id="btn-reset-view" class="header-btn" title="Reset Camera Perspective">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
            RESET VIEW
          </button>
          <div class="utc-clock" id="tpe-clock">0000-00-00 00:00:00 TPE</div>
        </div>
      </header>

      <!-- Workspace: 3D Globe + Floating Pill (Top) & Live Stream Matrix (Bottom) -->
      <main class="terra-workspace">
        <section class="globe-wrapper">
          <div id="globe-container"></div>

          <!-- Minimal Floating Glass Pill (Top Left Whitelisted Layer Controller) -->
          <div class="glass-pill-container">
            <div class="glass-pill">
              <div class="pill-header">
                <span class="pill-title">LAYERS WHITELIST</span>
                <span style="font-family: var(--font-mono); font-size: 9px; color: var(--accent-emerald);">8 ACTIVE</span>
              </div>
              <div class="pill-layers-list">
                <label class="layer-toggle-item" title="Global live cameras and previews">
                  <input type="checkbox" id="layer-cctv" checked />
                  <span>📷 CCTV 視訊</span>
                </label>
                <label class="layer-toggle-item" title="Major news coordinates">
                  <input type="checkbox" id="layer-live_news" checked />
                  <span>📰 即時新聞</span>
                </label>
                <label class="layer-toggle-item" title="USGS real-time earthquake ripples">
                  <input type="checkbox" id="layer-earthquakes" checked />
                  <span>⚡ 地震波紋</span>
                </label>
                <label class="layer-toggle-item" title="Geopolitical critical flashpoints">
                  <input type="checkbox" id="layer-global_incidents" checked />
                  <span>🚨 全球事件</span>
                </label>
                <label class="layer-toggle-item" title="Solar day-night terminator (UTC)">
                  <input type="checkbox" id="layer-day_night" checked />
                  <span>🌓 日夜晨昏</span>
                </label>
                <label class="layer-toggle-item" title="Undersea fiber-optic cables">
                  <input type="checkbox" id="layer-cables" checked />
                  <span>🌐 海底光纜</span>
                </label>
                <label class="layer-toggle-item" title="Maritime shipping corridors">
                  <input type="checkbox" id="layer-maritime" checked />
                  <span>🚢 戰略航道</span>
                </label>
                <label class="layer-toggle-item" title="Aviation international skyways">
                  <input type="checkbox" id="layer-sdk_air" checked />
                  <span>✈️ 國際空域航線 (Air Corridors)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Dynamic Info Card Modal (Bottom Left) -->
          <div id="globe-info-container"></div>
        </section>

        <!-- Live Stream Matrix Panel (Swiss Grid) -->
        <section class="matrix-wrapper" id="matrix-container"></section>
      </main>
    `)}initGlobe(){const t=document.getElementById("globe-container");if(!t)return;this.globeScene=new cm(t),["cctv","live_news","earthquakes","global_incidents","day_night","cables","maritime","sdk_air"].forEach(n=>{const a=document.getElementById(`layer-${n}`);a&&a.addEventListener("change",()=>{this.globeScene.toggleLayer(n,a.checked)})}),this.globeScene.onSelectCctv=n=>{this.showInfoCard({badge:"CCTV FEED",badgeClass:"MONITOR",title:`${n.name} (${n.city}, ${n.country})`,content:`Coordinates: ${n.lat.toFixed(4)}°N, ${n.lon.toFixed(4)}°E<br/>Target Stream: ${n.videoId}`,actionLabel:"OPEN IN MATRIX",onAction:()=>{this.streamMatrix.addChannel({id:n.id,name:n.name,videoId:n.videoId,city:n.city,country:n.country})}})},this.globeScene.onSelectEarthquake=n=>{this.showInfoCard({badge:`MAG ${n.mag.toFixed(1)} SEISMIC`,badgeClass:n.mag>=6?"CRITICAL":"ELEVATED",title:n.place,content:`Magnitude: Richter ${n.mag.toFixed(1)}<br/>Depth: ${n.depth} km<br/>Time: ${new Date(n.time).toUTCString()}`})},this.globeScene.onSelectIncident=n=>{this.showInfoCard({badge:n.level,badgeClass:n.level,title:n.title,content:`Location: ${n.location}<br/>${n.summary}`})},this.globeScene.onSelectNews=n=>{this.showInfoCard({badge:"FLASH INTEL",badgeClass:"MONITOR",title:`${n.source} // ${n.city}`,content:`${n.headline}<br/><span style="color: var(--text-dim); font-size: 10px;">Reported ${n.time}</span>`})}}initMatrix(){const t=document.getElementById("matrix-container");t&&(this.streamMatrix=new lm(t))}showInfoCard(t){var n,a;const e=document.getElementById("globe-info-container");e&&(e.innerHTML=`
      <div class="globe-info-card">
        <button class="card-close-btn" id="info-card-close">&times;</button>
        <span class="info-badge ${t.badgeClass}">${t.badge}</span>
        <div class="info-title">${t.title}</div>
        <div class="info-desc">${t.content}</div>
        ${t.actionLabel?`<button class="matrix-btn" id="info-card-action" style="margin-top: 8px;">${t.actionLabel}</button>`:""}
      </div>
    `,(n=document.getElementById("info-card-close"))==null||n.addEventListener("click",()=>{e.innerHTML=""}),t.actionLabel&&t.onAction&&((a=document.getElementById("info-card-action"))==null||a.addEventListener("click",()=>{var r;(r=t.onAction)==null||r.call(t),e.innerHTML=""})))}initClock(){const t=document.getElementById("tpe-clock"),e=()=>{if(t){const n=new Date,a=new Date(n.toLocaleString("en-US",{timeZone:"Asia/Taipei"})),r=a.getFullYear(),o=String(a.getMonth()+1).padStart(2,"0"),s=String(a.getDate()).padStart(2,"0"),c=String(a.getHours()).padStart(2,"0"),l=String(a.getMinutes()).padStart(2,"0"),u=String(a.getSeconds()).padStart(2,"0");t.textContent=`${r}-${o}-${s} ${c}:${l}:${u} TPE`}};e(),setInterval(e,1e3)}initHeaderActions(){let t=!0;const e=document.getElementById("btn-auto-rotate");e&&e.addEventListener("click",()=>{t=!t,this.globeScene.setAutoRotate(t),e.style.color=t?"#fff":"var(--text-dim)"});const n=document.getElementById("btn-reset-view");n&&n.addEventListener("click",()=>{this.globeScene.focusCoordinates(24,121,260)})}}window.addEventListener("DOMContentLoaded",()=>{new um});
