const argon2 = require('argon2');

// Function to hash a password
async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw new Error('Could not hash password');
  }
}

// Function to verify a password
async function verifyPassword(hash, password) {
  try {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  } catch (err) {
    console.error('Error verifying password:', err);
    throw new Error('Could not verify password');
  }
}

module.exports = {
  hashPassword,
  verifyPassword
};
