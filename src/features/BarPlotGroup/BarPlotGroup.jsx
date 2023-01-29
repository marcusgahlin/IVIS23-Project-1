import * as d3 from "d3"
import { axisLabels } from "../../utils/axisLabels";

export default function BarPlotGroup(svgRef, group, radarChartOptions, divHeight, divWidth, setUpdate){

  const margin = {top: 10, right: 50, bottom: 130, left: 50}
  const padding = {x: 10, y: 10}
  const colorArr = ['#264353','#d62828','#f77f00', '#fcbf49', '#588157']
  // width = 460 - margin.left - margin.right,
  // height = 400 - margin.top - margin.bottom;

  // const width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right
  // const height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20)
  // console.log('HEIGTH: ', divHeight)
  const width = divWidth - margin.left - margin.right
  const height = divHeight - margin.top - margin.bottom

  // set the dimensions and margins of the graph
  // const width = divHeight
  // const height = divWidth

  //Remove whatever chart with the same id/class was present before
  d3.select(svgRef).select("svg").remove();


  // append the svg object to the body of the page
  const svg = d3.select(svgRef)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",`translate(${margin.left},${margin.top})`);



  // List of subgroups = header of the csv files = soil condition here
  // Dessa är medlemmarna i gruppen
  const subgroups = group.members.map((member) => member.name)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  // Dessa är våra frågor
  const groups = Object.values(axisLabels)

  // Parse the Data
  let data = []
  if (group.members.length < 1) {
    data = []
  } else {
    data = Object.keys(axisLabels).reduce((acc, groupKey) => 
  [...acc, group.members.reduce((acc2, member) => acc2 = {...acc2, group: axisLabels[groupKey], [member.name]: member.skills[groupKey]}, {})],[])
  }
  // console.log('MOUNT: ', height, width)


  // Add X axis
  const x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])

    const xAxis = svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);

  const yAxis = svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorArr)

  //stack the data? --> stack per subgroup
  const stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // ----------------
  // Create a tooltip
  // ----------------
  const tooltip = d3.select(svgRef)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];
    tooltip.html("Participant: " + subgroupName + "<br>" + "Value: " + subgroupValue)
      .style("opacity", 1)
}
const mousemove = function(event, d) {
  tooltip.style("transform","translateY(-55%)")
    .style("left",`${(event.x)/2}px`)
    .style("top",`${(event.y)/2-30}px`)
}
const mouseleave = function(event, d) {
  tooltip.style("opacity", 0)
}

// Show the bars
const bars = svg.append("g")
.selectAll("g")
// Enter in the stack data = loop key per key = group per group
.data(stackedData)
.join("g")
  .attr("fill", d => color(d.key))
  .selectAll("rect")
  // enter a second time = loop subgroup per subgroup to add all rectangles
  .data(d => d)
  .join("rect")
    .attr("x", d =>  x(d.data.group))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width",x.bandwidth())
    .attr("stroke", "grey")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
  
//Initiate Legend	
const legendBoxSize = 10
const labelScale = 1
/*
const legend = svg.append("svg:g").classed("legend", true)
.attr("height", height / 2)
.attr("width", width / 2)
.attr("transform", "translate(" + 0 + ", " + 1.1 * height + ")");
// builds out the legend

  legend.selectAll(".legend-tiles")
    .data(data).enter()
    .append("svg:rect").classed("legend-tiles", true)
    .attr("x", width/10 - padding.x / 2)
    .attr("y", function(d, i) { return i * 2 * legendBoxSize; })
    .attr("width", width/10)
    .attr("height", height/10)
    .attr("fill", function(d, g) { return color(g); });

  //Create text next to squares
  legend.selectAll(".legend-labels")
    .data(data).enter()
    .append("svg:text").classed("legend-labels", true)
    .attr("x", width - padding.x / 2 + (1.5 * legendBoxSize))
    .attr("y", function(d, i) { return i * 2 * legendBoxSize; })
    .attr("dy", 0.07 * legendBoxSize + "em")
    .attr("font-size", 11 * labelScale + "px")
    .attr("fill", "gray")
    .text(function(d) {
      return d.group;
    });
    */
    var legend = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
  .selectAll("g")
  .data(subgroups)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

legend.append("text")
    .attr("x", width)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });
     //Remove whatever chart with the same id/class was present before
  
  function updateChart (groupNew){
    // console.log('UPDATE: ', height, width)
    // Dessa är medlemmarna i gruppen
    const subgroups = groupNew.members.map((member) => member.name)

    // Parse the Data
    let data = []
    if (groupNew.members.length < 1) {
      data = []
    } else {
      data = Object.keys(axisLabels).reduce((acc, groupKey) => 
    [...acc, groupNew.members.reduce((acc2, member) => acc2 = {...acc2, group: axisLabels[groupKey], [member.name]: member.skills[groupKey]}, {})],[])
    }

    const stackedData = d3.stack()
      .keys(subgroups)
      (data)
    
     // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(colorArr)

    // Add X axis
  x.domain(groups)
  .range([0, width])
  .padding([0.2])

  xAxis.transition().duration(500)
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickSizeOuter(0))
  .selectAll("text")  
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)")

  // Add Y axis
  y.domain([0, 50])
  .range([ height, 0 ]);

  yAxis.transition().duration(500)
  .call(d3.axisLeft(y));
   /*
    svg.select("g")
    .call(d3.axisLeft(y));
*/
    // Create a tooltip
    // ----------------

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];
    tooltip.html("Participant: " + subgroupName + "<br>" + "Value: " + subgroupValue)
      .style("opacity", 1)
    }
    const mousemove = function(event, d) {
    tooltip.style("transform","translateY(-55%)")
      .style("left",`${(event.x)/2}px`)
      .style("top",`${(event.y)/2-30}px`)
    }
    const mouseleave = function(event, d) {
    tooltip.style("opacity", 0)
    }

    // Show the bars
    svg.select("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(d => d)
    .join("rect")
      .attr("x", d =>  x(d.data.group))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width",x.bandwidth())
      .attr("stroke", "grey")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  }

  // setUpdate([updateChart])

}