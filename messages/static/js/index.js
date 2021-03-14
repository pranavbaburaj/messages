import { FormElement } from "./form.js"

// selectors
const LOGIN_FORM_CONTAINER = document.querySelector(".login-container")

export const xhr = new XMLHttpRequest()

function renderLoginForm() {
    const loginForm = new FormElement(
        "login",
        [
            {type:"input", "placeHolder" : "username", "name":"username"},
            {type:"password", "placeHolder" : "password", "name" : "password"},
        ],
        "/login/",
        "Login"
    )
    loginForm.renderFormTemplate(LOGIN_FORM_CONTAINER)
}


if(window.location.pathname == "/"){
    renderLoginForm()
}




