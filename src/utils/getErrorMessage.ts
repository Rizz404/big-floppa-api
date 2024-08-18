import { ValidationError } from "class-validator";

const getErrorMessage = (error: unknown) => {
  let message: string | { [x: string]: string }[];

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else if (
    Array.isArray(error) &&
    error.every((err) => err instanceof ValidationError)
  ) {
    message = error.map((err) => {
      const constraints = err.constraints
        ? Object.values(err.constraints).join(", ")
        : "Validation error";
      return { [err.property]: constraints };
    });
  } else {
    message = "An unknown error has occurred";
  }

  return message;
};

export default getErrorMessage;
