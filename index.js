import express from 'express'
import axios from 'axios'

const app = express()

app.get('/characters', async (req, res) => {
    const { data } = await axios.get('https://rickandmortyapi.com/api/character')
    return res.json(data)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})