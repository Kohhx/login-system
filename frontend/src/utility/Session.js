const TOKEN_PREFIX= 'Bearer ';
const AUTH_USER_KEY = 'authenticatedUser';
const TOKEN_KEY = 'token';
const ROLE_KEY = 'roles';
const AUTH_ID_KEY = 'id';

function setSessionStorage(
  id,
  email,
  token,
  role
) {
  let bearerToken = TOKEN_PREFIX + token;
  sessionStorage.setItem(AUTH_ID_KEY, id);
  sessionStorage.setItem(AUTH_USER_KEY, email);
  sessionStorage.setItem(TOKEN_KEY, bearerToken);
  sessionStorage.setItem(ROLE_KEY, role);
}

function removeSessionStorage() {
  sessionStorage.removeItem(AUTH_ID_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ROLE_KEY);
}

export const session = {
  setSessionStorage,
  removeSessionStorage,
}
