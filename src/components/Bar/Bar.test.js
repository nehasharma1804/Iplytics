import React from 'react';
import { render, screen ,fireEvent} from '@testing-library/react';
import Bar from "./Bar"
import {testingData} from  "../../util/Constants"

const expectedOutput={
  month: "Jan",
  average: 5,
  temperature: [
    { date: 1, temp: 15 },
    { date: 2, temp: 16 },
    { date: 3, temp: 19 },
    { date: 4, temp: 20 },
    { date: 5, temp: 18 },
    { date: 6, temp: 25 },
    { date: 7, temp: 22 },
    { date: 8, temp: 22 },
    { date: 9, temp: 5 },
    { date: 10, temp: 6 },
    { date: 11, temp: 9 },
    { date: 12, temp: 20 },
    { date: 13, temp: 18 },
    { date: 14, temp: 25 },
    { date: 15, temp: 22 },
    { date: 16, temp: 22 },
    { date: 17, temp: 5 },
    { date: 18, temp: 6 },
    { date: 19, temp: 9 },
    { date: 20, temp: 20 },
    { date: 21, temp: 18 },
    { date: 22, temp: 25 },
    { date: 23, temp: 22 },
    { date: 24, temp: 22 },
    { date: 25, temp: 5 },
    { date: 26, temp: 9 },
    { date: 27, temp: 20 },
    { date: 28, temp: 18 },
    { date: 29, temp: 25 },
    { date: 30, temp: 22 },
  ]
}
describe('BarChart', () => {
 

  test('renders the chart title', () => {
    render(<Bar data={testingData} handleChangeOnClickOfMonth={() => {}} />);
    const title = screen.getByText('Annual Temperature Chart');
    expect(title).toBeInTheDocument();
  });

  test('renders the x-axis label', () => {
    render(<Bar data={testingData} handleChangeOnClickOfMonth={() => {}} />);
    const label = screen.getByText('Month');
    expect(label).toBeInTheDocument();
  });

  test('renders the y-axis label', () => {
    render(<Bar data={testingData} handleChangeOnClickOfMonth={() => {}} />);
    const label = screen.getByText('Temperature');
    expect(label).toBeInTheDocument();
  });
  test('calls the handleChangeOnClickOfMonth function when a bar is clicked', () => {
    const handleChangeOnClickOfMonth = jest.fn();
    render(<Bar data={testingData} handleChangeOnClickOfMonth={handleChangeOnClickOfMonth} />);
    const bar = screen.getByTestId("test-Jan");
    fireEvent.click(bar);
    expect(handleChangeOnClickOfMonth).toHaveBeenCalledWith(expectedOutput);
  });
});
