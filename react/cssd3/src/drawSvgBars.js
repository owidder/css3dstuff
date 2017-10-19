import * as d3 from 'd3';
import * as _ from 'lodash';
import {load} from 'opentype.js';

import DrawText from './DrawText';

const START_Y_ROTATION = 10;

const START_PATH = "M 10, 10 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0";

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
            console.log(fromId(d));
            console.log(toId(d));
            (new DrawText(svg, "#" + fromId(d), "#" + toId(d), text)).start();
        })
    };

    createCubePart("front", "ABC");
    createCubePart("back", "DEF");
    createCubePart("right", "GHI");
    createCubePart("left", "JKL");
    createCubePart("top", "MNO");
    createCubePart("bottom", "PQR");

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
