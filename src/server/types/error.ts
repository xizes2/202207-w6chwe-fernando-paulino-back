interface CustomError extends Error {
  code: number;
  publicMessage?: string;
}

export default CustomError;
