// ==UserScript==
// @name        LSSHack
// @namespace   A9
// @include     http://www.amazon.com/
// @version     1
// @grant       none
// @require       https://code.jquery.com/jquery-2.1.1.js
// ==/UserScript==
alert('testing Hack');

$("#centercol").css( "border", "2px solid red" );

// Shorthand for $( document ).ready()
$(function() {
 alert('debug 1');

$("#centercol").prepend( '<div><h2>Trending Product in San Fracisco Bay Area</h2> <div style="height: 15px;" class="s9_header seed_header"><div class="seedWrapper"><div>Top trending products in your area</div></div></div><div class="fluid asin" style="float: left"><div class="inner"><div class="s9hl" style="position: relative"><a href="/gp/product/B00CX5P8FC/ref=s9_psimh_gw_p465_d0_i1?pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_s=center-2&amp;pf_rd_r=1NP2JPGDRTV4TK4GJWBW&amp;pf_rd_t=101&amp;pf_rd_p=1688200382&amp;pf_rd_i=507846" class="title ntTitle noLinkDecoration" title="Amazon Fire TV"><div class="s9ImageWrapper"><div class="imageContainer"><img src="http://ecx.images-amazon.com/images/I/31AMfovGmRL._SL150_.jpg" alt="" height="150" width="150"></div></div><span class="s9TitleText">Amazon Fire TV</span></a><br clear="none"><div class="s9CustomerReviews"><div class="s9Stars s9Stars_4_0"></div><span>(<a class="noLinkDecoration" href="/gp/product-reviews/B00CX5P8FC/ref=s9_psimh_gw_p465_d0_rs1?ie=UTF8&amp;showViewpoints=1&amp;pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_s=center-2&amp;pf_rd_r=1NP2JPGDRTV4TK4GJWBW&amp;pf_rd_t=101&amp;pf_rd_p=1688200382&amp;pf_rd_i=507846">12,768<span class="s9Long"> customer reviews</span></a>)</span></div><span class="s9Price red t14">$99.00</span><div class="prime-offer-badge" style="display:inline-block; vertical-align: top; margin-left: 4px; height: 17px; width: 45px; background-image: url(http://g-ecx.images-amazon.com/images/G/01/x-locale/subscriptions/primeclub/prime-check-badge-17._V158867916_.gif); background-position-y: -1px;"></div></div></div></div></div>');
 
});
