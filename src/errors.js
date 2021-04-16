// PasswordValidationError is a top-level wrapper for all other validation errors,
// as there may be several validation errors that could occur at a time
class PasswordValidationError extends Error {
  constructor(validationErrors) {
    super(`Validation failed with ${validationErrors.length} errors`);
    this.name = "PasswordValidationError";
    this.errors = validationErrors;
  }
}

class PasswordTooShortError extends Error {
  constructor() {
    super("Password is too short and must be longer than 8 characters");
    this.name = "PasswordTooShortError";
  }
}

class PasswordNullError extends Error {
  constructor() {
    super("Password is undefined, null or of an unsupported type");
    this.name = "PasswordNullError";
  }
}

class PasswordMissingUpperCaseError extends Error {
  constructor() {
    super("Password must have at least one uppercase letter");
    this.name = "PasswordMissingUpperCaseError ";
  }
}

class PasswordMissingLowerCaseError extends Error {
  constructor() {
    super("Password must have at least one lowercase letter");
    this.name = "PasswordMissingLowerCaseError ";
  }
}

class PasswordMissingNumberError extends Error {
  constructor() {
    super("Password must have at least one number");
    this.name = "PasswordMissingNumberError ";
  }
}

module.exports = {
  PasswordValidationError,
  PasswordTooShortError,
  PasswordNullError,
  PasswordMissingUpperCaseError,
  PasswordMissingLowerCaseError,
  PasswordMissingNumberError,
};
