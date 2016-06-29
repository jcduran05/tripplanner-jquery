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



/////////////////////click event   {}
var entireTrip = []; 


$('#day-add').on('click', function(){
	


	entireTrip.push(new DayOfTrip)
	console.log (entireTrip);
}) 

var DayOfTrip = function (){
	this.hotelList = [];
	this.restaurantList = [];
	this.activityList = []; 
	var self = this;
	$('#addH').on('click', function(){
		self.hotelList.push($('select[data-type="hotel"] :selected').text() )
		console.log(self.hotelList)
		console.log(entireTrip)
	})


// 	$('#addR').on('click', function(){
// 	$('#addA').on('click', function(){

}

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
