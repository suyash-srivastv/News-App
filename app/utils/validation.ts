const ValidateJS = require("validate.js");

const Validate: any = ValidateJS.default ? ValidateJS.default : ValidateJS;

export interface ValidationRules {
  [key: string]: {};
}

export interface ValidationErrors {
  [key: string]: {};
}

export function validate(rules: ValidationRules, data: {}): ValidationErrors {
  if (typeof data !== "object") {
    return {} as ValidationErrors;
  }
  return Validate(data, rules) || {};
}

