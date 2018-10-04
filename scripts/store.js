'use strict';

// eslint-disable-next-line no-unused-vars
const STORE = (function(){ 
  
  const addItem = function(item) { 
    // eslint-disable-next-line no-console
    console.log(item);
  }; 

  const findById = function(id) { 
    // eslint-disable-next-line no-console
    console.log(id);
  }; 

  const findAndDelete = function(id) { 
    // eslint-disable-next-line no-console
    console.log(id);
  }; 

  return {
    items: [], 
    error: null,
    addItem, 
    findById, 
    findAndDelete
  }; 
}()); 