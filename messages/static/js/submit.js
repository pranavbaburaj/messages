export function findButtonByType(buttonList, buttonType, buttonText){
    for(let index=0; index<buttonList.length; index++){
        const currentButtonElement = buttonList[index]
        if(currentButtonElement.type == buttonType && currentButtonElement.innerHTML == buttonText){
            return currentButtonElement
        }
    }
    return null
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
                console.log(inputBoxes)
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