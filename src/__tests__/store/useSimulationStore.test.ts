import { useSimulationStore } from "@src/stores/simulationStore"

describe("useSimulationStore", () => {
  it("should have default values", () => {
    const store = useSimulationStore.getState()
    expect(store.chargePoints).toBe(20)
    expect(store.arrivalProbability).toBe(100)
    expect(store.consumption).toBe(18)
    expect(store.chargingPower).toBe(11)
  })

  it("should update simulation parameters", () => {
    const store = useSimulationStore.getState()
    store.setSimulationParameters(10, 50, 15, 20)

    const updatedStore = useSimulationStore.getState()
    expect(updatedStore.chargePoints).toBe(10)
    expect(updatedStore.arrivalProbability).toBe(50)
    expect(updatedStore.consumption).toBe(15)
    expect(updatedStore.chargingPower).toBe(20)
  })
})
