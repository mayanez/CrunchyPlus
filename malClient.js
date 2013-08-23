//Will change once I move over to testing on browser.
var fermata = require('fermata');

//For testing in node.js. Will remove when transitioning to browser
var jsdom = require('jsdom').jsdom;


var mal_base = fermata.json("http://mal-api.com/")
var mal_anime = mal_base('anime');

/*
 * Extracts the Rating from the Anime JSON.
 */
function extractRating(anime_json) {
	return anime_json.members_score;
}

/*
 * Creates a ratings table to add to crunchyroll.
 */
function createRatingsTable(rating) {

	//for Testing purposes. This will go away once it is run in a browser.
	var window = jsdom().parentWindow;
	var document = window.document;

	//Abstract all of this creating elements to separate helper functions.
	var div = document.createElement("div");
	document.body.appendChild(div);
	
	var table = document.createElement("table");
	div.appendChild(table);

	var tr = document.createElement("tr");
	table.appendChild(tr);

	var td = document.createElement("td");
	tr.appendChild(td);

	var text = document.createTextNode("MAL Rating");
	td.appendChild(text);

	var td = document.createElement("td");
	tr.appendChild(td);
	
	var text = document.createTextNode(rating);
	td.appendChild(text);

	console.log(document.innerHTML);
	return div;
}

function searchHandler(err, result) {
	var rating = extractRating(result[0]);
	createRatingsTable(rating);
}


function searchMAL(title) {
	mal_anime('search')({q: title}).get(searchHandler);
}

searchMAL("Bleach");






