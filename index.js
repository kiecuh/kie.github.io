
let slider = document.querySelector('.slider');
let gamename = document.querySelector('.gamename');
let gamename2 = document.querySelector('.gamename2');
let gamename3 = document.querySelector('.gamename3');
let gamename4 = document.querySelector('.gamename4');
let gamename5 = document.querySelector('.gamename5');  

// Select all buttons with the new class names
let slides = document.querySelectorAll('.game1, .game2, .tetris, .game3, .game4'); 
let names = document.querySelectorAll('.name-container h2'); 
const totalSlides = slides.length;

// Set the initial slideIndex to the middle slide
let slideIndex = Math.floor(totalSlides / 2); 

// This will track whether the user clicked on a button that should now redirect.
let isButtonCentered = false;

// Function to move the slide
function moveSlide(direction) {
    // Update the slideIndex
    slideIndex += direction;

    // Correct wrap-around logic
    if (slideIndex < 0) slideIndex = totalSlides - 1; 
    if (slideIndex >= totalSlides) slideIndex = 0; 

    // Get the container width and button width
    const containerWidth = slider.parentElement.offsetWidth; // Get the container's width
    const buttonWidth = slides[0].offsetWidth; // Get the width of a button
    const gap = 20; // The gap between the buttons
    const offset = -(slideIndex * (buttonWidth + gap)) + containerWidth / 2 - buttonWidth / 2; 

    // Move both the slider and the gamename container together
    slider.style.transform = `translateX(${offset}px)`; 
    const nameContainer = document.querySelector('.name-container');
    nameContainer.style.transform = `translateX(${offset}px)`; 

    // Update opacity and center the button and name
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
            // Track that this button is now centered
            isButtonCentered = true;

            // Add click event listener to handle redirection once the button is clicked while centered
            button.addEventListener('click', handleCenterButtonClick);
        } else {
            // If the button is not in the center, make it transparent and remove "center" class
            button.classList.add('transparent');
            names[index].classList.add('transparent');
            button.classList.remove('center');  
            names[index].classList.remove('center-name');  

            // Remove the event listener if the button is not in the center
            button.removeEventListener('click', handleCenterButtonClick);
        }
    });
}

// Function to handle the click on a centered button
function handleCenterButtonClick(event) {
    // Only proceed if the button is centered
    if (!isButtonCentered) return;

    // Get the index of the button that was clicked
    const buttonIndex = Array.from(slides).indexOf(event.target);

    // List of links for the respective games
    const gameLinks = [
        'games/tictactoe.html', 
        'games/maze.html',     
        'games/1tetris.html',  
        'games/fruit.html',    
        'games/cross.html'    
    ];

    // Redirect to the corresponding game page
    window.location.href = gameLinks[buttonIndex];
}

// Initial call to position the slider at the middle and update opacity
moveSlide(0);

// Initial call to position the slider at the middle and update opacity
moveSlide(0);
// Object with game links
const gameLinks = {
    tictactoe: "search/searchhtml/game1.html", 
    maze: "search/searchhtml/game2.html",
    tetris: "search/searchhtml/game3.html",
    fruitslice: "search/searchhtml/game4.html", 
    fruit: "search/searchhtml/game4.html",     
    roadcross: "search/searchhtml/game5.html"
};

// Attach an event listener to the form
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the search input value
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  const errorMessageElement = document.getElementById("errorMessage");

  // Check if the query matches a game
  if (gameLinks[query]) {
    window.location.href = gameLinks[query]; // Redirect to the corresponding game page
    errorMessageElement.style.display = "none"; // Hide the error message if the game is found
  } else {
    errorMessageElement.style.display = "inline"; // Show the error message if the game is not found
  }
});

  