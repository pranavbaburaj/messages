
// the dom elements to add event listeners
let composeModal = document.querySelector(".compose-new-modal-box");
let composeButton = document.querySelector(".compose-new-btn");
let closeComposeModal = document.getElementsByClassName("close")[0];

// change the modal style to the parameter
const switchComposeModalDisplay = (display) => {
    composeModal.style.display = display.toString()
}

composeButton.addEventListener('click', function(event) {
    switchComposeModalDisplay("block")
})

closeComposeModal.addEventListener('click', function(event) {
    switchComposeModalDisplay("none")
})


// hide the modal box
switchComposeModalDisplay("none")