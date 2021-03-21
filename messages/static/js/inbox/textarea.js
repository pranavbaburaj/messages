import { ALLOWED_KEY_CODES } from '../constants.js'
export class BodyTextArea {
    constructor(textArea, textAreaKey, lengthLimit, character, log){
        this.textArea = textArea
        this.textAreaKey = textAreaKey
        this.lengthLimit = parseInt(lengthLimit) == NaN ? "∞" : parseInt(lengthLimit)
        this.label = character
        this.log = log

        this.updateTextAreaLabel()

        this.textArea.setAttribute('limit', this.lengthLimit)
        this.textArea.setAttribute('key', this.textAreaKey)

        this.textArea.setAttribute('update', this.updateTextAreaLabel)

        this.addEventListeners()
    }

    updateTextAreaLabel = () => {
        this.label.innerHTML = `${this.textLimitExceed()}/${this.lengthLimit}`
    }

    textLimitExceed = () => {
        // return this.textArea.value.split(' ').length
        return this.textArea.value.split(' ').length > this.lengthLimit ? this.lengthLimit : this.textArea.value.split(' ').length;
    }

    addEventListeners = () => {
        this.textArea.addEventListener('keydown', (event) => {
            let lengthData = this.textArea.value.split(" ").length
            if(lengthData >= this.lengthLimit){
                if(lengthData > this.lengthLimit){
                    this.updateTextAreaLabel()
                    this.log.innerHTML = `Only  ${this.lengthLimit} words in body`
                    return 0;
                }
                window.localStorage.setItem('body', this.textArea.value.toString())
            }

            window.localStorage.setItem('body', this.textArea.value.toString())

            this.log.innerHTML = ``
            this.updateTextAreaLabel()
        })
    }
}