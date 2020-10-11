import { isNode } from './index.js'
let os

if(isNode)
    os = await import('os')

function homedir () {
    if(isNode) {
        return os.homedir()
    }
    return '/'
}

export { homedir }