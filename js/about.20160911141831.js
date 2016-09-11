(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery);
$.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

function sm(){$('a[href^="#"]').each(function(){$(this).click(function(){var t=this.hash.length>1?$('[name="'+this.hash.slice(1)+'"]').offset().top:0;return $("html, body").animate({scrollTop:t},400),!1})})}

$(document).ready(function() {
r=function(){dpi=window.devicePixelRatio;var a='data-src'; if($('.js-5 .slide2').hasAttr('src')) { a='src'; } $('.js-5 .slide2').attr(a, (dpi>1) ? 'images/965776_528705200553143_1319750561_o-1900.jpg' : 'images/965776_528705200553143_1319750561_o-950.jpg');
var a='data-src'; if($('.js-5 .slide3').hasAttr('src')) { a='src'; } $('.js-5 .slide3').attr(a, (dpi>1) ? 'images/10410483_726784097411280_341548980207724533_n-1900.jpg' : 'images/10410483_726784097411280_341548980207724533_n-950.jpg');
var a='data-src'; if($('.js-5 .slide4').hasAttr('src')) { a='src'; } $('.js-5 .slide4').attr(a, (dpi>1) ? 'images/35580570-4938-4e02-a175-1675eb9acc7c-1900.jpeg' : 'images/35580570-4938-4e02-a175-1675eb9acc7c-950.jpeg');
var a='data-src'; if($('.js-5 .slide5').hasAttr('src')) { a='src'; } $('.js-5 .slide5').attr(a, (dpi>1) ? 'images/pp-1900.jpeg' : 'images/pp-950.jpeg');};
if(!window.HTMLPictureElement){r();}
if(! document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
$('.js-7').attr('src', 'images/twitter-142.png');
$('.js-8').attr('src', 'images/fb-143.png');

}
sm();
$('.js-5 .slider').slick({lazyLoad: 'ondemand',slidesToShow: 1,slidesToScroll: 1,fade: true,slide: 'div',cssEase: 'linear',speed: 400,dots: true,arrows: true,infinite: true,autoplay: true,pauseOnHover: true,autoplaySpeed: 2200});var mapOptions = {zoom: 11,center: new google.maps.LatLng(28.826672, 78.792111),mapTypeId: google.maps.MapTypeId.ROADMAP,};var map = new google.maps.Map($('.js-6').get(0), mapOptions);
});