const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
    const { messages } = req.body

    const recipe = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages
    })

    res.status(200).json({
        recipe: recipe.choices[0].message
    })
}

const generateImage = async (req, res) => {
    const image = await openai.images.generate({
        model:"dall-e-3",
        prompt: req.body.prompt,
        size: "256x256",
        n: 1,
    }
    );

    res.status(200).json({
        url: image.data[0].url
    })
}

module.exports = { generateMeta, generateImage }