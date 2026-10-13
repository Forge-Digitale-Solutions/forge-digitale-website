export const NEWSLETTER_SUCCESS_MESSAGE =
  "Vérifiez votre boîte mail pour confirmer votre inscription";

export const NEWSLETTER_INVALID_EMAIL_MESSAGE =
  "Veuillez saisir une adresse e-mail valide.";

export const NEWSLETTER_ERROR_MESSAGE =
  "Inscription temporairement indisponible. Réessayez un peu plus tard.";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}
