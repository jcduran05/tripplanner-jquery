// $('hotel-choices')

// html containers
var hotelHtml = '';
var restaurantHtml = '';
var activityHtml = '';

// jquery items
var hotelSelect = $('#hotel-choices');
var restaurantSelect = $('#restaurant-choices');
var activitySelect = $('#activity-choices');

////////////////////////////
for (var index in hotels) {
    var hotelObj = hotels[index];
    hotelHtml += '<option value="' + hotelObj.name + '">' + hotelObj.name + '</option>'
}

hotelSelect.append(hotelHtml);

////////////////////////////
for (var index in restaurants) {
    var restaurantObj = restaurants[index];
    restaurantHtml += '<option value="' + restaurantObj.name + '">' + restaurantObj.name + '</option>'
}

restaurantSelect.append(restaurantHtml);

////////////////////////////
for (var index in activities) {
    var activityObj = activities[index];
    activityHtml += '<option value="' + activityObj.name + '">' + activityObj.name + '</option>'
}

activitySelect.append(activityHtml);