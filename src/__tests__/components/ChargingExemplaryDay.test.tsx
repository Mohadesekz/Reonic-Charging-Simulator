import { render, screen, fireEvent } from "@testing-library/react"
import ChargingExemplaryDay from "../../components/SimulationDashboard/ChargingExemplaryDay"

describe("ChargingExemplaryDay", () => {
  it("renders the component correctly", () => {
    const { getByText, getByTestId } = render(<ChargingExemplaryDay />)

    expect(getByText("Charging Data for Selected Day")).toBeInTheDocument()
    expect(getByTestId("exemplary-day-date-input")).toBeInTheDocument()
  })

  it("updates the displayed data when a new date is selected", async () => {
    const { getByTestId } = render(<ChargingExemplaryDay />)

    const dateInput = getByTestId("exemplary-day-date-input")
    fireEvent.change(dateInput, { target: { value: "2025-01-02" } })

    expect(screen.getByText("15 kW")).toBeInTheDocument()
    expect(screen.getByText("60 kWh")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("displays a message when no data is available for the selected date", () => {
    const { getByTestId } = render(<ChargingExemplaryDay />)

    const dateInput = getByTestId("exemplary-day-date-input")

    fireEvent.change(dateInput, { target: { value: "2024-01-01" } })

    expect(
      screen.getByText("No data available for the selected date.")
    ).toBeInTheDocument()
  })
})
