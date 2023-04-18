import React, { useRef, useEffect } from "react";

import * as d3 from "d3";

const Line = ({ data }) => {
  const svgRef =
    useRef(null); /* a ref variable to set the reference of SVG in DOM */



    /* Draw Line Chart */
  const drawLineChart = () => {

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;
    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* Creating x axis */
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    /* Creating y  axis */
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.temp))
      .range([height, 0]);

    /* Creating the line */
    const line = d3
      .line()
      .x((d) => {
        return x(d.date);
      })
      .y((d) => {
        return y(d.temp);
      });

    /* Creating the path */
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .style("stroke", "steelblue")
      .style("stroke-width", "1.5")
      .attr("d", line);

    /* Creating axis bottom */
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    /* Adding chart title */
    svg
      .append("text")
      .attr("x", width / 2 + 85)
      .attr("y", margin.left - 90)
      .attr("text-anchor", "end")
      .style("font-size", "16px")
      .text("Monthly Temperature Chart")
      .style("font-weight", "600");

    /* Adding Y  axis label */
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(90)")
      .attr("y", 45)
      .attr("x", 145)
      .text("Temperature")
      .style("font-weight", "600");

    /* Adding X  axis label */
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + 40)
      .attr("y", parseInt(height) + 40)
      .text("Day")
      .style("font-weight", "600");

    /* Creating axis left */
    svg.append("g").call(d3.axisLeft(y));

    const index = d3.local();

    /* Adding tooltip on hover of circle */

    const tooltip = d3
      .select("#tooltip")
      .data(data)
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    /* Adding circle for each day temperature in a month*/
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function (d) {
        return x(d.date);
      })
      .attr("cy", function (d) {
        return y(d.temp);
      })
      .attr("r", 5)
      .text((d) => d)
      .each(function (d, i) {
        index.set(this, i); /* Storing index in local variable */
      })

      .on("mouseover", function (d) {
        tooltip.html(
          `<div><b>Day </b>:  ${data[index.get(this)].date}</div>` +
            `<div><b>Temperature  </b>: ${data[index.get(this)].temp}</div>`
        );
        tooltip.style("left", d.pageX + 10 + "px");
        tooltip.style("top", d.pageY + 5 + "px");

        return tooltip.style("visibility", "visible");
      })
      .on("mouseout", function (d) {
        return tooltip.style("visibility", "hidden");
      });
  };


  useEffect(() => {
    drawLineChart();
  }, [data]);

  return (
    <div className="lineChart">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div id="tooltip"></div>
    </div>
  );
};

export default Line;
