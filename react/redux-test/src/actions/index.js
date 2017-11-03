export const DO_CLICK = 'DO_CLICK';
export const ADD_CIRCLE = 'ADD_CIRCLE';

const ids = (function* () {
    let ctr = 0;
    while(true) {
        yield ctr++;
    }
})();

export const addCircle = (props) => {
    return {
        type: ADD_CIRCLE,
        rect: {...props, id: ids.next().value}
    }
}

export const doClick =  id => {
    return {
        type: DO_CLICK,
        id
    }
}
