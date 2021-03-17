/**
 * 
 * @param {string} key 
 * @returns {string}
 */
export function getCookieElement(key) {
    // split the docment.cookie into individual 
    // pices of variabkes
    const splitText = document.cookie.toString().split(";")

    for (let cidx = 0; cidx < splitText.length; cidx++) {
        // the current individual cookie element
        const currentKey = splitText[cidx]

        for (let eidx = 0; eidx < currentKey.length; eidx++) {
            // if the current element is equal ot `=`
            // slice the string and check the key

            // if the keys match, return another sliced
            // string
            if (currentKey[eidx] == "=") {
                if (currentKey.slice(0, eidx) == key) {
                    return currentKey.slice(eidx + 1, currentKey.length)
                }
            }
        }
    }

    return null
}