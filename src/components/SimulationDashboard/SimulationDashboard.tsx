import { format, parseISO, isValid, startOfMonth, endOfMonth } from "date-fns"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { aggregatedData } from "@src/data/data"
import InputField from "@src/components/InputField/InputField"
import Selection from "@src/components/Selection/Selection"
import { useEffect, useState } from "react"
import { bucketData } from "@src/utils/bucketingUtils"
import ChargingExemplaryDay from "./ChargingExemplaryDay"
import ChargingEventsChart from "@src/components/Charts/ChargingEventsChart"
import MaxPowerDemandChart from "@src/components/Charts/MaxPowerDemandChart"
import EnergyConsumedChart from "@src/components/Charts/EnergyConsumedChart"
import ChargingValuesChart from "@src/components/Charts/ChargingValuesChart"
import TotalEnergyCharged from "./ChargingOverview"

const schema = yup.object().shape({
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
  interval: yup.string().oneOf(["day", "week", "month"]).required(),
})

const SimulationDashboard = () => {
  const defaultFromDate = format(startOfMonth(new Date()), "yyyy-MM-dd")
  const defaultToDate = format(endOfMonth(new Date()), "yyyy-MM-dd")

  const {
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: defaultFromDate,
      toDate: defaultToDate,
      interval: "day" as const,
    },
  })

  const [buckets, setBuckets] = useState(() =>
    bucketData(aggregatedData, "day")
  )

  const watchedValues = watch()
  useEffect(() => {
    if (
      isValid(parseISO(watchedValues.fromDate)) &&
      isValid(parseISO(watchedValues.toDate))
    ) {
      if (parseISO(watchedValues.fromDate) > parseISO(watchedValues.toDate)) {
        setError("toDate", {
          type: "manual",
        })
      } else {
        clearErrors("toDate")

        const filteredData = aggregatedData.filter((item) => {
          const date = parseISO(item.date)
          return (
            date >= parseISO(watchedValues.fromDate) &&
            date <= parseISO(watchedValues.toDate)
          )
        })
        setBuckets(bucketData(filteredData, watchedValues.interval))
      }
    }
  }, [
    watchedValues.fromDate,
    watchedValues.toDate,
    watchedValues.interval,
    setError,
    clearErrors,
  ])

  return (
    <div className="mt-6 mx-auto flex flex-col justify-end border rounded-xl bg-white shadow-md p-6">
      <p className="text-2xl font-bold mb-6">Analysis</p>
      <form className="mb-6 w-full lg:w-1/2 flex flex-col sm:flex-row gap-2 justify-between self-end">
        <div className="flex gap-2">
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <InputField {...field} label="From Date" type="date" />
            )}
          />
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <InputField {...field} label="To Date" type="date" />
            )}
          />
        </div>
        <Controller
          name="interval"
          control={control}
          render={({ field }) => (
            <Selection
              {...field}
              label="Interval"
              options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
              ]}
            />
          )}
        />
      </form>

      {!errors.toDate &&
      watchedValues.fromDate &&
      watchedValues.toDate &&
      buckets ? (
        <div className="flex flex-col gap-16 mt-6">
          <TotalEnergyCharged data={buckets} />
          {/* The amount of charging events per day/week/month as a bar chart */}
          <ChargingEventsChart data={buckets} />

          {/* The actual max power demand per day/week/month as a bar chart */}
          <MaxPowerDemandChart data={buckets} />

          {/* The energy consumed per day/week/month as a bar chart */}
          <EnergyConsumedChart data={buckets} />

          {/* The charging values (in kW) per charge point at a useful aggregation level */}
          <ChargingValuesChart data={buckets} />

          {/* An exemplary day */}
          <ChargingExemplaryDay />
        </div>
      ) : (
        <p className="text-sm text-red-500">*Please pick a valid date range</p>
      )}
    </div>
  )
}

export default SimulationDashboard
