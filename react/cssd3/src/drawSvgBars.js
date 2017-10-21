import * as d3 from 'd3';
import * as _ from 'lodash';

import DrawText from './DrawText';
import getText from './getText';
import {parts, TOP, BOTTOM, RIGHT, LEFT, BACK, FRONT} from './parts';

const START_Y_ROTATION = 10;

const START_PATH = "M 10, 10 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0";

const drawSvgBars = (rootSelector, data, id) => {

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
        .on("click", function (d) {
            d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION + 90 : d.rotationY+90;
            drawSvgBars(rootSelector, data, d.id);

        })

    if(!_.isEmpty(id)) {
        root.selectAll("div.cube._" + id)
            .transition()
            .duration(1000)
            .styleTween("transform", d => d3.interpolate(rotation(d.rotationY-90), rotation(d.rotationY)))
    }

    const createCubePart = (partName) => {
        const isTopBottom = partName === "top" || partName === "bottom";

        const height = d => {
            if(isTopBottom) {
                return d.width;
            }
            return d.height;
        }
        const width = d => d.width;

        const svg = enterCube.append("svg")
            .attr("class", "part " + partName)
            .attr("height", height)
            .attr("width", width)
            .style("position", "absolute")
            .style("transform", d => {
                if(isTopBottom) {
                    const y = d.height/2 - d.width/2;
                    return "translateY(" + y + "px)";
                }
            })
            .on("click", () => {
                console.log(partName);
            })

        const sideG = svg.append("g")
            .attr("transform", d => "translate(" + (width(d)/2) + "," + (height(d)/2) + ")")

        const fromId = d => d.id + "-" + partName + "-from";
        const toId = d => d.id + "-" + partName + "-to";

        sideG.append("path")
            .attr("class", d => d.id + " " + partName + " from")
            .attr("id", fromId)
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("d", START_PATH)

        sideG.append("path")
            .attr("class", d => d.id + " " + partName + " to")
            .attr("id", toId)
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("d", START_PATH)
            .style("visibility", "hidden")

        sideG.each(d => {
            const text = getText(d.id, partName);
            (new DrawText(svg, "#" + fromId(d), "#" + toId(d), text)).start();
        })
    };

    parts.forEach(part => createCubePart(part));

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
