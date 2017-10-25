export const SMALL = 'small';
export const MIDDLE = 'middle';
export const LARGE = 'large';

export const DO_CLICK = 'DO_CLICK';
export const ADD_RECT = 'CREATE_RECT';

const ids = (function* () {
    let ctr = 0;
    while(true) {
        yield ctr++;
    }
})();

export const addRect = (props) => {
    return {
        type: ADD_RECT,
        id: ids.next(),
        rect: props
    }
}

export const doClick =  id => {
    return {
        type: DO_CLICK,
        id
    }
}
