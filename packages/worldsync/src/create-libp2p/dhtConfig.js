export default {
    protocolPrefix: '/conjure',
    kBucketSize: 20,
    enabled: true,
    randomWalk: {
        enabled: true,
        interval: 300e3,
        timeout: 10e3
    },
    validators: {
        realm: {
            func: (key, value) => {}
        }
    },
    selectors: {
        realm: () => 0
    }
}