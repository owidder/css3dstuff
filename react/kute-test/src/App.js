import React, {Component} from 'react';
import './App.css';
import morph from './morph';
import loadFont from './loadFont';
import SimplePromise from './SimplePromise';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const LINE_HEIGHT = 10;
const COL_WIDTH = 10;
const START_X = 10;
const START_Y = 100;
const COLS = Math.floor((WIDTH - START_X) / COL_WIDTH) - 1;
const LINES = Math.floor((HEIGHT - START_X) / LINE_HEIGHT) -1 ;

const START_PATH = "M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: START_PATH,
            to: START_PATH,
            text: "",
            ctr: 0
        }

        this.textLoaded = new SimplePromise();
        this.fontLoaded = new SimplePromise();

        Promise.all([this.textLoaded.promise, this.fontLoaded.promise]).then(() => {
            this._tick(0);
        })

        this._loadText();
    }

    _loadText() {
        const that = this;
        fetch("../sp.txt", {method: 'GET'}).then((response) => {
            return response.text();
        }).then((text) => {
            this.setState({text});
            this.textLoaded.resolve();
        })
    }

    _next(ctr) {
        const nextCtr = ctr < this.state.text.length-1 ? ctr+1 : 0;
        const letter = this.state.text.charAt(ctr);
        if(letter.match(/[a-z0-9.,|'!?]/i)) {
            return ({nextCtr, letter})
        }
        return this._next(nextCtr);
    }

    _pos(ctr) {
        const ix = ctr % COLS;
        let iy = Math.floor((ctr % (LINES*COLS)) / COLS);
        if(iy > LINES) {
            iy = 0;
        }
        const x = START_X + ix * COL_WIDTH;
        const y = START_Y + iy * LINE_HEIGHT;

        return {x, y}
    }

    _tick(ctr) {
        const that = this;
        const next = this._next(ctr);
        const pos = this._pos(ctr);
        const path = this.font.getPath(next.letter, pos.x, pos.y, 50).toPathData();
        this.setState({
            from: this.state.to,
            to: path,
            ctr
        }, morph)
        setTimeout(() => {
            that._tick(next.nextCtr);
        }, 300)
    }

    componentDidMount() {
        const that = this;
        that.ctr = 0;
        loadFont().then((font) => {
            this.font = font;
            this.fontLoaded.resolve();
        })
    }

    render() {
        return (
            <div className="App">
                <svg width={WIDTH} height={HEIGHT}>
                    <path id="from" className="bg-lime" d={this.state.from}/>
                    <path id="to" style={{'visibility': 'hidden'}} d={this.state.to}/>
                </svg>
                <small className={'text'}><b>"All's Well That Ends Well" by William Shakespeare</b> ({this.state.ctr} / {this.state.text.length})</small>
            </div>
        );
    }
}

export default App;
