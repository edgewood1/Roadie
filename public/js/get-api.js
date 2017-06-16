 $(document).ready(function() {
  

  var blogContainer = $(".blog-container");

    var posts;

    getPosts();
    
  // 1. This function grabs posts from the database and updates the view

  function getPosts(data) {
 
    $.get("/api/posts", function(data) {
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

// 3. InitializeRows handles appending all of our constructed post HTML inside blogContainer

  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];

    // loop begins 

    // for (var i = 0; i < posts.length; i++) {
      for (var i=posts.length-1; i>=0; i--){

// pushing ALL posts to POSTSTOADD

      postsToAdd.push(createNewRow(posts[i]));
    }
console.log(postsToAdd)
// displaying posts to add to display - 

    blogContainer.html(postsToAdd);
 
 } // end initialize rows --FUNCTION ENDS


  // 4. This function constructs a post's HTML
  // post = the first object gotten from sequelize

  function createNewRow(post) {
    // var formattedDate = new Date(post.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

// adding the paneling --- 
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");

    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");

      var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");

  var newPostPanelFooter = $("<div>").addClass("panel-footer");

// adding the delete / edit buttons

    var deleteBtn = $("<button>");
    deleteBtn.text("delete");
    deleteBtn.click(handlePostDelete);
    // deleteBtn.addClass("delete btn btn-danger");
    // var editBtn = $("<button>");
    // editBtn.text("edit");
    // editBtn.addClass("edit btn btn-info");

// adding the tags for the sql columns ---------------------
   
var header = $("<p>").text("Trip to  " + post.place + " : " + post.begin_date + " - " + post.end_date + ".");
 
var body = $("<p>").text("Visit " + post.event_name+ " on " +post.event_date + ".");

var footer = $("<p>").text("Notes: " + post.event_note)

    // newPostDate.text(formattedDate);

// append everything

    // eventName.append(newPostDate);
    newPostPanelHeading.append(header);
    // newPostPanelHeading.append(place);

    newPostPanelHeading.append(body);
    newPostPanelFooter.append(deleteBtn);
    newPostPanelBody.append(footer);
    // newPostPanelBody.append(editBtn);
    
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.append(newPostPanelFooter);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

    // 7. This function displays a messgae when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("Plan your itinerary....");
    blogContainer.append(messageh2);
  }

  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  }); // end document.ready(function())