const express = require('express');
const { AvatarGenerator } = require('random-avatar-generator');
const cors=require("cors")
const app = express();
const port = 3000;
app.use(cors());
const generator = new AvatarGenerator();

// Function to generate avatar URL with customization options
function generateCustomAvatar(options) {
    const baseUrl = 'https://avataaars.io/';
    const params = new URLSearchParams(options).toString();
    return `${baseUrl}?${params}`;
}

// Route to get a random avatar
app.get('/avatar', (req, res) => {
    const avatarUrl = generator.generateRandomAvatar();
    res.send({ avatarUrl });
});


// Route to get a custom avatar
app.get('/avatar/custom', (req, res) => {
    const options = {
        avatarStyle: req.query.avatarStyle || 'Circle',
        topType: req.query.topType || 'ShortHairShortFlat',
        accessoriesType: req.query.accessoriesType || 'Blank',
        hairColor: req.query.hairColor || 'BrownDark',
        facialHairType: req.query.facialHairType || 'Blank',
        facialHairColor: req.query.facialHairColor || 'BrownDark',
        clotheType: req.query.clotheType || 'BlazerShirt',
        clotheColor: req.query.clotheColor || 'Red',
        eyeType: req.query.eyeType || 'Default',
        eyebrowType: req.query.eyebrowType || 'Default',
        mouthType: req.query.mouthType || 'Default',
        skinColor: req.query.skinColor || 'Light',
        hatColor: req.query.hatColor || 'White'
    };
    console.log("Received avatar generation request with options:", options);
    
    const avatarUrl = generateCustomAvatar(options);
    console.log("Generated avatar URL:", avatarUrl);
    
    res.send({ avatarUrl });
});


app.listen(port, () => {
    console.log(`Avatar creator app listening at http://localhost:${port}`);
});
