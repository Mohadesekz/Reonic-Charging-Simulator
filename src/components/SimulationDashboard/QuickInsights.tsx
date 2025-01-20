import { useSimulationStore } from "@src/stores/simulationStore"
import React from "react"

const QuickInsights: React.FC = () => {
  const chargePoints = useSimulationStore((s) => s.chargePoints)
  const chargingPower = useSimulationStore((s) => s.chargingPower)
  const consumption = useSimulationStore((s) => s.consumption)

  return (
    <div className="p-4 border rounded-xl mt-6 shadow-sm bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-4">
          <div className="text-sm font-semibold mb-2">Charge Points</div>
          <div className="text-lg font-bold">{chargePoints}</div>
        </div>
        <div className="p-4">
          <div className="text-sm font-semibold mb-2">Charging Power</div>
          <div className="text-lg font-bold">{chargingPower} kW</div>
        </div>
        <div className="p-4">
          <div className="text-sm font-semibold mb-2">Consumption</div>
          <div className="text-lg font-bold">{consumption} kWh</div>
        </div>
      </div>
    </div>
  )
}

export default QuickInsights
