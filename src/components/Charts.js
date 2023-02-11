import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Button } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

function Charts({ data, activeColumns }) {
  const [chartShow, setChartShow] = useState({
    bar: false,
    pie: false,
    line: false,
  });
  function generateColors(num) {
    const colors = [];

    for (let i = 0; i < num; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      colors.push(`rgb(${red}, ${green}, ${blue},0.5)`);
    }

    return colors;
  }

  const dataBar = {
    labels: data.map((item) => item[activeColumns[0]]),
    datasets: [
      {
        label: activeColumns[1],
        backgroundColor: generateColors(data.length),
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(0,0,0,0)",
        data: data.map((item) => item[activeColumns[1]]),
      },
    ],
  };

  const handleShowChart = (name) => {
    if (chartShow[name]) {
      setChartShow((prev) => {
        return { ...prev, [name]: false };
      });
    } else {
      setChartShow((prev) => {
        return { ...prev, [name]: true };
      });
    }
  };

  return (
    <div className="charts-wrapper">
      {activeColumns.length > 0 && (
        <>
          <Button
            variant={chartShow.bar ? "success" : "danger"}
            className="m-2"
            size="sm"
            onClick={() => handleShowChart("bar")}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartShow.pie ? "success" : "danger"}
            className="m-2"
            size="sm"
            onClick={() => handleShowChart("pie")}
          >
            Pie Chart
          </Button>
          <Button
            variant={chartShow.line ? "success" : "danger"}
            className="m-2"
            size="sm"
            onClick={() => handleShowChart("line")}
          >
            Line Chart
          </Button>
        </>
      )}
      {activeColumns.length > 0 ? (
        <div>
          {chartShow.bar && (
            <div className="chart-card">
              <Bar data={dataBar} width={100} height={50} />
            </div>
          )}
          {chartShow.pie && (
            <div className="chart-card">
              <Pie data={dataBar} />
            </div>
          )}
          {chartShow.line && (
            <div className="chart-card">
              {" "}
              <Line data={dataBar} />{" "}
            </div>
          )}
        </div>
      ) : (
        <div className="empty-chart">
          <div className="empty-icon">
            <img src={"https://www.livemart.lk/img/no_result.png"} />
          </div>
          No chart to display.<br></br>Please upload an excel file to start.
        </div>
      )}
    </div>
  );
}

export default Charts;
