export const required = value => (value ? undefined : "Value is required");
export const minLength = value =>
  value.length >= 4 ? undefined : "Username must be at least 4 characters long";
export const maxLength = value =>
  value.length <= 10
    ? undefined
    : "Username must be not more than 10 characters long";
