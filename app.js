const express = require('express')
const cors = require('cors')
const { generateMeta, generateImage } = require('./controllers/openaiController.js')

let port = process.env.PORT || 4000

// app setup
const app = express ()
app.listen(port, () => console.log('Listening for requests on port 4000'))

// Enable CORS for all origins
app.use(cors()); // This allows all origins to access your API

//middleware
app.use(express.json())

// route
app.post('/openai/meta',generateMeta)
app.post('/openai/image',generateImage)