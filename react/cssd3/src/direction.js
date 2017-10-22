export const FRONT = "front";
export const LEFT = "left";
export const RIGHT = "right";
export const BACK = "back";
export const TOP = "top";
export const BOTTOM = "bottom";

export const AXIS_X = "ax";
export const AXIS_Y = "ay";

const rules = {
    [FRONT]: {
        [AXIS_X]: BOTTOM,
        [AXIS_Y]: RIGHT
    },
    [LEFT]: {
        [AXIS_X]: LEFT,
        [AXIS_Y]: FRONT
    },
    [RIGHT]: {
        [AXIS_X]: RIGHT,
        [AXIS_Y]: BACK
    },
    [BACK]: {
        [AXIS_X]: TOP,
        [AXIS_Y]: LEFT
    },
    [TOP]: {
        [AXIS_X]: FRONT,
        [AXIS_Y]: TOP
    },
    [BOTTOM]: {
        [AXIS_X]: BACK,
        [AXIS_Y]: BOTTOM
    },
}

export const nextDirection = (currentDirection, axis) => {
    return rules[currentDirection][axis];
}
