import { AggregatedDataItem } from "@src/types/types"
import React from "react"
import "chart.js/auto"
import BarChart from "./BarChart"

type EnergyConsumedChartProps = {
  data: AggregatedDataItem[]
}

const EnergyConsumedChart: React.FC<EnergyConsumedChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Energy Consumed per Day/Week/Month
      </h3>
      <BarChart
        data={{
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Energy Consumed (kWh)",
              data: data.map((d) => d.energyConsumed),
              backgroundColor: "rgba(239, 84, 70, 0.8)",
              barPercentage: 1.0,
              categoryPercentage: 1.0,
            },
          ],
        }}
        yAxisLabel="kWh"
      />
    </div>
  )
}

export default EnergyConsumedChart
