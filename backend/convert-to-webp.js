const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const backupDir = './public/images/blogs/backup';
const outputDir = './public/images/blogs/converted';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);  // Create the output directory if it doesn't exist
}

fs.readdirSync(backupDir).forEach(file => {
    if (path.extname(file).toLowerCase() === '.jpg') {
        const webpFilePath = `${outputDir}/${path.basename(file, '.jpg')}.webp`;

        // Convert to WebP and save in the converted folder
        sharp(`${backupDir}/${file}`)
            .toFormat('webp')
            .toFile(webpFilePath)
            .then(() => {
                console.log(`Converted ${file} to WebP and saved in converted folder`);
            })
            .catch((err) => {
                console.error(`Error converting ${file}:`, err);
            });
    }
});
