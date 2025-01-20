import "chart.js/auto"
import { AggregatedDataItem } from "@src/types/types"
import Selection from "@src/components/Selection/Selection"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

type ChargingValuesChartProps = {
  data: AggregatedDataItem[]
}

const ChargingValuesChart = ({ data }: ChargingValuesChartProps) => {
  const chargePointIds = [...new Set(data.map((d) => d.chargePointId))]
  const options = chargePointIds.map((id) => ({
    label: `Charge Point ${id}`,
    value: id.toString(),
  }))
  const [selectedChargePoint, setSelectedChargePoint] = useState<string>(
    options[0]?.value || ""
  )

  useEffect(() => {
    if (options.length > 0 && !selectedChargePoint) {
      setSelectedChargePoint(options[0].value)
    }
  }, [options, selectedChargePoint])

  const filteredData = data.filter(
    (d) => d.chargePointId.toString() === selectedChargePoint
  )

  const labels = filteredData.map((d) => d.date)
  const eventsData = filteredData.map((d) => d.events)
  const energyData = filteredData.map((d) => d.energyConsumed)

  const chartData = {
    labels,
    datasets: [
      {
        label: "Events",
        data: eventsData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y-events",
      },
      {
        label: "Energy Consumed",
        data: energyData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y-energy",
      },
    ],
  }

  const optionsForChart = {
    responsive: true,
    scales: {
      "y-events": {
        type: "linear" as const,
        position: "left" as const,
        title: {
          display: true,
          text: "Events",
        },
      },
      "y-energy": {
        type: "linear" as const,
        position: "right" as const,
        title: {
          display: true,
          text: "Energy Consumed (kWh)",
        },
      },
    },
  }

  return (
    <div className="border border-gray-300 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Charging Values per Charge Point
        </h3>

        <div>
          <Selection
            label=""
            name="date"
            value={selectedChargePoint}
            onChange={(e) => setSelectedChargePoint(e.target.value)}
            options={options}
          />
        </div>
      </div>
      {selectedChargePoint && (
        <Line data={chartData} options={optionsForChart} />
      )}
    </div>
  )
}

export default ChargingValuesChart
