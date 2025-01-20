import { TextEncoder, TextDecoder } from "text-encoding"
import "@testing-library/jest-dom"

Object.assign(global, { TextDecoder, TextEncoder })

jest.mock("@src/data/data", () => ({
  aggregatedData: [
    {
      date: "2025-01-01",
      maxPowerDemand: 10,
      energyConsumed: 50,
      events: 2,
      chargePointId: 1,
    },
    {
      date: "2025-01-02",
      maxPowerDemand: 15,
      energyConsumed: 60,
      events: 3,
      chargePointId: 1,
    },
  ],
}))
