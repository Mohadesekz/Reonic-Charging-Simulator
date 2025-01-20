import { AggregatedDataItem } from "@src/types/types"
import React from "react"
import "chart.js/auto"
import BarChart from "./BarChart"

type ChargingEventsChartProps = {
  data: AggregatedDataItem[]
}

const ChargingEventsChart: React.FC<ChargingEventsChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Charging Events per Day/Week/Month
      </h3>
      <BarChart
        data={{
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Charging Events",
              data: data.map((d) => d.events),
              backgroundColor: "rgba(242, 212, 115, 0.8)",
              barPercentage: 1.0,
              categoryPercentage: 1.0,
            },
          ],
        }}
      />
    </div>
  )
}

export default ChargingEventsChart
