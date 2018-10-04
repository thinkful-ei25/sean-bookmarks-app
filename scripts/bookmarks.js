'use strict';
/* global STORE, api */
/*eslint-env jquery*/

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){ 

  function generateItemElement(item) { 
    return `
    <li>${item.title} ${item.rating}</li>
    `; 
  }

  function generateBookmarkString(bookmarks) { 
    const items = bookmarks.map(item => generateItemElement(item)); 
    return items.join(''); 
  }

  function handleNewItemSubmit(){ 
    $('#js-bookmark-form').submit(event => { 
      event.preventDefault();
      
      const newBookmark = $(event.currentTarget).serializeJson();  

      api.createItem(
        newBookmark, 
        (newBookmark) => { 
          // eslint-disable-next-line no-console
          console.log('SUCCESS!: ' + newBookmark.name);
          STORE.addItem(newBookmark); 
          render(); 
        },
        (err) => { 
          // eslint-disable-next-line no-console
          console.log('ERROR: ' + err.name);
        }
      );
    }); 
  }

  function handleDeleteItemClicked(){  

  }

  function handleFilterByRating(){ 

  }

  function render(){ 
    let items = STORE.items; 
    const bookmarksItemsString = generateBookmarkString(items); 

    $('.js-bookmark-list').html(bookmarksItemsString); 
  }

  function bindEventListeners(){ 
    handleNewItemSubmit(); 
    handleDeleteItemClicked(); 
    handleFilterByRating(); 
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