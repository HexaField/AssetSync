import { isNode } from '../index.js'

export async function libp2p(config = {}) {
    if (isNode) {
        const { default: Libp2p } = await import('./create-libp2p.js')
        return await Libp2p(config)
    } else {
        const { default: Libp2p } = await import('./create-libp2p-browser.js')
        return await Libp2p(config)
    }
}