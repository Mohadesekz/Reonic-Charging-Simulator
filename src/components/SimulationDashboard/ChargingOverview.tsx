import { AggregatedDataItem } from "@src/types/types"
import React, { useMemo } from "react"

type TotalEnergyChargedProps = {
  data: AggregatedDataItem[]
}

const TotalEnergyCharged: React.FC<TotalEnergyChargedProps> = ({ data }) => {
  const aggregatedData = useMemo(() => {
    const totalEnergyConsumed = data.reduce(
      (acc, item) => acc + item.energyConsumed,
      0
    )
    const maxPowerDemand = Math.max(...data.map((item) => item.maxPowerDemand))
    const totalEvents = data.reduce((acc, item) => acc + item.events, 0)

    return {
      totalEnergyConsumed: totalEnergyConsumed,
      maxPowerDemand: maxPowerDemand,
      totalEvents: totalEvents.toString(),
    }
  }, [data])
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 border rounded-xl shadow-md text-green-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Max Power Demand</span>
            <span className="text-xl font-bold">
              {aggregatedData.maxPowerDemand} kW
            </span>
          </div>
          {/* Fake analytics for demonstration purposes */}
          <span className="text-sm text-green-600 flex items-center">
            ▲ 5% since last period
          </span>
        </div>
        <div className="p-4 border rounded-xl shadow-md text-blue-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Energy Consumed</span>
            <span className="text-xl font-bold">
              {aggregatedData.totalEnergyConsumed} kWh
            </span>
          </div>
          {/* Fake analytics for demonstration purposes */}
          <span className="text-sm text-red-600 flex items-center">
            ▼ 3% since last period
          </span>
        </div>
        <div className="p-4 border rounded-xl shadow-md text-yellow-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Number of Events</span>
            <span className="text-xl font-bold">
              {aggregatedData.totalEvents}
            </span>
          </div>
          {/* Fake analytics for demonstration purposes */}
          <span className="text-sm text-green-600 flex items-center">
            ▲ 2% since last period
          </span>
        </div>
      </div>
    </div>
  )
}

export default TotalEnergyCharged
