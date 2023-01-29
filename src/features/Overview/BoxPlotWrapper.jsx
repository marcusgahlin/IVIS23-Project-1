import { useEffect, useRef, useState } from "react";
import { axisLabels } from "../../utils/axisLabels";
import Boxplot from "./BoxPlot";
import BoxPlot2 from "./BoxPlot2";

export default function BoxPlotWrapper({data}){
  const svgRef = useRef(null);
  const isInitialMount = useRef(true)
  const [updateChart, setUpdateChart] = useState([() => {}])

  useEffect(()=>{console.log(data.members)},[data.members.length])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setWidth(svgRef.current.clientWidth)
    setHeight(svgRef.current.clientHeight)
  })
  useEffect(() => {
    // This triggers onmount
    if (isInitialMount.current) isInitialMount.current = false
    let dataForm = []
    if (data.groups.length < 1) {
      dataForm = []
    } else {
      dataForm = Object.keys(axisLabels).reduce((acc, groupKey) => 
      [...acc, data.groups.reduce((acc2, group) => acc2 = [...acc2, {skill: axisLabels[groupKey], val:group.skills[groupKey]}], [])],[])
  }
   // Boxplot(svgRef.current, data.groups, "", height, width, setUpdateChart)
   BoxPlot2(dataForm, {
    x: d => d.skill,
    y: d => d.value,
    xLabel: "Skills",
    yLabel: "Value",
    width: width,
    height: height,
    svgRef: svgRef.current
  })
  }, [data.groups.length, svgRef.current, height, width]); // redraw chart if data changes
  /*
  useEffect(()=>{
    //This triggers on update only
    if (!isInitialMount.current){
    // Select the section we want to apply our changes to
      //BarPlotGroup(svgRef.current, data, "", height, width, true)
      updateChart.forEach(cb => {
        try { cb(data); } catch (err) { console.log(err) }
    });
    }
  }, [data.members.length])
  */

  return <svg ref={svgRef} className="h-50 w-100"/>;
};