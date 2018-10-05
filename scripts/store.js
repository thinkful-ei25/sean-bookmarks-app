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
    setDetail
  }; 
}()); 