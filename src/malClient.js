

var mal_base = window.fermata.json("http://mal-api.com/")
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

function placeTable(table) {

	$('#container').prepend(table);
	console.log("Appended");
}

function searchHandler(err, result) {
	var rating = extractRating(result[0]);
	var table = createRatingsTable(rating);
	placeTable(table);
}


function searchMAL(title) {
	console.log("searching...");
	mal_anime('search')({q: title}).get(searchHandler);
}



chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var title = $("html body.main-page div#template_scroller.ad-skin div#template_container.cf div#template_body.cf div#source_showview div#container.cf h1.ellipsis span").text();
		console.log(title);
		searchMAL(title);
	}
	}, 10);
});