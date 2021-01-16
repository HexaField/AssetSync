// import Canvas from 'canvas'
// import * as THREE from 'three'
import { JSDOM } from 'jsdom'

export async function nodePolyfillThree() {

    const dom = new JSDOM(`<!DOCTYPE html>`, {
        url: "https://conjure.world/",
        contentType: "text/html",
        includeNodeLocations: true,
        pretendToBeVisual: true
    })
    globalThis.document = dom.window.document
    globalThis.window = dom.window
}