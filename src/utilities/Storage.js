export const loadState = (property) => {
  return localStorage.getItem(property);
};

export const saveState = (property, value) => {
  return localStorage.setItem(property, value);
};

export const removeState = (property) => {
  return localStorage.removeItem(property);
};

export const Properties = Object.freeze({
  SETLIST_ID: "setlist_id",
  ACCESS_TOKEN: "access_token",
  EXPIRES_AT: "expires_at"
});
