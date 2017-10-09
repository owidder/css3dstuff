import * as d3 from 'd3';
import * as _ from 'lodash';

const START_Y_ROTATION = 10;

const drawSvgBars = (rootSelector, data, id) => {

    const color = d3.scaleOrdinal(d3.schemeCategory20b);

    const root = d3.select(rootSelector);

    const selection = root.selectAll("div.container")
        .data(data, d => d.id);

    const enterContainer = selection.enter()
        .append("div")
        .attr("class", d => "container _" + d.id)

    enterContainer.merge(selection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")

    const rotation = deg => "rotateX(-10deg) rotateY(" + deg + "deg)"

    const enterCube = enterContainer
        .append("div")
        .attr("class", d => "cube _" + d.id)
        .style("transform-origin", d => (d.width/2) + "px")
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
        const height = d => {
            if(isTopBottom) {
                return d.width;
            }
            return d.height;
        }
        const width = d => d.width;

        const isTopBottom = partName === "top" || partName === "bottom";

        const svg = enterCube.append("svg")
            .attr("class", partName)
            .attr("height", height)
            .attr("width", width)
            .style("position", "absolute")
            .style("transform", d => {
                if(isTopBottom) {
                    const y = d.height/2 - d.width/2;
                    return "translateY(" + y + "px)";
                }
            })
        svg.append("rect")
            .attr("height", height)
            .attr("width", width)
            .attr("fill", d => color(partName))
            .style("opacity", .5)
        svg.append("text")
            .style("font-size", d => {
                if(isTopBottom) {
                    return (d.width/2) + "px";
                }
                return (Math.min(d.width, d.height)/3*2) + "px";
            })
            .attr("x", d => {
                return width(d)/2;
            })
            .attr("y", d => {
                return height(d)/2;
            })
            .attr("fill", "white")
            .text(text)
    };

    createCubePart("front", "A");
    createCubePart("back", "B");
    createCubePart("right", "C");
    createCubePart("left", "D");
    createCubePart("top", "E");
    createCubePart("bottom", "F");

    const addTransform = (domElement, transformToAdd) => {
        const currentTransform = domElement.attr("transform");
        if(_.isEmpty(currentTransform)) {
            return transformToAdd;
        }
        return currentTransform + " " + transformToAdd;
    }

    root.selectAll("svg.front")
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg.back")
        .style("transform", d => "rotateY(-180deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg.right")
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg.left")
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg.top")
        .style("transform", d => "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(90deg) translateZ(" + (d.height/2) + "px)")

    root.selectAll("svg.bottom")
        .style("transform", d =>  "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(-90deg) translateZ(" + (d.height/2) + "px)")

};

export default drawSvgBars;
