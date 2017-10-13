import loadFont from './loadFont';

const KUTE = require('kute.js');
require("kute.js/kute-svg");

const morph = (font, text) => {
    const tween = KUTE.to('#from', { path: '#to'}, {duration: 100});
    tween.start();
}

export default morph;
