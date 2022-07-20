import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";

const LineChart = ({ labels, dataInput, lableName }) => {
  const dataset = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: lableName,
        data: dataInput,
        fill: false,
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };
  console.log(dataInput);
  console.log(labels);
  return (
    <div className="LineChart">
      <Line
        style={{ width: "700px", height: "700px" }}
        data={dataset}
        options={{
          title: {
            display: true,
            fontSize: 3,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default LineChart;
