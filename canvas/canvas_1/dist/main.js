!function(){"use strict";var t=document.getElementById("main");t&&(t.width=window.innerWidth,t.height=window.innerHeight);for(var i=function(){function i(t,i,n,h,e){this.x=t,this.y=i,this.mx=n,this.my=h,this.radius=e}return i.prototype.draw=function(){if(t){var i=t.getContext("2d");i&&(i.beginPath(),i.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),i.strokeStyle="blue",i.stroke())}},i.prototype.update=function(){(this.x+this.radius>innerWidth||this.x-this.radius<0)&&(this.mx*=-1),(this.y+this.radius>innerHeight||this.y-this.radius<0)&&(this.my*=-1),this.x+=this.mx,this.y+=this.my,this.draw()},i}(),n=[],h=0;h<100;h++){var e=[Math.random()*innerWidth,Math.random()*innerHeight,4*(Math.random()-.5),4*(Math.random()-.5)],r=e[0],s=e[1],a=e[2],o=e[3];n.push(new i(r,s,a,o,30))}console.log(n),function i(){var h=null==t?void 0:t.getContext("2d");t&&h&&(h.clearRect(0,0,innerWidth,innerHeight),requestAnimationFrame(i),n.forEach((function(t){return t.update()})))}()}();