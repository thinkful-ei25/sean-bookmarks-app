'use strict';

// eslint-disable-next-line no-unused-vars
const STORE = (function(){ 
  
  const addItem = function(item) { 
    this.items.push(item); 
  }; 

  const findById = function(id) { 
    return this.items.find(item => item.id === id);
  }; 

  const findAndDelete = function(id) { 
    this.items = this.items.filter(item => item.id !== id); 
  }; 

  const setAdding = function(adding){ 
    this.adding = adding; 
  }; 

  const setDetail = function(detail){ 
    this.detail = detail; 
  }; 

  const setError = function(error){
    console.log('SET ERROR: ' + error);
    this.error = error; 
  }; 

  const getError = function(){ 
    //console.log('GET ERROR: ' + this.error);
    return this.error; 
  }; 

  return {
    items: [], 
    adding: false,
    detail: null, 
    filter: 0,
    error: null,
    addItem, 
    findById, 
    findAndDelete, 
    setAdding, 
    setDetail, 
    setError, 
    getError
  }; 
}()); 