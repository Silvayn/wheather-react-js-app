import Chart from "chart.js/auto";
import { defaults } from "chart.js";
import { Line } from "react-chartjs-2";

defaults.font.family = "'Roboto Slab', Roboto, Helvetica, Arial, sans-serif";

export function LineChart({ data }) {
  Date.prototype.getFormatedHours = function () {
    return (new Date().getHours() === this.getHours()) ? 'Maint.' :  `${
      parseInt(this.getHours()) < 10 ? "0" + this.getHours() : this.getHours()
    }:00`;
  };

  return (
    <Line
      data={{
        labels: data.slice(0, 4).map((e) => {new Date(e.dt_txt).getFormatedHours()}),
        datasets: [
          {
            label: "",
            data: data.slice(0, 4).map((e) => parseInt(e.main.temp)),
            backgroundColor: ["#FFFFFF"],
            borderColor: ["#FFFFFF"],
            borderWidth: 1,
            borderDash: [2, 2],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: 0,
            },
            border: {
              width: 2,
              color: "#FFFFFF",
            },
          },
          x: {
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: 0,
            },
            border: {
              width: 2,
              color: "#FFFFFF",
            },
          },
        },
      }}
    />
  );
}
