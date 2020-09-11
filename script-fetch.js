var form = document.getElementById("form");
form.addEventListener("keyup", handleSubmit);
const spinner = document.getElementById("spinner");

function handleSubmit(event) {
  event.preventDefault();
  var data = document.getElementById("inputText").value;
  spinner.removeAttribute("hidden");
  searchArtist(data, handleSearchSuccess, handleSearchFailure);
}

function searchArtist(data, onSuccess, onFailure) {
  spinner.removeAttribute("hidden");
  fetch(
    "https://itunes.apple.com/search?term=" +
      data.replace(/\s/g, "+") +
      "&entity=song&limit=30"
  )
    .then((response) => response.json())
    .then(
      (responseData) =>
        new Promise((resolve) => setTimeout(() => resolve(responseData), 300))
    )
    .then((json) => onSuccess(json))
    .catch((error) => onFailure(error));
}

function handleSearchSuccess(response) {
  var container = document.getElementById("response");
  container.innerHTML = "";
  showResults(response);
}

function showResults(response) {
  spinner.setAttribute("hidden", "");
  var container = document.getElementById("response");
  var div = document.createElement("div");
  for (i in response.results) {
    div.innerHTML +=
      "Name: " +
      response.results[i].artistName +
      " - Song: " +
      response.results[i].trackName +
      "<br>";
  }
  container.appendChild(div);
  if (
    response.results == [] ||
    response.results == {} ||
    response.results == ""
  ) {
    return (container.innerHTML = "No results");
  }
}

function handleSearchFailure(response) {
  var container = document.getElementById("response");
  container.innerHTML = "";
  showError(response);
}

function showError(errorMessage) {
  spinner.setAttribute("hidden", "");
  var container = document.getElementById("response");
  var div = document.createElement("div");
  div.innerHTML = "Error: " + errorMessage;
  container.appendChild(div);
  alert("An error has occured!");
}
