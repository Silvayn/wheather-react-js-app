import Chart from "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";

export function LineChart({ data }) {
  return (
    <Line
      data={{
        labels: data.map((e) => e.year),
        datasets: [
          {
            label: "test",
            data: data.map((e) => e.count),
            backgroundColor: ["#FFFFFF"],
            borderColor: ["#FFFFFF"],
            borderWidth: 1,
            borderDash: [2, 2],
          },
        ],
      }}
      options={{
        legend: {
          display: true,
          title: {
            display: false,
          },
          tooltips: {
            display: false,
          },
          labels: {
            fontFamily: "'Roboto Slab', Roboto, Helvetica, Arial, sans-serif",
            fontSize: 15,
            lineHeight: 18,
            fontColor: "#FFFFFF",
          },
        },
      }}
    />
  );
}
