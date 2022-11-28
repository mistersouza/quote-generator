const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#text');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// init global variable
let quotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get single quote from array
async function getQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    showLoadingSpinner();
    
    // set author to unknown if no author
    quoteAuthor.textContent = quote.author ? quote.author : 'Unknown';

    // Check quote length; styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // Set quote
    removeLoadingSpinner();
    quoteText.textContent = quote.text;
}

// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    showLoadingSpinner();

    try {
        const response = await fetch(apiUrl);
        quotes = await response.json();
        getQuote();
    } catch (error) {
        // Catch error
        console.log('Whoops, no quotes', error);
    }  
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
// On Load
getQuotes();


// add event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);