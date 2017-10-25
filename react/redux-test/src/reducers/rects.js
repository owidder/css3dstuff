import {DO_CLICK, ADD_RECT} from '../actions';

export const rects = (state = [], action) => {

    switch (action.type) {
        case DO_CLICK: {
            return state.map(rect => (action.id === rect.id) ?
                {...rect, clicks: rect.clicks + 1} :
                rect
            )
        }

        case ADD_RECT: {
            return [...state, {...action.rect, clicks: 0}]
        }
    }
}