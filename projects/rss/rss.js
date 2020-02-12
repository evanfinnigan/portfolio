
// DOM Ready
$(document).ready( function() {
  populateRSS('https://cors-anywhere.herokuapp.com/https://www.google.com/alerts/feeds/07300950182940742473/4715432990994966385');
});


function populateRSS(feedURL) {
  $.ajax({
    type: 'GET',
    url: feedURL,
    contentType: 'xml',
    xhrFields: {
      withCredentials: false
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    success: function(data) {
      let title = data.getElementsByTagName("title")[0].childNodes[0].nodeValue;

      let htmlString = `<h1>${title}</h1>`;

      $.each(data.getElementsByTagName("entry"), function(index, entry) {
        console.log(entry);

        htmlString += '<div>';

        // Link: entry.childNodes[5].attributes.href.nodeValue
        htmlString += '<a href="' + entry.childNodes[5].attributes[0].nodeValue + '">';

        // Title: entry.childNodes[3]
        htmlString += '<h2>' + htmlDecode(entry.childNodes[3].innerHTML) + '</h2></a>';

        // Content entry.childNodes[11]
        htmlString += '<p>' + htmlDecode(entry.childNodes[11].innerHTML) + '</p>';

        // Published entry.childNodes[7]
        var d = new Date(entry.childNodes[7].innerHTML);
        htmlString += '<p>' + d.toDateString() + '</p>';

        htmlString += '</div><hr>';

      });

      $('#feed').html(htmlString);

    },
    error: function() {
      console.log('Error!');
    }
  });
}

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}