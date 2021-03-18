import { getCookieElement } from "./csrf.js"

export function findButtonByType(buttonList, buttonType, buttonText) {
    for (let index = 0; index < buttonList.length; index++) {
        const currentButtonElement = buttonList[index]
        if (currentButtonElement.type == buttonType && currentButtonElement.innerHTML == buttonText) {
            return currentButtonElement
        }
    }
    return null
}

const getInputByName = (inputBoxes, findName) => {
    let matchingBoxList = new Array()

    for (let idx = 0; idx < inputBoxes.length; idx++) {
        const currentElement = inputBoxes[idx]
        if (currentElement.name == findName.toString()) {
            matchingBoxList.push(
                currentElement
            )
        }
    }

    if (matchingBoxList.length > 1) {
        throw Error(`Expected a single list, but got ${matchingBoxList.length}`)
    }

    return matchingBoxList[0]
}

export class FormSubmissionButton {
    constructor(buttonObject, postDataUrl, parameters) {
        this.buttonObject = buttonObject
        this.postDataUrl = this.getPostUrl(postDataUrl)

        this.submitParameters = parameters

        // window.localStorage.setItem('')
        buttonObject.setAttribute('post', this.postDataUrl)

        this.addObjectEventListeners(this.buttonObject)
    }

    addObjectEventListeners = (buttonObject) => {

        if (buttonObject == null) { return null; }
        else {
            buttonObject.classList.add(
                `${buttonObject.innerHTML.toString().toLowerCase()}-submit`
            )
            buttonObject.addEventListener('click', function (event) {
                const inputBoxes = document.getElementsByTagName("input")

                const getAsBoolean = (data) => {
                    let boolForm = data == "False" ? false : true
                    return boolForm
                }

                if (inputBoxes.length == 2) {
                    let userName = getInputByName(inputBoxes, "username")
                    let passwordText = getInputByName(inputBoxes, "password")

                    if (userName.value.length == 0 || passwordText.value.length == 0) {
                        return null
                    } else {
                        userName.value = userName.value.toString().replace(
                            " ", "_"
                        )

                        const userExists = getAsBoolean(window.localStorage.getItem("userNameExists"))

                        if (!userExists) { 
                            showModalBox("Wrong username or password") 
                        } else {
                            let formData = {
                                username : userName.value,
                                password : passwordText.value
                            }
                            fetch(this.getAttribute('post'), {
                                method : "POST",
                                body : JSON.stringify(formData),
                                headers: {"Content-type": "application/json; charset=UTF-8", "X-CSRFToken": getCookieElement('csrftoken')}
                            }).then((response) => response.json()).then((data) => {
                                if(parseInt(data.status) == 200){
                                    window.localStorage.setItem('userData', {
                                        username : data.username,
                                        name : data.name
                                    })

                                    window.localStorage.setItem('lastUsername')
                                }
                            }).catch((error) => console.log(error))
                        }
                    }
                } else {
                    return null;
                }
            })
        }
    }

    // verify the url to start and end with a slashes
    getPostUrl = (postUrl) => {
        if (postUrl.endsWith("/") && postUrl.startsWith("/")) {
            return `${window.location.origin}${postUrl.toString()}`
        } else {
            throw Error("No a valid URL")
        }
    }
}