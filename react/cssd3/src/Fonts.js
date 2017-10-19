import _ from 'lodash';
import {load} from 'opentype.js';

class Fonts {

    constructor() {
        this.fonts = {};
    }

    _addFont(fontPath, font) {
        this.fonts[fontPath] = font;
    }

    _loadFont(fontPath) {
        return new Promise(resolve => {
            load(fontPath, (err, font) => {
                this._addFont(fontPath, font);
                resolve(font);
            });
        })
    }

    async getFont(fontPath) {
        if(_.isEmpty(this.fonts[fontPath])) {
            return this._loadFont(fontPath);
        }
        return this.fonts(fontPath);
    }
}

export default Fonts;
