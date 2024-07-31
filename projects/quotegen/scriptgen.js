document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const copyQuoteButton = document.getElementById('copy-quote');

    // Function to fetch a new quote
    async function fetchQuote() {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteText.textContent = `"${data.content}"`;
        authorText.textContent = `- ${data.author}`;
    }

    // Event listener for the new quote button
    newQuoteButton.addEventListener('click', fetchQuote);

    // Event listener for the copy quote button
    copyQuoteButton.addEventListener('click', () => {
        const quote = `${quoteText.textContent} ${authorText.textContent}`;
        navigator.clipboard.writeText(quote).then(() => {
            alert('Quote copied to clipboard!');
        });
    });

    // Fetch the first quote on page load
    fetchQuote();
});