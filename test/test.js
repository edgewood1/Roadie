"use strict"; 
 
 var Nightmare = require("nightmare");
 
 var nightmare = Nightmare({ show: true });
 
 nightmare
  .goto('http://localhost:3000/add.html')
   .type('#place', 'Orlando, Florida')
   .type('#event_name', 'Disney World')
   .type('#event_note', 'This is a test')
   .type('#begin_date', '06/30/2017')
   .type('#end_date', '07/05/2017')
   .type('#event_date', '06/30/2017')
   .click('#submit')
   .wait('#zero_click_wrapper .c-info__title a')
   .evaluate(function () {
     return document.querySelector('#zero_click_wrapper .c-info__title a').href;
   })
  .end()
   .then(function (result) {
     console.log(result);
  })
   .catch(function (error) {
     console.error('Search failed:', error);
  }); 