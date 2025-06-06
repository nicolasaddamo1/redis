import express from 'express'
import axios from 'axios'
import responseTime from 'response-time'
import { createClient } from 'redis'

const app = express()
const client = createClient({
    host: 'localhost',
    port: 6379,
})

app.use(responseTime())

app.get('/characters', async (req, res) => {

    const reply = await client.get('characters')

    if (reply) return res.json(JSON.parse(reply))

    const { data } = await axios.get('https://rickandmortyapi.com/api/character')

    const saveResult = await client.set('characters', JSON.stringify(data))

    return res.json(data)
})


const main = async () => {
    await client.connect()
    app.listen(3001)
    console.log('Connected to Redis, server is running on port 3001')
}

main()