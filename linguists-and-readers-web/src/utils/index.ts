export const validateEmail = (email: string) => {
  return email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
