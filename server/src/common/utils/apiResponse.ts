export function successResponse(
  data: unknown,
  message = "Success"
) {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message = "Something went wrong"
) {
  return {
    success: false,
    message,
  };
}