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
      <p>TILE ${item.title}</p> 
      <p>URL: 
      <a href=${item.url} target="_blank">${item.url}</a> 
      </p>
      <p>RATING: ${item.rating}</p>
      <p>DETAIL: ${item.desc}</p>
      <button id="delete" type="button">Delete</button>
    `; 
  }

  function generateAdding(){ 
    return `
        <div class="input-group">
          <label for="bookmark-title">Title:</label> 
          <input type="text" name="title" id="bookmark-title" />
          <label for="bookmark-url">URL:</label> 
          <input type="text" name="url" id="bookmark-url" />
          <label for="bookmark-description">Description:</label>
          <input type="text" name="desc" id="bookmark-description" />
          <input class="radio" type="radio" name="rating" value="1" checked/>
          <p class="radio label">1</p>
          <input class="radio" type="radio" name="rating" value=""/>
          <p class="radio label">2</p>
          <input class="radio" type="radio" name="rating" value="3"/>
          <p class="radio label">3</p>
          <input class="radio"  type="radio" name="rating" value="4"/>
          <p class="radio label">4</p>
          <input class="radio" type="radio" name="rating" value="5"/>
          <p class="radio label">5</p>
          <button class="add-item" type="submit">Submit</button>
        </div>
      `;
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
          STORE.setAdding(false); 
          render(); 
        },
        (err) => {  
          // eslint-disable-next-line no-console
          console.log('ERROR: ' + err.name);
          STORE.setError(err); 
        }
      );
    }); 
  }

  function handleAddingItem(){ 
    $('.js-navHead').click( function(){ 
      STORE.setAdding(true);  
      STORE.setDetail(null);
      render();  
    });  
  } 

  function handleDetailItem(){ 
    $('#js-bookmark-list').on('click', 'li', function(event){ 
      const id = $(event.target).data('item-id');  
      const find = STORE.findById(id); 
      STORE.setDetail(find);
      render(); 
    }); 
  }

  function handleDeleteItemClicked(){  
    $('.detail-entry-section').on('click', '#delete', ()=>{ 
      const id = STORE.detail.id; 
      api.deleteItem(id, ()=> { 
        STORE.findAndDelete(id); 
        STORE.setDetail(null);
        render(); 
      });       
    }); 
  }

  function handleFilterByRating(){ 
    $('.dropdown').on('click', 'a', function(event){ 
      const filterVal = $(event.target).data('item-id'); 
      STORE.filter = filterVal; 
      render(); 
    }); 
  }

  function generateError(err){ 
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function render(){ 
    let items = STORE.items; 

    // if (STORE.error){ 
    //   const el = generateError(STORE.error); 
    // //   $('.js-error').html(el); 
    // // }else { 
    // //   $('.js-error').empty(); 
    // // }

    if (STORE.adding === true && STORE.detail === null){ 
      const addingItemHtml = generateAdding(); 
      $('#js-bookmark-form').html(addingItemHtml); 
    }
    else { 
      $('#js-bookmark-form').empty(); 
    }

    if (STORE.detail !== null){ 
      const detailHtml = generateDetail(STORE.detail); 
      $('.detail-entry-section').html(detailHtml);
    }
    else{ 
      $('.detail-entry-section').empty();
    }

    if (STORE.filter > 0){ 
      items = STORE.items.filter(item => item.rating >= STORE.filter); 
    }

    const bookmarksItemsString = generateBookmarkString(items);
    $('#js-bookmark-list').html(bookmarksItemsString); 
  }

  function bindEventListeners(){ 
    handleNewItemSubmit(); 
    handleAddingItem();  
    handleDeleteItemClicked();
    handleDetailItem();  
    handleFilterByRating();
  }

  return { 
    render, 
    bindEventListeners
  }; 
}()); 