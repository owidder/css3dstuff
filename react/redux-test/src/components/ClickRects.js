import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const RECT_WIDTH = 50;
const RECT_HEIGHT = 50;
const RECT_X_SPACE = 100;
const RECT_Y_SPACE = 100;
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

class ClickRects extends Component {

    componentDidMount() {
        this._draw();
    }

    componentDidUpdate() {
        this._draw();
    }

    _draw() {

        const width = d =>  d.width + 10 * d.clicks;
        const height = d =>  d.height + 10 * d.clicks;


        const svg = d3.select("#canvas");
        const selection = svg.selectAll("g.rect")
            .data(this.props.rects, d => d.id)

        const enterG = selection
            .enter()
            .append("g")
            .attr("class", "rect")
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

        enterG.append("rect")
            .attr("width", d => d.width)
            .attr("height", d => d.width)
            .attr("fill", d => d.color)
            .on("click", d => {
                this.props.onClick(d.id)
            })

        enterG.append("text")
            .attr("x", d => width(d) / 2)
            .attr("y", d => height(d) / 2)

        svg.selectAll("g.rect")
            .selectAll("rect")
            .data(d => [d])
            .transition()
            .duration(1000)
            .attr("width", width)
            .attr("height", height)

        svg.selectAll("g.rect")
            .selectAll("text")
            .data(d => [d])
            .text(d => {
                return d.clicks
            })
            .transition()
            .duration(1000)
            .attr("x", d => width(d) / 2)
            .attr("y", d => height(d) / 2)
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

ClickRects.propTypes = {
    rects: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            clicks: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired
        })
    ),
    onClick: PropTypes.func.isRequired,
    addRect: PropTypes.func.isRequired
}

export default ClickRects;
