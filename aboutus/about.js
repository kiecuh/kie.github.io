let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.game1, .game2, .tetris, .game3, .game4, .game5, .game6, .game7');
let names = document.querySelectorAll('.name-container h2'); 
const totalSlides = slides.length;

// Set the initial slideIndex to the middle slide
let slideIndex = Math.floor(totalSlides / 2); 

// Function to move the slide
function moveSlide(direction) {
    // Update the slideIndex
    slideIndex += direction;

    // Correct wrap-around logic
    if (slideIndex < 0) slideIndex = totalSlides - 1;
    if (slideIndex >= totalSlides) slideIndex = 0;

    // Get the container width and button width
    const containerWidth = slider.parentElement.offsetWidth;
    const buttonWidth = slides[0].offsetWidth; // Assuming all buttons are the same size
    const gap = 20; // Gap between buttons
    const offset = -(slideIndex * (buttonWidth + gap)) + containerWidth / 2 - buttonWidth / 2;

    // Move the slider to the correct position
    slider.style.transform = `translateX(${offset}px)`;

    // Move the name container with the slider
    const nameContainer = document.querySelector('.name-container');
    nameContainer.style.transform = `translateX(${offset}px)`;

    // Update opacity and apply the "center" class to the correct button
    updateButtonOpacity();
}

// Function to update the opacity and size of buttons and names based on the slideIndex
function updateButtonOpacity() {
    slides.forEach((button, index) => {
        if (index === slideIndex) {
            // If the button is in the center, make it fully visible and apply "center" class
            button.classList.remove('transparent');
            names[index].classList.remove('transparent');
            button.classList.add('center');
            names[index].classList.add('center-name');
          
            
            // Add click event listener to handle redirection once the button is clicked while centered
            if (!button.hasEventListener) {
                button.addEventListener('click', handleCenterButtonClick);
                button.hasEventListener = true;  // Flag to prevent adding the event listener again
            }
        } else {
            // If the button is not in the center, make it transparent and remove "center" class
            button.classList.add('transparent');
            names[index].classList.add('transparent');
            button.classList.remove('center');
            names[index].classList.remove('center-name');
            
            // Remove the event listener if the button is not in the center
            if (button.hasEventListener) {
                button.removeEventListener('click', handleCenterButtonClick);
                button.hasEventListener = false;  // Remove the flag when the listener is removed
            }
        }
    });
}

// Function to handle the click on a centered button
function handleCenterButtonClick(event) {
    // Get the index of the button that was clicked
    const buttonIndex = Array.from(slides).indexOf(event.target);

    // List of links for the respective games
    const gameLinks = [
        'games/tictactoe.html', 
        'games/maze.html',     
        'games/1tetris.html',  
        'games/fruit.html',    
        'games/cross.html',    
        'games/game6.html',
        'games/game7.html',
        'games/game8.html',
    ];

    // Redirect to the corresponding game page
    window.location.href = gameLinks[buttonIndex];
}

// Initial call to position the slider at the middle and update opacity
moveSlide(0);

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