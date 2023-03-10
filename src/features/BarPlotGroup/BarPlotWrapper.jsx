import { useEffect, useRef, useState } from "react";
import BarPlotGroup from "./BarPlotGroup";

export default function BarPlotGroupWrapper({data}){
  const svgRef = useRef(null);
  const isInitialMount = useRef(true)
  const [updateChart, setUpdateChart] = useState([() => {}])
  // useEffect(()=>{console.log(data.members)},[data.members.length])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setWidth(svgRef.current.clientWidth)
    setHeight(svgRef.current.clientHeight)
  })
  useEffect(() => {
    // This triggers onmount
    if (isInitialMount.current) isInitialMount.current = false
   BarPlotGroup(svgRef.current, data, "", height, width, setUpdateChart)
  }, [data.members.length, svgRef.current, height, width]); // redraw chart if data changes
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