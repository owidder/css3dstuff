import * as d3 from 'd3';
import * as _ from 'lodash';

const START_Y_ROTATION = 10;

const drawBars = (rootSelector, data, id) => {

    const root = d3.select(rootSelector);

    const selection = root.selectAll("section.container")
        .data(data, d => d.id);

    const enterSection = selection.enter()
        .append("section")
        .attr("class", "container")

    enterSection.merge(selection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")
        .style("height", d => d.height + "px")
        .style("width", d => d.width + "px")

    const rotation = deg => "rotateX(-10deg) rotateY(" + deg + "deg)"

    const enterDiv = enterSection
        .append("div")
        .attr("class", d => "cube _" + d.id)
        .style("transform", rotation(10))
        .on("click", d => {
            d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION + 90 : d.rotationY+90;
            drawBars(rootSelector, data, d.id);
        })

    if(!_.isEmpty(id)) {
        root.selectAll("div.cube._" + id)
            .transition()
            .duration(1000)
            .styleTween("transform", d => d3.interpolate(rotation(d.rotationY-90), rotation(d.rotationY)))
    }

    const topBottomPercentageHeight = d => (d.width / d.height * 100) + "%";
    const topBottomPercentageBottom = d => ((.5 - (d.width / d.height)/2) *100) + "%";

    enterDiv
        .append("figure")
        .attr("class", "front bar side")
        .style("height", "100%")
        .text("A")
    enterDiv
        .append("figure")
        .attr("class", "back bar side")
        .style("height", "100%")
        .text("B")
    enterDiv
        .append("figure")
        .attr("class", "right bar side")
        .style("height", "100%")
        .text("C")
    enterDiv
        .append("figure")
        .attr("class", "left bar side")
        .style("height", "100%")
        .text("D")
    enterDiv
        .append("figure")
        .attr("class", "top bar topBottom")
        .text("E")
    enterDiv
        .append("figure")
        .attr("class", "bottom bar topBottom")
        .text("F")

    root.selectAll("figure.bar.side")
        .style("font-size", d => (Math.min(d.width, d.height)/2) + "px")

    root.selectAll("figure.bar.topBottom")
        .style("font-size", d => (d.width/2) + "px")

    root.selectAll("figure.front")
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.back")
        .style("transform", d => "rotateY(-180deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.right")
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.left")
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.top")
        .style("transform", d => "rotateX(90deg) translateZ(" + (d.height/2) + "px)")
        .style("height", topBottomPercentageHeight)
        .style("bottom", topBottomPercentageBottom)

    root.selectAll("figure.bottom")
        .style("transform", d =>  "rotateX(-90deg) translateZ(" + (d.height/2) + "px)")
        .style("height", topBottomPercentageHeight)
        .style("bottom", topBottomPercentageBottom)

};

export default drawBars;
