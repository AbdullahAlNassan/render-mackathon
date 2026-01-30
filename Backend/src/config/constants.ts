export const MESSAGES = {
  GENERAL: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
    NOT_FOUND: "Resource not found.",
  },

  AUTH: {
    UNAUTHORIZED: "You are not authorized to perform this action.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    TOKEN_MISSING: "Authentication token is missing.",
    TOKEN_INVALID: "Authentication token is invalid.",
    FORBIDDEN: "You do not have permission to access this resource.",

    PASSWORD_REQUIRED: "Password is required.",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters.",
    PASSWORD_INCORRECT: "Incorrect password.",

    LOGIN_SUCCESS: "Logged in successfully.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    LOGOUT_FAILED: "Failed to log out.",
    TOKEN_EXPIRED: "Authentication token has expired.",
    TOKEN_ALREADY_LOGGED_OUT: "You are already logged out.",
  },

  USER: {
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_CREATED: "User created successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_DELETED: "User deleted successfully.",
  },

  CRUD: {
    CREATE_SUCCESS: "Resource created successfully.",
    READ_SUCCESS: "Resource fetched successfully.",
    UPDATE_SUCCESS: "Resource updated successfully.",
    DELETE_SUCCESS: "Resource deleted successfully.",
    CREATE_FAILED: "Failed to create resource.",
    UPDATE_FAILED: "Failed to update resource.",
    DELETE_FAILED: "Failed to delete resource.",
  },

  VALIDATION: {
    INVALID_INPUT: "Invalid input provided.",
    MISSING_FIELDS: "Required fields are missing.",
    INVALID_ID: "Invalid ID format.",
  },
} as const;
