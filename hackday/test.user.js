// ==UserScript==
// @name        LSSHack
// @namespace   A9
// @include     http://www.amazon.com/
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
alert('testing Hack');

// Shorthand for $( document ).ready()
$(function() {
$( "#centercol" ).prepend( "<p>Test</p>" );
});

