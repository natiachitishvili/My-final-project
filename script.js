//fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4d65d040ae44461d913e3526a50a7c28"
    );
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("Failed to fetch data:", error);
    return [];
  }
}

function displayCards(cards) {
  cards.forEach((card) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    newsCard.innerHTML = `
          <img src="${card.urlToImage || "default-image.jpg"}" alt="${
      card.title || "News Image"
    }" style="width: 100%; height: auto;"> 
          <h4>${card.author || "Unknown Author"}</h4> 
          <h2>${card.title || "No Title Available"}</h2>
          <p>${card.description || "No description available."}</p>
        `;
    newsContainer.appendChild(newsCard);
  });
}

//SEARCH

let allCards = [];
let cardsPerPage = 6;
let currentIndex = 0;

const showMore = document.getElementById("show-more");
const searchInput = document.getElementById("search-bar");
const newsContainer = document.getElementById("newscontainer");

async function init() {
  allCards = await fetchData();
  loadMoreCards();
}

function loadMoreCards() {
  const nextCards = allCards.slice(currentIndex, currentIndex + cardsPerPage);
  displayCards(nextCards);
  currentIndex += cardsPerPage;

  if (currentIndex >= allCards.length) {
    showMore.style.display = "none";
  } else {
    showMore.style.display = "block";
  }
}

function filterCards() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCards = allCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm)
  );

  currentIndex = 0;
  newsContainer.innerHTML = ""; // Clear existing cards
  displayCards(filteredCards);

  showMore.style.display =
    filteredCards.length > cardsPerPage ? "block" : "none";
}

searchInput.addEventListener("input", filterCards);
showMore.addEventListener("click", loadMoreCards);

init();

// HEADER SCROLLED

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY);
});

// Burger Menu

const openBurger = document.getElementById("burger-open");
const closeBurger = document.getElementById("close_burger");
const burgerMenu = document.getElementById("burger-menu");

openBurger.addEventListener("click", function () {
  burgerMenu.classList.add("display_burger");
});

closeBurger.addEventListener("click", function () {
  burgerMenu.classList.remove("display_burger");
});
