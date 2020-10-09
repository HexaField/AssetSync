import { isNode } from './index'

function homedir () {
    if(isNode) {
        return require('os').homedir()
    }
    return '/'
}

export { homedir }