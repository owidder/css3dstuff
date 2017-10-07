import * as d3 from 'd3';

const drawBars = (rootSelector, data) => {

    const root = d3.select(rootSelector);

    const selection = root.selectAll("section.container")
        .data(data, d => d.id);

    const enterSection = selection.enter()
        .append("section")
        .attr("class", "container")

    enterSection.merge(selection)
        .style("left", d => d.x + "px")
        .style("top", d => d.y + "px")
        .style("height", d => d.height + "px")
        .style("width", d => d.width + "px")

    const enterDiv = enterSection
        .append("div")
        .attr("class", "cube spinning")

    const topBottomPercentageHeight = d => (d.width / d.height * 100) + "%";
    const topBottomPercentageBottom = d => (d.width / d.height * 50) + "%";

    enterDiv
        .append("figure")
        .attr("class", "front")
        .style("height", "100%")
    enterDiv
        .append("figure")
        .attr("class", "back")
        .style("height", "100%")
    enterDiv
        .append("figure")
        .attr("class", "right")
        .style("height", "100%")
    enterDiv
        .append("figure")
        .attr("class", "left")
        .style("height", "100%")
    enterDiv
        .append("figure")
        .attr("class", "top")
    enterDiv
        .append("figure")
        .attr("class", "bottom")

    root.selectAll("figure.front")
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.back")
        .style("transform", d => "rotateX(-180deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.right")
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.left")
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    root.selectAll("figure.top")
        .style("transform", d => "rotateX(90deg) translateZ(" + (d.height/2) + "px)")
        .style("height", topBottomPercentageHeight)
        .style("bottom", topBottomPercentageBottom)

    root.selectAll("figure.bottom")
        .style("transform", d =>  "rotateX(-90deg) translateZ(" + (this.initialHeight/2) + "px)")
        .style("height", topBottomPercentageHeight)
        .style("bottom", topBottomPercentageBottom)

};

export default drawBars;
