import SimulationForm from "../../components/SimulationForm/SimulationForm"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useSimulationStore } from "@src/stores/simulationStore"

describe("SimulationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should set store data with valid data", async () => {
    const { getByLabelText, getByText } = render(<SimulationForm />)

    fireEvent.change(getByLabelText("Charge Points"), { target: { value: 10 } })
    fireEvent.change(getByLabelText("Arrival Probability (%)"), {
      target: { value: 50 },
    })
    fireEvent.change(getByLabelText("Consumption (kWh)"), {
      target: { value: 15 },
    })
    fireEvent.change(getByLabelText("Charging Power (kW)"), {
      target: { value: 10 },
    })

    const submitButton = getByText("Run Simulation")
    fireEvent.click(submitButton)

    await waitFor(() => {
      const store = useSimulationStore.getState()
      expect(store.chargePoints).toBe(10)
      expect(store.arrivalProbability).toBe(50)
      expect(store.consumption).toBe(15)
      expect(store.chargingPower).toBe(10)
    })
  })

  it("should submit the form with valid data", async () => {
    const setSimulationParametersMock = jest.fn()

    useSimulationStore.setState({
      setSimulationParameters: setSimulationParametersMock,
    })

    const { getByLabelText, getByText } = render(<SimulationForm />)

    fireEvent.change(getByLabelText("Charge Points"), { target: { value: 10 } })
    fireEvent.change(getByLabelText("Arrival Probability (%)"), {
      target: { value: 50 },
    })
    fireEvent.change(getByLabelText("Consumption (kWh)"), {
      target: { value: 15 },
    })
    fireEvent.change(getByLabelText("Charging Power (kW)"), {
      target: { value: 10 },
    })

    const submitButton = getByText("Run Simulation")
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(setSimulationParametersMock).toHaveBeenCalledWith(10, 50, 15, 10)
    })
  })

  it("should show validation errors for empty fields", async () => {
    const { getByText, queryByText, getByLabelText } = render(
      <SimulationForm />
    )

    fireEvent.change(getByLabelText("Charge Points"), { target: { value: "" } })
    fireEvent.change(getByLabelText("Arrival Probability (%)"), {
      target: { value: "" },
    })
    fireEvent.change(getByLabelText("Consumption (kWh)"), {
      target: { value: "" },
    })
    fireEvent.change(getByLabelText("Charging Power (kW)"), {
      target: { value: "" },
    })

    fireEvent.click(getByText("Run Simulation"))

    await waitFor(() => {
      expect(
        queryByText("Charge Points is required and must be between 1 and 20")
      ).toBeInTheDocument()
      expect(
        queryByText(
          "Arrival Probability is required and must be between 20% and 200%"
        )
      ).toBeInTheDocument()
      expect(
        queryByText("Consumption is required and must be a positive number")
      ).toBeInTheDocument()
      expect(
        queryByText("Charging Power is required and must be a positive number")
      ).toBeInTheDocument()
    })
  })

  it("should show validation errors for invalid data", async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SimulationForm />
    )

    act(() => {
      fireEvent.change(getByLabelText("Charge Points"), {
        target: { value: "-1" },
      })
    })

    act(() => {
      fireEvent.click(getByText("Run Simulation"))
    })

    await waitFor(() => {
      expect(
        queryByText("Charge Points must be more than 1")
      ).toBeInTheDocument()
    })
  })
})
