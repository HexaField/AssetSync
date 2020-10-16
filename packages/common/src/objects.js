export function simplifyObject(object) {
    let messageData = {}
    for (let prop in object)
        if (typeof object[prop] !== 'function' && typeof object[prop] !== 'object')
            messageData[prop] = object[prop]
    return messageData
}

export function getCircularReplacer() {
    const seen = new WeakSet()
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return
            }
            seen.add(value)
        }
        return value
    }
}