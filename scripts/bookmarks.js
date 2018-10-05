'use strict';
/* global STORE, api */
/*eslint-env jquery*/

// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){ 

  function generateItemElement(item) { 
    let starString = generateStars(item); 
  
    return `
    <li class="js-item-element" data-item-id="${item.id}">
      <p>${item.title} </p>
      <div>
      ${starString}
      </div>
    </li>
    `; 
  }

  function generateStars(item){ 
    let starsString = []; 
    for(let i = 0; i< item.rating; i++){ 
      starsString.push('<span class="fa fa-star checked"></span>'); 
    }
    for(let i = 0; i < (5-item.rating); i++){ 
      starsString.push('<span class="fa fa-star"></span>'); 
    }
    return starsString.join(''); 
  }

  function generateDetail(item){ 
    return `
      <em class"title-label">${item.title}</em> 
      <button id="js-visit-page" type="button">VISIT PAGE</button>
      <p class="rating-lable" ><em>RATING: </em>${item.rating} stars </p>
      <p class="detail-lable" ><em>DETAIL: </em>${item.desc}</p>
      <button id="delete" type="button">Delete</button>
    `; 
  }

  function generateAdding(){ 
    return `
      <fieldset class="input-group">
        <label for="bookmark-title">Title:</label> 
        <input type="text" placeholder="fake title" name="title" id="bookmark-title" />
        <label for="bookmark-url">URL:</label> 
        <input type="text" placeholder="http://fakedyououturl.com" name="url" id="bookmark-url" />
        <label for="bookmark-description">Description:</label>
        <input type="text" placeholder="details, descriptions" name="desc" id="bookmark-description" />
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
    </fieldset>
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
      console.log(STORE.items);
      api.createItem(
        newBookmark, 
        (newBookmark) => { 
          STORE.addItem(newBookmark); 
          STORE.setAdding(false); 
          render(); 
        },
        (err) => {  
          STORE.setError(err.responseJSON.message); 
          render(); 
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
    let message = err; 
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function render(){ 
    let items = STORE.items; 

    if (STORE.getError() !== null){ 
      const el = generateError(STORE.error); 
      $('.js-error').html(el); 
    }else { 
      $('.js-error').empty(); 
    }

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

    if (STORE.filter){ 
      items = STORE.items.filter(item => item.rating >= STORE.filter); 
    }

    const bookmarksItemsString = generateBookmarkString(items);
    $('#js-bookmark-list').html(bookmarksItemsString); 
  }
  
  function handleCloseError() {
    $('.js-error').on('click', '#cancel-error', () => {
      STORE.setError(null);
      render();
    });
  }
  function handleVistiPage(){ 
    $('.detail-entry-section').on('click', '#js-visit-page', function(){ 
      window.location.replace(STORE.detail.url);
    }); 
  }
  function bindEventListeners(){ 
    handleNewItemSubmit(); 
    handleAddingItem();  
    handleDeleteItemClicked();
    handleDetailItem();  
    handleFilterByRating();
    handleCloseError(); 
    handleVistiPage(); 
  }

  return { 
    render, 
    bindEventListeners
  }; 
}()); 