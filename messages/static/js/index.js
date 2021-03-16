import { FormElement } from "./form.js"
import { cannotContainUsername } from "./constants.js"
import { FormSubmissionButton, findButtonByType } from "./submit.js"

// compile markdown into html code to be rendered
// inside of a div element
import "../node_modules/marked/marked.min.js";


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

    const saveLastUserName = (elementValue) => {
        window.localStorage.setItem(
            "lastUserName", elementValue
        )
    }
    

    const removeUserMention = (element) => {
        if(element.value.toString().includes("@")){
            element.value = element.value.replace("@", "_")
        }
    }


    const checkImportantKeys = (keyEvent) => {
        return (
            keyEvent.ctrlKey && keyEvent.keyCode == 65 ||
            keyEvent.ctrlKey && keyEvent.keyCode == 88 ||
            keyEvent.ctrlKey && keyEvent.keyCode == 67 ||
            keyEvent.ctrlKey && keyEvent.keyCode == 86 ||
            keyEvent.code == "Backspace"
        )
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

        removeUserMention(element)
        saveLastUserName(element.value)
        if(element.value.toString().length > 0){

            
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", `/user/exists/${element.value}`, false ); // false for synchronous request
            xmlHttp.send( null );
            
            window.localStorage.setItem("userNameExists" , xmlHttp.responseText)
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
        "Login",
    )
    loginForm.renderFormTemplate(LOGIN_FORM_CONTAINER)
}

const retrieveLastUserName = (element) => {
    const lastTypesUsername = window.localStorage.getItem('lastUserName')
    if(lastTypesUsername != null){
        element.value = lastTypesUsername.toString()
    }
}


// make sure that the page is
// login page and do the
// login form rendering
if (window.location.pathname == "/") {
    renderLoginForm()

    const userNameElement = document.querySelector(".username")
    retrieveLastUserName(userNameElement)

    userNameElement.addEventListener('keydown', (event) => {
        userAvailavbility(event, userNameElement)
    } )

    userNameElement.addEventListener('paste', (event) => {
        console.log("Pasting username ?? too bad")
    })

    

    const submitButton = new FormSubmissionButton(
        findButtonByType(
            document.getElementsByTagName('button'),
            "submit",
            "Login"
        ),
        "/login/",
        {}
    )

}




