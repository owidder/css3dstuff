export const DIRECTION_FRONT = "front";
export const DIRECTION_LEFT = "left";
export const DIRECTION_RIGHT = "right";
export const DIRECTION_BACK = "back";
export const DIRECTION_TOP = "top";
export const DIRECTION_BOTTOM = "bottom";

export const AXIS_X = "ax";
export const AXIS_Y = "ay";

const rules = {
    [DIRECTION_FRONT]: {
        [AXIS_X]: DIRECTION_BOTTOM,
        [AXIS_Y]: DIRECTION_RIGHT
    },
    [DIRECTION_LEFT]: {
        [AXIS_X]: DIRECTION_LEFT,
        [AXIS_Y]: DIRECTION_FRONT
    },
    [DIRECTION_RIGHT]: {
        [AXIS_X]: DIRECTION_RIGHT,
        [AXIS_Y]: DIRECTION_BACK
    },
    [DIRECTION_BACK]: {
        [AXIS_X]: DIRECTION_TOP,
        [AXIS_Y]: DIRECTION_LEFT
    },
    [DIRECTION_TOP]: {
        [AXIS_X]: DIRECTION_FRONT,
        [AXIS_Y]: DIRECTION_TOP
    },
    [DIRECTION_BOTTOM]: {
        [AXIS_X]: DIRECTION_BACK,
        [AXIS_Y]: DIRECTION_BOTTOM
    },
}

export const nextDirection = (currentDirection, axis) => {
    return rules[currentDirection][axis];
}
