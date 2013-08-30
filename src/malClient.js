var mal_base = window.fermata.json("http://mal-api.com/")
var mal_anime = mal_base('anime');


function createRatingRow(anime) {

        var tr = document.createElement("tr");

        var td = document.createElement("td");
        tr.appendChild(td);

        var link = document.createElement("a");
        link.href = 'http://myanimelist.net/anime/'+anime.id;
        var text = document.createTextNode(anime.title);
        link.appendChild(text);

        td.appendChild(link);

        var td = document.createElement("td");
        tr.appendChild(td);

        var text = document.createTextNode(anime.members_score);
        td.appendChild(text);

        return tr;
}

/*
 * Creates a ratings table to add to crunchyroll.
 */
function createRatingsTable(anime_json) {

    var div = document.createElement("div");
    div.id = "mal_ratings";
    document.body.appendChild(div);

    var table = document.createElement("table");
    div.appendChild(table);

    var tr = document.createElement("tr");
    table.appendChild(tr);

    var td = document.createElement("td");
    tr.appendChild(td);

    var img = document.createElement("img");
    img.src = "http://i48.tinypic.com/2ed4azd.jpg";
    img.style.width = "50%";
    img.style.height = "50%";
    td.appendChild(img);

    for (var i in anime_json) {
        var tr = createRatingRow(anime_json[i]);
        table.appendChild(tr);
    }

    return div;
}

function placeTable(table) {

    $('#sidebar_read_reviews').after(table);
}

function searchHandler(err, result) {

    var table = createRatingsTable(result);
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

        var title = $("html body.main-page div#template_scroller.ad-skin div#template_container.cf div#template_body.cf div#source_showview div#container.cf h1.ellipsis span").text().toLowerCase();
        console.log(title);
        searchMAL(title);
    }
    }, 10);
});