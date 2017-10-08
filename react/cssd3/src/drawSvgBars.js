import * as d3 from 'd3';
import * as _ from 'lodash';

const START_Y_ROTATION = 10;

const drawSvgBars = (rootSelector, data, id) => {

    const root = d3.select(rootSelector);

    const selection = root.selectAll("g.container")
        .data(data, d => d.id);

    const enterContainer = selection.enter()
        .append("g")
        .attr("class", "container")

    enterContainer.merge(selection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")

    const rotation = deg => "rotateX(-10deg) rotateY(" + deg + "deg)"

    const enterCube = enterContainer
        .append("g")
        .attr("class", d => "cube _" + d.id)
        .style("transform", rotation(10))
        .on("click", d => {
            d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION + 90 : d.rotationY+90;
            drawSvgBars(rootSelector, data, d.id);
        })

    if(!_.isEmpty(id)) {
        root.selectAll("div.cube._" + id)
            .transition()
            .duration(1000)
            .styleTween("transform", d => d3.interpolate(rotation(d.rotationY-90), rotation(d.rotationY)))
    }

    const createCubePart = (partName, text) => {
        const isTopBottom = partName === "top" || partName === "bottom";
        const g = enterCube.append("g")
            .attr("transform", d => {
                if(isTopBottom) {
                    const y = d.height/2 - d.width/2;
                    return "translate(0," + y + ")";
                }
            })
        g.append("rect")
            .attr("class", partName + " bar")
            .attr("height", d => {
                if(isTopBottom) {
                    return d.width;
                }
                return d.height;
            })
            .attr("width", d => d.width)
        g.append("text")
            .style("font-size", d => {
                if(isTopBottom) {
                    return (d.width/2) + "px";
                }
                return (Math.min(d.width, d.height)/2) + "px";
            })
            .text(text)
    };

    createCubePart("front", "A");
    createCubePart("back", "B");
    createCubePart("right", "C");
    createCubePart("left", "D");
    createCubePart("top", "E");
    createCubePart("bottom", "F");

    root.selectAll("g.front")
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    root.selectAll("g.back")
        .style("transform", d => "rotateY(-180deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("g.right")
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("g.left")
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("g.top")
        .style("transform", d => "rotateX(90deg) translateZ(" + (d.height/2) + "px)")

    root.selectAll("g.bottom")
        .style("transform", d =>  "rotateX(-90deg) translateZ(" + (d.height/2) + "px)")

};

export default drawSvgBars;
