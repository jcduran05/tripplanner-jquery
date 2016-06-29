$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);

  // Adding data to select tags
  ////////////////////////////////////
  // jquery items
  var $hotelSelect = $('#hotel-choices');
  var $restaurantSelect = $('#restaurant-choices');
  var $activitySelect = $('#activity-choices');
  // html containers
  var hotelHtml = '';
  var restaurantHtml = '';
  var activityHtml = '';

  // console.log(hotels);

  ////////////////////////////
  for (var index in hotels) {
      var hotelObj = hotels[index];
      hotelHtml += '<option value="' + index + '">' + hotelObj.name + '</option>'
  }
  $hotelSelect.append(hotelHtml);

  for (var index in restaurants) {
      var restaurantObj = restaurants[index];
      restaurantHtml += '<option value="' + index + '">' + restaurantObj.name + '</option>'
  }
  $restaurantSelect.append(restaurantHtml);

  for (var index in activities) {
      var activityObj = activities[index];
      activityHtml += '<option value="' + index + '">' + activityObj.name + '</option>'
  }
  $activitySelect.append(activityHtml);

  // Creating array to hold days for
  // trip and object for each day
  ////////////////////////////////////
  var entireTrip = [];
  var DayOfTrip = function (){
      this.hotelList = [];
      this.hotelListObj = {};
      this.restaurantList = [];
      this.restaurantListObj = {};
      this.activityList = [];
      this.activityListObj = {};
  }

  // Add a day button functionality
  ////////////////////////////////////
  var $dayAdd = $('#day-add');
  var $dayList = $('#day-list');
  $dayAdd.on('click', function(){
      entireTrip.push(new DayOfTrip);
      $dayList.text('');

      // data-index property added to all buttons
      for (var i = 0; i < entireTrip.length; i++) {
          if (i === entireTrip.length-1) {
              // Adds 'current-day' to the newly added day
              $dayList.append('<button class="btn btn-circle day-btn current-day" data-index="' + i + '">' + (i+1) + '</button>');
          } else {
              $dayList.append('<button class="btn btn-circle day-btn" data-index="' + i + '">' + (i+1) + '</button>');
          }
      }

      $hotelItems.text('');
      $restaurantItems.text('');
      $activityItems.text('');

      // Add 'Day 1' section with delete button
      $('#day-title').text('').append('<span> Day ' +entireTrip.length + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>')
  });

  // SELECT TAGS ADD FUNCTIONALITY
  ////////////////////////////////////

  var $hotelItems = $('#hotel-items');
  $('#addH').on('click', function(elem) {
      var currentDay = $('#day-list .current-day').data();
      var selectValue = $('select[data-type="hotel"] :selected').text();

      // Add item to hotelList array for the object
      entireTrip[currentDay.index].hotelList.push(selectValue);
      $hotelItems.append('<div id ="'+((entireTrip[currentDay.index].hotelList.length)-1)+'" class="hotel-tag"><span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      // console.log(entireTrip);

      // Add to map
      var hotelObj = hotels[$('select[data-type="hotel"] :selected').val()];
      drawMarker('hotel', hotelObj.place.location);

      // Add items to object
      entireTrip[currentDay.index].hotelListObj[selectValue] = hotelObj.place.location;
  });

  var $restaurantItems = $('#restaurant-items');
  $('#addR').on('click', function(elem) {
      var currentDay = $('#day-list .current-day').data();
      var selectValue = $('select[data-type="restaurant"] :selected').text();

      // Add item to restaurantList array for the object
      entireTrip[currentDay.index].restaurantList.push(selectValue);
      $restaurantItems.append('<div id ="'+((entireTrip[currentDay.index].restaurantList.length)-1)+'" class="restaurant-tag"><span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      // console.log(entireTrip);

      // Add to map
      var restaurantObj = restaurants[$('select[data-type="hotel"] :selected').val()];
      drawMarker('restaurant', restaurantObj.place.location);

      // Add items to object
      entireTrip[currentDay.index].restaurantListObj[selectValue] = restaurantObj.place.location;
  });

  var $activityItems = $('#activity-items');
  $('#addA').on('click', function(elem) {
      var currentDay = $('#day-list .current-day').data();
      var selectValue = $('select[data-type="activity"] :selected').text();

      // Add item to activityList array for the object
      entireTrip[currentDay.index].activityList.push(selectValue);
      $activityItems.append('<div id ="'+((entireTrip[currentDay.index].activityList.length)-1)+'" class="activity-tag"><span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      // console.log(entireTrip);

      // Add to map
      var activityObj = activities[$('select[data-type="hotel"] :selected').val()];
      drawMarker('activity', activityObj.place.location);

      // Add items to object
      entireTrip[currentDay.index].activityListObj[selectValue] = activityObj.place.location;
  });

  // CHANGE CURRENT DAY
  ////////////////////////////////////
  $('#day-list').on('click', '.day-btn', function(){

      // Remove 'current-day' class from the list of buttons
      $('#day-list button').each(function(index, elem) {
          if ($(elem).hasClass(('current-day'))) {
              $(elem).removeClass('current-day');
          }
      });

      // Add 'current-day' class to clicked button
      $(this).addClass('current-day');

      // Clear lists (my hotel, restaurant, activities)
      // and populate it with its data
      var currentDay = $('#day-list .current-day').data();
      var currentDayObj = entireTrip[currentDay.index];


      //clear itenerary
      $hotelItems.text('');
      $restaurantItems.text('');
      $activityItems.text('');

     for (var i = 0; i < currentDayObj.hotelList.length; i++){
      $hotelItems.append('<div id ="'+ i+'" class="hotel-tag"><span class="title">' + currentDayObj.hotelList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }
      for (var i = 0; i < currentDayObj.restaurantList.length; i++){
          $restaurantItems.append('<div id ="'+ i+'" class="restaurant-tag"><span class="title">' + currentDayObj.restaurantList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }
      for (var i = 0; i < currentDayObj.activityList.length; i++){
          $activityItems.append('<div id="'+ i+'" class="activity-tag"><span class="title">' + currentDayObj.activityList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }


      $('#day-title').text('').append('<span> Day ' + parseInt(currentDay.index +1) + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>')
  });

  // Delete days/items from itenerary
  ///////////////////////
  $('#day-title').on('click', '.remove', function() {
      var currentDay = $('#day-list .current-day').data();

      // Remove object from entireTrip array
      entireTrip.splice(currentDay.index, 1);

      $dayList.text('');

      // data-index property added to all buttons
      for (var i = 0; i < entireTrip.length; i++) {
          if (i === entireTrip.length-1) {
              // Adds 'current-day' to the newly added day
              $dayList.append('<button class="btn btn-circle day-btn current-day" data-index="' + i + '">' + (i + 1) + '</button>');
          } else {
              $dayList.append('<button class="btn btn-circle day-btn" data-index="' + i + '">' + (i + 1) + '</button>');
          }
      }

      var currentDayObj = entireTrip[currentDay.index];

      //clear itenerary
      $hotelItems.text('');
      $restaurantItems.text('');
      $activityItems.text('');
      for (var i = 0; i < currentDayObj.hotelList.length; i++){
          $hotelItems.append('<div id ="' + i + '" class="hotel-tag"><span class="title">' + currentDayObj.hotelList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }

      for (var i = 0; i < currentDayObj.restaurantList.length; i++){
          $restaurantItems.append('<div id ="' + i + '" class="restaurant-tag"><span class="title">' + currentDayObj.restaurantList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }
      for (var i = 0; i < currentDayObj.activityList.length; i++){
          $activityItems.append('<div id="' + i + '" class="activity-tag"><span class="title">' + currentDayObj.activityList[i] + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
      }

  });


  $('.itinerary-item').on('click', '.remove', function(){
    var currentDay = $('#day-list .current-day').data();
    var id = $(this).parent().attr('id');
      var $htmlData = $(this).parent();

      // Remove item from obj
      if ($htmlData.hasClass('hotel-tag')) entireTrip[currentDay.index].hotelList.splice(id, 1)
      if ($htmlData.hasClass('restaurant-tag')) entireTrip[currentDay.index].restaurantList.splice(id, 1)
      if ($htmlData.hasClass('activity-tag')) entireTrip[currentDay.index].activityList.splice(id, 1)



      // Removes html element
    $htmlData.remove()
      console.log(entireTrip);
  });


});
