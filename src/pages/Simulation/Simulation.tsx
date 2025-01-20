import SimulationForm from "@src/components/SimulationForm/SimulationForm"
import SimulationDashboard from "@src/components/SimulationDashboard/SimulationDashboard"
import QuickInsights from "@src/components/SimulationDashboard/QuickInsights"

function Simulation() {
  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold mb-6">Simulation Parameters</p>
      <SimulationForm />
      <QuickInsights />
      <SimulationDashboard />
    </div>
  )
}

export default Simulation
