export class LogoutAction {
    constructor(logoutButtonElement){
        this.logoutButtonElement = this.getButtonElement(logoutButtonElement)

        this.logoutButtonElement.setAttribute('url', '/logout/')
        this.beginButtonAction()
    }

    getButtonElement = (logoutButton) => {
        return typeof(logoutButton) == "object" ? logoutButton : null
    }

    beginButtonAction = () => {
        this.logoutButtonElement.addEventListener('click', (event) => {
            this.logoutButtonElement.disabled = true
            this.logoutButtonElement.innerHTML = "Wait..."

            const url = `${window.location.origin}${this.logoutButtonElement.getAttribute('url')}`
            setTimeout(function() {
                // window.location.href = url
                fetch(url, {
                    method : "GET",
                    headers : { "Content-type": "application/json; charset=UTF-8"}
                }).then((response) => {
                    console.log(response)
                    window.location.reload()
                }).catch((error) => console.log(error))
            }, 1000)
        })
    } 
}