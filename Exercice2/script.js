 // DOM elements
 const breedSearch = document.getElementById('breedSearch');
 const breedSelect = document.getElementById('breedSelect');
 const fetchButton = document.getElementById('fetchImages');
 const imageContainer = document.getElementById('imageContainer');

 // Store all breeds
 let allBreeds = [];

 // Fetch all dog breeds
 async function fetchBreeds() {
   try {
     const response = await fetch('https://dog.ceo/api/breeds/list/all');
     const data = await response.json();
     
     // Process and store breeds
     allBreeds = Object.keys(data.message);
     populateBreedSelect(allBreeds);
   } catch (error) {
     console.error('Error fetching breeds:', error);
   }
 }

 // Populate breed select dropdown
 function populateBreedSelect(breeds) {
   breedSelect.innerHTML = '<option value="">Select a breed</option>';
   breeds.forEach(breed => {
     const option = document.createElement('option');
     option.value = breed;
     option.textContent = breed;
     breedSelect.appendChild(option);
   });
 }

 // Fetch images for selected breed
 async function fetchBreedImages(breed) {
   try {
     const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
     const data = await response.json();
     displayImages(data.message);
   } catch (error) {
     console.error('Error fetching images:', error);
   }
 }

 // Display images in the container
 function displayImages(images) {
   imageContainer.innerHTML = '';
   images.slice(0, 9).forEach(imageUrl => { // Limit to 9 images for performance
     const img = document.createElement('img');
     img.src = imageUrl;
     img.alt = 'Dog';
     imageContainer.appendChild(img);
   });
 }

 // Filter breeds based on search input
 function filterBreeds(searchTerm) {
   return allBreeds.filter(breed => breed.includes(searchTerm.toLowerCase()));
 }

 // Event listeners
 breedSearch.addEventListener('input', () => {
   const filteredBreeds = filterBreeds(breedSearch.value);
   populateBreedSelect(filteredBreeds);
 });

 fetchButton.addEventListener('click', () => {
   const selectedBreed = breedSelect.value;
   if (selectedBreed) {
     fetchBreedImages(selectedBreed);
   }
 });

 // Initialize the app
 fetchBreeds();