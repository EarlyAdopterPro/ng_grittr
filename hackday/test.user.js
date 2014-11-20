// ==UserScript==
// @name        LSSHack
// @namespace   A9
// @include     http://www.amazon.com/
// @version     1
// @grant       none
// @require       https://code.jquery.com/jquery-2.1.1.js
// ==/UserScript==
alert('testing Hack');

 // Shorthand for $( document ).ready()
$(function() {
$( "#centercol" ).prepend( "<p>Test</p>" );
});
