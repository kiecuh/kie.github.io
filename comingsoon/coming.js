const gameLinks = {
    tictactoe: "../search/searchhtml/game1.html", 
    maze: "../search/searchhtml/game2.html",
    tetris: "../search/searchhtml/game3.html",
    fruitslice: "../search/searchhtml/game4.html", 
    fruit: "../search/searchhtml/game4.html",     
    roadcross: "../search/searchhtml/game5.html"
};

// Attach an event listener to the form
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the search input value and convert it to lowercase
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  console.log("Search query:", query); // Log the search query for debugging

  const errorMessageElement = document.getElementById("errorMessage");

  // Check if the query matches a game
  if (gameLinks[query]) {
    console.log("Redirecting to:", gameLinks[query]); // Log the URL to which we're redirecting
    window.location.href = gameLinks[query]; // Redirect to the corresponding game page
    errorMessageElement.style.display = "none"; // Hide the error message if the game is found
  } else {
    errorMessageElement.style.display = "inline"; // Show the error message if the game is not found
  }
});