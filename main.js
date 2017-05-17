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
var routeName2 = 'Green-B';
var routeGreen = 'Green-B,Green-C,Green-D,Green-E'
var routeName3 = 'Orange';
//Search Parameters
var searchParam = 'routes' //Change for parameter
var searchParam1 = 'predictionsbyroutes';


$(document).ready(function () {

	$('circle').on('click', function () {
		$('circle').css({ 'fill': "white" });
		$(this).css({ 'fill': "#ccc" });
	});

	$('circle').on('mouseover', function () {
		$('circle').css({ 'fill': "white" });
		$(this).css({ 'fill': "#ccc" });
	});
	// Hide and show maps by icon click
	$('#green_icon').on('click', function () {
		$('.greenLineStop').show();
		$('.redLineStop').show();
		$('.orangeLineStop').show();
		$('.redLineStop').hide();
		$('.orangeLineStop').hide();
	});

	$('#red_icon').on('click', function () {
		$('.greenLineStop').show();
		$('.redLineStop').show();
		$('.orangeLineStop').show();
		$('.greenLineStop').hide();
		$('.orangeLineStop').hide();
	});

	$('#orange_icon').on('click', function () {
		$('.greenLineStop').show();
		$('.redLineStop').show();
		$('.orangeLineStop').show();
		$('.greenLineStop').hide();
		$('.redLineStop').hide();
	});
//Show all
	$('#trip_title').on('click', function () {
		$('.greenLineStop').show();
		$('.redLineStop').show();
		$('.orangeLineStop').show();
	});

	var routeQuery = [routeName1, routeName2, routeName3, routeGreen];
	routeQuery.forEach(function (el) {
		// http://realtime.mbta.com/developer/api/v2/predictionsbyroutes?api_key=TwtWF2cna0yEUrsDF-5kQQ&routes=Red,Blue&format=json
		$.getJSON(baseURL + searchParam1 + '?' + apiKey + '&routes=' + el + '&format=json', function (routesData) {
			//Full AJAX call content, below
			//routesData.mode.route[0].direction.trip.stop.pre_away
			console.log('success routename', routesData);
			var tripData = routesData.mode[0].route[0].direction[0].trip[0];
			console.log("Stops in trip", tripData);

			var stopNames = [];
			//Is this needed?
			//If yes use foreach
			for (var i = 0; i < tripData.stop.length; i++) {
				var stopNameInLoop = tripData.stop[i].stop_name;
				console.log("CurrStopName", stopNameInLoop);
				stopNames.push(stopNameInLoop);
			}
			//Is this needed?
			var preAwayForEach = 0;
			for (var obj in tripData.stop) {
				preAwayForEach = tripData.stop;
			}

			var stopData = tripData.stop;

			stopData.forEach(function (el) {
				var preAwayMins = Math.ceil(el.pre_away / 60);
				console.log("stopNameslogging", el.stop_name);
				$("#trains").append("<h3>" + el.stop_name + "</h3><p class='pre_away'>" + preAwayMins + " minutes away</p>");
			});
			console.log("StopNames", stopNames);

			var nameOfStop = tripData.stop[0].stop_name;
			//Preaway calculated three times. Fix this
			var preAway = tripData.stop[0].pre_away;
			console.log('preaway', preAway, "StopName", nameOfStop);

			var currentAlerts = routesData.alert_headers;
			console.log("Current Alerts", currentAlerts);
			console.log("Alerts:", currentAlerts.header_text, currentAlerts.effect_name);


			// For each alert that there is, append a h3 for the effect name, in larger text
			//and under append the actual alert, aka the header text
			if (currentAlerts.length === 0) {
				console.log("YES, undefined");
				$("#alerts").append("<h3> No Alerts</h3>");
			} else {
				currentAlerts.forEach(function (el) {
					console.log("alertslogging", el.effect_name, el.header_text);
					$("#alerts").append("<h3>" + el.effect_name + "</h3><p>" + el.header_text + "</p>");
				});
			}


		});

		//Wordy way to call route names

		$.getJSON('http://realtime.mbta.com/developer/api/v2/routes?api_key=wX9NwuHnZU2ToO7GmGR9uw&format=json', function (routeNamesData) {
			console.log("LINES", routeNamesData);
		})


	});
});



//features today
// 1. Resend ajax every 1 minute and update. Do by creating the object each time
// 2. Allow sections to be hidden and shown on click
// 3. Allow lines to be changed on click. Hide and show lines on svg. 
// Load json data for all lines on page load? Show each as requested by click
// Is it easier to do this via 1 ajax request or just 3 seperate ones? via for each, array of subway lines
// improve user interface. Get ideas from other apps. AKA how to make it look "sleek"
// Connect interface to data
// Quick trivia game?

