export const getCurrentYear = () => {
  const today = new Date();
  return today.getFullYear();
};

export const getExperience = () => {
  const currentYear = getCurrentYear();
  return currentYear - 2020;
};
