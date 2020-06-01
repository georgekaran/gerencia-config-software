export const authKey = "__AGI_AUTH";

export const getAuth = () => {
    return JSON.parse(localStorage.getItem(authKey)) || {};
};

export const setAuth = (auth) => {
    localStorage.setItem(authKey, JSON.stringify(auth));
};

export const removeAuth = () => {
    localStorage.removeItem(authKey);
};

export const isTokenExpirationDateValid = () => {
    const auth = getAuth();
    if (auth.expires_at == null || auth.token == null || auth.email == null) return false;

    return (new Date().getTime() < new Date(Number(auth.expires_at)).getTime());
};