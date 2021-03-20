import { LogoutAction } from "../logout.js"

// the dom elements to add event listeners
let composeModal = document.querySelector(".compose-new-modal-box");
let composeButton = document.querySelector(".compose-new-btn");
let closeComposeModal = document.getElementsByClassName("close")[0];

// log error message
let log = document.querySelector('.log')



// change the modal style to the parameter
const switchComposeModalDisplay = (display) => {
    composeModal.style.display = display.toString()
}

switchComposeModalDisplay("none")

composeButton.addEventListener('click', function(event) {
    switchComposeModalDisplay("block")
})

closeComposeModal.addEventListener('click', function(event) {
    switchComposeModalDisplay("none")
})


// the logout button
let logoutAction = new LogoutAction(document.querySelector('.logout'))

window.addEventListener('keydown', function(event) {
    if(event.shiftKey && event.keyCode == 67){
        switchComposeModalDisplay("block")
    }
})

