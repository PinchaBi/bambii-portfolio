const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "dispostable.com",
  "trashmail.com",
  "10minutemail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "mailnesia.com",
  "maildrop.cc",
  "discard.email",
  "tempail.com",
  "mohmal.com",
  "getnada.com",
]);

const hasMxRecord = async (domain: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
    );
    const data = await response.json();
    return Array.isArray(data.Answer) && data.Answer.length > 0;
  } catch {
    return false;
  }
};

export const verifyEmail = async (
  email: string,
): Promise<{ isValid: boolean; error?: string }> => {
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, error: "Invalid email format." };
  }

  const domain = email.split("@")[1].toLowerCase();

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Disposable email addresses are not allowed.",
    };
  }

  const mxExists = await hasMxRecord(domain);
  if (!mxExists) {
    return {
      isValid: false,
      error: "This email domain cannot receive emails.",
    };
  }

  return { isValid: true };
};
