'use strict';
/* global STORE, api */
/*eslint-env jquery*/

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){ 

  function generateItemElement(item) { 
    return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${item.title} ${item.rating}
    </li>
    `; 
  }

  function generateDetail(){ 

  }

  function generateAdding(){ 

  }

  function generateBookmarkString(bookmarks) { 
    const items = bookmarks.map(item => generateItemElement(item)); 
    if (STORE.adding === true){ 
      generateAdding(); 
    }
    if (STORE.detail !== null){ 
      generateDetail(); 
    }
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
          STORE.adding = false; 
          render(); 
        },
        (err) => { 
          // eslint-disable-next-line no-console
          console.log('ERROR: ' + err.name);
        }
      );
    }); 
  }

  function handleAddingItem(){ 
    $('.js-navHead').click( function(){ 
      // eslint-disable-next-line no-console
      STORE.adding = true; 
      STORE.detail = null;
      render();  
    });  
  } 

  function handleDetailItem(){ 
    $('#js-bookmark-list').on('click', 'li', function(event){ 
      const id = $(event.target).data('item-id');  
      const find = STORE.findById(id); 
      STORE.detail = find; 
      render(); 

      // eslint-disable-next-line no-console
    }); 
  }

  function handleDeleteItemClicked(){  

  }

  function handleFilterByRating(){ 

  }

  function render(){ 
    let items = STORE.items; 
    const bookmarksItemsString = generateBookmarkString(items); 
    console.log('Were adding an item: ' + STORE.adding); 

    if (STORE.detail !== null){ 
      console.log('Were detailing an item: ' + STORE.detail.title); 
    } else { 
      console.log('Were detailing an item: ' + STORE.detail); 
    }

    
    $('#js-bookmark-list').html(bookmarksItemsString); 
  }

  function bindEventListeners(){ 
    handleNewItemSubmit(); 
    handleAddingItem();  
    handleDeleteItemClicked();
    handleDetailItem();  
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