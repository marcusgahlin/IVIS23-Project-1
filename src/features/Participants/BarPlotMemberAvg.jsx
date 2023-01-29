import * as d3 from "d3"
import { axisLabels } from "../../utils/axisLabels";

export default function BarPlotMemberAvg(svgRef, avgMember, member, divHeight, divWidth){
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 50, bottom: 130, left: 50}
  const padding = {x: 10, y: 10}
  const width = divWidth - margin.left - margin.right
  const height = divHeight - margin.top - margin.bottom
  // console.log('AVGMEMBER: ', avgMember)
  // console.log('MEMBER: ', member)

  //Remove whatever chart with the same id/class was present before
  d3.select(svgRef).select("svg").remove();

  // append the svg object to the body of the page
  const svg = d3.select(svgRef)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Parse the Data
  // List of subgroups = header of the csv files = soil condition here
  // Dessa är medlemmarna i gruppen
  let subgroups = []
  if (avgMember && !member){
    subgroups = ['Avarage participant']
  } else {
    subgroups = ['Avarage participant', `${member.name}`]
  }

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  // Dessa är våra frågor
  const groups = Object.values(axisLabels)

  // Parse the Data
  let data = []
  if (avgMember && !member) {
    data = Object.keys(axisLabels).reduce((acc, groupKey) => 
    [...acc, { group: axisLabels[groupKey], 'Avarage participant': avgMember.skills[groupKey]}],[])
  } else {
      data = Object.keys(axisLabels).reduce((acc, groupKey) => 
      [...acc, { group: axisLabels[groupKey], 'Avarage participant': avgMember.skills[groupKey], [member.name]: member.skills[groupKey]}],[])
  }
  // console.log('DATA: ', data)
 // data = {group: }
  /*
  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.group)}).keys()
  */ 

  // Add X axis
  var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(0))
  .selectAll("text")  
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", ".15em")
.attr("transform", "rotate(-65)")

  // Add Y axis
  var y = d3.scaleLinear()
  .domain([0, 10])
  .range([ height, 0 ]);
  svg.append("g")
  .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
  .domain(subgroups)
  .range([0, x.bandwidth()])
  .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
  .domain(subgroups)
  .range(['#e41a1c','#377eb8','#4daf4a'])

  // Show the bars
  svg.append("g")
  .selectAll("g")
  // Enter in data = loop group per group
  .data(data)
  .enter()
  .append("g")
    .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
  .selectAll("rect")
  .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
  .enter().append("rect")
    .attr("x", function(d) { return xSubgroup(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.key); });
  
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


}