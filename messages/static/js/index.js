import { FormElement } from "./form.js"

// selectors
const LOGIN_FORM_CONTAINER = document.querySelector(".login-container")

// xhr to send http requests
export const xhr = new XMLHttpRequest()

function renderLoginForm() {
    const loginForm = new FormElement(
        "login",
        [
            { type: "input", "placeHolder": "username", "name": "username" },
            { type: "password", "placeHolder": "password", "name": "password" },
        ],
        "/login/",
        "Login"
    )
    loginForm.renderFormTemplate(LOGIN_FORM_CONTAINER)
}


// make sure that the page is
// login page and do the
// login form rendering
if (window.location.pathname == "/") {
    renderLoginForm()
}




