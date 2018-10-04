'use strict'; 
/* global api, STORE */

//STORE.addItem('can you get at me bro'); 
const testItem = {
  title: 'skylarked breh', 
  url: 'http://www.skylarkensemble.org/', 
  desc: 'hey this is pretty cool... huh?!', 
  rating: 5
}; 

api.createItem(testItem, 

  (item) => { 
    // eslint-disable-next-line no-console
    console.log('SUCCESS: ' + item.title); 
    
    STORE.addItem(item); 
    //render()

    // eslint-disable-next-line no-console
    console.log(STORE.items);
  },
  // eslint-disable-next-line no-console 
  (item) => console.log('FAILED: ' + item.title) 
); 

// eslint-disable-next-line no-console
api.getItems(items => items.forEach((item => console.log('ITEMS: ' + item.title))));  