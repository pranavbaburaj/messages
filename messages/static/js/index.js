import { FormElement } from "./form.js"

// selectors
const LOGIN_FORM_CONTAINER = document.querySelector(".login-container")

export const booleanValue = (string) => string === 'false' ? false : !!string

export function isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
        return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
}

function userAvailavbility(event, element){
    const checkImportantKeys = (keyEvent) => {
        console.log(keyEvent)
        return true
    }

    if(element.name == "username"){
        if(!checkImportantKeys(event)){
            event.preventDefault()
        }else{
            return 0;
        }

        const checkKey = (keyPressed, value) => {
            return keyPressed.code.toString().includes(value)
        }

        if(checkKey(event, "Key") || checkKey(event, "Numpad") || checkKey(event, "Digit")){    
            element.value += event.key.toString()
        }

        if(event.altKey){
            element.value += event.key.toString()
        }

        if(element.value.toString().length > 0){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", `/user/exists/${element.value}`, false ); // false for synchronous request
            xmlHttp.send( null );
            
            console.log(xmlHttp.responseText)
        }
    } 
}

function renderLoginForm() {
    const loginForm = new FormElement(
        "login",
        [
            { type: "input", "placeHolder": "username", "name": "username" , "onKeyDown" : userAvailavbility},
            { type: "password", "placeHolder": "password", "name": "password" , "onKeyDown" : userAvailavbility},
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

    const userNameElement = document.querySelector(".username")
    userNameElement.addEventListener('keydown', (event) => {
        userAvailavbility(event, userNameElement)
    } )
}




