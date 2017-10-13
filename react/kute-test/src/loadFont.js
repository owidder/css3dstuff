import {load} from 'opentype.js';

import SimplePromise from './SimplePromise';

const loadFont = () => {
    const p = new SimplePromise();
    load('fonts/Roboto-Black.ttf', (err, font) => {
        p.resolve(font);
    });

    return p.promise;
}

export default loadFont;
