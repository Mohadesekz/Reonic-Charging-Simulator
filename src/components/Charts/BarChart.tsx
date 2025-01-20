import React from "react"
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { ChartData } from "chart.js/auto"

type BarChartProps = {
  data: ChartData<"bar", (number | [number, number] | null)[]>
  options?: object
  yAxisLabel?: string
}

const BarChart: React.FC<BarChartProps> = ({ data, options, yAxisLabel }) => {
  const defaultOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Period",
          font: {
            size: 11,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 11,
          },
        },
      },
    },
  }

  return (
    <div>
      <Bar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  )
}

export default BarChart
