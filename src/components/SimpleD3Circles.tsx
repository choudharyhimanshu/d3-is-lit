import * as React from "react";
import * as d3 from "d3";

interface IData {
  val: number;
}

function SimpleD3Circles() {
  const canvasRef = React.useRef<SVGSVGElement>(null);

  React.useLayoutEffect(() => {
    const svg = d3
      .select(canvasRef.current)
      .attr("height", 500)
      .attr("width", 500);

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 250)
      .attr("x2", 500)
      .attr("y2", 250)
      .attr("stroke", "black");

    let data: IData[] = [];

    svg.append("g");

    setInterval(() => {
      data.splice(0, 1);
      data.push({ val: Math.floor(Math.random() * 100) });

      const circles = svg
        .select("g")
        .selectAll<SVGSVGElement, IData>("circle")
        .data<IData>(data, (d) => d.val.toString());

      circles.exit().transition().duration(1000).attr("r", 0).remove();

      circles
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (d.val * 50) % 500)
        .attr("cy", 250)
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", "black")
        .transition()
        .duration(500)
        .attr("r", (d) => d.val);
    }, 1000);
  }, []);

  return <svg ref={canvasRef} />;
}

export default SimpleD3Circles;
