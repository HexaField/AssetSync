import { Client } from '@AssetSync/WorldSync'

export default async function runApp(worldSync) {

    const client = new Client(worldSync)
    await client.start()

    console.log('Starting client...')

    // client stuff
    
}