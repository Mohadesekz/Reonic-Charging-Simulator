import { AggregatedDataItem } from "@src/types/types"
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns"

export const bucketData = (data: AggregatedDataItem[], interval: string) => {
  const bucketedData: AggregatedDataItem[] = []

  data.forEach((item) => {
    const date = parseISO(item.date)
    let bucketLabel = ""

    if (interval === "week") {
      bucketLabel =
        format(startOfWeek(date), "yyyy-MM-dd") +
        " to " +
        format(endOfWeek(date), "yyyy-MM-dd")
    } else if (interval === "month") {
      bucketLabel = format(startOfMonth(date), "yyyy-MM")
    } else if (interval === "year") {
      bucketLabel = format(startOfYear(date), "yyyy")
    } else {
      bucketLabel = format(date, "yyyy-MM-dd")
    }

    const existingBucket = bucketedData.find((b) => b.date === bucketLabel)
    if (existingBucket) {
      existingBucket.maxPowerDemand = Math.max(
        existingBucket.maxPowerDemand,
        item.maxPowerDemand
      )
      existingBucket.energyConsumed += item.energyConsumed
      existingBucket.events += item.events
    } else {
      bucketedData.push({
        date: bucketLabel,
        maxPowerDemand: item.maxPowerDemand,
        energyConsumed: item.energyConsumed,
        events: item.events,
        chargePointId: item.chargePointId,
      })
    }
  })

  return bucketedData
}
