(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };


$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;var a='data-src'; if($('.js-6').hasAttr('src')) { a='src'; } $('.js-6').attr(a, (dpi>1) ? 'images/facebook_new_logo_-2015-.svg-400.png' : 'images/facebook_new_logo_-2015-.svg-200.png');
var a='data-src'; if($('.js-7').hasAttr('src')) { a='src'; } $('.js-7').attr(a, (dpi>1) ? 'images/imgres-400.png' : 'images/imgres-200.png');
var a='data-src'; if($('.js-8').hasAttr('src')) { a='src'; } $('.js-8').attr(a, (dpi>1) ? 'images/github-bb449e0ffbacbcb7f9c703db85b1cf0b-400.png' : 'images/github-bb449e0ffbacbcb7f9c703db85b1cf0b-200.png');};
if(!window.HTMLPictureElement){r();}
$('.js-5 .slider').slick({lazyLoad: 'ondemand',slidesToShow: 1,slidesToScroll: 1,fade: true,slide: 'div',cssEase: 'linear',speed: 300,dots: false,arrows: true,infinite: true,autoplay: true,pauseOnHover: false,autoplaySpeed: 2500});$('.js-6').unveil(50);
$('.js-10 source').unveil(50);
$('.js-7').unveil(50);
$('.js-11 source').unveil(50);
$('.js-8').unveil(50);
$('.js-12 source').unveil(50);
var wl = new woolite();
wl.init();
wl.addAnimation($('.js')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-2')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-3')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-4')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-6')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-7')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-8')[0], "1.00s", "0.00s", 1, 100);
wl.addAnimation($('.js-9')[0], "1.00s", "0.00s", 1, 100);
wl.start();

});