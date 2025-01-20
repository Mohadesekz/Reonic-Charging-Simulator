export type AggregatedDataItem = {
  date: string
  maxPowerDemand: number // in kW
  energyConsumed: number // in kWh
  events: number
  chargePointId: number
}
