export enum MoreLess {
  more = "more",
  less = "less",
}

export const lessMore = (name: string, ml: MoreLess, charsNumber: number) => {
  return `${name} must be ${ml} then ${charsNumber}`;
};

export const PASSWORD_VALIDATION_MESS =
  "Password must contain at least 8 characters, one uppercase, one number and one special case character";
