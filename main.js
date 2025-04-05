// Define heart characters
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener("DOMContentLoaded", () => {
  // Ensure the error modal starts hidden
  const errorModal = document.getElementById("modal");
  errorModal.classList.add("hidden");

  // Select all heart icons
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // Toggle between empty and full heart
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch(error => {
          // Show error modal with message
          errorModal.classList.remove("hidden");
          document.getElementById("modal-message").textContent = error;
          
          // Hide modal after 3 seconds
          setTimeout(() => errorModal.classList.add("hidden"), 3000);
        });
    });
  });
});

// Mock server function
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
