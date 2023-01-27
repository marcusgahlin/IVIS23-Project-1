import { useEffect, useRef, useState } from "react";
import BarPlotMemberAvg from "./BarPlotMemberAvg";

export default function BarPlotMemberAvgWrapper({memberAvg, member, width}){
  const svgRef = useRef(null);
  // dessa states mäter svg:ns storlek nedan som plotten sätts i.
  const [localWidth, setLocalWidth] = useState(0)
  const [localHeight, setLocalHeight] = useState(0)

  useEffect(() => {
    setLocalWidth(svgRef.current.clientWidth)
    setLocalHeight(svgRef.current.clientHeight) 
  })
  
  useEffect(() => {
   // Placera plotten här
   BarPlotMemberAvg(svgRef.current, memberAvg, member, localHeight, localWidth)
  }, [memberAvg, member, svgRef.current, localHeight, localWidth]); // redraw chart if data changes

  return <svg ref={svgRef} className="h-50 w-100" />;
};