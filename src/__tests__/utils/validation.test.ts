import { numberWithCustomValidation } from "@src/utils/validation"

describe("numberWithCustomValidation", () => {
  const validator = numberWithCustomValidation(
    1,
    20,
    "Value is required",
    "Value must be more than 1",
    "Value must be less than 20"
  )

  it("should pass with valid values", async () => {
    await expect(validator.validate(10)).resolves.toBe(10)
  })

  it("should fail with value less than min", async () => {
    await expect(validator.validate(0)).rejects.toThrow(
      "Value must be more than 1"
    )
  })

  it("should fail with value greater than max", async () => {
    await expect(validator.validate(21)).rejects.toThrow(
      "Value must be less than 20"
    )
  })

  it("should fail with null or empty value", async () => {
    await expect(validator.validate(null)).rejects.toThrow("Value is required")
  })
})
