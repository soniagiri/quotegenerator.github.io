const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};
const newQuote = () => {
  loading();
  const quote = Math.floor(Math.random() * apiQuotes.length);
  const newQuote = apiQuotes[quote];

  if (!newQuote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = newQuote.author;
  }

  if (newQuote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = newQuote.text;
  complete()
};

// Get quote
const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
  } catch (error) {
    // Catch Error
  }
};

newQuoteBtn.addEventListener("click", () => {
  newQuote();
});

getQuotes();
