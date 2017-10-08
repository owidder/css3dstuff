import * as d3 from 'd3';
import * as _ from 'lodash';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const svg3dTest = (rootSelector) => {

    const color = d3.scaleOrdinal(d3.schemeCategory20c);

    const root = d3.select(rootSelector);

    root.selectAll("svg.test")
        .data(_.range(100).map(i => {id: "_" + i}))
        .enter()
        .append("svg")
        .attr("height", d => {
            d.height = Math.random() * 200;
            return d.height*2;
        })
        .attr("width", d => {
            d.width = Math.random() * 200;
            return d.width*2;
        })
        .append("rect")
        .attr("height", d => d.height)
        .attr("widtgh", d => d.width)
        .attr("x", d => d.width/2)
        .attr("y", d => d.height/2)
        .attr("fill", (d, i) => color(i))
        .style("opacity", d => Math.random())
        .style("transform", d => {
            d.x = Math.random() * WIDTH;
            d.y = Math.random() * HEIGHT;
            d.z = Math.random() * 500;
            d.rotX = Math.random() * 360;
            d.rotY = Math.random() * 360;
            d.rotZ = Math.random() * 360;
            return "translateX(" + d.x + "px) " +
                "translateY(" + d.y + "px) " +
                "translateZ(" + d.z + "px) " +
                "rotateX(" + d.rotX + "deg) " +
                "rotateY(" + d.rotY + "deg) " +
                "rotateZ(" + d.rotZ + "deg)"
        })

}

export default svg3dTest;
