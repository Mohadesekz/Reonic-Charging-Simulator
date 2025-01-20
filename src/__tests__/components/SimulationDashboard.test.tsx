import SimulationDashboard from "../../components/SimulationDashboard/SimulationDashboard"
import { render, waitFor, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { bucketData } from "../../utils/bucketingUtils"
import { aggregatedData } from "@src/data/data"

jest.mock("../../components/Charts/ChargingEventsChart", () => {
  return () => <div>Mocked Charging Events Chart Component</div>
})
jest.mock("../../components/Charts/MaxPowerDemandChart", () => {
  return () => <div>Mocked Max Power Demand Chart Component</div>
})
jest.mock("../../components/Charts/EnergyConsumedChart", () => {
  return () => <div>Mocked Energy Consumed Chart Component</div>
})
jest.mock("../../components/Charts/ChargingValuesChart", () => {
  return () => <div>Mocked Charging Values Chart Component</div>
})

jest.mock("@src/utils/bucketingUtils", () => ({
  bucketData: jest.fn(() => aggregatedData),
}))

describe("SimulationDashboard", () => {
  it("should render date fields and interval selection", async () => {
    const { getByLabelText } = render(<SimulationDashboard />)

    await waitFor(() => {
      expect(getByLabelText("From Date")).toBeInTheDocument()
      expect(getByLabelText("To Date")).toBeInTheDocument()
      expect(getByLabelText("Interval")).toBeInTheDocument()
    })
  })

  it("should update buckets when the date range or interval changes", async () => {
    const { getByLabelText } = render(<SimulationDashboard />)

    const fromDateInput = getByLabelText("From Date")
    const toDateInput = getByLabelText("To Date")
    const intervalInput = getByLabelText("Interval")

    fireEvent.change(fromDateInput, { target: { value: "2025-01-01" } })
    fireEvent.change(toDateInput, { target: { value: "2025-01-10" } })
    fireEvent.change(intervalInput, { target: { value: "week" } })

    await waitFor(() => {
      expect(bucketData).toHaveBeenCalledWith(
        expect.arrayContaining(aggregatedData),
        "week"
      )
    })
  })
  it("should render charts when valid data is available", async () => {
    const { getByText } = render(<SimulationDashboard />)

    await waitFor(() => {
      expect(
        getByText("Mocked Charging Events Chart Component")
      ).toBeInTheDocument()
      expect(
        getByText("Mocked Max Power Demand Chart Component")
      ).toBeInTheDocument()
      expect(
        getByText("Mocked Energy Consumed Chart Component")
      ).toBeInTheDocument()
      expect(
        getByText("Mocked Charging Values Chart Component")
      ).toBeInTheDocument()
    })
  })

  it("should show error for invalid date range (toDate < fromDate)", async () => {
    const { getByLabelText, getByText } = render(<SimulationDashboard />)

    const fromDateInput = getByLabelText("From Date")
    const toDateInput = getByLabelText("To Date")

    fireEvent.change(fromDateInput, { target: { value: "2023-01-10" } })
    fireEvent.change(toDateInput, { target: { value: "2023-01-01" } })

    await waitFor(() => {
      expect(getByText("*Please pick a valid date range")).toBeInTheDocument()
    })
  })
})
