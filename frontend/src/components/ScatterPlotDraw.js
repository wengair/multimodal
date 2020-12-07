import React, {useEffect} from 'react'
import * as d3 from 'd3'

function ScatterPlotDraw({filteredGroups, selectedObjNumber, selectedObjName, selectedYaxis, selectedXaxis}) {
    
    useEffect(()=> {
        console.log({filteredGroups})
        d3.selectAll("svg > *").remove()    
        const svg = d3.select("#plot")
        const plot_svg_width = 600
        const plot_svg_height = 500
        const padding = 40
        const margin = 20
        let yaxisName = selectedYaxis
        let xaxisName = selectedXaxis
        
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(filteredGroups, function(d) { return d.xGroup; })]) //filteredDate is a new data form the getScore function
            .range([padding, plot_svg_width - padding * 2]);
    
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredGroups, function(d) { return d.Bleu_1; })]) //use bleu score with key "Bleu_1"
            .range([plot_svg_height - padding, padding]);
    
        let rScale = d3.scaleLinear()
            .domain([0, d3.max(filteredGroups, function(d) { return d.size; })]) //value of key "size" is the samples number in each group
            .range([5, 10]);

        const axisB = d3.axisBottom()
            .scale(xScale);
        
        const axisL = d3.axisLeft()
            .scale(yScale);      
            
        let myColor = d3.scaleOrdinal()
            .domain([0, d3.max(filteredGroups, function(d) { return d.num_objects; })])
            .range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]);

        svg.append("g")
            .attr("transform","translate(0, "+(plot_svg_height - padding)+")")
            .attr("class","axis")
            .call(axisB);
        
        svg.append("text")
            .attr("y", plot_svg_height - margin)
            .attr("x", plot_svg_width / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text(xaxisName);
        
        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate("+padding+",0)")
            .call(axisL);
            
        svg.append("text")
            .attr("transform", "translate(-2, "+(plot_svg_height / 2)+") rotate(-90)")
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text(yaxisName);

        const tooltip = d3.select("body")
            .append("div")
            .attr("class","tooltip")
            .style("opacity",0.0);

        svg.selectAll("circle")
            .data(filteredGroups)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d.xGroup);
            })
            .attr("cy", function(d) {
                return yScale(d.Bleu_1);
            })
            .attr("r",function(d) {
                return rScale(d.size); //value of key "size" is the samples number in each group
            })
            .attr("fill", function(d) {
                return myColor(d.xGroup);
            })
            .on("mousedown", function(event, d) {
                tooltip.html("Object Number is:" + d.xGroup + "<br/>" + "Score:" + d.Bleu_1 + "<br/>" + "samples num:" + d.size)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY + 20) + "px")
                    .style("opacity",1.0);   
            })
            .on("mouseup", function(d, i) {
                tooltip.style("opacity",0.0);     
            });

    }, [filteredGroups, selectedYaxis, selectedXaxis])

    return (
        <div className = "plot">
            <svg id="plot" height={500} width={600}></svg>
        
            <style jsx='true'>
                {`
                .plot {
                float: left;
                width: 600px;
                height: 500px;
                }

                .tooltip{
                position: absolute;
                width: 120;
                height: auto;
                font-family: simsun;
                font-size: 14px;
                text-align: center;
                border-style: solid; 
                border-width: 1px;
                background-color: white;
                border-radius: 5px;
                }
                `}
            </style>
        </div>

    )
    
}

export default ScatterPlotDraw