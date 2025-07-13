export function validatePassword(password: string): string | null {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&%*!?])[A-Za-z\d@$&%*!?]{8,}$/;
  if (!regex.test(password)) {
    return 'Password must be at least 8 characters, include uppercase, lowercase, digit, and special character (@$&%*!?).';
  }
  return null;
}
