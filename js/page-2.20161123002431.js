(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;var a='data-src'; if($('.js-14').hasAttr('src')) { a='src'; } $('.js-14').attr(a, (dpi>1) ? 'images/github-bb449e0ffbacbcb7f9c703db85b1cf0b-1102.png' : 'images/github-bb449e0ffbacbcb7f9c703db85b1cf0b-551.png');};
if(!window.HTMLPictureElement){r();}
$('.js-14').unveil(50);
$('.js-16 source').unveil(50);
var wl = new woolite();
wl.init();
wl.addAnimation($('.js-8')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-9')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-10')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-11')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-12')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-13')[0], "1.40s", "0.00s", 1, 100);
wl.addAnimation($('.js-14')[0], "2.20s", "0.00s", 1, 100);
wl.addAnimation($('.js-15')[0], "1.00s", "0.00s", 1, 100);
wl.start();

});