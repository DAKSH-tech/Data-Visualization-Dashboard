import React,{useState} from "react";
import * as d3 from "d3";
import './BarGraph.css';
function BarGraph(props){
  var data1=props.data[0];
  data1.sort((a, b) => {
    return b.occurrence-a.occurrence;
});
  var min_data=Math.min.apply(Math, data1.map(function(o) { return o.occurrence; }));
  var max_data=Math.max.apply(Math, data1.map(function(o) { return o.occurrence; }));
  var width = 500,margin=1,
        barHeight = 20;
        var xscale = d3.scaleLinear()
    .domain([1, max_data])
    .range([0, width - 100]);

      var scale = d3.scaleLinear()
        .domain([min_data,max_data])
        .range([50, 500]);
        var graph = d3.select('div')
                  .append("svg")
                  .attr("width", width)
                  .attr("height", barHeight * data1.length*2)
       
        var bar = graph.selectAll("g")
                  .data(data1)
                  .enter()
                  .append("g")
                  .attr("transform", function(d, i) {
                        return "translate(0," + i * barHeight + ")";
                  });

    bar.append("rect")
       .attr("width", function(d) {
              if(d.occurrence>width){
                return width;
              }
              return scale(d.occurrence);
       })
       .attr("height", barHeight - margin).style('fill','orange');

    bar.append("text")
       .attr("x", 0)
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .text(function(d) { return d[props.key_value]+"   "+d.occurrence; });
      var x_axis = d3.axisBottom()
       .scale(xscale);
      var height=barHeight * data1.length*2;
      var xAxisTranslate = height/2 + 10;

      graph.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate  +")")
        .call(x_axis)
      
    return (
    <>
      <div id="cont"></div>
    </>
    )
  };
  export default BarGraph;