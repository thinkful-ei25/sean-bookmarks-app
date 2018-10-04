'use strict';
/*eslint-env jquery*/

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){ 
  function handleNewItemSubmit(){ 
    $('#js-bookmark-form').submit(function(event) { 
      event.preventDefault();
      
      const formInputObj = $(event.currentTarget).serializeJson();  
      
      // eslint-disable-next-line no-console
      console.log(formInputObj); 

    }); 
    
  }

 

  function handleDeleteItemClicked(){  

  }

  function handleFilterByRating(){ 

  }

  function bindEventListeners(){ 
    handleNewItemSubmit(); 
    handleDeleteItemClicked(); 
    handleFilterByRating(); 
  }

  function render(){ 

  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  return { 
    render, 
    bindEventListeners
  }; 

}()); 