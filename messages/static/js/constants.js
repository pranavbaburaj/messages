export const cannotContainUsername = (key) => {
    // const values = [
    //     "!", "@", "#",
    //     "$", "%", "^",
    //     "&", "*", "(",
    //     ")", "=", ";",
    //     ".", "/", "|",
    //     "~", "`", "{",
    //     "}", "[", "]"
    // ]
    return !(
        key.shiftKey && key.keyCode == 49 ||
        key.shiftKey && key.keyCode == 50 ||
        key.shiftKey && key.keyCode == 48 ||
        key.shiftKey && key.keyCode == 51 ||
        key.shiftKey && key.keyCode == 52 ||
        key.shiftKey && key.keyCode == 53 ||
        key.shiftKey && key.keyCode == 54 ||
        key.shiftKey && key.keyCode == 55 ||
        key.shiftKey && key.keyCode == 56 ||
        key.shiftKey && key.keyCode == 57 ||
        key.shiftKey && key.keyCode == 191 ||
        key.shiftKey && key.keyCode == 188 ||
        key.shiftKey && key.keyCode == 190 ||
        key.shiftKey && key.keyCode == 186
    )
}


// the title of the PAGE
export const MESSAGE_ME_TITLE = "MessageMe"