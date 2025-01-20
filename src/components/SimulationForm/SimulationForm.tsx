import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "../InputField/InputField"
import { useSimulationStore } from "@src/stores/simulationStore"
import { numberWithCustomValidation } from "@src/utils/validation"

const schema = yup.object().shape({
  chargePoints: numberWithCustomValidation(
    1,
    20,
    "Charge Points is required and must be between 1 and 20",
    "Charge Points must be more than 1",
    "Charge Points must be less than 20"
  ),
  arrivalProbability: numberWithCustomValidation(
    20,
    200,
    "Arrival Probability is required and must be between 20% and 200%",
    "Arrival Probability must be more than 20%",
    "Arrival Probability must be less than 200%"
  ),
  consumption: numberWithCustomValidation(
    1,
    40,
    "Consumption is required and must be a positive number",
    "Consumption must be a positive number",
    "Consumption must be a less than 40kWh"
  ),
  chargingPower: numberWithCustomValidation(
    1,
    30,
    "Charging Power is required and must be a positive number",
    "Charging Power must be a positive number",
    "Charging Power must be a less than 30kW"
  ),
})
type FormData = {
  chargePoints: number
  arrivalProbability: number
  consumption: number
  chargingPower: number
}

function SimulationForm() {
  const store = useSimulationStore()
  const setSimulationParameters = useSimulationStore(
    (s) => s.setSimulationParameters
  )
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      chargePoints: store.chargePoints,
      arrivalProbability: store.arrivalProbability,
      consumption: store.consumption,
      chargingPower: store.chargingPower,
    },
  })

  const onSubmit = (data: FormData) => {
    setSimulationParameters(
      data.chargePoints,
      data.arrivalProbability,
      data.consumption,
      data.chargingPower
    )
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-6 bg-white border rounded-xl shadow-sm"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Controller
          name="chargePoints"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              placeholder="Enter number of charge points"
              label="Charge Points"
              type="number"
              error={errors.chargePoints?.message}
            />
          )}
        />

        <Controller
          name="arrivalProbability"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Arrival Probability (%)"
              placeholder="Enter a probability between 20% and 200%"
              type="number"
              error={errors.arrivalProbability?.message}
            />
          )}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Controller
          name="consumption"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Consumption (kWh)"
              placeholder="Enter a positive number"
              type="number"
              error={errors.consumption?.message}
            />
          )}
        />
        <Controller
          name="chargingPower"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Charging Power (kW)"
              placeholder="Enter a positive number"
              type="number"
              error={errors.chargingPower?.message}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-fit font-medium mt-4 bg-black border-none text-white py-2 px-4 rounded-full transition-all"
      >
        Run Simulation
      </button>
    </form>
  )
}

export default SimulationForm
