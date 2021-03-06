'use strict'; 
/* global api, STORE, bookmarks */
/*eslint-env jquery*/

$(document).ready(function() { 
  bookmarks.bindEventListeners(); 

  api.getItems((items) => { 
    items.forEach(item => STORE.addItem(item));
    bookmarks.render(); 
  }); 
}); 