import CustomError from "../server/types/error";

const CreateCustomError = (
  code: number,
  privateMessage: string,
  publicMessage?: string
): CustomError => {
  const error = new Error(privateMessage) as CustomError;
  error.code = code;
  if (publicMessage) {
    error.publicMessage = publicMessage;
  }
  return error;
};

export default CreateCustomError;
