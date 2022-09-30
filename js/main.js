// Setting variables
const image = document.querySelector('img')
const video = document.querySelector('iframe')
let information = document.querySelector('#explanation')

// Ensuring the function getFetch() runs on the button click
document.querySelector('button').addEventListener('click', getFetch)

// Functions to hide and show items using classList
function hideContent(a) {
  a.classList.add('hidden')
}
function showContent(a) {
  a.classList.remove('hidden')
}

// Conditional for showing different media types
const showMedia = (data) => {
  if (data.media_type === "image") {
    image.src = data.hdurl
    showContent(image)
    hideContent(video)
  } else if (data.media_type === "video") {
    video.src = `${data.url}autoplay=1&mute=1`
    showContent(video)
    hideContent(image)
  }
}

// The function that runs once the button is clicked
function getFetch(){

  // Setting the users date choice
  const choice = document.querySelector('input').value 

  const url = `https://api.nasa.gov/planetary/apod?api_key=DbygGuGinwdXSgotd6uuH41xSo3WmGVSSYldsfaS&date=${choice}`

  fetch(url)
    // Parse response as JSON
    .then(res => res.json()) 

    // Checking for date issues using the codes from the API
    .then(data => {
      if (data.code == 400){ // Checking for date in the future or past
        image.src = 'img/back-to-the-future.jpg'
        showContent(image)
        hideContent(video)
      } else if (data.code == 404) { //Checking for error code
        image.src = 'img/404.jpg'
        video.classList.add('hidden')
        image.classList.remove('hidden')
      } else {
        showMedia(data) // Calling the conditional function to show the media
      }

      // Placing the description into the h3
        if (data.code === 400) {
          information.innerText = 'Steady on, no time travel allowed here! Pease enter a date not in the past or future.'
        } else if (data.code === 404) {
          information.innerText = 'Oh dear, looks like NASA needed a rest on that date. Please choose another date.'
        } else {
          information.innerText = data.explanation
        }
    })

    // Catching errors
    .catch(err => {
        console.log(`error ${err}`)
    });

  }

// Showing today's current photo on page load
getFetch()


