import * as d3 from "d3"
import { axisLabels } from "../../utils/axisLabels";

export default function Boxplot(svgRef, groups, radarChartOptions, divHeight, divWidth){
  // set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 40}
const width = divWidth - margin.left - margin.right
const height = divHeight - margin.top - margin.bottom

d3.select(svgRef).select("svg").remove();

// append the svg object to the body of the page
var svg = d3.select(svgRef)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// const groupsLabels = Object.values(axisLabels)

  // Parse the Data
  let data = []
  if (groups.length < 1) {
    data = []
  } else {
    data = Object.keys(axisLabels).reduce((acc, groupKey) => 
  [...acc, groups.reduce((acc2, group) => acc2 = [...acc2, {skill: axisLabels[groupKey], val:group.skills[groupKey]}], [])],[])
  }
  // console.log('MOUNT: ', height, width)

// Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
var sumstat = d3.group(data, d => d.skill) // nest function allows to group the calculation per level of a factor
.rollup(function(d) {
  q1 = d3.quantile(d.map(function(g) { return g.value;}).sort(d3.ascending),.25)
  median = d3.quantile(d.map(function(g) { return g.value;}).sort(d3.ascending),.5)
  q3 = d3.quantile(d.map(function(g) { return g.value;}).sort(d3.ascending),.75)
  interQuantileRange = q3 - q1
  min = q1 - 1.5 * interQuantileRange
  max = q3 + 1.5 * interQuantileRange
  return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
})
.entries(data)

// Show the X scale
var x = d3.scaleBand()
.range([ 0, width ])
.domain(Object.values(axisLabels))
.paddingInner(1)
.paddingOuter(.5)
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))

// Show the Y scale
var y = d3.scaleLinear()
.domain([3,9])
.range([height, 0])
svg.append("g").call(d3.axisLeft(y))

// Show the main vertical line
svg
.selectAll("vertLines")
.data(sumstat)
.enter()
.append("line")
  .attr("x1", function(d){return(x(d.data.skill))})
  .attr("x2", function(d){return(x(d.data.skill))})
  .attr("y1", function(d){return(y(d.value.min))})
  .attr("y2", function(d){return(y(d.value.max))})
  .attr("stroke", "black")
  .style("width", 40)

// rectangle for the main box
var boxWidth = 100
svg
.selectAll("boxes")
.data(sumstat)
.enter()
.append("rect")
    .attr("x", function(d){return(x(d.data.skill)-boxWidth/2)})
    .attr("y", function(d){return(y(d.value.q3))})
    .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
    .attr("width", boxWidth )
    .attr("stroke", "black")
    .style("fill", "#69b3a2")

// Show the median
svg
.selectAll("medianLines")
.data(sumstat)
.enter()
.append("line")
  .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
  .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
  .attr("y1", function(d){return(y(d.value.median))})
  .attr("y2", function(d){return(y(d.value.median))})
  .attr("stroke", "black")
  .style("width", 80)

}