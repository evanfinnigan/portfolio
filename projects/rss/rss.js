

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const feeds = [
  'https://www.google.com/alerts/feeds/07300950182940742473/4990875433300408370', 
  'https://www.google.com/alerts/feeds/07300950182940742473/4556981370076388249', 
  'https://www.google.com/alerts/feeds/07300950182940742473/3924068934042575424',
  'https://www.google.ca/alerts/feeds/07300950182940742473/7770587749561847465'
];

let htmlString = '';
let parser = new RSSParser();

// DOM Ready
$(document).ready( function() {
  $.each(feeds, function(index, feed) {
    populateRSS(CORS_PROXY + feed);
  });
});


function populateRSS(feedURL) {

  parser.parseURL(feedURL, function(err, feed) {
    if (err) {
      console.log(err);
      return;
    }

    if (feed.items.length > 0) {
      htmlString += `<h1>${feed.title}</h1><br>`;
    }
    

    feed.items.forEach(function(entry) {

      // console.log(entry);

      htmlString += '<div>';

      htmlString += '<a href="' + entry.link + '">';

      htmlString += '<h2>' + entry.title + '</h2></a>';

      if (entry.content) {
        htmlString += '<p>' + entry.content + '</p>';
      }
      
      var d = new Date(entry.isoDate);
      htmlString += '<p>' + d.toDateString() + '</p>';

      htmlString += '</div><hr><br><br>';

    });

    $('#feed').html(htmlString);

  });

  // $.ajax({
  //   type: 'GET',
  //   url: feedURL,
  //   contentType: 'xml',
  //   xhrFields: {
  //     withCredentials: false
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'X-Requested-With': 'XMLHttpRequest'
  //   },
  //   success: function(data) {
  //     let title = data.getElementsByTagName("title")[0].childNodes[0].nodeValue;

  //     htmlString += `<h1>${title}</h1>`;

  //     $.each(data.getElementsByTagName("entry"), function(index, entry) {
  //       console.log(entry);

  //       htmlString += '<div>';

  //       // Link: entry.childNodes[5].attributes.href.nodeValue
  //       htmlString += '<a href="' + entry.childNodes[5].attributes[0].nodeValue + '">';

  //       // Title: entry.childNodes[3]
  //       htmlString += '<h2>' + htmlDecode(entry.childNodes[3].innerHTML) + '</h2></a>';

  //       // Content entry.childNodes[11]
  //       htmlString += '<p>' + htmlDecode(entry.childNodes[11].innerHTML) + '</p>';

  //       // Published entry.childNodes[7]
  //       var d = new Date(entry.childNodes[7].innerHTML);
  //       htmlString += '<p>' + d.toDateString() + '</p>';

  //       htmlString += '</div><hr>';

  //     });
  //   },
  //   error: function() {
  //     console.log('Error!');
  //   }
  // }).then(() => {
  //   $('#feed').append(htmlString);
  // });
}