export const generateRandomId = () => {
  const randomId = Math.random().toString(36).substring(2, 10);

  return randomId;
};
