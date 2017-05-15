// http://realtime.mbta.com/developer/api/v2/<query>?api_key=<your api key>&<parameter>=<required/optional parameters>
// Temporary public key
// api_key=wX9NwuHnZU2ToO7GmGR9uw
// working test query
//http://realtime.mbta.com/developer/api/v2/predictionsbyroutes?api_key=wX9NwuHnZU2ToO7GmGR9uw&routes=CR-Lowell,CR-Haverhill&format=json
// query to get all routes
//http://realtime.mbta.com/developer/api/v2/routes?api_key=wX9NwuHnZU2ToO7GmGR9uw&format

//AJAX Query Variables
var baseURL = 'http://realtime.mbta.com/developer/api/v2/';
var apiKey = 'api_key=TwtWF2cna0yEUrsDF-5kQQ';
// open use api key 'api_key=wX9NwuHnZU2ToO7GmGR9uw';
//Route Names
var routeName1 = 'Red';
var routeName2 = 'Blue';
//Search Parameters
var searchParam = 'routes' //Change for parameter
var searchParam1 = 'predictionsbyroutes';


$(document).ready(function () {
	console.log("Hello JS");

	$('circle').on('click', function () {
		$('body').append("<p>test test</p>")
	});
	//Gets all route names
	/*
		$.getJSON(baseURL + searchParam + '?' + apiKey + '&format', function (routesData) {
			console.log('success', routesData);
		});
	*/
	/*
	$.getJSON(baseURL +searchParam1+'?'+apiKey+'&routes='+routeName2+'&format=json', function (routesData){
		console.log('success', routesData);
		var preAway = routesData.mode.route[0].direction.trip.stop.pre_away;
		console.log('preaway', preAway);
	});
	*/

	// http://realtime.mbta.com/developer/api/v2/predictionsbyroutes?api_key=TwtWF2cna0yEUrsDF-5kQQ&routes=Red,Blue&format=json
	$.getJSON(baseURL + searchParam1 + '?' + apiKey + '&routes=' + routeName2 + '&format=json', function (routesData) {
		//Full AJAX call content, below
		//routesData.mode.route[0].direction.trip.stop.pre_away
		console.log('success routename', routesData);
		var tripData = routesData.mode[0].route[0].direction[0].trip[0];
		console.log("Stops in trip", tripData);
		var stopNames = [];

		for (var i = 0; i < tripData.stop.length; i++) {
			var stopNameInLoop = tripData.stop[i].stop_name;
			console.log("CurrStopName", stopNameInLoop);
			stopNames.push(stopNameInLoop);
		}
		var preAwayForEach = 0;
		for (var obj in tripData.stop) {
			preAwayForEach = tripData.stop;

		}
		var stopData = tripData.stop;
		stopData.forEach(function (el) {
			console.log("stopNameslogging", el.stop_name);
			$("#trains").append("<h3>" + el.stop_name + "</h3><p>" + "PREAWAY"+el.pre_away + "</p>");
		});
		console.log("StopNames", stopNames);

		var nameOfStop = tripData.stop[0].stop_name;
		var preAway = tripData.stop[0].pre_away;
		console.log('preaway', preAway, "StopName", nameOfStop);

		var currentAlerts = routesData.alert_headers;
		console.log("Current Alerts", currentAlerts);
		console.log("headers log", routesData.alert_headers[0].header_text)
		//console.log("Alerts:", currentAlerts.header_text, currentAlerts.effect_name);

		currentAlerts.forEach(function (el) {
			console.log("alertslogging", el.effect_name, el.header_text);
			$("#alerts").append("<h3>" + el.effect_name + "</h3><p>" + el.header_text + "</p>");
		});
		// For each alert that there is, append a h3 for the effect name, in larger text
		//and under append the actual alert, aka the header text

	});

	//Wordy way to call route names
	/*
	$.getJSON('http://realtime.mbta.com/developer/api/v2/predictionsbyroutes?api_key=wX9NwuHnZU2ToO7GmGR9uw&routes='+routeName1+'&format=json',function(lineData){
		console.log(lineData);
	})
	*/


});





