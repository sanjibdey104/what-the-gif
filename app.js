const gifSearchPopupBtn = document.querySelector("#gif-search_popup-btn");
const gifSearchPopup = document.querySelector(".gif-search_popup");
const gifSearchInput = document.querySelector("#gif-search_input");

gifSearchPopupBtn.addEventListener("click", function () {
  gifSearchPopup.classList.contains("show-popup")
    ? gifSearchPopup.classList.remove("show-popup")
    : gifSearchPopup.classList.add("show-popup");
});
