const {
  PasswordNullError,
  PasswordMissingLowerCaseError,
  PasswordMissingUpperCaseError,
  PasswordMissingNumberError,
  PasswordTooShortError,
  PasswordValidationError,
} = require("./errors");

function validatePassword(password, strictMode) {
  const errors = [];

  // Ensure that the password argument is a valid string and neither undefined or null
  if (!(typeof password === "string" || password instanceof String)) {
    errors.push(new PasswordNullError());
    throw new PasswordValidationError(errors); // Nothing else to validate
  }

  // Ensure that the password is longer than 8 characters
  if (password.length <= 8) {
    errors.push(new PasswordTooShortError());
  }

  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;

  // Detect instances of uppercase letters, lowercase letters and numbers
  for (
    let i = 0;
    i < password.length && (!hasUpperCase || !hasLowerCase || !hasNumber);
    i++
  ) {
    const charCode = password.charCodeAt(i);

    if (!hasUpperCase) {
      if (charCode >= 65 && charCode <= 90) {
        hasUpperCase = true;
        continue;
      }
    }
    if (!hasLowerCase) {
      if (charCode >= 97 && charCode <= 122) {
        hasLowerCase = true;
        continue;
      }
    }
    if (!hasNumber) {
      if (charCode >= 48 && charCode <= 57) {
        hasNumber = true;
        continue;
      }
    }
  }

  // Enforce password character requirements
  if (!hasUpperCase) {
    errors.push(new PasswordMissingUpperCaseError());
  }
  if (!hasLowerCase) {
    errors.push(new PasswordMissingLowerCaseError());
  }
  if (!hasNumber) {
    errors.push(new PasswordMissingNumberError());
  }

  // strictMode allows the additional features to be overriden and disabled
  // If strictMode is off, we allow 2 errors at most, assuming 3 of 5 passes required
  if (
    (strictMode && errors.length > 0) ||
    (!strictMode && (!hasLowerCase || errors.length > 2))
  ) {
    throw new PasswordValidationError(errors);
  }

  // Simply for compatibility, but in most cases, use try/catch blocks
  // to determine whether validation passed or not and if a PasswordValidationError
  // is thrown, inspect its 'errors' attribute to read the list of specific errors
  return true;
}

module.exports = validatePassword;
