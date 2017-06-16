// $(document).ready(function() {

// Getting jQuery references to the post body, title, form, and author select

var event_name = $("#event_name"); // originally body
var event_date = $("#event_date"); //originally title
var begin_date = $("#begin_date");
var event_note = $("#event_note")
var end_date = $("#end_date");
var cmsForm = $("#cms"); // the whole form holding body, title, author
var place = $("#place"); //originally author id
var postCategorySelect = $("#category");

$(function datePicker() {
      $(".datepicker").datepicker({
          showButtonPanel: true
    
        });
    });


// Click events for the edit and delete buttons
// $(document).on("click", "button.delete", handlePostDelete);

// $(cmsForm).on("submit", handleFormSubmit);
$("#cms").on("submit", handleFormSubmit);

// 1. A function for handling what happens when the form to create a new post is submitted

function handleFormSubmit(event) {
  event.preventDefault();

  // Constructing a newPost object to hand to the database
  var newPost = {
    begin_date: begin_date.val(),

    end_date: end_date.val(),

    event_note: event_note.val(),
    
    event_date: event_date.val(),
    //   .val().trim(),
    event_name: event_name.val(),
    //   .val().trim(),
    place: place.val()
    //   .val().trim()
  };

  // Run the submitpost function

  if (newPost) {
    submitPost(newPost);
  }
}

//////////////

// 2. Submits a new post and brings user to blog page upon completion
function submitPost(post) {
  $.post("/api/posts", post, function() {
    window.location.href = "/add";
  });
}

// 3 This function does an API call to delete posts
function deletePost(id) {
  $.ajax({
    method: "DELETE",
    url: "/api/posts2/" + id
  }).then(function() {
    console.log("We delete");
    // getPosts(postCategorySelect.val());
    window.location.href = "/add";
  });
}

// test for a button in the form that takes you to views page


// 4 This function figures out which post we want to delete and then calls deletePost
function handlePostDelete(event) {
  event.preventDefault();
  // event.stopPropagation();
  console.log("I am here!");
  var currentPost = $(this).parent().parent().data("post");
  deletePost(currentPost.id);
}



// } );