import * as React from "react";
import * as d3 from "d3";

interface IData {
  id: string;
  value: number;
  color: string;
}

const INIT_DATA: IData[] = [
  { id: "Yudhishthira", color: "#1abc9c", value: 0 },
  { id: "Bhima", color: "#f1c40f", value: 0 },
  { id: "Arjuna", color: "#3498db", value: 0 },
  { id: "Nakula", color: "#34495e", value: 0 },
  { id: "Sahadeva", color: "#bdc3c7", value: 0 },
  { id: "Karna", color: "#c0392b", value: 0 },
];

const RACE_TO_VALUE = 20;

export default function RacingBars() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [width, height] = [600, 400];
  const [data, setData] = React.useState<IData[]>([...INIT_DATA]);

  const yScale = d3
    .scaleBand<number>()
    .paddingInner(0.2)
    .domain(data.map((d, i) => i))
    .range([0, height]);
  const labelShift = yScale.bandwidth() / 2 + 10;

  React.useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width);

    const xScale = d3
      .scaleLinear<number, number>()
      .domain([0, Math.max(...data.map((d) => d.value))])
      .range([0, width]);

    svg
      .selectAll<SVGElement, IData>(".bar")
      .data<IData>(
        data.filter((d) => d.value > 0),
        (d) => d.id
      )
      .join((enter) =>
        enter.append("rect").attr("y", (d, i) => {
          const v = yScale(i);
          return v ? v : 0;
        })
      )
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => d.color)
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("width", (d) => {
        const v = xScale(d.value);
        return v ? v : 0;
      })
      .attr("y", (d, i) => {
        const v = yScale(i);
        return v ? v : 0;
      });

    svg
      .selectAll<SVGElement, IData>(".label")
      .data(
        data.filter((d) => d.value > 0),
        (d) => d.id
      )
      .join((enter) =>
        enter.append("text").attr("y", (d, i) => {
          const v = yScale(i);
          return v ? v + labelShift : labelShift;
        })
      )
      .attr("class", "label")
      .text((d) => d.id)
      .attr("x", 10)
      .transition()
      .attr("y", (d, i) => {
        const v = yScale(i);
        return v ? v + labelShift : labelShift;
      });

    svg
      .selectAll<SVGElement, IData>(".value")
      .data(
        data.filter((d) => d.value > 0),
        (d) => d.id
      )
      .join((enter) =>
        enter.append("text").attr("y", (d, i) => {
          const v = yScale(i);
          return v ? v + labelShift : labelShift;
        })
      )
      .attr("class", "value")
      .text((d) => d.value)
      .attr("x", (d) => {
        const v = xScale(d.value);
        return v ? v - 40 : 0;
      })
      .transition()
      .attr("y", (d, i) => {
        const v = yScale(i);
        return v ? v + labelShift : labelShift;
      });
  }, [data]);

  let max = 0;
  const interval = React.useMemo(
    () =>
      setInterval(() => {
        const i = Math.floor(Math.random() * data.length);
        data[i].value++;
        max = Math.max(max, data[i].value);
        if (max >= RACE_TO_VALUE) {
          clearInterval(interval);
        }
        setData([...data.sort((a, b) => b.value - a.value)]);
      }, 500),
    []
  );

  return (
    <div>
      <h3>Clash of Pandavas!</h3>
      <svg ref={svgRef}></svg>
      <h4>Target: {RACE_TO_VALUE}</h4>
      <h4>
        Winner:
        {Math.max(...data.map((d) => d.value)) >= RACE_TO_VALUE && (
          <span style={{ color: "#2ecc71", marginLeft: 10 }}>
            {
              data.reduce(
                (prev, curr) => (curr.value > prev.value ? curr : prev),
                data[0]
              ).id
            }
            !!
          </span>
        )}
      </h4>
    </div>
  );
}
