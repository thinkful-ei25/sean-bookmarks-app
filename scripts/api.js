'use strict'; 
/*eslint-env jquery*/

// eslint-disable-next-line no-unused-vars
const api = (function(){ 
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sean'; 

  const getItems = function(callback){ 
    $.getJSON(`${BASE_URL}/bookmarks`, callback); 
  }; 

  const createItem = function(item, callbackSuccess, callbackFail) {     
    $.ajax(
      { 
        url : `${BASE_URL}/bookmarks`, 
        method : 'POST', 
        dataType : 'json',
        contentType : 'application/json', 
        data : item, 
        success : callbackSuccess, 
        error : callbackFail
      }
    ); 
  }; 

  const deleteItem = function(id, callback){
    $.ajax(
      { 
        url : `${BASE_URL}/bookmarks/${id}`, 
        method : 'DELETE', 
        success : callback, 
      }
    ); 
  }; 

  return {
    getItems, 
    createItem, 
    deleteItem
  }; 
}()); 