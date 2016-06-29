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

////////////////////////////
for (var index in hotels) {
    var hotelObj = hotels[index];
    hotelHtml += '<option value="' + hotelObj.name + '">' + hotelObj.name + '</option>'
}
$hotelSelect.append(hotelHtml);

for (var index in restaurants) {
    var restaurantObj = restaurants[index];
    restaurantHtml += '<option value="' + restaurantObj.name + '">' + restaurantObj.name + '</option>'
}
$restaurantSelect.append(restaurantHtml);

for (var index in activities) {
    var activityObj = activities[index];
    activityHtml += '<option value="' + activityObj.name + '">' + activityObj.name + '</option>'
}
$activitySelect.append(activityHtml);

// Creating array to hold days for
// trip and object for each day
////////////////////////////////////
var entireTrip = [];
var DayOfTrip = function (){
    this.hotelList = [];
    this.restaurantList = [];
    this.activityList = [];
    // var self = this;
    // $('#addH').on('click', function(){
    //  self.hotelList.push($('select[data-type="hotel"] :selected').text() )
    //  // console.log(self.hotelList)
    //  // console.log(entireTrip)
    // });
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
});

// SELECT TAGS ADD FUNCTIONALITY
////////////////////////////////////

var $hotelItems = $('#hotel-items');
$('#addH').on('click', function(elem) {
    var currentDay = $('#day-list .current-day').data();
    var selectValue = $('select[data-type="hotel"] :selected').text();

    entireTrip[currentDay.index].hotelList.push(selectValue);
    $hotelItems.append('<span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    // console.log(entireTrip);
});

var $restaurantItems = $('#restaurant-items');
$('#addR').on('click', function(elem) {
    var currentDay = $('#day-list .current-day').data();
    var selectValue = $('select[data-type="restaurant"] :selected').text();

        .restaurantList.push(selectValue);
    $restaurantItems.append('<span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    // console.log(entireTrip);
});

var $activityItems = $('#activity-items');
$('#addA').on('click', function(elem) {
    var currentDay = $('#day-list .current-day').data();
    var selectValue = $('select[data-type="activity"] :selected').text();

    entireTrip[currentDay.index].activityList.push(selectValue);
    $activityItems.append('<span class="title">' + selectValue + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    // console.log(entireTrip);
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
    var curretnDayObj = entireTrip[currentDay.index];

    // curretnDayObj.hotelList
});

// UPDATE/DISPLAY itinerary DAY
////////////////////////////////////

// DayOfTrip.prototype.myHotel(choice){
// 	this.hotel = choice;
// }


// DayOfTrip.prototype.myRestaurants(choice){
// 	this.restaurant = choice;
// }


// DayOfTrip.prototype.myHotel(choice){
// 	this.activity = choice;
// }

// $('').on('click', function(){console.log('you clicked!')}) 
