import { AggregatedDataItem } from "@src/types/types"
import React from "react"
import "chart.js/auto"
import BarChart from "./BarChart"

type MaxPowerDemandChartProps = {
  data: AggregatedDataItem[]
}

const MaxPowerDemandChart: React.FC<MaxPowerDemandChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Max Power Demand per Day/Week/Month
      </h3>
      <BarChart
        data={{
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Max Power Demand",
              data: data.map((d) => d.maxPowerDemand),
              backgroundColor: "rgba(187, 218, 138, 0.8)",
              barPercentage: 1.0,
              categoryPercentage: 1.0,
            },
          ],
        }}
        yAxisLabel="kW"
      />
    </div>
  )
}

export default MaxPowerDemandChart
