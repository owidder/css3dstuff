import React, {Component} from 'react';
import * as _ from 'lodash';

import './App.css';
import drawBars from './drawBars';

const NO_OF_ROWS = 20;
const ROW_SPACE = 50;
const LINE_SPACE = 50;
const WIDTH = 30;

const Y = 400;

class App extends Component {

    componentDidMount() {
        const data = _.range(200).map(i => {
            const ix = i % NO_OF_ROWS;
            const iz = Math.floor(i / NO_OF_ROWS);
            const height = 50 + Math.random() * 300;
            return {
                id: String(i+1),
                x: ix * (WIDTH + ROW_SPACE),
                y: Y - height,
                z: iz * (WIDTH + LINE_SPACE),
                height: height,
                width: WIDTH
            }
        });

        drawBars("div#area", data)
    }

    render() {
        return (
            <div id="area"></div>
        );
    }
}

export default App;
