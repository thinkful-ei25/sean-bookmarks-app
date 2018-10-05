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

  function generateDetail(item){ 
    return `
      <p>${item.title}</p> 
      <a href=${item.url} target="_blank">${item.url}</a> 
      <p>${item.desc}</p>
    `; 
  }

  function generateAdding(){ 
    return `
      <form id="js-bookmark-form" >
        <div class="input-group">
          <label for="bookmark-title">Title:</label> 
          <input type="text" name="title" id="bookmark-title" />
          <label for="bookmark-url">URL:</label> 
          <input type="text" name="url" id="bookmark-url" />
          <label for="bookmark-description">Description:</label>
          <input type="text" name="desc" id="bookmark-description" />
          <label for="bookmark-rating">Rating:</label>
          <input type="text" name="rating" id="bookmark-rating" />
          <button type="submit">Submit</button>
          <!-- <button type="button">Delete</button> -->
        </div>
      </form>`;
  }

  function generateBookmarkString(bookmarks) { 
    let items = bookmarks.map(item => generateItemElement(item)); 
    items.join(' '); 

    return items.join(' '); 
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

    }); 
  }

  function handleDeleteItemClicked(){  

  }

  function handleFilterByRating(){ 

  }

  function render(){ 
    let items = STORE.items; 
    const bookmarksItemsString = generateBookmarkString(items);

    if (STORE.adding === true){ 
      const addingItemHtml = generateAdding(); 
      $('.data-entry-section').html(addingItemHtml); 
      
    }

    if (STORE.detail !== null){ 
      const detailHtml = generateDetail(STORE.detail); 
      $('.data-entry-section').html(detailHtml);
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