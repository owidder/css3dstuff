import anime from 'animejs';

export const lineDraw = (selector) => {
    anime({
        targets: selector,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });
};
