import React, {useEffect, useContext} from 'react'
import {Data} from './DataContext'
import * as d3 from 'd3'

let Y = "BLEU_1"
function Filter() {
    const data = useContext(Data)
    
    useEffect(() => {
        if (data.predictions) {
            const svg = d3.select("#plot");
            const plot_svg_width = 600;
            const plot_svg_height = 500;
            const padding = 40;
            const margin = 20;
            
            
            let xScale = d3.scaleLinear()
                .domain([0, d3.max(data.predictions, function(d) { return d.num_objects; })])
                .range([padding, plot_svg_width - padding * 2]);
        
            let yScale = d3.scaleLinear()
                .domain([0, d3.max(data.predictions, function(d) { return ((d.num_objects + 5) * 3); })])
                .range([plot_svg_height - padding, padding]);
            
            let rScale = d3.scaleLinear()
                .domain([0, d3.max(data.predictions, function(d) { return ((d.num_objects + 5) * 3); })])
                .range([2, 5]);
        
            let aScale = d3.scaleSqrt()  
                .domain([0, d3.max(data.predictions, function(d) { return ((d.num_objects + 5) * 3); })])
                .range([0, 10]); 
        
            const axisB = d3.axisBottom()
                .scale(xScale);
            
            const axisL = d3.axisLeft()
                .scale(yScale);        

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
                .text("Objects Number");
            
            svg.append("g")
                .attr("class","axis")
                .attr("transform","translate("+padding+",0)")
                .call(axisL);
                
            svg.append("text")
                .attr("transform", "translate(-2, "+(plot_svg_height / 2)+") rotate(-90)")
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .text(Y);

            svg.selectAll("circle")
                .data(data.predictions)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return xScale(d.num_objects);
                })
                .attr("cy", function(d) {
                    return yScale(((d.num_objects + 5) * 3));
                })
                .attr("r",function(d) {
                    return Math.sqrt((plot_svg_height - ((d.num_objects + 5) * 3)) / Math.PI);
                })
                .attr("r", function(d) {
                    return rScale(((d.num_objects + 5) * 3));
                })
                .attr("r", function(d) {
                    return aScale(((d.num_objects + 5) * 3));
                })
                .attr("fill", function(d) {
                    return "rgb(0, 0, " + Math.round(((d.num_objects + 5) * 3)) + ")";
                });

        }
        	    
    }, [data])

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
                `}
            </style>
      </div>
    )
    
}

export default Filter