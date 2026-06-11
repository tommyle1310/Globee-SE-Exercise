import path from 'path';

/**
 * Test user credentials.
 */
export const TEST_USER = {
  email: 'admin@gmail.com',
  password: 'admin',
};

/** Path to save authenticated browser state */
export const AUTH_STATE_PATH = path.resolve('e2e/.auth/user.json');
