const gifSearchPopupBtn = document.querySelector("#gif-search_popup-btn");
const gifSearchPopup = document.querySelector(".gif-search_popup");
const gifSearchInput = document.querySelector("#gif-search_input");
const gifSearchResults = document.querySelector(".gif-search_results");
const postForm = document.querySelector(".post-form");
const postTextInput = document.querySelector("#post-text-input");
const postCardList = document.querySelector(".post-card-list");

const giphyApiKey = "Xnxm7Myd7Kq7YrJgWupPTiqr9cGyVfyK";
const giphyTrendingEndpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=1`;

const renderGifs = (data) => {
  gifSearchResults.innerHTML = "";
  const gifTitle = data.title;
  const gifUrl = data.images.downsized.url;
  const gifImage = document.createElement("img");
  gifImage.classList.add("gif-search_result-img");
  gifImage.setAttribute("src", gifUrl);
  gifImage.setAttribute("alt", gifTitle);
  gifSearchResults.appendChild(gifImage);
};

const fetchTrendingGifs = async () => {
  try {
    const res = await fetch(giphyTrendingEndpoint);
    const content = await res.json();
    console.log(content);
    renderGifs(content.data[0]);
  } catch (err) {
    console.log(err);
  }
};

gifSearchPopupBtn.addEventListener("click", function () {
  if (gifSearchPopup.classList.contains("show-popup")) {
    gifSearchPopup.classList.remove("show-popup");
  } else {
    gifSearchPopup.classList.add("show-popup");
    fetchTrendingGifs();
  }
});

const fetchSearchedGifs = async (e) => {
  const searchQuery = e.target.value;
  console.log(searchQuery);

  if (searchQuery) {
    let giphySearchEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=1&q=${searchQuery}`;
    try {
      const res = await fetch(giphySearchEndpoint);
      const content = await res.json();
      renderGifs(content.data[0]);
    } catch (err) {
      console.log(err);
    }
  } else {
    fetchTrendingGifs();
  }
};

gifSearchInput.addEventListener("keyup", fetchSearchedGifs);

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

const insertGifInPostForm = (e) => {
  if (e.target.classList.contains("gif-search_result-img")) {
    if (postForm.querySelector(".selected-gif-img")) {
      postForm.removeChild(postForm.querySelector(".selected-gif-img"));
    }
    renderGifInPostForm(e);
    gifSearchResults.innerHTML = "";
  }
};

document.addEventListener("click", insertGifInPostForm);

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

    renderPostCard(postCardContentObj);
    postForm.reset();
    postForm.removeChild(postGifImg);
  }
};

postForm.addEventListener("submit", initiatePostCardRendering);
