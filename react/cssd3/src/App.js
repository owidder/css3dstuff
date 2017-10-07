import React, {Component} from 'react';
import './App.css';
import drawBars from './drawBars';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        const data = [{
            id: 0,
            x: 200,
            y: 100,
            height: 400,
            width: 200
        }];

        drawBars("div#area", data)
    }
    render() {
        const style = {
            position: 'absolute',
            top: this.state.height/2,
            width: this.state.width/2
        };
        return (
            <div style={style} id="area"></div>
        );
    }
}

export default App;
