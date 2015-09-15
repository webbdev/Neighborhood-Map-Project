// View Model using knockout.js library, which connects different parts of the UI with the corresponding data

var ListViewModel = function() {
    var self = this;

// Create the observable markers array, show them in the map and trigger the variable that handles the display of items in the list view
    self.markers = ko.observableArray(myTheMap.myMarkers);
    for (i = 0, len = self.markers().length; i<len; i++) {
        self.markers()[i].showItem = ko.observable(true);
        self.markers()[i].setMap(myTheMap.map);
        addMarkerListener(self.markers()[i]);
    }
// For each marker create the event listener when clicked
    function addMarkerListener(marker) {

        google.maps.event.addListener(marker, 'click', function() {
            self.showInfoWindow(marker);
            marker.setIcon('https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png');
            marker.setAnimation(google.maps.Animation.BOUNCE);
           
            setTimeout(function() {
                marker.setAnimation(null);
                marker.setIcon(null);
            }, 2500);
 
        });
    }
  
// Info window observable and its content variable
    self.infoWindow = ko.observable(myTheMap.infoWindow);
    var infoWindowContent = "";

// Observable that handles the input form
    self.searchInput = ko.observable();

// Handler event opens infoWindow on each marker with the corresponding data from Wikipedia
    self.showInfoWindow = function(marker) {
        var selected_marker = marker;
        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=1&search=' + selected_marker.title,
            dataType: 'jsonp',
            success: function(data) {
                var wikiTitle = data[1];
                var wikiSnippet = data[2];
                var wikiLink = data[3];

                if (wikiLink.length !== 0) {
                    infoWindowContent = '<div id="infoWindow"><a href="' + marker.URL + '"><b>' + wikiTitle + '</b></a>' + 
                    '<br><span id="address">' + marker.address + '</span>' +
                    '<hr />' +
                    '<span id="snippet">' + wikiSnippet + '</span>' +
                    '<br><a href="' + wikiLink + '">' + wikiLink + '</a></div>';
                } else {
                    infoWindowContent = '<p>' + data[0] + '</p>' + '<p>' + data[1] + '</p>' + '<br>' + '<p>No Wikipedia articles were found</p>';
                }
                self.infoWindow().setContent(infoWindowContent);
                self.infoWindow().open(myTheMap.map, selected_marker);
                marker.setIcon('https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png');
                marker.setAnimation(google.maps.Animation.BOUNCE);
           
               setTimeout(function() {
                    marker.setAnimation(null);
                    marker.setIcon(null);
                }, 2500);

                },

            error: function(data2) {
                alert("Wikipedia data could not be retrieved");
            }
        });
    };

// Function executed when the search input form is typed
    self.searchFilter = function() {
        var value = self.searchInput() || "";
// Loop to hide/show each item in the list view and each marker on the map depending on the
// characters typed in the input form
        for (i = 0, len = self.markers().length; i<len; i++) {
            if(self.markers()[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.markers()[i].showItem(true);
                self.markers()[i].setVisible(true);
            } else {
                self.markers()[i].showItem(false);
                self.markers()[i].setVisible(false);
                self.infoWindow().close();
            }
        }
    };

    // Change the text and color of search box, results button after click
    self.toggleSearch = function() {
        var btnText       = $('#btn-1').text();
        var toggleSetting = $('#btn-1');

        if(btnText === "Hide Best Museums in SF") {
            toggleSetting.html("Show Best Museums in SF");
            toggleSetting.css("background-color", "#66cdaa");    
        } else {
            toggleSetting.html("Hide Best Museums in SF");
            toggleSetting.css("background-color", "#1e90ff");
        }
    };

};

// Activate knockout.js library
ko.applyBindings(ListViewModel);