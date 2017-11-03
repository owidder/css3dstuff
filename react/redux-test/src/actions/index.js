export const DO_CLICK = 'DO_CLICK';
export const ADD_RECT = 'ADD_RECT';

const ids = (function* () {
    let ctr = 0;
    while(true) {
        yield ctr++;
    }
})();

export const addRect = (props) => {
    return {
        type: ADD_RECT,
        rect: {...props, id: ids.next().value}
    }
}

export const doClick =  id => {
    return {
        type: DO_CLICK,
        id
    }
}
