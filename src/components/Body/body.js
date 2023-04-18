import Bar from "../Bar/Bar";
import Line from "../Line/Line";
import { useState, useEffect } from "react";
import { DayCountInAMonth, Months } from "../../util/Constants";

const weatherData = [];

const Body = () => {
  const [eachMonthdata, setEachMonthData] =
    useState(
      null
    ); /* state variable to set each month data on click of any Bar*/
  const [monthId, setMonthId] =
    useState(null); /* state variable to set month */

  /* function to find average temperature of each month*/

  const findAverageTemperature = (arr) => {
    const { length } = arr;
    return arr.reduce((acc, val) => {
      return acc + val.temp / length;
    }, 0);
  };

  /* function to generate weather data of each month each day */

  const generateWeatherData = () => {
    for (const monthId of Months) {
       const noOfDaysInMonth = DayCountInAMonth.find((m) =>
        m.months.includes(monthId)
      ).days;
      const data = [];
      const monthData = {};
      monthData.month = monthId;
      for (let i = 1; i <= noOfDaysInMonth; i++) {
        const dayData = {};
        dayData.date = i;
        dayData.temp = Math.floor(Math.random() * 50); /* generating temperature value randomly in range of 0 to 50*/
        data.push(dayData);
        monthData.temperature = data;
      }
      const avg = findAverageTemperature(
        monthData.temperature,
        noOfDaysInMonth
      );
      monthData.average = parseInt(avg);
      weatherData.push(monthData);
    }
  };
  useEffect(() => {
    generateWeatherData();
  }, []);

  /*function to handle data change on click of any month Bar in the Annual Temperature Chart*/

  const handleChangeOnClickOfMonth = (monthId) => {
    setMonthId(monthId.month);
    setEachMonthData(monthId.temperature);
  };

  return (
    <div className="chart" data-testid="body">
      <Bar
        data={weatherData}
        handleChangeOnClickOfMonth={handleChangeOnClickOfMonth}
      />
      {eachMonthdata && <Line data={eachMonthdata} id={monthId} />}
    </div>
  );
};

export default Body;
