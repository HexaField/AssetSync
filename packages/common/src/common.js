import { isNode } from './index.js'
import os from 'os'

function homedir () {
    if(isNode) {
        return os.homedir() + '/'
    }
    return ''
}

export { homedir }