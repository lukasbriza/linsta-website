export const withErrorHandler = (
  fn: (...args: any) => any | Promise<any>,
  ownError?: any
) => {
  const call = async () => {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof Error) {
        ownError ? new ownError() : console.log(error);
      }
    }
  };
  return call;
};
