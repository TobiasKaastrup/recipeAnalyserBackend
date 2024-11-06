const { OpenAI } = require("openai")
require('dotenv').config()

//new OpenAI({ apiKey: 'My API Key' })


const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

module.exports = openai