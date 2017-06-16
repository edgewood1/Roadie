var id;
var x;
var placesObj = {};
var list = [];
var main_place;
var z;
var a;
var dates = [];
var postsToAdd = [];
var datesArr = [];
var postArr = [];
var viewObj = {};
var b = 0;
var drop = $("#drop")
var event_note = $("#event_note");
var event_date = $("#event_date");
var event_name = $("#event_name");
var allPost = {};
var mark = [];
var newPost = {};
var supper = document.getElementById("event_name");
var listing = [];
 var blogContainer = $("#container");
  var posts;
  var allPostOrdered ={} /// place this in top -
  var chosenCity =[];

$(function datePicker() {
  $(".datepicker").datepicker({
    showButtonPanel: true

  });
});


$(document).ready(function () {

  

  $("#addMore").hide();

 

  getPosts();

  // 1. GET LIST OF ALL CITIES AND THEIR BEGIN_DATE
  // Display a list of cities; user will pick one which will move user to function 2

  function getPosts() {

    $("#title").text("Select a City:")

    $.get("/api/posts/", function (all) {

      // all - contains all the data objects 
      // below we want to create an object that features: 
      // each city only once and for each city, an array of dates only once.

      for (i = 0; i < all.length; i++) {

        // loop through / grab the first city and it's begin date

        var place = all[i].place;
        var begin = all[i].begin_date;

        // create an object: placeObj = {place1: begin1, begin2}
        // placesObj = { city1: [date1, date2], city 2: [date1, date2]}

        // initially, placesObj contains nothing, 
        // loop through, and if place not in placesObj, 

        if (!placesObj[place]) {

        // then create a new key for it and an empty array for it
          
          placesObj[place] = [];
        }

        // check cities in placesObj to see if it includes begin_date
        // if it does, then push it into this array. 
        // what prevents this? hwere's inner loop? inner loop prevents placing the same begin_date in city array more than once

        if (!placesObj[place].includes(begin)) {   
                    placesObj[place].push(begin);

        } // end first if 

      } // end for loop
console.log(placesObj);

      // now, we have an object whose key is a city and value an array of dates
      // next, create an array of all the keys in placesObj
      // we will use this in DISPLAY ONE - user choses a city
      // list = [city1, city2, city3]

      list = Object.keys(placesObj);

      // loop through list and display cities on screen - 
      

      for (i = 0; i < list.length; i++) {

        var row = $("<div>").addClass("col-md-offset-1").addClass("col-sm-1");
        var line = $("<a>").text(list[i]).attr("id", i).css("font-size", "20px").on("click", holler);
        row.append(line);
        blogContainer.append(row);
      }
    });

    // test shows chapel hill: 4/17, 4/20
   //  console.log(placesObj);

  } // -------------------------------------------------------------------------------------------
    //  FUNCTION 1, which displays cities, ends
    // if user clicks on a city, user goes to function 2 -->


  /// 2. FUNCTION: when city chosen, create / display a list of dates for it.
  // each displayed city has an id of 0-?
  // we grab this id, which is placed in x
  // an duse it as index in array that holds city names.  

  function holler(e) {

    blogContainer.empty();

    x = e.target.id;  // grab id of city chosen
  

    // Asking a question: //list[x] is the name of a city of chosen above. 
    // so placesObj[list[x]] should give you the corresponding dates

    $("#title").text("Which date in " + list[x] + "?");

    //placeObj[list[x]] represents one array of dates for one city
    // placeObj { [Charlotte]; [date1, date2...] }
    // loop through list of dates and display them: 
    
    for (i = 0; i < placesObj[list[x]].length; i++) {
      var row = $("<div>").addClass("col-sm-offset-1").addClass("col-sm-1");
      var line2 = $("<a>")
        .text(placesObj[list[x]][i]).css("font-size", "20px")
        .attr("id", i)
        .on("click", holler2)

      row.append(line2);
      blogContainer.append(row);
    }
  } // FUNCTION 2 ENDS - LIST OF DATES
  // now, all dates are being displayed, user picks one and sent to holler2 -------------------------------------------------------------------

  /// 3. FUNCTION TO CREATE FINAL DISPLAY FOR HCOSEN CITY --

  function holler2(e) {

    z = e.target.id;


    // each date has its own id, which now = z. 
    // z is date chosen? 
    // x is place chosen? 
    // console.log("date chosen: " + placesObj[list[x]][z]); // correct begin_date
    // console.log("city chosen:  "  +  list[x])
    // placesObj = Charlotte[0] would be first begin_date in Charlotte array

    // This grabs all the rows that have same begin date - INITIALIZE ROWS--------------
    
    b = 0;
    blogContainer.empty();
    $("#title").empty();
     

    $.get("/api/posts", function (data) {


  console.log("date chosen: " + placesObj[list[x]][z]); // correct begin_date
    console.log("city chosen:  "  +  list[x])
      // data = grab all the objects in our database
      // loop through 
console.log(placesObj[0])
      for (var i = 0; i < data.length; i++) {

        // if an downloaded object has the same begin_date as chosen, 
        // then put the whole object in 'postsToAdd' 

if (data[i].place === list[x]) { 
  chosenCity.push(data[i])
}
      }

for (var i = 0; i < chosenCity.length; i++) {

  if (chosenCity[i].begin_date === placesObj[list[x]][z]){
    postsToAdd.push(chosenCity[i])
  }
}
      //   if (data[i].begin_date == placesObj[list[x]][z]) {

      //     postsToAdd.push(data[i]);

      //   }
      // }
      
      // postsToAdd should now have all the rows to be displayed for user 
      // we send this to next function via createNewRow
      console.log(postsToAdd);
      createNewRow(postsToAdd);


    }); // FUNCTION 3 API GET ENDS
  } // end FUNCTION 3 -- grabbing posts to add -

  // 4. FUNCTION TO SETUP PANELS FOR CHOSEN DATE ////////////////////////////////////-----------------

  function createNewRow(post) {
    // console.log(post);
    blogContainer.empty();

    /// Create title at top of page. 

    if (b === 0) {
      var title = $("<h1>")
        .text(post[0].place + " : " + post[0].begin_date + " - " + post[0].end_date)
        .css("text-align", "center");
      $("#title").append(title);
      b++;
    }

    ///post is an array containing all the objects to display - 
    /// now., we must display post.event_names/notes under box for post.event_date 
    /// so, create an object where: post1.event_date: [post1] 
    // allPost = { post[x].event_date: [post1, post2, post4]
     
    /// loop through downloaded database
    // var ed = post[i].event_date; 
    // var row = post [i]; 

    for (var i = 0; i < post.length; i++) {

console.log(post[0])
    if (post[i].event_date in allPost) {
    allPost[post[i].event_date].push(post[i])  
    }
    else
  {
    allPost[post[i].event_date]=[];
      allPost[post[i].event_date].push(post[i])
    
  }
    // console.log(allPost);
    }
    // now, allPost is an object whose keys are event_dates that represent the rest of the post. 
    // how many keys in allPost? 

    Object.size = function (obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    // Get the size of an object

    var size = Object.size(allPost);

// next, rearrange allPost so that key-value pairs are in order --- 


Object.keys(allPost)
      .sort()
      .forEach(function(v) {
          allPostOrdered[v]=allPost[v];
          // jack.push(v, data[v]);
    console.log(allPostOrdered)
       });



    /// now create the display -----------
    // first loop will handle the first event_date key and all the items in its array

    for (var i = 0; i < size; i++) {

      var newPostPanel = $("<div>");
      newPostPanel.addClass("panel panel-default").addClass("col-sm-3");

      var newPostPanelHeading = $("<div>");
      newPostPanelHeading.addClass("panel-heading").css("border", "1px solid black");

      var newPostPanelBody = $("<div>");
      newPostPanelBody.addClass("panel-body").css("border", "1px solid black");

      ///
      //////////////////////////////
      /// listing -- array of all the event_date keys --- 

      listing = Object.keys(allPostOrdered);
      // console.log(listing);

      /// delete button

      var deleteBtn = $("<button>")
      deleteBtn.text("delete")

      // place the first key in the title - this is the begin_date
    
      newPostPanelHeading.append(listing[i]).css("font-size", "20px");
   
/// how many items does the first event_date key hold? loop through these and for each do 

      for (y = 0; y < allPost[listing[i]].length; y++) {

// new loop - grab an array item # i (inner loop) in the key # i (outer loop)
        newPostPanelBody.append(allPostOrdered[listing[i]][y].event_name + " - " + "</br>").css("font-size", "17px"). append("  ----->   ")
        newPostPanelBody.append(allPostOrdered[listing[i]][y].event_note).css({ "font-size": "17px", "margin-left": "10px" });
        // newPostPanelBody.append(deleteBtn)
        newPostPanelBody.append("<br><br>")
        // newPostPanelBody.append(event)
      } /// inner loop creates multiple panels under the first title --- 

      console.log(allPostOrdered[listing[0]][0].event_name);

    
      newPostPanel.append(newPostPanelHeading);
      newPostPanel.append(newPostPanelBody);
      blogContainer.append(newPostPanel);

      //   newPostPanel.data("post", post);
    } /// ends outer loop
    /////////////////////////////////// show
    $("#addMore").show();
  } // ends create function --- 



  $("#cms").on("submit", handleFormSubmit);



  function handleFormSubmit() {
    event.preventDefault();

  
    // Constructing a newPost object to hand to the database
    newPost = {

      place: allPost[listing[0]][0].place,

      begin_date: allPost[listing[0]][0].begin_date,

      end_date: allPost[listing[0]][0].end_date,

      event_note: $("#event_note").val(),

      event_date: event_date.val(),

      event_name: event_name.val()


    }


    $.post("/api/posts", newPost, function () {
      window.location.href = "javascript:window.location.reload();";
      // createNewRow(post);
    })


  }
  


}); //end page
