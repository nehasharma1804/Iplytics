import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data, handleChangeOnClickOfMonth }) => {
  const svgRef =
    useRef(null); /* a ref variable to set the reference of SVG in DOM */

  /* function to get each month value on click of any Bar in the Annual Temperature Chart*/

  const handleClickOnEachMonth = (event, i) => {
    event.preventDefault();
    handleChangeOnClickOfMonth(i);
  };

  /* Draw Bar Chart */
  const drawBarChart = () => {
    const svg = d3.select(svgRef.current);
    d3.select(svgRef.current).selectAll("*").remove();
    const width = svg.attr("width");
    const height = svg.attr("height");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* Set up the scales */
    const xScale = d3
      .scaleBand()
      .range([0, innerWidth])
      .domain(data.map((d) => d.month))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .range([innerHeight, 0])
      .domain([0, d3.max(data, (d) => d.average)]);

    /* Creating the axis */

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    /* Adding  the x-axis */
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left}, ${innerHeight + margin.top})`
      )
      .call(xAxis);

    /* Adding the y-axis */

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
    svg
      .append("text")
      .attr("x", width / 2 + 90)
      .attr("y", margin.left - 60)
      .attr("text-anchor", "end")
      .style("font-size", "16px")
      .style("font-weight", "600")
      .text("Annual Temperature Chart");

    /*Adding Y axis label */
    svg
      .append("text")
      .attr("text-anchor", "start")
      .attr("transform", "rotate(90)")

      .attr("x", 85)
      .text("Temperature")
      .style("font-weight", "600");

    /* Adding X axis label */

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + 60)
      .attr("y", parseInt(height) + 10)
      .text("Month")
      .style("font-weight", "600");

    /* Adding the bars */
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("data-testid", (d) => `test-${d.month}`)
      .attr("x", (d) => xScale(d.month) + margin.left)
      .attr("y", (d) => yScale(d.average) + margin.top)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.average))
      .attr("fill", "steelblue")
      .on("click", function (e, i, d) {
        handleClickOnEachMonth(e, i);
      });
  };
  useEffect(() => {
    drawBarChart();
  }, [data]);

  return <svg ref={svgRef} width={600} height={250} className="chart"></svg>;
};

export default BarChart;
