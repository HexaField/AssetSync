import { isNode } from './index.js'

function homedir () {
    if(isNode) {
        return require('os').homedir()
    }
    return '/'
}

export { homedir }