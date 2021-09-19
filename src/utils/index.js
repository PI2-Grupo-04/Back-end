export const errorDecorator = (callback) => {
  try {
    const response = callback();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};
