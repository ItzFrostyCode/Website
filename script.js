document.getElementById("light-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Get elements
const menuToggle = document.getElementById('menu-toggle');
const menuToggleX = document.getElementById('menu-toggle-x');
const menuList = document.getElementById('menu-list');

// Toggle the 'show-menu' class when the hamburger button is clicked
menuToggle.addEventListener('click', () => {
    menuList.classList.add('show-menu'); // Show the menu
    menuToggleX.style.display = 'block'; // Show the X button
    menuToggle.style.display = 'none'; // Hide hamburger button
});

// Toggle the 'show-menu' class when the X button is clicked
menuToggleX.addEventListener('click', () => {
    menuList.classList.remove('show-menu'); // Hide the menu
    menuToggleX.style.display = 'none'; // Hide X button
    menuToggle.style.display = 'block'; // Show hamburger button
});




window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  var heroBanner = document.getElementById('Hero-Banner');
  var topBar = document.querySelector('.top-bar');

  // Check if the page is scrolled past the Hero-Banner
  if (window.scrollY >= heroBanner.offsetTop) {
      header.classList.add('scrolled'); // Add class to change header color
  } else {
      header.classList.remove('scrolled'); // Remove class when scrolling back up
  }
});


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Dot controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevents the form from actually submitting (you can replace it with form submission logic)

  // Display the success message
  document.getElementById('successMessage').style.display = 'block';
  
  // Optionally, you can hide the success message after a few seconds:
  setTimeout(function() {
      document.getElementById('successMessage').style.display = 'none';
  }, 2000); // Hide after 3 seconds
});