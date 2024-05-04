export const saveAuth = (token) => {
    localStorage.setItem('authHeader', token);
}

export const getAuth = () => {
    return localStorage.getItem('authHeader');
}