const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
    const { prompt } = req.body
    const recipe = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a cooking recipe generator. The user will give you a URL to an online cooking recipe. Your initial job is to analyze the dish and give it a rating of 1-10 and these parameters 1) Spiciness, 2), Richness ,3) Salt level, 4) Acidity, 5) The abstraction level of the language in the recipe, 6) The texture of the dish (smooth -> crispy), 7) Complexity (skill level required by the cook), 8) Speed (how long does it take to took)"
            },
            {
                role: "user",
                content: 'https://ottolenghi.co.uk/pages/recipes/puttanesca-style-salmon-bake',
            },
        ],
    })

    res.status(200).json({
        recipe: recipe.choices[0].message
    })
}

const generateImage = async (req, res) => {
    const image = await openai.images.generate({
        model:"dall-e-3",
        prompt: req.body.prompt,
        size: "1024x1024",
        n: 1,
    }
    );

    res.status(200).json({
        url: image.data[0].url
    })
}

module.exports = { generateMeta, generateImage }