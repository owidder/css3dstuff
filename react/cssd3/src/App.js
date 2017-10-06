import React, {Component} from 'react';
import './App.css';
import Bar3d from './Bar3d';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    componentDidMount() {
        new Bar3d("#area", 50, 250);
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
