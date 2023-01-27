import { useEffect, useRef, useState } from "react";
// import BarPlotGroup from "./BarPlotGroup";

export default function PlotWrapper({data}){
  const svgRef = useRef(null);
  useEffect(()=>{console.log(data.members)},[data.members.length])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setWidth(svgRef.current.clientWidth)
    setHeight(svgRef.current.clientHeight)
  })
  useEffect(() => {
   // Placera plotten här
   // BarPlotGroup(svgRef.current, data, "", height, width)
  }, [data.members.length, svgRef.current, height, width]); // redraw chart if data changes

  return <svg ref={svgRef} className="h-50 w-100"/>;
};