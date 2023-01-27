import RadarChart from "./RadarChart";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function StarPlot({data}){
  ////////////////////////////////////////////////////////////// 
			//////////////////// Draw the Chart ////////////////////////// 
			////////////////////////////////////////////////////////////// 

			const color = d3.scaleOrdinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);
				

      const margin = {top: 100, right: 100, bottom: 100, left: 100}
			const width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right
			const height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20)

			const radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};

    const svgRef = useRef(null);

  useEffect(() => {
    // D3 Code
    /*
    // Dimensions
    let dimensions = {
      width: 1000,
      height: 500,
      margins: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // SELECTIONS
    const svg = d3
      .select(svgRef.current)
      .classed("line-chart", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
    const container = svg
      .append("g")
      .classed("container", true)
      .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

    // Draw Circle
    container.append("circle").attr("r", 25);
    */
   RadarChart(svgRef.current, data, radarChartOptions)
   // TODO: cleanup??
   
   
  }, [data, svgRef.current]); // redraw chart if data changes


  return(
    <div className="h-100" style={{width: `${width + margin.left + margin.right}px`}}><svg className="h-100 w-100" ref={svgRef} /></div>
  )
}

// NEDAN ÄR ETT EXEMPEL PÅ HUR OBSERVERS FUNGERAR
function SidebarPresenter(props) {

  const [mealInfoState, setMealInfoState] = React.useState(props.model.mealsInfo);
  React.useEffect(function () {
    // 1. subscribe

    function Obs() {
      setMealInfoState(props.model.mealsInfo)

    };
    props.model.addObserver(Obs);
    // 2.unsubscribe
    return function () { props.model.removeObserver(Obs);}
  }, [props.model])                                           
  return <SidebarView
    mealsInfo={mealInfoState}
    mealChoice={id => {props.model.setCurrentMeal(id)}}
    removeMeal={id => { props.model.removeFromMeals(id);}}
    onReset={() => {props.model.resetMeals();}}
  />
}