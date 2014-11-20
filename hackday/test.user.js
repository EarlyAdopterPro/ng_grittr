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

$("#centercol").css( "border", "2px solid red" );
$("#centercol").prepend( "<p>Test Test Test </p>" );

 
});
