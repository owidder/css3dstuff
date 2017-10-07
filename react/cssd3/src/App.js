import React, {Component} from 'react';
import './App.css';
import drawBars from './drawBars';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const data = [
            {
                id: 0,
                x: 100,
                y: 50,
                height: 400,
                width: 200
            },
            {
                id: 1,
                x: 400,
                y: 50,
                height: 300,
                width: 50
            },
            {
                id: 2,
                x: 600,
                y: 50,
                height: 150,
                width: 60
            },
        ];

        drawBars("div#area", data)
    }

    render() {
        return (
            <div id="area"></div>
        );
    }
}

export default App;
