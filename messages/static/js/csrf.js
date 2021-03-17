
export function getCookieElement(key){
    const splitText = document.cookie.toString().split(";")
    console.log( splitText )
    for(let cidx=0; cidx<splitText.length; cidx++){
        const currentKey = splitText[cidx]
        console.log(currentKey)
        for(let eidx=0; eidx<currentKey.length; eidx++){
            if(currentKey[eidx] == "="){
                if(currentKey.slice(0, eidx) == key){
                    return currentKey.slice(eidx+1, currentKey.length)
                }
            }
        }
    } 
}