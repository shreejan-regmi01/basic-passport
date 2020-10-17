const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(PORT, console.log(`listening on port ${PORT}`))