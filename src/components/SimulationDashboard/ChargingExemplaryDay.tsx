import InputField from "@src/components/InputField/InputField"
import { aggregatedData } from "@src/data/data"
import { format } from "date-fns"
import React, { useState } from "react"
import { FaBolt, FaBatteryFull, FaCalendarAlt } from "react-icons/fa"

const ChargingExemplaryDay: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  )
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const exemplaryDay = aggregatedData.find((data) => data.date === selectedDate)
  return (
    <div className="border border-gray-300 rounded-3xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Charging Data for Selected Day
        </h3>

        <div>
          <InputField
            label=""
            testId="exemplary-day-date-input"
            name="date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {exemplaryDay ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-md bg-blue-100">
            <div className="flex items-center mb-4">
              <FaBolt className="text-blue-500 mr-2" size={24} />
              <span className="text-sm font-semibold">Max Power Demand</span>
            </div>
            <span className="text-2xl font-bold text-blue-800">
              {exemplaryDay.maxPowerDemand} kW
            </span>
          </div>

          <div className="p-6 border rounded-lg shadow-md bg-green-100">
            <div className="flex items-center mb-4">
              <FaBatteryFull className="text-green-500 mr-2" size={24} />
              <span className="text-sm font-semibold">Energy Consumed</span>
            </div>
            <span className="text-2xl font-bold text-green-800">
              {exemplaryDay.energyConsumed} kWh
            </span>
          </div>
          <div className="p-6 border rounded-lg shadow-md bg-yellow-100">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-yellow-500 mr-2" size={24} />
              <span className="text-sm font-semibold">Number of Events</span>
            </div>
            <span className="text-2xl font-bold text-yellow-800">
              {exemplaryDay.events}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No data available for the selected date.</p>
      )}
    </div>
  )
}

export default ChargingExemplaryDay
