import {load} from 'opentype.js';

const textToPath = () => {
    load('fonts/Roboto-Black.ttf', (err, font) => {
        console.log(font.getPath('Hello, World!', 0, 150, 72));
    })
}

export default textToPath;
