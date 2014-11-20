// ==UserScript==
// @name        LSSHack
// @namespace   A9
// @include     http://www.amazon.com/
// @version     1
// @grant       none
// ==/UserScript==
alert('testing Hack');
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>

// Shorthand for $( document ).ready()
$(function() {
$( "#centercol" ).prepend( "<p>Test</p>" );
});

