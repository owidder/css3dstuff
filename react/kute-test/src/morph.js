const KUTE = require('kute.js');
require("kute.js/kute-svg");

const morph = (selectorFrom, selectorTo) => {
    const tween = KUTE.to(selectorFrom, { path: selectorTo}, {duration: 100});
    tween.start();
}

export default morph;
