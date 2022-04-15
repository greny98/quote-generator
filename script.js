// Ref to elm
const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quotes = [];

// Call APi
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    quotes = await res.json();
    newQuote();
    loader.hidden = true;
    quoteContainer.hidden = false;
  } catch (error) {
    console.log(error);
  }
}

// Make new quote
function newQuote() {
  if (quotes.length === 0) return;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // Set Author
  quote.author = quote.author ? quote.author : "Unknown";
  authorText.textContent = quote.author;

  // Handle too leng quote
  quote.text = quote.text ? quote.text : "Unknown";
  if (quote.text.length >= 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", () => {
  quoteContainer.classList.remove("fade-in");
  quoteContainer.classList.add("fade-out");
  setTimeout(() => {
    newQuote();
    quoteContainer.classList.add("fade-in");
    quoteContainer.classList.remove("fade-out");
  }, 460);
});
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
