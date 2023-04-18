import React from "react";
import { render, screen } from '@testing-library/react';
import Line from "./Line";
import {testingData} from "../../util/Constants"
const id="Jan"
const eachMonthdata=testingData
describe("Line component", () => {
    test('renders the chart title', () => {
        render(<Line data={eachMonthdata} id={id}  />);
        const title = screen.getByText('Monthly Temperature Chart');
        expect(title).toBeInTheDocument();
      });
    
      test('renders the x-axis label', () => {
        render(<Line data={eachMonthdata} id={id}/>);
        const label = screen.getByText('Day');
        expect(label).toBeInTheDocument();
      });
    
      test('renders the y-axis label', () => {
        render(<Line data={eachMonthdata} id={id}/>);
        const label = screen.getByText('Temperature');
        expect(label).toBeInTheDocument();
      });
    
  test("renders the line chart correctly", () => {
    const { container } = render(<Line data={eachMonthdata} id={id}/>);
    const lineChart = container.querySelector(".line");
    expect(lineChart).toBeInTheDocument();
  });

  test("renders the x-axis and y-axis labels correctly", () => {
    const { getByText } = render(<Line data={eachMonthdata} id={id}/>);
    const xAxisLabel = getByText("Day");
    const yAxisLabel = getByText("Temperature");
    expect(xAxisLabel).toBeInTheDocument();
    expect(yAxisLabel).toBeInTheDocument();
  });
});
