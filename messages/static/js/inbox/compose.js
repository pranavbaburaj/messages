
export class ComposeMessagePost {
    constructor(messageMention, messageTitle, messageBody){
        this.toUser = messageMention
        this.title = messageTitle
        this.body = messageBody
    }
}