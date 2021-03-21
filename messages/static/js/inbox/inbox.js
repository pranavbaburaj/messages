import { LogoutAction } from "../logout.js"
import { BodyTextArea } from './textarea.js'

// the dom elements to add event listeners
let composeModal = document.querySelector(".compose-new-modal-box");
let composeButton = document.querySelector(".compose-new-btn");
let closeComposeModal = document.getElementsByClassName("close")[0];

// log error message
let log = document.querySelector('.log')

let toInputBox = document.querySelector("#to")
let titleBox = document.querySelector("#title")

export const replaceBoxValue = (inputBox, localStorageKey) => {
    const data = window.localStorage.getItem(localStorageKey)
    if(data != null || data != undefined){
        inputBox.value = data.toString()
    }
}

replaceBoxValue(toInputBox, "to")
replaceBoxValue(titleBox, "title")


// form textarea object and related objects
let textArea = document.querySelector("#subject")
let textAreaCharacterLabel = document.querySelector(".char")

replaceBoxValue(textArea, "body")

const textareaWidget = new BodyTextArea(textArea, "body", 500, textAreaCharacterLabel, 
    log
) 

// change the modal style to the parameter
const switchComposeModalDisplay = (display) => {
    composeModal.style.display = display.toString()
}

switchComposeModalDisplay("none")

composeButton.addEventListener('click', function (event) {
    switchComposeModalDisplay("block")
})

closeComposeModal.addEventListener('click', function (event) {
    switchComposeModalDisplay("none")
})


// the logout button
let logoutAction = new LogoutAction(document.querySelector('.logout'))

window.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.keyCode == 67) {
        switchComposeModalDisplay("block")
    }
})

toInputBox.addEventListener('keydown', function (event) {
    if (toInputBox.value.toString().length == 0) {
        return 0;
    }

    if (!toInputBox.value.toString().startsWith("@")) {
        log.innerHTML = "Username should start with an @ sign"
    } else {
        log.innerHTML = ""
    }

    window.localStorage.setItem('to', toInputBox.value.toString())
})

titleBox.addEventListener('keydown', (event) => {
    window.localStorage.setItem('title', titleBox.value.toString())
})
