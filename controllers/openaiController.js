const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
    const { prompt } = req.body
    const recipe = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a cooking recipe generator. Your job is to come up with a recipe that includes the ingredients that the user inputs. The user may also input a cooking technique or another constraint you should incorporate in the recipe.  You should always include a header with a recipe name, a list of ingredients as well as a series of steps to cook the dish. You are free to add any other ingredients that you think might add to the final dish" },
            {
                role: "user",
                content: "carrot",
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