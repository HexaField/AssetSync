export function sqrDistance(from, to) {
    const x = to.x - from.x
    const y = to.y - from.y
    return Math.sqrt((x * x) + (y * y))
}