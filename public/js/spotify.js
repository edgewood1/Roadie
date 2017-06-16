var urlString = 'https://api.spotify.com/v1/users/' + userId + '/playlists';

var jsonData = {
  "name": playlistName,
  "public": false
};

$.ajax({
  type: 'POST',
  url: urlString,
  data: jsonData,
  dataType: 'json',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  },
  contentType: 'application/json',
  success: function(result) {
    console.log('Woo! :)');
  },
  error: function() {
    console.log('Error! :(');
  }
})