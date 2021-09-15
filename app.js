const gifSearchPopupBtn = document.querySelector("#gif-search_popup-btn");
const gifSearchPopup = document.querySelector(".gif-search_popup");
const gifSearchInput = document.querySelector("#gif-search_input");
const gifFetchBtn = document.querySelector("#fetch-gif-btn");

gifSearchPopupBtn.addEventListener("click", function () {
  if (gifSearchPopup.classList.contains("show-popup")) {
    gifSearchPopup.classList.remove("show-popup");
  } else {
    gifSearchPopup.classList.add("show-popup");
    fetchTrendingGifs();
  }
});

const giphyApiKey = "Xnxm7Myd7Kq7YrJgWupPTiqr9cGyVfyK";
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&=1`;
let giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=1&q=`;

gifFetchBtn.addEventListener("click", fetchSearchedGifs);

function fetchSearchedGifs(e) {
  e.preventDefault();
  const searchInput = gifSearchInput.value.trim();

  if (searchInput) {
    giphySearchEndpoint = giphySearchEndpoint.concat(searchInput);
    fetch(giphySearchEndpoint)
      .then((res) => res.json())
      .then((content) => console.log(content))
      .catch((err) => console.log(err));
  }
}

function fetchTrendingGifs() {
  fetch(giphyTrendingEndpoint)
    .then((res) => res.json())
    .then((content) => console.log(content))
    .catch((err) => console.log(err));
}
