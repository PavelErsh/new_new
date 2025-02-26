const calculatePasswordStrength = (password: string): number => {
  let strength = 0;

  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (!hasUppercase || !hasDigit) {
    return 25;
  }
  if (password.length >= 8) strength += 25;
  if (hasUppercase) strength += 25;
  if (hasDigit) strength += 25;
  if (/[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(password)) strength += 25;
  return strength;
};

export default calculatePasswordStrength;
