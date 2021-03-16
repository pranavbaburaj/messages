export function findButtonByType(buttonList, buttonType, buttonText){
    for(let index=0; index<buttonList.length; index++){
        const currentButtonElement = buttonList[index]
        if(currentButtonElement.type == buttonType && currentButtonElement.innerHTML == buttonText){
            return currentButtonElement
        }
    }
    return null
}

const getInputByName = (inputBoxes, findName) => {
    let matchingBoxList = new Array()

    for(let idx=0; idx<inputBoxes.length; idx++){
        const currentElement = inputBoxes[idx]
        if(currentElement.name == findName.toString()){
            matchingBoxList.push(
                currentElement
            )
        }
    }

    if(matchingBoxList.length > 1){
        throw Error(`Expected a single list, but got ${matchingBoxList.length}`)
    }

    return matchingBoxList[0]
}

export class FormSubmissionButton {
    constructor(buttonObject, postDataUrl, parameters){
        this.buttonObject = buttonObject
        this.postDataUrl = this.getPostUrl(postDataUrl)

        this.submitParameters = parameters

        this.addObjectEventListeners(this.buttonObject)
    }

    addObjectEventListeners = (buttonObject) => {

        if(buttonObject == null){ return null; }
        else {
            buttonObject.classList.add(
                `${buttonObject.innerHTML.toString().toLowerCase()}-submit`
            )
            buttonObject.addEventListener('click', function(event) {
                const inputBoxes = document.getElementsByTagName("input")
                if(inputBoxes.length == 2){
                    let userName = getInputByName(inputBoxes, "username")
                    let passwordText = getInputByName(inputBoxes, "password")

                    if(userName.value.length == 0 || passwordText.value.length == 0){
                        return null
                    } else {
                        userName.value = userName.value.toString().replace(
                            " ", "_"
                        )

                        const userExists = window.localStorage.getItem("userNameExists")
                        console.log(userExists)
                    }
                } else {
                    return null;
                }
            })
        }
    }

    // verify the url to start and end with a slashes
    getPostUrl = (postUrl) => {
        if (postUrl.endsWith("/") && postUrl.startsWith("/")){
            return `${window.location.origin}${postUrl.toString()}`
        } else {
            throw Error("No a valid URL")
        }
    }
}