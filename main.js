// Name: Ludvig Liljenberg
// Date: 03/30/2019
// Section: CSE 154AF
//
// This script makes use of the fetch api to query service.php for colors
// using a string entered by the user. The resulting colors are displayed to the user in either
// text format or as a div, depending on what radio button the user clicked.
//

(function() {
  "use strict";
  const BASE_URL = "service.php";
  const ERROR_MSG = "OOPS! An error occured when accessing the the color webservice...";


  window.addEventListener("load", init);

  /**
   *  Adds responsiveness to the search button
   */
  function init() {
    qs("button").addEventListener("click", search);
  }

  /**
   * Retrieves information about a color from webservice.php's api and displays it to the user.
   * Removes all previously displayed colors. Depending on what radio button the user
   * selected, the content is displayed as paragraph element, or a colored div. Displays
   * an error message if the fetch goes wrong.
   */
  function search() {
    //removes old movies
    let article = qs("article");
    while (article.firstChild) {
      article.firstChild.remove();
    }
    let url = BASE_URL;
    let mode = qs("input[type=radio]:checked").value;
    url += "?color=" + qs("input").value + "&mode=" + mode;
    if (mode === "json") {
      fetch(url)
        .then(checkStatus)
        .then(JSON.parse)
        .then(loadColors)
        .catch(() => {
          loadText(ERROR_MSG);
        });
    } else {
      fetch(url)
        .then(checkStatus)
        .then(loadText)
        .catch(() => {
          loadText(ERROR_MSG);
        });
    }
  }

  /**
   * Creates a paragraph element with the given string and displays it to the user.
   * @param  {String} msg - the string that should be shown to the user
   */
  function loadText(msg) {
    let p = document.createElement("p");
    p.innerText = msg;
    qs("article").appendChild(p);
  }

  /**
   * Creates a div with a certain color, from the given json, and displays it to the user.
   * @param  {JSONobject} json - json respresentation of a color
   */
  function loadColors(json) {
    if (json.hasOwnProperty("name")) { // json contains one color
      qs("article").appendChild(createColorDiv(json));
    } else { // json contains many colors
      for (let key in json) {
        if (json.hasOwnProperty(key)) {
          qs("article").appendChild(createColorDiv(json[key]));
        }
      }
    }
  }

  /**
   * Returns a new a colored div.
   * @param  {JSONobject} json - json containing information about the color of the div.
   * @return {[type]}      [description]
   */
  function createColorDiv(json) {
    let colorDiv = document.createElement("div");
    let r = json["RGB-values"][0];
    let g = json["RGB-values"][1];
    let b = json["RGB-values"][2];
    colorDiv.style["background-color"] = "rgb(" + r + "," + g + "," + b + ")";
    return colorDiv;
  }

  /**
   * Creates a "card" html element for every movie in the given json object,
   * and displays them to the user.
   * @param  {JSONobject} jsonResponse - the json object containing movies.
   * @return {Number} Number of movies in the given JSON object.
   */
  function createMovieCards(jsonResponse) {
    let movies = jsonResponse.results;
    for (let i = 0; i < movies.length; i++) {
      let movie = document.createElement("div");
      let title = document.createElement("h3");
      let poster = document.createElement("img");
      let desc = document.createElement("p");
      let rating = document.createElement("h4");

      title.innerText = movies[i].title;
      desc.innerText = movies[i].overview;
      rating.innerText = "Rating: " + movies[i].vote_average + " (of " +
        movies[i].vote_count + " total votes)";
      if (movies[i].poster_path != null) { // to avoid a pesky error
        poster.src = POSTER_URL + movies[i].poster_path;
        poster.alt = "Movie poster for " + movies[i].title;
        movie.appendChild(poster);
      }
      movie.appendChild(title);
      movie.appendChild(rating);
      movie.appendChild(desc);
      qs("article").appendChild(movie);
    }
    return movies.length;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
