'use strict'; 
/* global api */

//STORE.addItem('can you get at me bro'); 
const testItem = {
  title: 'skylark', 
  url: 'http://www.skylarkensemble.org/', 
  desc: 'hey this is pretty cool... huh?!', 
  rating: 5
}; 

api.createItem(testItem, 
  // eslint-disable-next-line no-console
  (item) => console.log('SUCCESS: ' + item.title),
  // eslint-disable-next-line no-console 
  (item) => console.log('FAILED: ' + item.title) 
); 

// eslint-disable-next-line no-console
api.getItems(items => items.forEach((item => console.log('ITEMS: ' + item.title))));  