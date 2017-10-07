import * as d3 from 'd3';

const DIRECTIONS = ["front", "back", "right", "left", "top", "bottom"];

class Bar3d {
    constructor(selector, initialWidth, initialHeight) {
        this.area = d3.select(selector);
        this.initialWidth = initialWidth;
        this.initialHeight = initialHeight;
        this.init();
    }

    init() {
        this.createSections();
        this.createBar();
    }

    createSections() {
        const outerSection = this.area
            .append("section")
            .attr("class", "container")
            .style("height", this.initialHeight + "px")
            .style("width", this.initialWidth + "px")

        const innerDiv = outerSection
            .append("div")
            .attr("class", "cube spinning")

        innerDiv.selectAll("figure")
            .data(DIRECTIONS)
            .enter()
            .append("figure")
            .attr("class", function (d) {
                return d;
            })
            .text(function (_dummy_, i) {
                return String(i);
            })
    }

    createBar() {
        const topBottomPercentageHeight = this.initialWidth / this.initialHeight * 100;
        const topBottomPercentageBottom = topBottomPercentageHeight * 2;

        this.area.selectAll("figure.top, figure.bottom")
            .style("height", topBottomPercentageHeight + "%")
            .style("bottom", topBottomPercentageBottom + "%")

        this.area.selectAll(".cube .front")
            .style("transform", "translateZ(" + (this.initialWidth/2) + "px )")
        this.area.selectAll(".cube .back")
            .style("transform", "rotateX(-180deg) translateZ(" + (this.initialWidth/2) + "px)")
        this.area.selectAll(".cube .right")
            .style("transform", "rotateY(90deg) translateZ(" + (this.initialWidth/2) + "px)")
        this.area.selectAll(".cube .left")
            .style("transform", "rotateY(-90deg) translateZ(" + (this.initialWidth/2) + "px)")
        this.area.selectAll(".cube .top")
            .style("transform", "rotateX(90deg) translateZ(" + (this.initialHeight/2) + "px)")
        this.area.selectAll(".cube .bottom")
            .style("transform", "rotateX(-90deg) translateZ(" + (this.initialHeight/2) + "px)")
    }

};

export default Bar3d;