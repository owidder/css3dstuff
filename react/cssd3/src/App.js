import React, {Component} from 'react';
import * as _ from 'lodash';

import './App.css';
import drawSvgBars from './drawSvgBars';

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
                id: "upperleft",
                x: LEFT,
                y: UPPER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: "upperright",
                x: RIGHT,
                y: UPPER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: "lowerright",
                x: RIGHT,
                y: LOWER,
                z: 0,
                width: SIDE_LENGTH,
                height: SIDE_LENGTH
            },
            {
                id: "lowerleft",
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
