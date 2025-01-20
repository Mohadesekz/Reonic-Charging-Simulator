import { create } from "zustand"

interface SimulationState {
  chargePoints: number
  arrivalProbability: number
  consumption: number
  chargingPower: number

  setSimulationParameters: (
    chargePoints: number,
    arrivalProbability: number,
    consumption: number,
    chargingPower: number
  ) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  chargePoints: 20,
  arrivalProbability: 100,
  consumption: 18,
  chargingPower: 11,
  setSimulationParameters: (
    chargePoints,
    arrivalProbability,
    consumption,
    chargingPower
  ) => set({ chargePoints, arrivalProbability, consumption, chargingPower }),
}))
