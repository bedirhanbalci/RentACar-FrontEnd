import bcryptjs from "bcryptjs";

const saltRounds = 10;

export async function encryptPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password encryption failed");
  }
}

export async function decryptPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const match = await bcryptjs.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Password decryption failed");
  }
}
