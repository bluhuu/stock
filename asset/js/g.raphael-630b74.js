Raphael.el.popup=function(t,h,e,a){var i,r,s,n,l,o=this.paper||this[0].paper;if(o){switch(this.type){case"text":case"circle":case"ellipse":s=!0;break;default:s=!1}t=null==t?"up":t,h=h||5,i=this.getBBox(),console.log(e,a),e="number"==typeof e?e:s?i.x+i.width/2:i.x,a="number"==typeof a?a:s?i.y+i.height/2:i.y,console.log(e,a),n=Math.max(i.width/2-h,0),l=Math.max(i.height/2-h,0),this.translate(e-i.x-(s?i.width/2:0),a-i.y-(s?i.height/2:0)),i=this.getBBox();var p={up:["M",e,a,"l",-h,-h,-n,0,"a",h,h,0,0,1,-h,-h,"l",0,-i.height,"a",h,h,0,0,1,h,-h,"l",2*h+2*n,0,"a",h,h,0,0,1,h,h,"l",0,i.height,"a",h,h,0,0,1,-h,h,"l",-n,0,"z"].join(","),down:["M",e,a,"l",h,h,n,0,"a",h,h,0,0,1,h,h,"l",0,i.height,"a",h,h,0,0,1,-h,h,"l",-(2*h+2*n),0,"a",h,h,0,0,1,-h,-h,"l",0,-i.height,"a",h,h,0,0,1,h,-h,"l",n,0,"z"].join(","),left:["M",e,a,"l",-h,h,0,l,"a",h,h,0,0,1,-h,h,"l",-i.width,0,"a",h,h,0,0,1,-h,-h,"l",0,-(2*h+2*l),"a",h,h,0,0,1,h,-h,"l",i.width,0,"a",h,h,0,0,1,h,h,"l",0,l,"z"].join(","),right:["M",e,a,"l",h,-h,0,-l,"a",h,h,0,0,1,h,-h,"l",i.width,0,"a",h,h,0,0,1,h,h,"l",0,2*h+2*l,"a",h,h,0,0,1,-h,h,"l",-i.width,0,"a",h,h,0,0,1,-h,-h,"l",0,-l,"z"].join(",")};return r={up:{x:-!s*(i.width/2),y:2*-h-(s?i.height/2:i.height)},down:{x:-!s*(i.width/2),y:2*h+(s?i.height/2:i.height)},left:{x:2*-h-(s?i.width/2:i.width),y:-!s*(i.height/2)},right:{x:2*h+(s?i.width/2:i.width),y:-!s*(i.height/2)}}[t],this.translate(r.x,r.y),o.path(p[t]).attr({fill:"#000",stroke:"none"}).insertBefore(this.node?this:this[0])}},Raphael.el.tag=function(t,h,e,a){var i=3,r=this.paper||this[0].paper;if(r){var s,n,l,o=r.path().attr({fill:"#000",stroke:"#000"}),p=this.getBBox();switch(this.type){case"text":case"circle":case"ellipse":l=!0;break;default:l=!1}return t=t||0,e="number"==typeof e?e:l?p.x+p.width/2:p.x,a="number"==typeof a?a:l?p.y+p.height/2:p.y,h=null==h?5:h,n=.5522*h,p.height>=2*h?o.attr({path:["M",e,a+h,"a",h,h,0,1,1,0,2*-h,h,h,0,1,1,0,2*h,"m",0,2*-h-i,"a",h+i,h+i,0,1,0,0,2*(h+i),"L",e+h+i,a+p.height/2+i,"l",p.width+2*i,0,0,-p.height-2*i,-p.width-2*i,0,"L",e,a-h-i].join(",")}):(s=Math.sqrt(Math.pow(h+i,2)-Math.pow(p.height/2+i,2)),o.attr({path:["M",e,a+h,"c",-n,0,-h,n-h,-h,-h,0,-n,h-n,-h,h,-h,n,0,h,h-n,h,h,0,n,n-h,h,-h,h,"M",e+s,a-p.height/2-i,"a",h+i,h+i,0,1,0,0,p.height+2*i,"l",h+i-s+p.width+2*i,0,0,-p.height-2*i,"L",e+s,a-p.height/2-i].join(",")})),t=360-t,o.rotate(t,e,a),this.attrs?(this.attr(this.attrs.x?"x":"cx",e+h+i+(l?p.width/2:"text"==this.type?p.width:0)).attr("y",l?a:a-p.height/2),this.rotate(t,e,a),t>90&&270>t&&this.attr(this.attrs.x?"x":"cx",e-h-i-(l?p.width/2:p.width)).rotate(180,e,a)):t>90&&270>t?(this.translate(e-p.x-p.width-h-i,a-p.y-p.height/2),this.rotate(t-180,p.x+p.width+h+i,p.y+p.height/2)):(this.translate(e-p.x+h+i,a-p.y-p.height/2),this.rotate(t,p.x-h-i,p.y+p.height/2)),o.insertBefore(this.node?this:this[0])}},Raphael.el.drop=function(t,h,e){var a,i,r,s,n,l=this.getBBox(),o=this.paper||this[0].paper;if(o){switch(this.type){case"text":case"circle":case"ellipse":a=!0;break;default:a=!1}return t=t||0,h="number"==typeof h?h:a?l.x+l.width/2:l.x,e="number"==typeof e?e:a?l.y+l.height/2:l.y,i=Math.max(l.width,l.height)+Math.min(l.width,l.height),r=o.path(["M",h,e,"l",i,0,"A",.4*i,.4*i,0,1,0,h+.7*i,e-.7*i,"z"]).attr({fill:"#000",stroke:"none"}).rotate(22.5-t,h,e),t=(t+90)*Math.PI/180,s=h+i*Math.sin(t)-(a?0:l.width/2),n=e+i*Math.cos(t)-(a?0:l.height/2),this.attrs?this.attr(this.attrs.x?"x":"cx",s).attr(this.attrs.y?"y":"cy",n):this.translate(s-l.x,n-l.y),r.insertBefore(this.node?this:this[0])}},Raphael.el.flag=function(t,h,e){var a=3,i=this.paper||this[0].paper;if(i){var r,s=i.path().attr({fill:"#000",stroke:"#000"}),n=this.getBBox(),l=n.height/2;switch(this.type){case"text":case"circle":case"ellipse":r=!0;break;default:r=!1}return t=t||0,h="number"==typeof h?h:r?n.x+n.width/2:n.x,e="number"==typeof e?e:r?n.y+n.height/2:n.y,s.attr({path:["M",h,e,"l",l+a,-l-a,n.width+2*a,0,0,n.height+2*a,-n.width-2*a,0,"z"].join(",")}),t=360-t,s.rotate(t,h,e),this.attrs?(this.attr(this.attrs.x?"x":"cx",h+l+a+(r?n.width/2:"text"==this.type?n.width:0)).attr("y",r?e:e-n.height/2),this.rotate(t,h,e),t>90&&270>t&&this.attr(this.attrs.x?"x":"cx",h-l-a-(r?n.width/2:n.width)).rotate(180,h,e)):t>90&&270>t?(this.translate(h-n.x-n.width-l-a,e-n.y-n.height/2),this.rotate(t-180,n.x+n.width+l+a,n.y+n.height/2)):(this.translate(h-n.x+l+a,e-n.y-n.height/2),this.rotate(t,n.x-l-a,n.y+n.height/2)),s.insertBefore(this.node?this:this[0])}},Raphael.el.label=function(){var t=this.getBBox(),h=this.paper||this[0].paper,e=Math.min(20,t.width+10,t.height+10)/2;if(h)return h.rect(t.x-e/2,t.y-e/2,t.width+e,t.height+e,e).attr({stroke:"none",fill:"#000"}).insertBefore(this.node?this:this[0])},Raphael.el.blob=function(t,h,e){var a,i,r,s=this.getBBox(),n=Math.PI/180,l=this.paper||this[0].paper;if(l){switch(this.type){case"text":case"circle":case"ellipse":i=!0;break;default:i=!1}a=l.path().attr({fill:"#000",stroke:"none"}),t=(+t+1?t:45)+90,r=Math.min(s.height,s.width),h="number"==typeof h?h:i?s.x+s.width/2:s.x,e="number"==typeof e?e:i?s.y+s.height/2:s.y;var o=Math.max(s.width+r,25*r/12),p=Math.max(s.height+r,25*r/12),f=h+r*Math.sin((t-22.5)*n),x=e+r*Math.cos((t-22.5)*n),g=h+r*Math.sin((t+22.5)*n),u=e+r*Math.cos((t+22.5)*n),c=(g-f)/2,d=(u-x)/2,w=o/2,M=p/2,b=-Math.sqrt(Math.abs(w*w*M*M-w*w*d*d-M*M*c*c)/(w*w*d*d+M*M*c*c)),y=b*w*d/M+(g+f)/2,R=b*-M*c/w+(u+x)/2;return a.attr({x:y,y:R,path:["M",h,e,"L",g,u,"A",w,M,0,1,1,f,x,"z"].join(",")}),this.translate(y-s.x-s.width/2,R-s.y-s.height/2),a.insertBefore(this.node?this:this[0])}},Raphael.fn.label=function(t,h,e){var a=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),a.push(e.label(),e)},Raphael.fn.popup=function(t,h,e,a,i){var r=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),console.log("first fun",t,h),r.push(e)},Raphael.fn.tag=function(t,h,e,a,i){var r=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),r.push(e.tag(a,i),e)},Raphael.fn.flag=function(t,h,e,a){var i=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),i.push(e.flag(a),e)},Raphael.fn.drop=function(t,h,e,a){var i=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),i.push(e.drop(a),e)},Raphael.fn.blob=function(t,h,e,a){var i=this.set();return e=this.text(t,h,e).attr(Raphael.g.txtattr),i.push(e.blob(a),e)},Raphael.el.lighter=function(t){t=t||2;var h=[this.attrs.fill,this.attrs.stroke];return this.fs=this.fs||[h[0],h[1]],h[0]=Raphael.rgb2hsb(Raphael.getRGB(h[0]).hex),h[1]=Raphael.rgb2hsb(Raphael.getRGB(h[1]).hex),h[0].b=Math.min(h[0].b*t,1),h[0].s=h[0].s/t,h[1].b=Math.min(h[1].b*t,1),h[1].s=h[1].s/t,this.attr({fill:"hsb("+[h[0].h,h[0].s,h[0].b]+")",stroke:"hsb("+[h[1].h,h[1].s,h[1].b]+")"}),this},Raphael.el.darker=function(t){t=t||2;var h=[this.attrs.fill,this.attrs.stroke];return this.fs=this.fs||[h[0],h[1]],h[0]=Raphael.rgb2hsb(Raphael.getRGB(h[0]).hex),h[1]=Raphael.rgb2hsb(Raphael.getRGB(h[1]).hex),h[0].s=Math.min(h[0].s*t,1),h[0].b=h[0].b/t,h[1].s=Math.min(h[1].s*t,1),h[1].b=h[1].b/t,this.attr({fill:"hsb("+[h[0].h,h[0].s,h[0].b]+")",stroke:"hsb("+[h[1].h,h[1].s,h[1].b]+")"}),this},Raphael.el.resetBrightness=function(){return this.fs&&(this.attr({fill:this.fs[0],stroke:this.fs[1]}),delete this.fs),this},function(){var t=["lighter","darker","resetBrightness"],h=["popup","tag","flag","label","drop","blob"];for(var e in h)(function(t){Raphael.st[t]=function(){return Raphael.el[t].apply(this,arguments)}})(h[e]);for(var e in t)(function(t){Raphael.st[t]=function(){for(var h=0;h<this.length;h++)this[h][t].apply(this[h],arguments);return this}})(t[e])}(),Raphael.g={shim:{stroke:"none",fill:"#000","fill-opacity":0},txtattr:{font:"12px Arial, sans-serif",fill:"#fff"},colors:function(){for(var t=[.6,.2,.05,.1333,.75,0],h=[],e=0;10>e;e++)h.push(e<t.length?"hsb("+t[e]+",.75, .75)":"hsb("+t[e-t.length]+", 1, .5)");return h}(),snapEnds:function(t,h,e){function a(t){return Math.abs(t-.5)<.25?~~t+.5:Math.round(t)}var i=t,r=h;if(i==r)return{from:i,to:r,power:0};var s=(r-i)/e,n=~~s,l=n,o=0;if(n){for(;l;)o--,l=~~(s*Math.pow(10,o))/Math.pow(10,o);o++}else{if(0!=s&&isFinite(s))for(;!n;)o=o||1,n=~~(s*Math.pow(10,o))/Math.pow(10,o),o++;else o=1;o&&o--}return r=a(h*Math.pow(10,o))/Math.pow(10,o),h>r&&(r=a((h+.5)*Math.pow(10,o))/Math.pow(10,o)),i=a((t-(o>0?0:.5))*Math.pow(10,o))/Math.pow(10,o),{from:i,to:r,power:o}},axis:function(t,h,e,a,i,r,s,n,l,o,p){o=null==o?2:o,l=l||"t",r=r||10,p=arguments[arguments.length-1];var f,x="|"==l||" "==l?["M",t+.5,h,"l",0,.001]:1==s||3==s?["M",t+.5,h,"l",0,-e]:["M",t,h+.5,"l",e,0],g=this.snapEnds(a,i,r),u=g.from,c=g.to,d=g.power,w=0,M={font:"11px 'Fontin Sans', Fontin-Sans, sans-serif"},b=p.set();f=(c-u)/r;var y=u,R=d>0?d:0;if(k=e/r,1==+s||3==+s){for(var v=h,m=(s-1?1:-1)*(o+3+!!(s-1));v>=h-e;)"-"!=l&&" "!=l&&(x=x.concat(["M",t-("+"==l||"|"==l?o:!(s-1)*o*2),v+.5,"l",2*o+1,0])),b.push(p.text(t+m,v,n&&n[w++]||(Math.round(y)==y?y:+y.toFixed(R))).attr(M).attr({"text-anchor":s-1?"start":"end"})),y+=f,v-=k;Math.round(v+k-(h-e))&&("-"!=l&&" "!=l&&(x=x.concat(["M",t-("+"==l||"|"==l?o:!(s-1)*o*2),h-e+.5,"l",2*o+1,0])),b.push(p.text(t+m,h-e,n&&n[w]||(Math.round(y)==y?y:+y.toFixed(R))).attr(M).attr({"text-anchor":s-1?"start":"end"})))}else{y=u,R=(d>0)*d,m=(s?-1:1)*(o+9+!s);for(var B=t,k=e/r,F=0,j=0;t+e>=B;){"-"!=l&&" "!=l&&(x=x.concat(["M",B+.5,h-("+"==l?o:!!s*o*2),"l",0,2*o+1])),b.push(F=p.text(B,h+m,n&&n[w++]||(Math.round(y)==y?y:+y.toFixed(R))).attr(M));var z=F.getBBox();j>=z.x-5?b.pop(b.length-1).remove():j=z.x+z.width,y+=f,B+=k}Math.round(B-k-t-e)&&("-"!=l&&" "!=l&&(x=x.concat(["M",t+e+.5,h-("+"==l?o:!!s*o*2),"l",0,2*o+1])),b.push(p.text(t+e,h+m,n&&n[w]||(Math.round(y)==y?y:+y.toFixed(R))).attr(M)))}var G=p.path(x);return G.text=b,G.all=p.set([G,b]),G.remove=function(){this.text.remove(),this.constructor.prototype.remove.call(this)},G},labelise:function(t,h,e){return t?(t+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(t,a,i){return a?(+h).toFixed(a.replace(/^#+\.?/g,"").length):i?(100*h/e).toFixed(i.replace(/^%+\.?/g,"").length)+"%":void 0}):(+h).toFixed(0)}};