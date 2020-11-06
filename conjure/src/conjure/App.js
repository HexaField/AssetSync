export default async function(data) {

    console.log('Starting conjure...', data)
    const { startConjure } = await import('./Conjure.js')
    startConjure(data)
}