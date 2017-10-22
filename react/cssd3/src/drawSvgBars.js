import * as d3 from 'd3';

import DrawText from './DrawText';
import getText from './getText';
import {nextDirection, BOTTOM, BACK, TOP, FRONT, LEFT, RIGHT, AXIS_X, AXIS_Y} from './direction';

const START_Y_ROTATION = 10;
const START_X_ROTATION = -10;

const START_PATH = "M 10, 10 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0";

const initialDirections = [FRONT, BACK, RIGHT, LEFT, TOP, BOTTOM];

const drawSvgBars = (rootSelector, data, id, axis) => {

    const root = d3.select(rootSelector);

    const selection = root.selectAll("div.container")
        .data(data, d => d.id);

    const enterContainer = selection.enter()
        .append("div")
        .attr("class", d => "container _" + d.id)

    enterContainer.merge(selection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")

    const rotation = (degX, degY) => "rotateX(" + degX + "deg) rotateY(" + degY + "deg)"

    const enterCube = enterContainer
        .append("div")
        .attr("class", d => "cube _" + d.id)
        .style("transform-origin", d => (d.width/2) + "px " + (d.height/2) + "px")
        .style("transform", rotation(START_X_ROTATION, START_Y_ROTATION))

    const rotate = (id, axis) => {
        const divs = root.selectAll("div.cube._" + id)
            .transition()
            .duration(1000)
            .styleTween("transform", d => {
                if(axis === AXIS_X) {
                    d.rotationX = isNaN(d.rotationX) ? START_X_ROTATION - 90 : d.rotationX-90;
                    d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION : d.rotationY;
                    return d3.interpolate(rotation(d.rotationX+90, d.rotationY), rotation(d.rotationX, d.rotationY));
                }
                else if(axis === AXIS_Y){
                    d.rotationX = isNaN(d.rotationX) ? START_X_ROTATION : d.rotationX;
                    d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION + 90 : d.rotationY+90;
                    return d3.interpolate(rotation(d.rotationX, d.rotationY-90), rotation(d.rotationX, d.rotationY));
                }
            })

        divs.selectAll("svg.part")
            .each(d => {
                d.currentDirection = nextDirection(d.currentDirection, axis);
            })
    }

    const isTopBottom = d => d.initialDirection === "top" || d.initialDirection === "bottom";
    const height = d => isTopBottom(d) ? d.width : d.height;
    const width = d => d.width;

    const drawCubes = () => {
        const selection = enterCube.selectAll("svg")
            .data(d => {
                return initialDirections.map(direction => {
                    return {...d, initialDirection: direction, currentDirection: direction}
                })
            })

        const enterSvg = selection.enter()
            .append("svg")
            .attr("class", d => "part " + d.initialDirection)
            .attr("height", height)
            .attr("width", width)
            .style("position", "absolute")
            .style("transform", d => {
                if(isTopBottom(d)) {
                    const y = d.height/2 - d.width/2;
                    return "translateY(" + y + "px)";
                }
            })
            .on("click", d => {
                if(d.currentDirection === TOP) {
                    rotate(d.id, AXIS_X);
                }
                else {
                    rotate(d.id, AXIS_Y);
                }
            })

        const sideG = enterSvg.append("g")
            .attr("transform", d => "translate(" + (width(d)/2) + "," + (height(d)/2) + ")")

        enterSvg.append("title")
            .text(d => d.currentDirection)

        const fromId = d => d.id + "-" + d.initialDirection + "-from";
        const toId = d => d.id + "-" + d.initialDirection + "-to";

        sideG.append("path")
            .attr("class", d => d.id + " " + d.initialDirection + " from")
            .attr("id", fromId)
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("d", START_PATH)

        sideG.append("path")
            .attr("class", d => d.id + " " + d.initialDirection + " to")
            .attr("id", toId)
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("d", START_PATH)
            .style("visibility", "hidden")

        sideG.each(d => {
            const text = getText(d.id, d.initialDirection);
            (new DrawText(root, "#" + fromId(d), "#" + toId(d), text)).start();
        })
    }

    drawCubes();

    root.selectAll("svg." + FRONT)
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg." + BACK)
        .style("transform", d => "rotateY(-180deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg." + RIGHT)
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg." + LEFT)
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("svg." + TOP)
        .style("transform", d => "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(90deg) translateZ(" + (d.height/2) + "px)")

    root.selectAll("svg." + BOTTOM)
        .style("transform", d =>  "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(-90deg) translateZ(" + (d.height/2) + "px)")
};

export default drawSvgBars;
