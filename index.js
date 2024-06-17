const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const { AvatarGenerator } = require('random-avatar-generator');
const cors = require('cors');

const app = express();
const port = 3000;
const generator = new AvatarGenerator();

app.use(cors());

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
    const avatarUrl = generateCustomAvatar(options);
    res.send({ avatarUrl });
});

// Endpoint to download avatar image
app.get('/download-avatar', async (req, res) => {
    try {
        // Construct the avatar URL based on query parameters
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
        const avatarUrl = generateCustomAvatar(options);

        // Fetch the avatar image from avataaars.io
        const imageResponse = await axios.get(avatarUrl, { responseType: 'arraybuffer' });

        // Convert the image buffer to JPEG using Sharp
        const buffer = Buffer.from(imageResponse.data);
        const jpegBuffer = await sharp(buffer).jpeg().toBuffer();

        // Set content type as image/jpeg
        res.set('Content-Type', 'image/jpeg');

        // Send the converted image buffer as the response
        res.send(jpegBuffer);
    } catch (error) {
        console.error('Error downloading avatar:', error);
        res.status(500).send('Error downloading avatar. Please try again later.');
    }
});

app.listen(port, () => {
    console.log(`Avatar creator app listening at http://localhost:${port}`);
});
