export function sqrDistance(from, to) {
    const x = to.x - from.x
    const y = to.y - from.y
    return Math.sqrt((x * x) + (y * y))
}

export function distance(from, to) {
    const x = to.x - from.x
    const y = to.y - from.y
    return (x * x) + (y * y)
}