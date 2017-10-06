import React, {Component} from 'react';
import './App.css';
import Bar3d from './Bar3d';

class App extends Component {
    componentDidMount() {
        new Bar3d("#area", 100, 200);
    }
    render() {
        return (
            <div id="area"></div>
        );
    }
}

export default App;
