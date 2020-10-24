let ___lastTimerTime = {}

export function timer(index) {
    if(!___lastTimerTime[index])
        ___lastTimerTime[index] = Date.now()
    const time = Date.now() - ___lastTimerTime[index]
    ___lastTimerTime[index] = Date.now()
    return time
}