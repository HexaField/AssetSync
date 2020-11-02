import { PayIdClient, IlpClient, PaymentRequest } from 'https://cdn.skypack.dev/xpring-js'

export default class DigitalAssetHandler
{
    async initialise()
    {
        await this.initXpring()
    }

    async initXpring()
    {
        this.payIdClient = new PayIdClient()
        // this.ilpClient = new IlpClient('prod.grpcng.wallet.xpring.io:443')
        // this.ilpClient.getBalance('hexafield', 'NjJhNGZiODYtNDA3YS00YjZjLWEzMTYtOWU4MDQzZmM2Nzc2')
    }

    async makePayment(amount, to, from)
    {
        // let paymentRequest = new PaymentRequest({
        //     amount: bigInt.one,
        //     destinationPaymentPointer: destination,
        //     senderAccountId: sender
        // })
        // console.log(this.ilpClient.sendPayment(paymentRequest))
        return true
    }
}