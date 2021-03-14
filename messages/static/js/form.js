

export class FormElement {
    constructor(formClassName, formFields, formPost, formType) {
        this.className = formClassName;     // the class name
        this.formFields = formFields;   // the fields in the form
        this.formPost = this.verifyPostLink(formPost)   // the link to post the data
        this.formType = formType    // login or sign in
    }

    verifyPostLink = (formPostLink) => {
        const isLink = formPostLink.startsWith("/")
        if (!isLink) { console.error("Not a Link") }
        return isLink
    }


    getAllFields = () => {
        let fieldTemplate = ""
        for (let index = 0; index < this.formFields.length; index++) {
            const currentField = this.formFields[index]
            fieldTemplate += `
            <div class="fi">
                    <input class="${currentField.name}" type="${currentField.type}" placeholder="${currentField.placeHolder}" name="${currentField.name}" autocomplete="off">
            </div>
            `
        }

        return fieldTemplate.toString()
    }

    buttonText = () => {
        if (this.formType == "Login") {
            return "Login"
        } else {
            return "Sign In"
        }
    }

    renderFormTemplate = (selector) => {
        const template = `
        <div class="${this.className}">
            <form>
                ${this.getAllFields()}
            </form>
            <div class="fi">
                    <button type="submit">${this.buttonText()}</button>
            </div>
        </div>
        `

        selector.innerHTML = template.toString()
    }

}

