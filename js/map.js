// Create the map and markers

var TheMap = function() {
    this.Zoom = 13;
    if ($(window).width() < 480) {
            this.Zoom = 11;
        }
   if ($(window).width() > 480 && $(window).width() < 800) {
            this.Zoom = 12;
        }
    this.mapOptions = {
        center: {lat: 37.779870, lng: -122.464746},
        zoom: this.Zoom,
        disableDefaultUI: true,
        scaleControl: false,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    };

    this.myMarkers = [];
    this.locations = [
        {
            title: 'Asian Art Museum',
            address: '200 Larkin St, San Francisco, CA 94102',
            position: { lat: 37.780256, lng: -122.416052 },
            URL: 'http://www.asianart.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'California Palace of the Legion of Honor',
            address: '100 34th Ave, San Francisco, CA 94121',
            position: { lat: 37.784555, lng: -122.500743 },
            URL: 'http://legionofhonor.famsf.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'de Young Museum',
            address: '50 Hagiwara Tea Garden Dr, San Francisco, CA 94118',
            position: { lat: 37.771516, lng: -122.468647 },
            URL: 'http://deyoung.famsf.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Yerba Buena Center for the Arts',
            address: '701 Mission St, San Francisco, CA 94103',
            position: { lat: 37.785798, lng: -122.402424 },
            URL: 'http://www.ybca.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'California Academy of Sciences',
            address: '55 Music Concourse Dr, San Francisco, CA 94118',
            position: { lat: 37.769829, lng: -122.466105 },
            URL: 'http://www.calacademy.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'San Francisco Botanical Garden',
            address: '9th Ave & Lincoln Way Golden Gate Park, San Francisco, CA 94122',
            position: { lat: 37.765980, lng: -122.466461 },
            URL: 'http://www.sfbotanicalgarden.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Cartoon Art Museum',
            address: '655 Mission St, San Francisco, CA 94105',
            position: { lat: 37.786909, lng: -122.400954 },
            URL: 'http://cartoonart.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Mission Dolores',
            address: '3321 16th St, San Francisco, CA 94114',
            position: { lat: 37.764386, lng: -122.427567 },
            URL: 'http://missiondolores.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Exploratorium',
            address: 'Pier 15, The Embarcadero, San Francisco, CA 94111',
            position: { lat: 37.801388, lng: -122.397543 },
            URL: 'http://www.exploratorium.edu/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'The Walt Disney Family Museum',
            address: '104 Montgomery St, San Francisco, CA 94129',
            position: { lat: 37.801339, lng: -122.458599 },
            URL: 'http://www.waltdisney.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'San Francisco Cable Car Museum',
            address: '1201 Mason St, San Francisco, CA 94108',
            position: { lat: 37.794781, lng: -122.411715 },
            URL: 'http://www.cablecarmuseum.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Contemporary Jewish Museum',
            address: '736 Mission St, San Francisco, CA 94103',
            position: { lat: 37.786003, lng: -122.403672 },
            URL: 'http://www.thecjm.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Randall Museum',
            address: '199 Museum Way, San Francisco, CA 94114',
            position: { lat: 37.764421, lng: -122.438256 },
            URL: 'http://www.randallmuseum.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Museum of the African Diaspora',
            address: '685 Mission St, San Francisco, CA 94105',
            position: { lat: 37.786484, lng: -122.401461 },
            URL: 'http://www.moadsf.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Children\'s Creativity Museum',
            address: '221 4th St, San Francisco, CA 94103',
            position: { lat: 37.783317, lng: -122.402120 },
            URL: 'http://creativity.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Conservatory of Flowers',
            address: '100 John F Kennedy Dr, San Francisco, CA 94118',
            position: { lat: 37.772604, lng: -122.460192 },
            URL: 'http://www.conservatoryofflowers.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Musée Mécanique',
            address: 'Pier 45 Shed A, San Francisco, CA 94133',
            position: { lat: 37.805989, lng: -122.409915 },
            URL: 'http://www.museemechanique.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'USS Pampanito',
            address: 'Fisherman\'s Wharf, San Francisco, CA 94133',
            position: { lat: 37.808000, lng: -122.417743 },
            URL: 'http://www.maritime.org/index.htm',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'SFMOMA',
            address: '151 3rd St, San Francisco, CA 94103',
            position: { lat: 37.785907, lng: -122.400800 },
            URL: 'http://www.sfmoma.org/',
            animation: google.maps.Animation.DROP,
        },
        {
            title: 'Coit Tower',
            address: '1 Telegraph Hill Blvd, San Francisco, CA 94133',
            position: { lat: 37.802378, lng: -122.405823},
            URL: 'http://www.coittowertours.com/',
            animation: google.maps.Animation.DROP,
        },  
    ];
    this.infoWindow = new google.maps.InfoWindow({
        maxWidth: 260
    });
};

// This function displays the Google map
TheMap.prototype.initialize = function() {
    this.$map_canvas = $('.map-canvas')[0];
    this.map = new google.maps.Map(this.$map_canvas, this.mapOptions);
};

// Create the markers by looping through the locations array.
// Call the event listener for each marker
TheMap.prototype.createMarkers = function() {
    for (var i = 0, len = this.locations.length; i<len; i++) {
        var myMarker = new google.maps.Marker(this.locations[i]);
        this.myMarkers.push(myMarker);
    }
};

// Create the TheMap object and start the whole app
var myTheMap = new TheMap();
myTheMap.initialize();
myTheMap.createMarkers();

// Change glyphicon on collapse
$('div.panel-collapse').on('shown.bs.collapse', function () {
    $("#glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});
$('div.panel-collapse').on('hidden.bs.collapse', function () {
    $("#glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
});

// To keep a list item highlighted after the click, add and remove the "highlight" class name for <li> element
$(document).ready(function(){

    var li = $('ul li');
        li.click(function(){
        $(this).toggleClass("highlight");
        li.not(this).removeClass("highlight");
    });
});








