'use strict'; 
/* global bookmarks */
/*eslint-env jquery*/

$(document).ready(function() { 
  bookmarks.bindEventListeners(); 
  bookmarks.render(); 
}); 