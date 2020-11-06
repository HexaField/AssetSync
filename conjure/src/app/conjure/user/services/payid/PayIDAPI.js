export async function getPublicAccount(domain, account) {
    try{
        let myHeaders = new Headers()
        myHeaders.append('Accept', 'application/btc-testnet+json')
        myHeaders.append('PayID-Version', '1.0')

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // mode: global.DEV_ENVIRONMENT ? 'no-cors' : 'cors'
        }
        let url = "https://" + domain + "/" + account
        let response = await fetch(url, requestOptions)
        let data = await response.json()
        return data
    }
    catch(error)
    {
        console.log(error)
    }
}

export async function getAccount(domain, account) {
    let myHeaders = new Headers()
    myHeaders.append("PayID-API-Version", "2020-06-18")
    myHeaders.append("Content-Type", "application/json")

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }
    
    if(global.DEV_ENVIRONMENT)
        requestOptions.mode = 'no-cors'

    let response = await fetch("http://" + domain + ":8081/users/" + account + "$" + domain, requestOptions)
    let data = await response.text()
    return data
}

export async function makeAccount(domain, account) {
    let myHeaders = new Headers()
    myHeaders.append("PayID-API-Version", "2020-06-18")
    myHeaders.append("Content-Type", "application/json")

    let raw = JSON.stringify({
        "payId": account + '$' + domain,
        "addresses": [],
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    let response = await fetch("http://" + domain + ":8081/users", requestOptions)
    let data = await response.json()
    return data
}

export async function updateAccount(domain, account, addresses) {
    var myHeaders = new Headers()
    myHeaders.append("PayID-API-Version", "2020-06-18")
    myHeaders.append("Content-Type", "application/json")

    let raw = JSON.stringify({
        "payId": account + '$' + domain,
        "addresses": addresses
    })

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    let response = await fetch("http://" + domain + ":8081/users/" + account + "$" + domain, requestOptions)
    let data = await response.json()
    return data
}

