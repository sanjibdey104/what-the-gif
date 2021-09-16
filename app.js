// grabbing the necessary DOM elements
const gifSearchPopupBtn = document.querySelector("#gif-search_popup-btn");
const gifSearchPopup = document.querySelector(".gif-search_popup");
const gifSearchInput = document.querySelector("#gif-search_input");
const gifSearchResults = document.querySelector(".gif-search_results");
const postForm = document.querySelector(".post-form");
const postTextInput = document.querySelector("#post-text-input");
const postCardList = document.querySelector(".post-card-list");

// array to keep track of the
let gifPostsArr = [];

// API key would be kept hidden for production applications
const giphyApiKey = "Xnxm7Myd7Kq7YrJgWupPTiqr9cGyVfyK";
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=3`;

// render fetched GIFs in the search popup window
const renderGifsInPopup = (dataArr) => {
  gifSearchResults.innerHTML = "";
  dataArr.forEach((data) => {
    const gifTitle = data.title;
    const gifUrl = data.images.downsized.url;
    const gifImage = document.createElement("img");
    gifImage.classList.add("gif-search_result-img");
    gifImage.setAttribute("src", gifUrl);
    gifImage.setAttribute("alt", gifTitle);
    gifSearchResults.appendChild(gifImage);
  });
};

// fetch trending GIFs on initial search window popup
const fetchTrendingGifs = async () => {
  try {
    const res = await fetch(giphyTrendingEndpoint);
    const content = await res.json();
    renderGifsInPopup(content.data);
  } catch (err) {
    console.log(err);
  }
};

// fetch GIFs as per the search query
const fetchSearchedGifs = async (e) => {
  console.log("api called"); // to validate that debounce logic is working
  const searchQuery = e.target.value;
  if (searchQuery) {
    let giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=3&q=${searchQuery}`;
    try {
      const res = await fetch(giphySearchEndpoint);
      const content = await res.json();
      renderGifsInPopup(content.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    fetchTrendingGifs();
  }
};

const debounceAndFetch = (fetcherFunc, delay) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fetcherFunc.apply(context, args);
    }, delay);
  };
};

gifSearchInput.addEventListener(
  "keyup",
  debounceAndFetch(fetchSearchedGifs, 300) // 300ms delay between each API call
);

// toggle GIF search popup window
gifSearchPopupBtn.addEventListener("click", function () {
  if (gifSearchPopup.classList.contains("show-popup")) {
    gifSearchPopup.classList.remove("show-popup");
  } else {
    gifSearchPopup.classList.add("show-popup");
    fetchTrendingGifs();
  }
});

// render selected GIF in post form
const renderGifInPostForm = (e) => {
  const gifTitle = e.target.alt;
  const gifUrl = e.target.src;
  const selectedGifImage = document.createElement("img");
  selectedGifImage.classList.add("selected-gif-img");
  selectedGifImage.setAttribute("src", gifUrl);
  selectedGifImage.setAttribute("alt", gifTitle);
  postTextInput.parentNode.insertBefore(
    selectedGifImage,
    postTextInput.nextSibling
  );
  gifSearchPopup.classList.remove("show-popup");
};

// insert selected GIF in post form
const insertGifInPostForm = (e) => {
  if (e.target.classList.contains("gif-search_result-img")) {
    if (postForm.querySelector(".selected-gif-img")) {
      postForm.removeChild(postForm.querySelector(".selected-gif-img"));
    }
    renderGifInPostForm(e);
    gifSearchResults.innerHTML = "";
  }
};

// validate if user clicks on an image from the fetched GIFs
document.addEventListener("click", insertGifInPostForm);

// render post card in the post list
const renderPostCard = ({ postCardText, postCardGifUrl, postCardGifAlt }) => {
  const postCard = document.createElement("div");
  const postCardPara = document.createElement("p");
  const postCardGif = document.createElement("img");

  postCardPara.classList.add("post-card-text");
  postCardPara.innerText = postCardText;
  postCardGif.setAttribute("src", postCardGifUrl);
  postCardGif.setAttribute("alt", postCardGifAlt);

  postCard.classList.add("post-card");
  postCard.appendChild(postCardPara);
  postCard.appendChild(postCardGif);

  postCardList.appendChild(postCard);
};

// update localstorage while adding a new post to the DOM
const updateLocalStorage = (postArr) => {
  let postsJson = JSON.stringify(postArr);
  localStorage.setItem("gifPostsData", postsJson);
};

// read the text and GIF data from the form, and initiate card render
const initiatePostCardRendering = (e) => {
  e.preventDefault();

  if (postForm.querySelector(".selected-gif-img") && postTextInput.value) {
    const postCardText = postTextInput.value;
    const postGifImg = postForm.querySelector(".selected-gif-img");
    const postCardGifUrl = postGifImg.getAttribute("src");
    const postCardGifAlt = postGifImg.getAttribute("alt");

    const postCardContentObj = {
      postCardText,
      postCardGifUrl,
      postCardGifAlt,
    };

    gifPostsArr.push(postCardContentObj);
    updateLocalStorage(gifPostsArr);
    renderPostCard(postCardContentObj);
    postForm.removeChild(postGifImg);
    postForm.reset();
  }
};

postForm.addEventListener("submit", initiatePostCardRendering);

// initiate rending the GIF posts fetched from localStorage
const renderGifPosts = (gifPosts) => {
  gifPosts.forEach((post) => renderPostCard(post));
};

const fetchPostsFromLocalStorage = () => {
  const gifPostsData = localStorage.getItem("gifPostsData");
  const parsedPostsData = JSON.parse(gifPostsData);

  // validate if posts exists in localStorage
  if (!parsedPostsData) {
    gifPostsArr = [];
  } else {
    gifPostsArr = parsedPostsData;
  }

  renderGifPosts(gifPostsArr);
};

fetchPostsFromLocalStorage();
