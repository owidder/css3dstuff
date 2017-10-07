import React, {Component} from 'react';
import './App.css';
import drawBars from './drawBars';

class App extends Component {

    componentDidMount() {
        const data = [
            {
                id: "1",
                x: 100,
                y: 50,
                z: 100,
                height: 400,
                width: 200,
                rotationY: 10
            },
            {
                id: "2",
                x: 400,
                y: 50,
                z: 200,
                height: 300,
                width: 50,
                rotationY: 20
            },
            {
                id: "3",
                x: 600,
                y: 50,
                z: 300,
                height: 150,
                width: 60,
                rotationY: 30
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
