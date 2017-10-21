import Fonts from './Fonts';

const fonts = new Fonts();

const KUTE = require('kute.js');
require("kute.js/kute-svg");

class DrawText {

    constructor(root,
                fromSelector,
                toSelector,
                text,
                fontPath = 'fonts/Roboto-Black.ttf',
                x = 0,
                y = 0,
                size = 100) {
        this.root = root;
        this.fromSelector = fromSelector;
        this.toSelector = toSelector;
        this.text = text;
        this.fontPath = fontPath;
        this.x = x;
        this.y = y;
        this.size = size;
    }

    _getPath(ch, font) {
        return font.getPath(ch, this.x, this.y, this.size).toPathData();
    }

    * _chars() {
        let currentIndex = 0;
        while(true) {
            yield this.text[currentIndex];
            currentIndex = (currentIndex < this.text.length-1 ? currentIndex+1 : 0);
        }
    }

    _setToD(newToD) {
        const toPath = this.root.select(this.toSelector);
        const oldToD = toPath.attr("d");
        const fromPath = this.root.select(this.fromSelector);
        fromPath.attr("d", oldToD);
        toPath.attr("d", newToD);
    }

    _morph() {
        KUTE.to(this.fromSelector, { path: this.toSelector}, {duration: 100}).start();
    }

    _drawNextChar(chars, font) {
        const charD = this._getPath(chars.next().value, font);
        this._setToD(charD);
        this._morph();
        const that = this;
        setTimeout(() => {
            that._drawNextChar(chars, font);
        }, Math.random(1500) + 500)
    }

    async start() {
        const font = await fonts.getFont(this.fontPath);
        const chars = this._chars();
        this._drawNextChar(chars, font);
    }
}

export default DrawText;