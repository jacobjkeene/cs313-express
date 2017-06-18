var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.get('/', function(request, response) {
//  response.render('pages/index');
//});

//postal rates
app.get('/getRate', function(request, response) {
	calculateRate(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function calculateRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var types = requestUrl.query.types;
	var weight = Number(requestUrl.query.weight);

	computeOperation(response, types, weight);
}

function computeOperation(response, types, weight) {

	var result = 0;

	if (types == "Letters (Stamped)") {
		if (weight <= 1) {
			result = 0.49
		}
		else if(weight <= 2 && weight > 1) {
			result = 0.70
		}
		else if(weight <= 3 && weight > 2) {
			result = 0.91
		}
		else if(weight <= 3.5 && weight > 3) {
			result = 1.12
		}
	} else if (types == "Letters (Metered)") {
		if (weight <= 1) {
			result = 0.46
		}
		else if(weight <= 2 && weight > 1) {
			result = 0.67
		}
		else if(weight <= 3 && weight > 2) {
			result = 0.88
		}
		else if(weight <= 3.5 && weight > 3) {
			result = 1.09
		}
	} else if (types == "Large Envelopes (Flats)") {
		if (weight <= 1) {
			result = 0.98
		}
		else if(weight <= 2 && weight > 1) {
			result = 1.19
		}
		else if(weight <= 3 && weight > 2) {
			result = 1.40
		}
		else if(weight <= 4 && weight > 3) {
			result = 1.61
		}
		else if(weight <= 5 && weight > 4) {
			result = 1.82
		}
		else if(weight <= 6 && weight > 5) {
			result = 2.03
		}
		else if(weight <= 7 && weight > 6) {
			result = 2.24
		}
		else if(weight <= 8 && weight > 7) {
			result = 2.45
		}
		else if(weight <= 9 && weight > 8) {
			result = 2.66
		}
		else if(weight <= 10 && weight > 9) {
			result = 2.87
		}
		else if(weight <= 11 && weight > 10) {
			result = 3.08
		}
		else if(weight <= 12 && weight > 11) {
			result = 3.29
		}
		else if(weight <= 13 && weight > 12) {
			result = 3.50
		}
	} else if (types == "Parcels") {
		if (weight <= 4) {
			result = 2.67
		}
		else if(weight <= 5 && weight > 4) {
			result = 2.85
		}
		else if(weight <= 6 && weight > 5) {
			result = 3.03
		}
		else if(weight <= 7 && weight > 6) {
			result = 3.21
		}
		else if(weight <= 8 && weight > 7) {
			result = 3.39
		}
		else if(weight <= 9 && weight > 8) {
			result = 3.57
		}
		else if(weight <= 10 && weight > 9) {
			result = 3.75
		}
		else if(weight <= 11 && weight > 10) {
			result = 3.93
		}
		else if(weight <= 12 && weight > 11) {
			result = 4.11
		}
		else if(weight <= 13 && weight > 12) {
			result = 4.29
		}
	} else {
		// It would be best here to redirect to an "unknown operation"
		// error page or something similar.
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {types: types, weight: weight, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}