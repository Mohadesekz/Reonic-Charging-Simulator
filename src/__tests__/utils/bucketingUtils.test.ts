import { aggregatedData } from "@src/data/data"
import { bucketData } from "@src/utils/bucketingUtils"

describe("bucketData", () => {
  it("should bucket data correctly by day", () => {
    const result = bucketData(aggregatedData, "day")
    expect(result).toEqual([
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
    ])
  })

  it("should bucket data correctly by week", () => {
    const result = bucketData(aggregatedData, "week")
    expect(result).toEqual([
      {
        date: "2024-12-29 to 2025-01-04",
        maxPowerDemand: 15,
        energyConsumed: 110,
        events: 5,
        chargePointId: 1,
      },
    ])
  })

  it("should bucket data correctly by month", () => {
    const result = bucketData(aggregatedData, "month")
    expect(result).toEqual([
      {
        date: "2025-01",
        maxPowerDemand: 15,
        energyConsumed: 110,
        events: 5,
        chargePointId: 1,
      },
    ])
  })
})
