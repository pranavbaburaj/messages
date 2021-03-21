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
        this.label.innerHTML = `${this.textArea.value.split(' ').length}/${this.lengthLimit}`
    }

    addEventListeners = () => {
        this.textArea.addEventListener('keydown', (event) => {
            let lengthData = this.textArea.value.split(" ").length
            if(lengthData >= this.lengthLimit){
                if(lengthData > this.lengthLimit){
                    this.log.innerHTML = `Only  ${this.lengthLimit} words in body`
                    return 0;
                }
            }

            this.log.innerHTML = ``
            this.updateTextAreaLabel()
        })
    }
}