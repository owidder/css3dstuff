import React, {Component} from 'react';
import './App.css';
import drawBars from './drawBars';

class App extends Component {

    componentDidMount() {
        const data = [
            {
                id: "1",
                x: 100,
                y: 100,
                z: 100,
                height: 400,
                width: 200,
            },
            {
                id: "2",
                x: 400,
                y: 100,
                z: 0,
                height: 300,
                width: 50,
            },
            {
                id: "3",
                x: 600,
                y: 100,
                z: 300,
                height: 150,
                width: 60,
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
