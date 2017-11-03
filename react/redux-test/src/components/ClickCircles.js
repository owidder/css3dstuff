import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const INITIAL_WIDTH = 10;
const CIRCLE_X_SPACE = 10;
const CIRCLE_Y_SPACE = 10;
const RECT_X_NUMBER = Math.max(Math.floor(WIDTH / (RECT_WIDTH + RECT_X_SPACE)), 1);
const RECT_Y_NUMBER = Math.max(Math.floor(HEIGHT / (RECT_HEIGHT + RECT_Y_SPACE)), 1);

const positions = (function* () {
    let ctr = 0;
    while(true) {
        const ix = ctr % RECT_X_NUMBER;
        const iy = Math.floor(ctr / RECT_X_NUMBER) % RECT_Y_NUMBER;
        const x = ix * (RECT_WIDTH + RECT_X_SPACE);
        const y = iy * (RECT_HEIGHT + RECT_Y_SPACE);
        ctr++;

        yield {x, y}
    }
})();

class ClickCircles extends Component {

    componentDidMount() {
        this._draw();
    }

    componentDidUpdate() {
        this._draw();
    }

    _draw() {
        const svg = d3.select("#canvas");
        const selection = svg.selectAll("g.circle")
            .data(this.props.rects, d => d.id)

        const enterG = selection
            .enter()
            .append("g")
            .attr("class", "circle")
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

        enterG.append("circle")
            .attr("cx", d => d.width/2)
            .attr("cy", d => d.width/2)
            .attr("fill", d => d.color)
            .on("click", d => {
                this.props.onClick(d.id)
            })

        enterG.append("text")
            .attr("x", RECT_WIDTH/2)
            .attr("y", RECT_HEIGHT/2)

        svg.selectAll("g.circle")
            .selectAll("circle")
            .data(d => [d])
            .attr("r", d => d.clicks + 10)

        svg.selectAll("g.circle")
            .selectAll("text")
            .data(d => [d])
            .text(d => {
                return d.clicks
            })
    }

    _addRect(color) {
        const {x, y} = positions.next().value;
        this.props.addRect({x, y, width: RECT_WIDTH, height: RECT_HEIGHT, color});
    }

    render() {
        return (
            <div className="App">
                <a onClick={() => this._addRect('red')} className="btn-floating btn-large waves-effect waves-light red">
                    <i className="material-icons">add</i>
                </a>
                <a onClick={() => this._addRect('green')} className="btn-floating btn-large waves-effect waves-light green">
                    <i className="material-icons">add</i>
                </a>
                <a onClick={() => this._addRect('blue')} className="btn-floating btn-large waves-effect waves-light blue">
                    <i className="material-icons">add</i>
                </a>
                <div style={{"margin": "10px"}}>
                    <svg id={'canvas'} height={HEIGHT} width={WIDTH}></svg>
                </div>
            </div>
        );
    }

}

ClickCircles.propTypes = {
    rects: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            clicks: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            initialRadius: PropTypes.number.isRequired
        })
    ),
    onClick: PropTypes.func.isRequired,
    addRect: PropTypes.func.isRequired
}

export default ClickRects;
