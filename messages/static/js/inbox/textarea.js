
export class BodyTextArea {
    constructor(textArea, textAreaKey, lengthLimit, character){
        this.textArea = textArea
        this.textAreaKey = textAreaKey
        this.lengthLimit = parseInt(lengthLimit) == NaN ? "∞" : parseInt(lengthLimit)
        this.label = character

        this.updateTextAreaLabel()

        this.textArea.setAttribute('limit', this.lengthLimit)
        this.textArea.setAttribute('key', this.textAreaKey)

        this.textArea.setAttribute('update', this.updateTextAreaLabel)

        this.addEventListeners()
    }

    updateTextAreaLabel = () => {
        this.label.innerHTML = `${this.textArea.value.toString().length}/${this.lengthLimit}`
    }

    addEventListeners = () => {
        this.textArea.addEventListener('keydown', (event) => {
            if(this.textArea.value.length >= this.lengthLimit){
                if(this.textArea.value.length > this.lengthLimit){
                    this.textArea.value = this.textArea.value.slice(
                        0, this.lengthLimit
                    )
                    this.updateTextAreaLabel()
                }
            }

            this.updateTextAreaLabel()
        })
    }
}