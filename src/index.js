console.log('%c HI', 'color: firebrick')

// console.log('%c HI', 'color: firebrick')
// console.log(urlArray) // checking to see that I have correctly fetched the URL to the DOM

// CHALLENGE 1: FETCH DOG IMAGES AND ADDS ELEMENTS TO PG 


// Step 1: use a forEach loop to loop through each url in the array

// Step 2: for each of those loops, create a new image tag

// Step 3: change each image src to the url 

// Step 4: append this to the div with id="dog-image-container" in the DOM (hint comes from index.html doc)
// note: you can go through each step in order.
// but it's smart to start with step 4 
// and to put it outside of the rest of the funcitons 
// that way you only have to grab that div id once and then can use it whenever as you code

// vv fetches dog images
fetch("https://dog.ceo/api/breeds/image/random/4")
.then((response) => response.json())
.then((data) => renderImages(data.message)) // had to do a .message so we could get inside the object down to the array with all the images

// vv fetches dog breeds
fetch("https://dog.ceo/api/breeds/list/all")
.then((resp) => resp.json())
.then((data) => {
    renderBreedsList(Object.keys(data.message))//obj.key method turns keys of object into array
    breedFilter(Object.keys(data.message))//obj.key method turns keys of object into array
})

// the function below adds image elements to the DOM for each image in the array

function renderImages(urlArray) {
    
    const dogImageContainer = document.getElementById("dog-image-container")
    // console.log(dogImageContainer) // checking to make sure I grabbed the right element on the pg

    urlArray.forEach((eachUrl) => {
    // console.log(eachUrl) // checks to see that each url is being pulled in the array of URLs
    
    const image = document.createElement('img') // creates the new image element for the page
    image.src = eachUrl // tell it where to grab the image from 

    dogImageContainer.append(image) // adds the image to that new element you created on line 34
})
    }

// CHALLENGE 2: on page load, fetches all the dog breeds using the url: "https://dog.ceo/api/breeds/list/all"; 
            // and adds the breeds to the page in the <ul> provided in index.html

// Step 1: create a fetch using the image (tip: clump both fetches at top of pg together)
// Step 2: grab the UL for ul id="dog-breeds"
// Step 3: use a forEach to loop through each dog breed inside the array
// Step 4: make an li for each dog breed
// Step 5: make li textContent = breeds
// Step 6: append li to ul 

//step 2-5 here:
function renderBreedsList(breedArray){
    // console.log(breedsArray) // checking to make sure we have the array grabbed

    const ulDogBreeds = document.getElementById("dog-breeds")
    // console.log(ulDogBreeds) // checked to make sure we grabbed the ul element from the pg correctly

    breedArray.forEach((eachDogBreed) => {
    // console.log(eachDogBreed) // checking to make sure we are iterating though each individul dog breed

    const li = document.createElement('li')
    li.textContent = eachDogBreed
    li.addEventListener("click", (e) => {
        // console.log(e.target) // checking to see when we click something it works
        e.target.style.color = "green" // changes the color of the dog breed once clicked on
    })
    ulDogBreeds.appendChild(li)
    })
}

// CHALLENGE 3: add JavaScript so that, when the user clicks on any one of the <li>s, the font color of that <li> changes. 
// This can be a color of your choosing.

// STEP 1: Add event listener for the click. 
    // we put the event listener inside the renderBreeds function so it would be scoped
    // to the rest of the lis. 
// STEP 2: change the font color

// CHALLENGE 4: add JavaScript so that the user can filter breeds that start 
// with a particular letter using a dropdownLinks to an external site.
// For simplicity, the dropdown only includes the letters a-d. 
// However, we can imagine expanding this to include the entire alphabet.

// STEP 1: get all dog breeds -- you've already fetched the breeds once. Just reuse this, make it easy and add a second place to send it
// STEP 2: filter dog breeds based on dropdown letter option 
    // a. change event for drop down
    // b. get letter changed to other letters
// STEP 3: render filter dog breeds to the previous ul -- 
    // hint: we already did STEP 3 in the previous challenge 3. 

function breedFilter(breedArray){
    // console.log(breedArray) // checking to make sure we have an array of dog breeds
    
    const dropdown = document.getElementById("breed-dropdown") // grabbing the dropdown element from the pg
    // console.log(dropdown) // checking to make sure you grabbed the right element on the pg

    // function below tells it that everytime someone clicks the dropdown menu, allow them to change the value
    dropdown.addEventListener("change", (e) => { //this part of the code points to the dropdown menu and says "hey listen for a change and when you hear it...
        e.target.value // ... change your value to the specific letter the user clicked"
        // console.log(e.target.value) // checking to make sure our function works properly
        
        // value below tells it to filter through the letter clicked and return only the breeds that start with that same letter that was cliked
        const filtersBreed = breedArray.filter((breed) => {
            return breed.startsWith(e.target.value)
        })
        // console.log(filtersBreed) // checking to make sure our function above works
        
        // grabs the ul from the dog breeds element on pg
        const ul = document.getElementById("dog-breeds")
        ul.textContent = "" // changes the content of the text inside the ul to a empty string 
        // so we don't keep re-appending the entire dog array to the page after we select a letter
        
        renderBreedsList(filtersBreed)

    })
}
