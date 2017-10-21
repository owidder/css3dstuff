import React, {Component} from 'react';

import './App.css';
import drawSvgBars from './drawSvgBars';
import {LOWER_LEFT, LOWER_RIGHT, UPPER_LEFT, UPPER_RIGHT} from './places';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const SIDE_LENGTH = Math.min(WIDTH, HEIGHT) / 4;

const UPPER = HEIGHT / 4 - SIDE_LENGTH / 2;
const LOWER = HEIGHT * (3 / 4) - SIDE_LENGTH / 2;
const LEFT = WIDTH / 4 - SIDE_LENGTH / 2;
const RIGHT = WIDTH * (3 / 4) - SIDE_LENGTH / 2;

class App extends Component {
    componentDidMount() {
        const data = [
            {
                id: UPPER_LEFT,
                x: LEFT,
                y: UPPER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: UPPER_RIGHT,
                x: RIGHT,
                y: UPPER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: LOWER_RIGHT,
                x: RIGHT,
                y: LOWER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: LOWER_LEFT,
                x: LEFT,
                y: LOWER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
        ]
        drawSvgBars("div#area", data)
    }

    render() {
        return (
            <div id="area"></div>
        );
    }
}

export default App;
