import React, { forwardRef } from "react"

interface SelectionProps {
  label: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
}

const Selection = forwardRef<HTMLSelectElement, SelectionProps>(
  ({ label, name, options, ...rest }, ref) => {
    return (
      <div className="mb-4 flex-grow">
        <label
          htmlFor={name}
          className="block text-sm font-semibold mb-1 text-gray-700"
        >
          {label}
        </label>
        <select
          id={name}
          ref={ref}
          name={name}
          {...rest}
          className="form-select h-[36px] border-gray-300 py-1 px-2 mt-1 block w-full rounded-md border focus:ring-0 focus:outline-none shadow-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)
export default Selection
