require("../src/errors");
const validatePassword = require("../src");
const { PasswordValidationError, PasswordTooShortError, PasswordNullError } = require("../src/errors");

describe("Item 1 - Password must be longer than 8 characters", () => {
  it("fails criteria when password less than 8 characters", () => {
    try {
      validatePassword("123", true);
    } catch (e) {
      expect(e).toEqual(jasmine.any(PasswordValidationError));
      let hasRelevantError = false;
      for (let error of e.errors) {
        if (error instanceof PasswordTooShortError) {
          hasRelevantError = true;
          break;
        }
      }
      expect(hasRelevantError).toBe(true);
    }
  });
  it("fails criteria when password equal to 8 characters", () => {
    try {
      validatePassword("12345678", true);
    } catch (e) {
      expect(e).toEqual(jasmine.any(PasswordValidationError));
      let hasRelevantError = false;
      for (let error of e.errors) {
        if (error instanceof PasswordTooShortError) {
          hasRelevantError = true;
          break;
        }
      }
      expect(hasRelevantError).toBe(true);
    }
  });
  it("passes criteria when password longer 8 characters", () => {
    try {
      validatePassword("123456789", true);
    } catch (e) {
      expect(e).toEqual(jasmine.any(PasswordValidationError));
      let stillHasSpecificError = false;
      for (let error of e.errors) {
        if (error instanceof PasswordTooShortError) {
          stillHasSpecificError = true;
          break;
        }
      }
      expect(stillHasSpecificError).toBe(false);
    }
  });
});
