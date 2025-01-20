import React, { forwardRef } from "react"

interface InputFieldProps {
  label: string
  name: string
  type?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  testId?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { testId, label, name, type = "text", placeholder, error, ...rest },
    ref
  ) => {
    return (
      <div className="mb-4 flex-grow">
        <label
          htmlFor={name}
          className="block text-sm font-semibold mb-1 text-gray-700"
        >
          {label}
        </label>
        <input
          data-testid={testId}
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          {...rest}
          className={`py-1 px-2 mt-1 block w-full rounded-md border focus:ring-0 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } shadow-sm`}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
export default InputField
